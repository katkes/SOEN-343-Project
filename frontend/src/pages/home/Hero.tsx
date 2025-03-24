import heroShape from '../../assets/hero-shape.svg';
import CustomButton from '../../components/CustomButton';
import { Link } from 'react-router';
import { FrontEndRoutes } from '../routes';

interface HeroProps {
  servicesRef: React.RefObject<HTMLDivElement | null>;
}

export default function Hero({ servicesRef }: HeroProps) {
  const scrollToServices = () => {
    servicesRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero relative">
      <div className="flex flex-col justify-center items-center mt-52 text-center">
        <div className="text-6xl font-bold text-[#273266]">
          Effortless Events,<span className=" block">Maximum Engagement</span>
        </div>
        <div className="w-8/12 font-bold text-[#273266] my-6 description">
          Plan, manage, and optimize events with ease—powerful tools for seamless organization and
          interactive experiences.
        </div>
      </div>

      <div className="join flex gap-2 z-20">
        <Link to={FrontEndRoutes.SignUp} className="text-[#273266] font-bold">
          <CustomButton hoverColor="hover:bg-[#3b4edb]">Get Started</CustomButton>
        </Link>
        <button onClick={scrollToServices}>
          <CustomButton bgColor="bg-gray-200" textColor="text-[#1E2A78] hover:bg-gray-300">
            Learn More
          </CustomButton>
        </button>
      </div>
      <img src={heroShape} alt="Hero Shape" className="z-0 absolute bottom-0 inset-x-0 mx-auto" />
    </div>
  );
}
