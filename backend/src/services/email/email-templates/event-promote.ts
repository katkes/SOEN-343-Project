interface EventDetails {
  date: Date;
  speakers: { name: string; title: string }[];
  category: string;
  title: string;
  image: string;
  description: string;
  location: string;
  price: string;
  registrationUrl: string;
}

export function generateEventPromotionHtml(eventDetails: EventDetails): string {
  // Format date if available
  let formattedDate = '';
  if (eventDetails.date) {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    formattedDate = eventDetails.date.toLocaleString(undefined, dateOptions);
  }

  // Generate speakers HTML if available
  let speakersHtml = '';
  if (eventDetails.speakers && eventDetails.speakers.length > 0) {
    speakersHtml = `
      <div class="speakers">
        <h3>Featured Speakers</h3>
        <ul>
          ${eventDetails.speakers
            .map(
              (speaker: { name: string; title: string }) =>
                `<li><strong>${speaker.name}</strong>${speaker.title ? ` - ${speaker.title}` : ''}</li>`,
            )
            .join('')}
        </ul>
      </div>
      `;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Event Announcement</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background-color: #FF5722; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .event-image { width: 100%; max-height: 300px; object-fit: cover; margin-bottom: 20px; }
    .event-details { margin: 20px 0; }
    .event-meta { background-color: #f5f5f5; padding: 15px; margin: 15px 0; }
    .event-meta p { margin: 5px 0; }
    .category { display: inline-block; background-color: #FF5722; color: white; padding: 5px 10px; 
                border-radius: 4px; font-size: 14px; margin-bottom: 10px; }
    .cta-button { display: inline-block; background-color: #FF5722; color: white; padding: 12px 25px; 
                  text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 15px; }
    .speakers { margin: 20px 0; }
    .speakers ul { padding-left: 20px; }
    .footer { margin-top: 30px; font-size: 12px; color: #666; text-align: center; border-top: 1px solid #eee; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>New Event Announcement</h1>
  </div>
  
  <div class="content">
    ${eventDetails.category ? `<div class="category">${eventDetails.category}</div>` : ''}
    
    <h2>${eventDetails.title}</h2>
    
    ${
      eventDetails.image
        ? `<img src="${eventDetails.image}" alt="${eventDetails.title}" class="event-image">`
        : ''
    }
    
    <div class="event-details">
      <p>${eventDetails.description.replace(/\n/g, '<br>')}</p>
    </div>
    
    <div class="event-meta">
      ${formattedDate ? `<p><strong>Date & Time:</strong> ${formattedDate}</p>` : ''}
      ${eventDetails.location ? `<p><strong>Location:</strong> ${eventDetails.location}</p>` : ''}
      ${eventDetails.price ? `<p><strong>Price:</strong> ${eventDetails.price}</p>` : ''}
    </div>
    
    ${speakersHtml}
    
    ${
      eventDetails.registrationUrl
        ? `<div style="text-align: center;">
        <a href="${eventDetails.registrationUrl}" class="cta-button">Register Now</a>
      </div>`
        : ''
    }
    
    <div class="footer">
      <p>You're receiving this email because you subscribed to event updates.</p>
      <p>If you no longer wish to receive these emails, you can unsubscribe here.</p>
    </div>
  </div>
</body>
</html>
    `;
}
