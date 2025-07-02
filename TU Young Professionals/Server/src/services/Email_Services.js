import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // STARTTLS is used (not SSL/TLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false // For testing only (disable in production)
  }
});

/**
 * Send a confirmation email
 */
export const sendConfirmationEmail = async (to: string, name: string, requestData: any) => {
  const mailOptions = {
    from: `"TU Young Professionals" <${process.env.SMTP_FROM}>`,
    to,
    subject: 'Thank you for your interest!',
    text: `Hi ${name},\n\nWe received your request for ${requestData.campus} campus.`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Hello ${name},</h2>
        <p>We received your request for <strong>${requestData.campus}</strong> campus.</p>
        ${requestData.workshop ? `<p>Workshop: ${requestData.workshop}</p>` : ''}
        <p>We'll contact you soon at ${to}.</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info)); // Ethereal testing only
    return info;
  } catch (error) {
    console.error('Email failed:', error);
    throw error;
  }
};

// Verify SMTP connection on startup
transporter.verify((error) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server is ready');
  }
});