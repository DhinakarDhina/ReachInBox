import nodemailer from 'nodemailer';
import config from '../config';

const transporter = nodemailer.createTransport({
    host: (config as any).EMAIL_HOST || process.env.EMAIL_HOST,
    port: (config as any).EMAIL_PORT ?? (process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : undefined),
    secure: (config as any).EMAIL_SECURE ?? (process.env.EMAIL_SECURE === 'true'), // true for 465, false for other ports
    auth: {
        user: (config as any).EMAIL_USER || process.env.EMAIL_USER,
        pass: (config as any).EMAIL_PASS || process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
    const mailOptions = {
        from: (config as any).EMAIL_FROM || process.env.EMAIL_FROM,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};