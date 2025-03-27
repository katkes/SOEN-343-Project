import {
  Squares2X2Icon,
  EnvelopeIcon,
  CalendarDaysIcon,
  UsersIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  InformationCircleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

import Logo from '../assets/logo1.svg';
import Avatar from '../assets/avatar.png';
import { useNavigate, useLocation } from 'react-router';
import { FrontEndRoutes } from '../pages/routes';
import { authService } from '../services/backend/auth';
import { useEffect, useState } from 'react';
import { useAccountInfo } from '../hooks/useAccountInfo';
import { UserAccount, CompanyAccount } from "../types/account";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('');
  const account = useAccountInfo();

  const menuItems = [
    { name: 'Dashboard', icon: Squares2X2Icon, route: FrontEndRoutes.Dashboard },
    { name: 'Events', icon: EnvelopeIcon, route: FrontEndRoutes.Events },
    { name: 'Schedule', icon: CalendarDaysIcon, route: FrontEndRoutes.Schedule },
    { name: 'Community', icon: UsersIcon, route: FrontEndRoutes.Community },
    { name: 'Analytics', icon: ChartBarIcon, route: FrontEndRoutes.Analytics },
    { name: 'Messages', icon: ChatBubbleLeftRightIcon, route: FrontEndRoutes.Messages },
    { separator: true },
    { name: 'Notifications', icon: BellIcon, route: FrontEndRoutes.Notifications },
    { name: 'Support', icon: InformationCircleIcon, route: FrontEndRoutes.Support },
    { separator: true },
    { name: 'Log Out', icon: ArrowLeftOnRectangleIcon },
  ];

  useEffect(() => {
    const currentItem = menuItems.find(
      (item) => item.route && location.pathname.startsWith(item.route)
    );
    if (currentItem) {
      setActive(currentItem.name || '');
    }
  }, [location.pathname, menuItems]);

  const logout = async () => {
    try {
      await authService.logout();
      navigate(FrontEndRoutes.Login);
    } catch (e) {
      console.error('Could not logout: ', e);
    }
  };

  return (
    <aside className="sticky top-0 z-10 bg-[#F5F7FA] h-screen w-72 flex flex-col justify-between shadow-lg rounded-r-3xl">
      <div className="p-6">
        <img src={Logo} alt="Eventful Logo" className="w-40 mb-10" />

        <nav className="space-y-1">
          {menuItems.map((item, idx) =>
            item.separator ? (
              <hr key={`sep-${idx}`} className="my-4 border-gray-200" />
            ) : (
              <button
                key={item.name}
                onClick={() => {
                  if (item.name === 'Log Out') {
                    logout();
                  } else {
                    setActive(item.name || '');
                    if (item.route) {
                      navigate(item.route);
                    }
                  }
                }}
                className={`flex items-center w-full px-4 py-3 rounded-full text-left transition-all ${
                  active === item.name
                    ? 'bg-[#EAF0FF] text-[#273266] font-semibold'
                    : 'text-[#637381] hover:bg-[#F0F2F5] hover:cursor-pointer'
                }`}
              >
                {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                {item.name}
              </button>
            )
          )}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div
          className="flex items-center space-x-3 bg-[#EAF0FF] p-3 rounded-2xl hover:bg-[#d5dffa] cursor-pointer"
          onClick={() => navigate(FrontEndRoutes.Profile)}
        >
          <img src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <div>
              {account ? (
                account instanceof UserAccount ? (
                  <>
                    <p className="text-sm text-[#637381]">Welcome back 👋</p>
                    <p className="text-sm font-medium text-[#273266]">
                      {`${account.firstName || 'User'} · ${account.role || 'Member'}`}
                    </p>
                  </>
                ) : account instanceof CompanyAccount ? (
                  <>
                    <p className="text-sm text-[#637381]">Welcome back 👋</p>
                    <p className="text-sm font-medium text-[#273266]">
                      {`${account.companyName || 'Company'} · Admin`}
                    </p>
                  </>
                ) : null
              ) : (
                <p className="text-sm text-[#637381]">Not signed in</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
