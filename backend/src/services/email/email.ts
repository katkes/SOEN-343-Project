import nodemailer from 'nodemailer';
//import ical from 'ical-generator';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

/**
 * Email service using the builder pattern for an event management system
 */
class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
      logger: true,
    });

    // Verify connection
    this.transporter.verify((error) => {
      if (error) {
        console.error('SMTP connection error:', error);
      } else {
        console.log('Email service ready');
      }
    });
  }

  /**
   * Create an email builder instance
   */
  createMailBuilder(): EmailBuilder {
    return new EmailBuilder(this.transporter);
  }
}

/**
 * Base email builder with common properties and methods
 */
class EmailBuilder {
  protected transporter: nodemailer.Transporter;
  protected mailOptions: nodemailer.SendMailOptions;

  constructor(transporter: nodemailer.Transporter) {
    this.transporter = transporter;
    this.mailOptions = {
      from: `"Event Management" <${process.env.EMAIL}>`,
      to: '',
      subject: '',
      text: '',
      html: '',
    };
  }

  /**
   * Set sender name and email
   */
  from(name: string, email?: string): this {
    this.mailOptions.from = `"${name}" <${email || process.env.EMAIL}>`;
    return this;
  }

  /**
   * Set recipient(s)
   */
  to(recipients: string | string[]): this {
    this.mailOptions.to = Array.isArray(recipients) ? recipients.join(',') : recipients;
    return this;
  }

  /**
   * Set email subject
   */
  subject(subject: string): this {
    this.mailOptions.subject = subject;
    return this;
  }

  /**
   * Set text content
   */
  text(content: string): this {
    this.mailOptions.text = content;
    return this;
  }

  /**
   * Set HTML content
   */
  html(content: string): this {
    this.mailOptions.html = content;
    return this;
  }

  /**
   * Add file attachments
   */
  attachments(attachments: nodemailer.SendMailOptions['attachments']): this {
    this.mailOptions.attachments = attachments;
    return this;
  }

  /**
   * Add a single file attachment
   */
  attachment(filename: string, content?: string | Buffer, contentType?: string): this {
    if (!this.mailOptions.attachments) {
      this.mailOptions.attachments = [];
    }

    // If content is provided, use it directly
    if (content) {
      this.mailOptions.attachments.push({
        filename,
        content,
        contentType,
      });
    }
    // Otherwise, try to read from filesystem
    else if (fs.existsSync(filename)) {
      this.mailOptions.attachments.push({
        filename: path.basename(filename),
        path: filename,
      });
    }

    return this;
  }

  /**
   * Send the email
   */
  async send(): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const info = await this.transporter.sendMail(this.mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Failed to send email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export { EmailService, EmailBuilder };
