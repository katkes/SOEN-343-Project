import nodemailer from 'nodemailer';

type EventDetails = {
  title: string;
  date: string;
  time: string;
};

// Mock function to send email invitation (No actual email sending)
const sendEmailInvitation = async (email: string, eventDetails: EventDetails) => {
  console.log(
    `Simulating email invitation to ${email} for event: ${eventDetails.title} on ${eventDetails.date} at ${eventDetails.time}`,
  );
  nodemailer.createTransport(); // to remove
};

// Mock function to add event to a local calendar log (No external API usage)
const addToLocalCalendar = async (eventDetails: EventDetails) => {
  console.log(
    `Simulating adding event to local calendar: ${eventDetails.title} on ${eventDetails.date} at ${eventDetails.time}`,
  );
};

// Sample event details
const eventDetails: EventDetails = {
  title: 'Team Meeting',
  date: '2025-04-01',
  time: '14:00',
};
const recipientEmail = 'jainammshah12@gmail.com';

// Execute mock functions on startup
(async () => {
  try {
    await sendEmailInvitation(recipientEmail, eventDetails);
    await addToLocalCalendar(eventDetails);
    console.log('Event processing complete.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error processing event:', error.message);
    } else {
      console.error('Error processing event:', error);
    }
  }
})();
