import mongoose from 'mongoose';
import { User } from '../../models/user';
import { Event } from '../../models/event';
import dotenv from 'dotenv';

dotenv.config();

const updateEventsWithSpeakers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    const speakers = await User.find({ role: 'Speaker' });

    if (speakers.length === 0) {
      console.log('No speakers found.');
      return;
    }

    const events = await Event.find();

    for (const event of events) {
      const randomSpeaker = speakers[Math.floor(Math.random() * speakers.length)];
      event.speaker = randomSpeaker._id as mongoose.Types.ObjectId;
      await event.save();
      console.log(`Updated event ${event.name} with speaker ${randomSpeaker._id}`);
    }

    console.log('Events updated successfully.');
  } catch (error) {
    console.error('Error updating events with speakers:', error);
  } finally {
    await mongoose.disconnect();
  }
};

updateEventsWithSpeakers();
