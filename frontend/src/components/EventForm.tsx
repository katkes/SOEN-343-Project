import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomButton from './CustomButton';
import FileUpload from './FileUpload';
import { EventResponseDTO } from '../types/event';

export const userRole = 'attendee';
import { useAccountInfo } from '../hooks/useAccountInfo';
import { CompanyAccount, UserAccount } from '../types/account';
import { userService } from '../services/backend/user';

interface EventFormProps {
  editable?: boolean;
  onSubmit?: () => void;
  isCreating?: boolean;
  role?: string;
  registered?: boolean;
  event: EventResponseDTO;
}

export const EventForm: React.FC<EventFormProps> = ({
  editable = false,
  isCreating = false,
  event
}) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [locationType, setLocationType] = useState<string>('In Person');
  const [maxCapacity, setMaxCapacity] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [selectedSpeaker, setSelectedSpeaker] = useState<UserAccount>();
  const [speakers, setSpeakers] = useState<UserAccount[]>([]);
  const [registered, setRegistered] = useState(false); // Registered is now a state variable
  const [localEditable, setLocalEditable] = useState(editable);
  const [price, setPrice] = useState<number>(0);
  const formEditable = isCreating ? true : localEditable;

  const navigate = useNavigate();
  const location = useLocation();

  const account = useAccountInfo();
  const isEventCreator =
    account instanceof CompanyAccount ||
    (account instanceof UserAccount &&
      ['EventOrganizer', 'Admin'].includes(account.role as string));

  const isSponsor = account instanceof UserAccount && account.role === 'Sponsor';

  const placeholders = {
    title: 'Event Name',
    description: 'Add a description to your event',
    date: 'dd-mm-yyyy',
    location: 'Location',
  };

  // Populate fields with event data when the event prop changes
  useEffect(() => {
    if (event) {
      setEventTitle(event.name);
      setEventDescription(event.description);
      setEventDate(
        `${new Date(event.startDateAndTime).toLocaleDateString('en-CA')} ${new Date(
          event.startDateAndTime
        ).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}`
      );
      setEventLocation(event.location);
      setLocationType(event.locationType);
      setMaxCapacity(event.maxCapacity);
      setDuration(event.timeDurationInMinutes);
      setPrice(event.price);

      const fetchCurrentSpeaker = async () => {
        const currentSpeaker = await userService.getUserByEmail(event.speaker);
        setSelectedSpeaker(currentSpeaker);
      };
      fetchCurrentSpeaker();

      const fetchSpeakers = async () => {
        try {
          const responseJson = await userService.getAllSpeakers();
          setSpeakers(responseJson);
        } catch (error) {
          console.error('Error fetching speakers:', error);
        }
      };

      fetchSpeakers();
    }
  }, [event]);

  return (
    <div className="flex flex-col">
      <div className="flex-4/5 overflow-hidden pb-6">
        <div className="text-[#273266] rounded-xl shadow border-0.5">
          <div className="flex flex-col justify-center banner h-fit py-32 px-12 gap-8">
            <div className="flex flex-col md:flex-row gap-4 text-white text-sm font-medium">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <input
                  disabled={!formEditable}
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="bg-transparent placeholder-gray-100 border-b border-white/50 focus:border-white outline-none w-fit"
                  placeholder={placeholders.date}
                />
              </div>

              <div className="flex items-center gap-2">
                <span>📍</span>
                <input
                  disabled={!formEditable}
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="bg-transparent placeholder-gray-100 border-b border-white/50 focus:border-white outline-none w-fit"
                  placeholder={placeholders.location}
                />
              </div>
            </div>
            <input
              disabled={!formEditable}
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="text-3xl font-bold text-white bg-transparent outline-none border-b-2 border-white/50 focus:border-white w-full max-w-md placeholder-gray-100"
              placeholder={placeholders.title}
            />
            <div className="bg-white w-3/6 rounded-xl p-1">
              <textarea
                disabled={!formEditable}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="text-sm text-gray-500 w-full p-2 rounded-xl bg-white outline-none resize-none"
                placeholder={placeholders.description}
              />
            </div>
            <div className="flex">
              <div className="flex justify-between items-center w-full">
                <CustomButton
                  className="bg-[#273266] text-white text-sm font-semibold px-4 py-2 rounded-xl"
                  onClick={() => {
                    if (isCreating) {
                      // do something
                    } else {
                      navigate(
                        registered
                          ? `/event/${event._id}/streaming`
                          : `/event/${event._id}/register`
                      );
                    }
                  }}
                >
                  {isCreating ? 'Create Event' : registered ? 'Join Stream' : 'Register'}
                </CustomButton>
              </div>
              {location.pathname === '/event/event-details' && !isCreating && isEventCreator && (
                <CustomButton
                  className="text-white text-sm font-semibold py-2 rounded-xl"
                  onClick={() => setLocalEditable((prev) => !prev)}
                >
                  {formEditable ? 'Save' : 'Edit'}
                </CustomButton>
              )}

            </div>
          </div>
          <div className="py-6 px-12 bg-white rounded-b-xl">
            <h3 className="text-xl font-semibold pt-2 pb-4">Event Details</h3>{/* New Price Input Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 pl-1">Price ($):</label>
              <input
                type="number"
                value={price || ''}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 0) setPrice(value);
                }}
                min="0"
                placeholder="Price"
                disabled={!formEditable}
                className={`w-full max-w-[500px] p-3 rounded-xl placeholder-gray-400 mb-4 ${
                  formEditable
                    ? 'bg-[#F4F6F8] border-gray-300 text-[#273266]'
                    : 'bg-gray-200 border-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* Max Capacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity:</label>
                <input
                  type="number"
                  disabled={!formEditable}
                  value={maxCapacity || ''}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) setMaxCapacity(value);
                  }}
                  min="0"
                  placeholder="Max Capacity"
                  className={`w-full p-3 rounded-xl border text-sm placeholder-gray-400 ${
                    formEditable
                      ? 'bg-[#F4F6F8] border-gray-300 text-[#273266]'
                      : 'bg-gray-200 border-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 pl-1">Duration (mins):</label>
                <input
                  type="number"
                  disabled={!formEditable}
                  value={duration || ''}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) setDuration(value);
                  }}
                  min="0"
                  placeholder="Duration (mins)"
                  className={`w-full p-3 rounded-xl border text-sm placeholder-gray-400 ${
                    formEditable
                      ? 'bg-[#F4F6F8] border-gray-300 text-[#273266]'
                      : 'bg-gray-200 border-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                />
              </div>

              {/* Location Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 pl-1">Location Type:</label>
                <select
                  value={locationType || ''}
                  disabled={!formEditable}
                  onChange={(e) => setLocationType(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-sm placeholder-gray-400 ${
                    formEditable
                      ? 'bg-[#F4F6F8] border-gray-300 text-[#273266]'
                      : 'bg-gray-200 border-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <option value="in-person">In Person</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Online">Online</option>
                </select>
              </div>
                
              {/* Speaker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 pl-1">Speaker:</label>
                <select
                  value={selectedSpeaker?._id || ''}
                  disabled={!formEditable}
                  onChange={(e) => {
                    const selected = speakers.find(speaker => speaker._id === e.target.value);
                    setSelectedSpeaker(selected);
                  }}
                  className={`w-full p-3 rounded-xl border text-sm placeholder-gray-400 ${
                    formEditable
                      ? 'bg-[#F4F6F8] border-gray-300 text-[#273266]'
                      : 'bg-gray-200 border-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {speakers.map((speaker) => (
                    <option key={speaker._id} value={speaker._id}>
                      {speaker.firstName} {speaker.lastName}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* TODO: Replace the following code with individual input fields */}
              {/* {eventDetails.map((detail, index) =>
                index === 2 ? (
                  <MultiSpeakerSelector
                    key={index}
                    selected={Array.isArray(detail) ? detail : []}
                    onChange={(newVals) => handleEventDetailChange(index, newVals)}
                    disabled={!formEditable}
                  />
                ) : (
                  <input
                    key={index}
                    disabled={!formEditable}
                    value={detail}
                    onChange={(e) => handleEventDetailChange(index, e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-gray-500 placeholder-gray-400"
                  />
                )
              )} */}
            </div>
            {formEditable && (
              <FileUpload onFilesSelected={(files) => console.log('Files selected:', files)} />
            )}
            <div>
              <CustomButton
                className="bg-[#4F52FF] w-full py-3 text-white rounded-xl mt-4 font-bold"
                onClick={() => {
                  if (isCreating) {
                    // do something
                  } else if (isSponsor) {
                    navigate(`/event/${event._id}/sponsorConfirmation`);
                  } else {
                    navigate(
                      registered
                        ? `/event/${event._id}/streaming`
                        : `/event/${event._id}/register`
                    );
                  }
                }}
              >
                {(() => {
                  if (isCreating) {
                    return 'Create Event';
                  } else if (isSponsor) {
                    return 'Sponsor';
                  } else if (registered) {
                    return 'Join Stream';
                  } else {
                    return 'Register';
                  }
                })()}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
