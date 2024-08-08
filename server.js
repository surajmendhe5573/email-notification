const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

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

  // Email options for the site admin
  const adminMailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Email options for the client confirmation
  const clientMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Contact Form Submission Received',
    text: `Hi ${name},\n\nThank you for reaching out! We have received your message and will get back to you shortly.\n\nYour message:\n${message}\n\nBest regards,\nYour Company Name`,
  };

  // Send email to the site admin
  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    
    // Send confirmation email to the client
    transporter.sendMail(clientMailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to send confirmation email' });
      }

      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
