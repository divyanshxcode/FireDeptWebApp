import crypto from 'crypto';
import nodemailer from 'nodemailer';
import Inspector from '../models/inspector.js';

export function generateOTP() {
    return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
}

export async function sendOTP(email, otp) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
}
