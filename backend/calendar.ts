import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configuration for email transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Use Gmail's SMTP server (change if using another provider)
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.APP_PASSWORD, // use app password if 2FA is enabled
  },
  tls: {
    rejectUnauthorized: false, // Helps in some network environments
  },
});

// Function to format date for iCalendar format
function formatDate(dateStr: string | number | Date) {
  const date = new Date(dateStr);
  return date.toISOString().replace(/[-:]/g, '').split('.')[0]; // e.g. 20250326T150000
}

// Function to send calendar invite
async function sendCalendarInvite(
  to: string,
  subject: string,
  description: string,
  startTime: string | number | Date,
  endTime: string | number | Date,
) {
  // Create iCalendar content
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART:${formatDate(startTime)}
DTEND:${formatDate(endTime)}
SUMMARY:${subject}
DESCRIPTION:${description}
ORGANIZER;CN=Your Name:mailto:${process.env.EMAIL}
ATTENDEE;CN=Invitee;RSVP=TRUE:mailto:${to}
END:VEVENT
END:VCALENDAR`;

  //console.log(`${env.EMAIL}`);
  //console.log(`${env.PASSWORD}`);

  // Configure email options
  const mailOptions = {
    from: `eventfulio99@gmail.com`,
    to: to,
    subject: 'Meeting Invite: ' + subject,
    text: description,
    alternatives: [
      {
        contentType: 'text/calendar; method=REQUEST',
        content: icsContent,
      },
    ],
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Calendar invite sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send calendar invite:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Example usage
const recipientEmail = 'eventfulio99@gmail.com';
const meetingSubject = 'Project Discussion';
const meetingDescription = "Let's discuss the progress of our current project.";
const meetingStart = '2025-03-30T15:00:00';
const meetingEnd = '2025-03-30T16:00:00';

// Execute the function
sendCalendarInvite(
  recipientEmail,
  meetingSubject,
  meetingDescription,
  meetingStart,
  meetingEnd,
).then((result) => {
  if (result.success) {
    console.log('Invite sent successfully!');
  } else {
    console.log('Failed to send invite:', result.error);
  }
});
