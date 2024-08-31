import express from 'express';
import bcrypt from 'bcryptjs';
import Inspector from '../models/inspector.js';
import { generateOTP, sendOTP } from '../utils/otp.js';

const router = express.Router();

// Inspector login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const inspector = await Inspector.findOne({ email });
        if (!inspector) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, inspector.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        // Generate OTP and save it
        const otp = generateOTP();
        inspector.otp = otp;
        inspector.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await inspector.save();

        // Send OTP to inspector's email
        await sendOTP(inspector.email, otp);

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// OTP verification route
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const inspector = await Inspector.findOne({ email });
        if (!inspector) return res.status(400).json({ message: 'Inspector not found' });

        if (inspector.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

        if (Date.now() > inspector.otpExpires) return res.status(400).json({ message: 'OTP expired' });

        // OTP is valid, proceed to the next interface
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
