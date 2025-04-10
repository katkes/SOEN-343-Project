//import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
//import ical, { ICalAttendeeStatus, ICalEventStatus } from 'ical-generator';
import { EmailService } from './email';
//import { ENV_VARS } from '../../configs/env';
//import { EventDetails, generateEventPromotionHtml } from './email-templates/event-promote';
//import { CreateEventDTO } from '../mongo/event';
//import { Logger } from '../../configs/logger';
import { IEvent } from '../../models/event';
import { generateEventInviteHtml } from './email-templates/event-create-invite';

// Load environment variables
dotenv.config();

(async () => {
  const result = await new EmailService()
    .createMailBuilder()
    .to('jainammshah12@gmail.com')
    .subject('Test')
    .text('Test')
    .send();
  console.log(result.success ? 'Email sent successfully!' : 'Failed to send email:', result.error);
})();
const event: IEvent = {
  name: 'Test Event',
  description: 'This is a test event',
  location: 'Test Location',
  locationType: 'Online',
  startDateAndTime: new Date('2025-04-10T15:00:00'),
  speaker: 'Test Speaker',
  price: 1000,
  ticketsSold: 0,
  maxCapacity: 100,
  timeDurationInMinutes: 90,
  sponsoredBy: 'Test Sponsor',
};
// const eventDetails:EventDetails = {
//     date: body.startDateAndTime,
//     speakers: [{ name: body.speaker, title: '' }],
//     category: body.locationType,
//     title: body.name,
//     image: '',
//     description: body.description,
//     location: body.location,
//     price: body.price.toString(),
//     registrationUrl: '',
//   };

(async () => {
  const html = generateEventInviteHtml(
    event!.name,
    event!.description,
    event!.startDateAndTime,
    event!.timeDurationInMinutes,
    event!.location,
    event?.price.toString(),
  );
  const users = ['jainammshah12@gmail.com'];
  const result = await new EmailService()
    .createMailBuilder()
    .subject('Ticket confirmation')
    .to(users)
    .html(html)
    .send();
  console.log(result.success ? 'Email sent successfully!' : 'Failed to send email:', result.error);
})();

//Below is a reference to

// /**
//  * Send calendar invite to one or multiple recipients
//  *
//  * @param {string|string[]} to - Email address(es) of recipient(s)
//  * @param {string} subject - Subject of the meeting
//  * @param {string} description - Description of the meeting
//  * @param {Date|string} startTime - Start time of the meeting
//  * @param {Date|string} endTime - End time of the meeting
//  * @param {string} [location] - Optional location of the meeting
//  * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
//  */
// async function sendCalendarInvite(
//   to: string | string[],
//   subject: string,
//   description: string,
//   startTime: Date | string,
//   endTime: Date | string,
//   location?: string,
// ) {
//   try {
//     // Ensure recipients is an array
//     const recipients = Array.isArray(to) ? to : [to];

//     // Create calendar event using ical-generator
//     const calendar = ical({ name: subject });
//     const event = calendar.createEvent({
//       start: new Date(startTime),
//       end: new Date(endTime),
//       summary: subject,
//       description: description,
//       location: location,
//       organizer: {
//         name: 'Meeting Organizer',
//         email: process.env.EMAIL || '',
//         mailto: process.env.EMAIL || '',
//       },
//       status: ICalEventStatus.CONFIRMED,
//     });

//     // Add attendees
//     recipients.forEach((email) => {
//       event.createAttendee({
//         email: email,
//         rsvp: true,
//         status: ICalAttendeeStatus.NEEDSACTION,
//       });
//     });

//     // Email options
//     const mailOptions = {
//       from: `"Eventful.io" <${process.env.EMAIL}>`,
//       to: recipients.join(','),
//       subject: `Meeting Invitation: ${subject}`,
//       text: `
// You are invited to: ${subject}

// When: ${new Date(startTime).toLocaleString()} - ${new Date(endTime).toLocaleString()}
// ${location ? `Where: ${location}` : ''}

// Details:
// ${description}

// This invitation contains a calendar event. Please respond to indicate if you can attend.
//       `,
//       html: `
// <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//   <h2 style="color: #3066BE;">Meeting Invitation: ${subject}</h2>
//   <p><strong>When:</strong> ${new Date(startTime).toLocaleString()} - ${new Date(endTime).toLocaleString()}</p>
//   ${location ? `<p><strong>Where:</strong> ${location}</p>` : ''}
//   <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #3066BE;">
//     <h3>Details:</h3>
//     <p>${description.replace(/\n/g, '<br>')}</p>
//   </div>
//   <p>This invitation contains a calendar event. Please respond to indicate if you can attend.</p>
// </div>
//       `,
//       icalEvent: {
//         filename: 'invitation.ics',
//         method: 'REQUEST',
//         content: calendar.toString(),
//       },
//     };

//     // Send mail with defined transport object
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Calendar invite sent successfully:', info.messageId);
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error('Failed to send calendar invite:', error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//     };
//   }
// }

// // Simple function to send a test email to verify configuration
// async function sendTestEmail(to: string) {
//   const testMailOptions = {
//     from: `"Email Tester" <${process.env.EMAIL}>`,
//     to: to,
//     subject: 'Test Email from Nodemailer',
//     text: 'If you receive this email, your Nodemailer configuration is working correctly.',
//     html: '<p>If you receive this email, your <b>Nodemailer configuration</b> is working correctly.</p>',
//   };

//   try {
//     const info = await transporter.sendMail(testMailOptions);
//     console.log('Test email sent successfully:', info.messageId);
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error('Failed to send test email:', error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//     };
//   }
// }

// // Example usage
// async function main() {
//   // First verify if email sending works with a simple test email
//   console.log('Sending test email...');
//   const testResult = await sendTestEmail('recipient@example.com'); // Replace with actual recipient

//   if (testResult.success) {
//     console.log('Test email sent successfully! Now sending calendar invite...');

//     // Example calendar invitation
//     const recipients = ['jainammshah12@gmail.com']; // Replace with actual recipients
//     const meetingSubject = 'Project Discussion';
//     const meetingDescription =
//       "Let's discuss the progress of our current project and plan the next steps.";
//     const meetingStart = new Date('2025-04-10T15:00:00');
//     const meetingEnd = new Date('2025-04-10T16:30:00');
//     const meetingLocation = 'Conference Room A';

//     const inviteResult = await sendCalendarInvite(
//       recipients,
//       meetingSubject,
//       meetingDescription,
//       meetingStart,
//       meetingEnd,
//       meetingLocation,
//     );

//     if (inviteResult.success) {
//       console.log('Calendar invite sent successfully!');
//     } else {
//       console.log('Failed to send calendar invite:', inviteResult.error);
//     }
//   } else {
//     console.log('Test email failed. Please check your SMTP configuration:', testResult.error);
//   }
// }

// // Run the main function
// main().catch(console.error);

// // Export functions if you want to use them in other files
// export { sendCalendarInvite, sendTestEmail };
