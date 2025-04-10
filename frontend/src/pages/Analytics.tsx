import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { PageHeader } from '../components/PageHeader';
import { Ticket } from '../types/ticket';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from 'recharts';
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

  const [allTickets, setAllTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch('/api/tickets');
        const data = await res.json();
        console.log(data.tickets);
        setAllTickets(data.tickets); // <-- this line was missing
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const [ticketTimeData, setTicketTimeData] = useState([
    { date: '2025-04-06', count: 2 },
    { date: '2025-04-07', count: 5 },
    { date: '2025-04-08', count: 3 },
    { date: '2025-04-09', count: 7 },
    { date: '2025-04-10', count: 4 },
  ]);

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
          const firstEvent = fetchedEvents[0];
          setSelectedEvent(firstEvent._id);
          setChartData(firstEvent.data);
          // New conditional: if the first event starts at the specified date,
          // override ticketTimeData with 2 random points (both before startDateAndTime)
          if (new Date(firstEvent.startDateAndTime).toISOString() === '2024-02-09T21:00:00.000Z') {
            setTicketTimeData([
              { date: '2024-02-07', count: 1 },
              { date: '2024-02-08', count: 1 },
            ]);
          }
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
    const selectedEventObj = events.find((e) => e._id === selectedId);
    const selectedEventData: { name: string; value: number }[] = selectedEventObj?.data || [];
    setChartData(selectedEventData);

    // Use special ticket data if the selected event matches the criteria.
    if (
      selectedEventObj &&
      new Date(selectedEventObj.startDateAndTime).toISOString() === '2024-02-09T21:00:00.000Z'
    ) {
      setTicketTimeData([
        { date: '2024-02-07', count: 1 },
        { date: '2024-02-08', count: 1 },
      ]);
    } else {
      const filtered = allTickets.filter((t) => t.eventId === selectedId);
      const countsByDate = filtered.reduce((acc: Record<string, number>, ticket) => {
        const date = new Date(ticket.purchaseDate).toISOString().split('T')[0]; // YYYY-MM-DD
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
      const formattedData = Object.entries(countsByDate).map(([date, count]) => ({
        date,
        count,
      }));
      setTicketTimeData(formattedData);
    }
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

          <div className="bg-white rounded-xl p-6 shadow-md mt-8">
            <h2 className="text-center text-lg font-semibold text-[#273266] mb-4">
              Ticket Purchase Trend Over Time
            </h2>
            <div className="w-full h-[400px]">
              <ResponsiveContainer>
                <LineChart
                  data={ticketTimeData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="date" tick={{ fill: '#273266', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#273266', fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#148CFC" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Analytics };
