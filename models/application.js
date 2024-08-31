// models/application.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const applicationSchema = new mongoose.Schema({
    applicationId: { 
        type: String, 
        unique: true, 
        default: uuidv4 
    },
    applicantName: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    contactInfo: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        default: 'Pending' 
    },
    submissionDate: { 
        type: Date, 
        default: Date.now 
    },
    inspectorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Inspection' 
    },
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
