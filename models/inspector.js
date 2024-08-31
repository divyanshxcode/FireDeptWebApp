import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const inspectorSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpires: { type: Date }
});

// Method to hash password before saving
inspectorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Inspector = mongoose.model('Inspector', inspectorSchema);

export default Inspector;
