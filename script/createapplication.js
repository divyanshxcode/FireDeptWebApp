import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Application from '../models/application.js'; // Adjust the path to your model file

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// POST route to create a new application
app.post('/applications', (req, res) => {
    const { applicantName, address, contactInfo } = req.body;

    const newApplication = new Application({
        applicantName,
        address,
        contactInfo
    });

    newApplication.save()
        .then(app => {
            res.status(201).json({
                message: "New application created successfully",
                applicationId: app.applicationId
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Error creating application",
                error: err.message
            });
        });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
