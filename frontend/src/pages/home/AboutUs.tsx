import aboutUs from '../../assets/collaboration-illustration.png';
import Badge from '../../components/Badge';
import CustomButton from '../../components/CustomButton';
import { Link } from 'react-router';
import { FrontEndRoutes } from '../routes';

export default function AboutUs() {
  return (
    <div className="bg-[#F9FAFB]">
      <div className="mx-auto max-w-7xl py-8 sm:px-6 lg:px-8">
        <div className="flex flex-column">
          <div className=" lg:mt-0 lg:w-1/2">
            <img src={aboutUs} className="w-140" />
          </div>
          <div className="w-1/2 lg:pt-16">
            <div>
              <Badge label="About Us" />
              <h2 className="mt-4 text-4xl font-bold text-[#273266] sm:text-5xl">
                Why Choose Us, MegaSoft Inc.
              </h2>
            </div>
            <div className="mt-6 text-lg text-[#637381]">
              <span>
                At MegaSoft Inc, we specialize in delivering smart, scalable, and user-friendly
                digital solutions that empower organizations to manage events, foster engagement,
                and enhance user experiences.
              </span>
              <span className="block mt-2">
                Whether you're organizing educational seminars or hybrid conferences, MegaSoft is
                your trusted partner for transforming ideas into impactful results—efficiently,
                reliably, and with a focus on excellence.
              </span>
              <div className="mt-4">
                <Link to={FrontEndRoutes.SignUp}>
                  <CustomButton width="w-[150px]" hoverColor="hover:bg-[#3b4edb]">
                    Get Started
                  </CustomButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
