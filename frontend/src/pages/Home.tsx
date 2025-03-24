import React from 'react';
import { Main } from '../layouts/Main';
import { Link } from 'react-router';
import { FrontEndRoutes } from './routes';
import { useRef } from 'react';
import Hero from './home/Hero';
import NavBar from './home/NavBar';
import Services from './home/Services';
import AboutUs from './home/AboutUs';
import Promo from './home/Promo';
import ContactUs from './home/ContactUs';
import Footer from '../components/Footer';

export const Home: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  return (
    <Main>
      <div className="frame">
        <NavBar
          homeRef={homeRef}
          servicesRef={servicesRef}
          aboutRef={aboutRef}
          contactRef={contactRef}
        />

        <div ref={homeRef} id="home-section">
          <Hero />
        </div>
        <div ref={servicesRef} id="services-section">
          <Services />
        </div>
        <div ref={aboutRef} id="about-section">
          <AboutUs />
        </div>
        <div>
          <Promo />
        </div>
        <div ref={contactRef} id="contact-section">
          <ContactUs />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </Main>
  );
};
