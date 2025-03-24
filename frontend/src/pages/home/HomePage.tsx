import { useRef } from 'react';
import Hero from './Hero';
import NavBar from './NavBar';
import Services from './Services';
import AboutUs from './AboutUs';
import Promo from './Promo';
import ContactUs from './ContactUs';
import Footer from '../../components/Footer';

export default function HomePage() {
  const homeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <>
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
    </>
  );
}
