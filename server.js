const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,        
  },
});

// Route to handle contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Email options
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});