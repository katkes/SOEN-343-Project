import { useState, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import CustomButton from './CustomButton';
import FileUpload from './FileUpload';

export const userRole = 'attendee';

interface EventFormProps {
  editable?: boolean;
  onSubmit?: () => void;
  isCreating?: boolean;
  role?: string;
  registered?: boolean;
}

const allSpeakers = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Michael Clark'];

export const EventForm: React.FC<EventFormProps> = ({
  editable = false,
  isCreating = false,
  role: userRole,
  registered = false,
}) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDetails, setEventDetails] = useState([
    '09:00 AM',
    '05:00 PM',
    ['John Doe'],
    '123 Main St',
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  const [localEditable, setLocalEditable] = useState(editable);
  const formEditable = isCreating ? true : localEditable;

  const isUser = userRole === 'attendee';

  const placeholders = {
    title: 'Event Name',
    description: 'Add a description to your event',
    date: 'dd-mm-yyyy',
    location: 'Location',
  };

  const handleEventDetailChange = (index: number, newValue: string | string[]) => {
    const newDetails = [...eventDetails];
    newDetails[index] = newValue;
    setEventDetails(newDetails);
  };

  const MultiSpeakerSelector = ({
    selected,
    onChange,
    disabled,
  }: {
    selected: string[];
    onChange: (newValues: string[]) => void;
    disabled: boolean;
  }) => (
    <Listbox value={selected} onChange={onChange} multiple disabled={disabled}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-xl bg-[#F4F6F8] py-2 pl-3 pr-10 text-left text-sm text-gray-600 border border-gray-300">
          <span className="block truncate">
            {selected.length > 0 ? selected.join(', ') : 'Select Speakers'}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2">
            <ChevronUpDownIcon className="h-4 w-4 text-gray-400" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-sm text-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {allSpeakers.map((speaker, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}`
                }
                value={speaker}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {speaker}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-2 flex items-center text-blue-600">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );

  return (
    <div className="flex flex-col">
      <div className="flex-4/5 overflow-hidden pb-6">
        <div className="text-[#273266] rounded-xl shadow border-0.5">
          <div className="flex flex-col justify-center banner h-fit py-32 px-12 gap-8">
            <div className="flex flex-col md:flex-row gap-4 text-white text-sm font-medium">
              <input
                disabled={!formEditable}
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="bg-transparent placeholder-gray-100 border-b border-white/50 focus:border-white outline-none w-fit"
                placeholder={placeholders.date}
              />
              <input
                disabled={!formEditable}
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="bg-transparent placeholder-gray-100 border-b border-white/50 focus:border-white outline-none w-fit"
                placeholder={placeholders.location}
              />
            </div>
            <input
              disabled={!formEditable}
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="text-3xl font-bold text-white bg-transparent outline-none border-b-2 border-white/50 focus:border-white w-full max-w-md placeholder-gray-100"
              placeholder={placeholders.title}
            />
            <div className="bg-white w-2/5 rounded-xl p-1">
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
                          ? '/event/event-details/streaming'
                          : '/event/event-details/register'
                      );
                    }
                  }}
                >
                  {isCreating ? 'Create Event' : registered ? 'Join Stream' : 'Register'}
                </CustomButton>
              </div>
              {/* Show Edit button only for organizers */}
              {location.pathname === '/event/event-details' && !isCreating && !isUser && (
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
            <h3 className="text-xl font-semibold pt-2 pb-4">Event Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {eventDetails.map((detail, index) =>
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
              )}
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
                  } else {
                    navigate(
                      registered
                        ? '/event/event-details/streaming'
                        : '/event/event-details/register'
                    );
                  }
                }}
              >
                {isCreating ? 'Create Event' : registered ? 'Join Stream' : 'Register'}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
