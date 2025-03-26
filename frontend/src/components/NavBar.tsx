import { useEffect, useState } from 'react';
import Logo1 from '../assets/logo1.svg';
import CustomButton from './CustomButton';
import { Link } from 'react-router';
import { FrontEndRoutes } from '../pages/routes';

interface NavBarProps {
  homeRef?: React.RefObject<HTMLDivElement | null>;
  servicesRef?: React.RefObject<HTMLDivElement | null>;
  aboutRef?: React.RefObject<HTMLDivElement | null>;
  contactRef?: React.RefObject<HTMLDivElement | null>;
  showTabs?: boolean;
}

export default function NavBar({
  homeRef,
  servicesRef,
  aboutRef,
  contactRef,
  showTabs,
}: NavBarProps) {
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
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const sectionRefs = [
      { ref: homeRef, name: 'Home', id: 'home-section' },
      { ref: servicesRef, name: 'Services', id: 'services-section' },
      { ref: aboutRef, name: 'About', id: 'about-section' },
      { ref: contactRef, name: 'Contact', id: 'contact-section' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sectionRefs.find((s) => s.id === entry.target.id);
            if (match) setSelectedTab(match.name);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -35% 0px',
        threshold: 0.3,
      }
    );

    sectionRefs.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [homeRef, servicesRef, aboutRef, contactRef]);

  return (
    <div className="navbar fixed top-0 left-0 right-0 z-50 flex justify-between px-6 py-4 items-center bg-white shadow">
      <Link to={FrontEndRoutes.Home}>
        <img src={Logo1} alt="Hero Shape" onClick={() => handleTabClick('Home')} />
      </Link>

      {showTabs && (
        <div className="tabs flex text-[#273266] bg-white p-2">
          {['Home', 'Services', 'About', 'Contact'].map((tab) => (
            <div
              key={tab}
              className={`tab px-4 py-2 cursor-pointer font-semibold transition-all duration-200 ${
                selectedTab === tab ? 'bg-[#ebebeb] rounded-full' : ''
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      )}

      <div className="join flex gap-2">
        <Link to={FrontEndRoutes.SignUp}>
          <CustomButton
            focusColor="focus:ring-[#1E2A78]"
            hoverColor="hover:bg-[#3b4edb]"
            rounded="rounded-full"
          >
            Sign Up
          </CustomButton>
        </Link>
        <Link to={FrontEndRoutes.Login}>
          <CustomButton
            bgColor="bg-gray-200"
            textColor="text-[#1E2A78]"
            hoverColor="hover:bg-gray-300"
            focusColor="focus:ring-[#1E2A78]"
            rounded="rounded-full"
          >
            LogIn
          </CustomButton>
        </Link>
      </div>
    </div>
  );
}
