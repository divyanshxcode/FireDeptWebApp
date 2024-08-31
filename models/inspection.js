import { Schema, model } from 'mongoose';

const inspectionSchema = new Schema({
    applicationId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Application', 
        required: true 
    },
    inspectorName: { 
        type: String, 
        required: true 
    },
    inspectionDate: { 
        type: Date, 
        required: true 
    },
    report: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        default: 'Pending' 
    },
});

const Inspection = model('Inspection', inspectionSchema);

export default Inspection;
