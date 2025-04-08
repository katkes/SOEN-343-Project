import { useEffect, useState } from 'react';
import CustomButton from './CustomButton';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { authService } from '../services/backend/auth';
import { useNavigate } from 'react-router-dom';
import { FrontEndRoutes } from '../pages/routes';
import { userService } from '../services/backend/user';
import { UserAccount } from '../types/account';

const CreateEventForm = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<UserAccount>(); // New state for selected speaker
  const [speakers, setSpeakers] = useState<UserAccount[]>([]);
  const [eventDate, setEventDate] = useState(() => {
    const now = new Date();
    const estZone = 'America/New_York'; // EST timezone
    const estTime = toZonedTime(now, estZone);
    return format(estTime, "yyyy-MM-dd'T'HH:mm");
  });
  const [eventLocation, setEventLocation] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [locationType, setLocationType] = useState<string>('In Person');
  const [maxCapacity, setMaxCapacity] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const responseJson = await userService.getAllSpeakers();
        setSpeakers(responseJson); // Set the event details
        console.log('Speakers:', responseJson); // Log the fetched speakers
        if (responseJson.length > 0) {
          setSelectedSpeaker(responseJson[0]); // Set default to the first speaker
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchSpeakers();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.createEvent({
        name: eventTitle,
        description: eventDescription,
        location: eventLocation,
        locationType: locationType,
        ticketsSold: 0,
        maxCapacity: Number(maxCapacity),
        startDateAndTime: new Date(eventDate),
        timeDurationInMinutes: Number(duration),
        speaker: selectedSpeaker?.email || '',
      });
      navigate(FrontEndRoutes.Dashboard);
    } catch (e) {
      console.error("failed to create event:", e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* ...existing form container code... */}
      <div className="text-[#273266] rounded-xl shadow border-0.5">
        <div className="flex flex-col justify-center banner py-12 px-12 gap-6">
          <div className="flex flex-col md:flex-row gap-4 text-white text-sm font-medium">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <input
                type="datetime-local"
                id="eventDate"
                name="eventDate"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="bg-transparent placeholder-gray-100 border-b border-white/50 focus:border-white outline-none w-fit"
              />
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="bg-transparent placeholder-gray-100 border-b border-white/50 focus:border-white outline-none w-fit"
                placeholder="Location"
              />
            </div>
            
          </div>

          <input
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="text-3xl font-bold text-white bg-transparent outline-none border-b-2 border-white/50 focus:border-white w-full max-w-md placeholder-gray-100"
            placeholder="Event Title"
          />

          <div className="bg-white w-3/6 rounded-xl p-1">
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="text-sm text-gray-500 w-full p-2 rounded-xl bg-white outline-none"
              placeholder="Description"
              rows={6}
            />
          </div>
        </div>

        <div className="py-6 px-12 bg-white rounded-b-xl">
          <h3 className="text-xl font-semibold pt-2 pb-4">Event Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity:</label>
              <input
                type="number"
                value={maxCapacity || ''}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 0) setMaxCapacity(value);
                }}
                min="0"
                placeholder="Max Capacity"
                className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-[#273266] placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 pl-1">Duration (mins):</label>
              <input
                type="number"
                value={duration || ''}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 0) setDuration(value);
                }}
                min="0"
                placeholder="Duration (mins)"
                className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-[#273266] placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 pl-1">Location Type:</label>
              <select
                value={locationType || ''}
                onChange={(e) => setLocationType(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-[#273266] placeholder-gray-400"
              >
                <option value="in-person">In Person</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Online">Online</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 pl-1">Speaker:</label>
              <select
                value={selectedSpeaker?._id || ''}
                onChange={(e) => {
                  const selected = speakers.find(speaker => speaker._id === e.target.value);
                  setSelectedSpeaker(selected);
                }}
                className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-[#273266] placeholder-gray-400"
                
              >
                {speakers.map((speaker) => (
                  <option key={speaker._id} value={speaker._id}>
                    {speaker.firstName} {speaker.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <CustomButton className="bg-[#3D50FF] w-full py-3 text-white rounded-xl mt-4 font-bold">
              Create Event
            </CustomButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateEventForm;
