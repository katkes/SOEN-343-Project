import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { PageHeader } from '../components/PageHeader';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { eventService } from '../services/backend/event';
import { userService } from '../services/backend/user';

const CHART_COLORS_BLUE = ['#637EFF', '#148CFC'];

const Analytics = () => {
  interface Event {
    speaker: string;
    tags: string[];
    data: { name: string; value: number }[];
    name: string;
    description: string;
    location: string;
    locationType: string;
    ticketsSold: number;
    maxCapacity: number;
    startDateAndTime: Date;
    timeDurationInMinutes: number;
    _id: string;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getAllEvents();

        const fetchedEvents = await Promise.all(
          response.map(async (event) => {
            const speaker = await userService.getUserByEmail(event.speaker);
            return {
              ...event,
              speaker: speaker.firstName + ' ' + speaker.lastName,
              tags: ['NEW!'],
              data: [
                { name: 'Tickets Sold', value: event.ticketsSold },
                { name: 'Remaining Capacity', value: event.maxCapacity - event.ticketsSold },
              ],
            };
          })
        );

        setEvents(fetchedEvents);
        if (fetchedEvents.length > 0) {
          setSelectedEvent(fetchedEvents[0]._id);
          setChartData(fetchedEvents[0].data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedId: string = event.target.value;
    setSelectedEvent(selectedId);
    const selectedEventData: { name: string; value: number }[] =
      events.find((e) => e._id === selectedId)?.data || [];
    setChartData(selectedEventData);
  };

  return (
    <div className="flex bg-[#EAF5FF]">
      <Sidebar />
      <main className="flex-1 p-6">
        <PageHeader pageName="Analytics" />

        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#273266]">Select Event</p>
            <select
              value={selectedEvent}
              onChange={handleEventChange}
              className="p-2 border bg-white border-gray-300 rounded"
            >
              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-center text-lg font-semibold text-[#273266] mb-4">
            Ticket Sales Distribution
          </h2>

          <div className="w-full h-[400px]">
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fill: '#273266', fontSize: 12 }} />
                <YAxis tick={{ fill: '#273266', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f0f0f0' }} />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={CHART_COLORS_BLUE[index % CHART_COLORS_BLUE.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Analytics };
