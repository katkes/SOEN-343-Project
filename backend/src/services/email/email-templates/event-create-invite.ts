/**
 * Generate HTML for event invitation
 */

function getEndDate(startDate: Date, durationInMinutes: number): Date {
  return new Date(startDate.getTime() + durationInMinutes * 60000);
}

export function generateEventInviteHtml(
  title: string,
  description: string,
  startDate: Date,
  duration: number,
  location?: string,
  url?: string,
): string {
  // Format date for display
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDate = startDate.toLocaleDateString(undefined, dateOptions);
  const startTime = startDate.toLocaleTimeString(undefined, timeOptions);
  const endTime = getEndDate(startDate, duration).toLocaleTimeString(undefined, timeOptions); // Assuming a 1-hour duration

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background-color: #4F52FF; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .event-details { background-color: #f5f5f5; padding: 15px; margin: 15px 0; border-left: 4px solid #4F52FF; }
    .event-meta { margin: 15px 0; }
    .event-meta strong { color: #4F52FF; }
    .button { display: inline-block; background-color: #4F52FF; color: white; padding: 10px 20px; 
              text-decoration: none; border-radius: 4px; margin-top: 15px; }
    .footer { margin-top: 30px; font-size: 12px; color: #666; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <h1>You're Ready to Go!</h1>
  </div>
  
  <div class="content">
    <h2>${title}</h2>
    
    <div class="event-meta">
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${startTime} - ${endTime}</p>
      ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
      ${url ? `<p><strong>Event URL:</strong> <a href="${url}">${url}</a></p>` : ''}
    </div>
    
    <div class="event-details">
      <h3>Event Details:</h3>
      <p>${description.replace(/\n/g, '<br>')}</p>
    </div>
    
    
    ${url ? `<a href="${url}" class="button">Join Event</a>` : ''}
    
    <div class="footer">
      <p>This email contains a calendar invitation that you can add to your calendar.</p>
      <p>Please do not reply to this email as it was sent from an automated system.</p>
    </div>
  </div>
</body>
</html>
    `;
}
