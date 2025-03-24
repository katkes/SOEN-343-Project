import {
  ArrowPathIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline';
import Badge from '../../components/Badge';

const features = [
  {
    name: 'Event Planning',
    description: 'Organizers can easily create schedules, set up sessions, and allocate resources.',
    icon: CalendarDaysIcon,
  },
  {
    name: 'Attendee Registration',
    description: 'Attendees sign up, manage profiles, and get instant access to event details.',
    icon: UserPlusIcon,
  },
  {
    name: 'Networking & Engagement',
    description: 'Live Q&A, chat rooms, and smart attendee matchmaking drive dynamic interaction.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Event Promotion',
    description:
      'Boost visibility with email campaigns, social media tools, and custom event pages.',
    icon: MegaphoneIcon,
  },
  {
    name: 'Analytics & Reporting',
    description: 'Gain real-time insights into engagement, performance, and attendee feedback.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Payments & Sponsorships',
    description: 'Securely manage ticket sales, discounts, and sponsorship transactions.',
    icon: BanknotesIcon,
  },
];

export default function Services() {
  return (
    <div className="bg-[#F9FAFB] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <Badge className="mx-auto mb-2" label="Our Services" />
          <h2 className="text-4xl font-bold tracking-tight text-[#1A1F36] sm:text-5xl">
            What We Offer
          </h2>
          <p className="mt-4 text-[#637381] text-lg">
            Smart event management for education—plan, promote, engage, and analyze, all in one
            place.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl mb-4">
                <feature.icon className="w-6 h-6 text-indigo-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-sm text-[#637381]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
