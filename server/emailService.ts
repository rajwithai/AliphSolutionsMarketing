import nodemailer from 'nodemailer';

// Create reusable transporter using SMTP configuration from environment
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface EmailData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: 'solution' | 'expert' | 'general';
}

export async function sendContactEmail(data: EmailData): Promise<void> {
  const { name, email, company, phone, subject, message, inquiryType } = data;

  // Email content to be sent
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #C9A227; border-bottom: 2px solid #C9A227; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
        <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
        ${company ? `<p style="margin: 10px 0;"><strong>Company:</strong> ${company}</p>` : ''}
        ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
        <p style="margin: 10px 0;"><strong>Inquiry Type:</strong> ${inquiryType}</p>
      </div>
      
      <div style="margin: 20px 0;">
        <h3 style="color: #333; margin-bottom: 10px;">Subject:</h3>
        <p style="background: #fff; padding: 15px; border-left: 4px solid #C9A227; margin: 0;">
          ${subject}
        </p>
      </div>
      
      <div style="margin: 20px 0;">
        <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
        <p style="background: #fff; padding: 15px; border-left: 4px solid #C9A227; white-space: pre-wrap; margin: 0;">
          ${message}
        </p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
        <p>This email was sent from Aliph Solutions contact form.</p>
        <p>Submitted on: ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `;

  const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${phone ? `Phone: ${phone}` : ''}
Inquiry Type: ${inquiryType}

Subject:
${subject}

Message:
${message}

---
This email was sent from Aliph Solutions contact form.
Submitted on: ${new Date().toLocaleString()}
  `;

  try {
    // Send notification to company email
    await transporter.sendMail({
      from: `"Aliph Solutions Contact Form" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO || process.env.SMTP_USER, // Send to company email
      replyTo: email, // Allow replying directly to the user
      subject: `Contact Form: ${subject}`,
      text: textContent,
      html: htmlContent,
    });

    console.log(`Email sent successfully to ${process.env.SMTP_TO}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}
