import { Schema, model } from 'mongoose';

const applicationSchema = new Schema({
  applicantName: { type: String, required: true },
  address: { type: String, required: true },
  contactInfo: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  submissionDate: { type: Date, default: Date.now },
  inspectorId: { type: Schema.Types.ObjectId, ref: 'Inspection' },
});

const Application = model('Application', applicationSchema);

export default Application;
