import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import Application from '../models/application.js';
import Inspection from '../models/inspection.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName); // Generate a unique name for each uploaded file
    }
});

const upload = multer({ storage: storage });

// POST route to upload photos and create an inspection
router.post('/upload/:applicationId', upload.array('photos', 10), async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const photoPaths = files.map(file => file.path);

        // Update the application document with the uploaded photo paths
        const updatedApplication = await Application.findByIdAndUpdate(
            applicationId,
            { $push: { photos: { $each: photoPaths } } },
            { new: true }
        );

        if (!updatedApplication) {
            return res.status(404).send('Application not found.');
        }

        // Create a new inspection document
        const newInspection = new Inspection({
            applicationId: applicationId,
            inspectorName: req.body.inspectorName,
            inspectionDate: new Date(),
            report: req.body.report,
            status: req.body.status || 'Pending'
        });

        const savedInspection = await newInspection.save();

        // Add the inspection reference to the application
        updatedApplication.inspections.push(savedInspection._id);
        await updatedApplication.save();

        res.status(200).json({ application: updatedApplication, inspection: savedInspection });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error.');
    }
});

export default router;
