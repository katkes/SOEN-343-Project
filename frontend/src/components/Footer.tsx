import { PhoneIcon } from '@heroicons/react/24/outline';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router';
import { FrontEndRoutes } from '../pages/routes';
import Logo3 from '../assets/logo3.png';

export default function Footer() {
  return (
    <footer className="bg-[#D9ECFB] text-[#273266] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="col-span-1 sm:col-span-2">
          <div className="mb-4">
            <Link to={FrontEndRoutes.Home}>
              <img src={Logo3} alt="Eventful Logo" className="h-9" />
            </Link>
          </div>
          <p className="text-sm text-[#44516F] mb-4">
            For further business and inquiries, feel free to contact us. We are always here to help!
          </p>
          <div className="flex items-center gap-2 text-sm text-[#44516F]">
            <PhoneIcon className="w-5 h-5 text-[#4B5FFA]" />
            <span>(514) 848-2424</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-[#44516F]">
            <li>SaaS Development</li>
            <li>Our Products</li>
            <li>User Strategy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-[#44516F]">
            <li>About Eventful.io</li>
            <li>Contact & Support</li>
            <li>Success History</li>
            <li>Settings & Privacy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-[#44516F]">
            <li>Premium Support</li>
            <li>Our Services</li>
            <li>Know Our Team</li>
            <li>Download App</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center border-t border-[#bcd5e8] pt-6">
        <div className="text-sm text-[#44516F] mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} MegaSoft Inc.
        </div>
        <div className="flex space-x-4">
          <a href="#">
            <FaFacebookF className="w-4 h-4 text-[#273266] hover:text-[#4B5FFA]" />
          </a>
          <a href="#">
            <FaTwitter className="w-4 h-4 text-[#273266] hover:text-[#4B5FFA]" />
          </a>
          <a href="#">
            <FaYoutube className="w-4 h-4 text-[#273266] hover:text-[#4B5FFA]" />
          </a>
          <a href="#">
            <FaLinkedinIn className="w-4 h-4 text-[#273266] hover:text-[#4B5FFA]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
