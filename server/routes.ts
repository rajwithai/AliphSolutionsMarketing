import type { Express } from "express";
import { createServer, type Server } from "http";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactEmail } from "./emailService";
import nodemailer from 'nodemailer';

// Create reusable transporter for generic form submissions
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Verify SMTP configuration on startup
  console.log('SMTP Configuration:');
  console.log('- Host:', process.env.SMTP_HOST);
  console.log('- Port:', process.env.SMTP_PORT);
  console.log('- User:', process.env.SMTP_USER);
  console.log('- From:', process.env.SMTP_FROM);
  console.log('- To:', process.env.SMTP_TO);
  console.log('- Password configured:', !!process.env.SMTP_PASSWORD);

  // Contact form submission - sends email directly without storing
  app.post("/api/contact", async (req, res) => {
    try {
      // Check if this is a standard contact form or a specialized form
      if (req.body.formType) {
        // Handle specialized forms (Advisory, AI Governance, etc.)
        const { formType, email, name, ...otherFields } = req.body;
        
        // Basic validation
        if (!email || !name) {
          return res.status(400).json({ 
            success: false, 
            message: "Name and email are required" 
          });
        }
        
        console.log(`Processing ${formType} from ${name} (${email})`);
        console.log('Sending to:', process.env.SMTP_TO);
        
        // Build email content from all form fields
        const fieldEntries = Object.entries(otherFields)
          .filter(([key, value]) => value !== '' && value !== undefined && value !== null)
          .map(([key, value]) => {
            const formattedKey = key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())
              .trim();
            return `<p style="margin: 10px 0;"><strong>${formattedKey}:</strong> ${value}</p>`;
          })
          .join('\n');
        
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #C9A227; border-bottom: 2px solid #C9A227; padding-bottom: 10px;">
              ${formType}
            </h2>
            
            <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              ${fieldEntries}
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
              <p>This email was sent from Aliph Solutions.</p>
              <p>Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `;
        
        const mailOptions = {
          from: `"Aliph Solutions" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: process.env.SMTP_TO || process.env.SMTP_USER,
          replyTo: email,
          subject: `${formType} - ${otherFields.company || name}`,
          html: htmlContent,
        };
        
        
        
        const info = await transporter.sendMail(mailOptions);
        
        
        return res.status(200).json({ 
          success: true, 
          message: "Email sent successfully"
        });
      }
      
      // Handle standard contact form
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Send email to user
      await sendContactEmail({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company,
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message,
        inquiryType: validatedData.inquiryType,
      });
      
      res.status(200).json({ 
        success: true, 
        message: "Email sent successfully"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        console.error("SMTP Config at error time:", {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER,
          hasPassword: !!process.env.SMTP_PASSWORD
        });
        res.status(500).json({ 
          success: false, 
          message: "Failed to send email. Please check server logs." 
        });
      }
    }
  });

  // Note: GET endpoint removed for security - contact submissions contain PII
  // and should only be accessible via authenticated admin interface

  const httpServer = createServer(app);

  return httpServer;
}
