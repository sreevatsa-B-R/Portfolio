const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080; // Use PORT from .env or default to 8080
app.use(cors()); // Enable CORS for all routes
// Middleware
app.use(bodyParser.json());

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: 'sree.excerpt@gmail.com', // Replace with your email
        pass: 'pzbn idce nlso wate'  // Replace with your email password or app password
    }
});

// POST API to send email
app.post('/send-email', (req, res) => {
    const { fullName, email, phoneNumber, budget, file, subject, message } = req.body;

    const mailOptions = {
        from: 'sree.excerpt@gmail.com', // Sender address
        to: 'sreevatsabr@gmail.com', // Recipient email
        subject, // Subject line
        text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phoneNumber}\nBudget: ${budget}\nMessage: ${message}`, // Plain text body
        // attachments: file ? [{ path: file }] : [] // Attach file if provided
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Failed to send email', error });
        }
        console.log('Email sent successfully:', info.response);
        res.status(200).json({ message: 'Email sent successfully', info });
    });
});

app.use(express.static(path.join(__dirname, './dist'))); // Serve static files from React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html')); // Serve index.html for all other routes
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});