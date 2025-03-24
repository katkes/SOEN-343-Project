import { useState } from 'react';
import Logo1 from '../../assets/logo1.svg';
import CustomButton from '../../components/CustomButton';

interface NavBarProps {
  homeRef: React.RefObject<HTMLDivElement | null>;
  servicesRef: React.RefObject<HTMLDivElement | null>;
  aboutRef: React.RefObject<HTMLDivElement | null>;
  contactRef: React.RefObject<HTMLDivElement | null>;
}

export default function NavBar({ homeRef, servicesRef, aboutRef, contactRef }: NavBarProps) {
  const [selectedTab, setSelectedTab] = useState('Home');

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    let ref;
    switch (tab) {
      case 'Home':
        ref = homeRef;
        break;
      case 'Services':
        ref = servicesRef;
        break;
      case 'About':
        ref = aboutRef;
        break;
      case 'Contact':
        ref = contactRef;
        break;
      default:
        ref = homeRef;
    }
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="navbar fixed top-0 left-0 right-0 z-50  flex justify-between px-6 py-4 items-center">
        <img src={Logo1} alt="Hero Shape" onClick={() => setSelectedTab('Home')} />
        <div className="tabs flex text-[#273266] bg-white p-2">
          {['Home', 'Services', 'About', 'Contact'].map((tab) => (
            <div
              key={tab}
              className={`tab ${selectedTab === tab ? 'tab-selected' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="join flex gap-2">
          <CustomButton
            focusColor="focus:ring-[#1E2A78]"
            hoverColor="hover:bg-[#3b4edb]"
            rounded="rounded-full"
          >
            Sign Up
          </CustomButton>
          <CustomButton
            bgColor="bg-gray-200"
            textColor="text-[#1E2A78]"
            hoverColor="hover:bg-gray-300"
            focusColor="focus:ring-[#1E2A78]"
            rounded="rounded-full"
          >
            LogIn
          </CustomButton>
        </div>
      </div>
    </>
  );
}
