import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import process from 'process';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import productRoutes from './routes/productRoute.js';
import cors from 'cors';



const app = express();

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

// Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:5173', 'https://sp-electro.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Add CORS headers to all responses
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:5173', 'https://sp-electro.vercel.app'];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).send();
    }
    
    next();
});

app.use(express.json()); // to parse JSON request body

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsDir));

app.use('/api/products', productRoutes);

// File upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const imageUrl = `https://sp-electro-1.onrender.com/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});


// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

// OTP store (in-memory for demo)
const otpStore = {};




app.post('/send-otp', async (req, res) => {
    console.log('Send OTP request received:', req.body);
    const { email } = req.body;
    if (!email) {
        console.log('Email missing in request');
        return res.status(400).json({ message: 'Email is required' });
    }

    const allowedEmails = ['SPELECTROSOL@GMAIL.COM','yashnagarkar124@gmail.com'];

    if (!allowedEmails.includes(email)) {
        console.log('Unauthorized email for OTP:', email);
        return res.status(403).json({ message: 'Unauthorized email address' });
    }

    console.log('Generating OTP for email:', email);
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    otpStore[email] = otp;
    console.log('OTP stored for email:', email, '(OTP hidden for security)');

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Your OTP Code for SP Electro',
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully to:', email);
        return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Email send error:', error);
        return res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    }
});

app.post('/verify-otp', (req, res) => {
    console.log('Verify OTP request received:', req.body);
    const { email, otp } = req.body;
    
    if (!email || !otp) {
        console.log('Missing email or OTP in request');
        return res.status(400).json({ message: 'Email and OTP are required' });
    }
    
    console.log('Stored OTPs:', Object.keys(otpStore).map(key => ({ email: key })));
    console.log('Checking OTP for email:', email);
    
    if (otpStore[email] == otp) {
        console.log('OTP verified successfully for:', email);
        delete otpStore[email]; // OTP used, remove it
        return res.status(200).json({ message: 'OTP verified' });
    } else {
        console.log('Invalid or expired OTP for:', email);
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
});

// Login endpoint to handle authentication
app.post('/login', (req, res) => {
    console.log('Login request received:', req.body);
    const { email } = req.body;
    const allowedEmails = ['SPELECTROSOL@GMAIL.COM','yashnagarkar124@gmail.com'];
    
    if (!email) {
        console.log('Email missing in request');
        return res.status(400).json({ message: 'Email is required' });
    }
    
    if (!allowedEmails.includes(email)) {
        console.log('Unauthorized email:', email);
        return res.status(403).json({ message: 'Unauthorized email address' });
    }
    
    console.log('Email authorized:', email);
    // If email is authorized, proceed with OTP flow
    return res.status(200).json({ message: 'Email authorized, proceed with OTP verification' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message, recipient } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: recipient || 'spelectro.contact@gmail.com',
        subject: `Contact Form Submission from ${name}`,
        text: `
Name: ${name}
Email: ${email}

Message:
${message}
`,
        html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

; (async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URL}`);
        app.on("error", () => {
            console.log("Error");
        });

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.error(error);
    }
})();
