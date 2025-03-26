import { Home, Phone, Mail } from 'lucide-react';
import Badge from '../../components/Badge';
import CustomButton from '../../components/CustomButton';

export default function ContactUs() {
  return (
    <div className="bg-[#F9FAFB] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge label="Contact Us" />
          <h2 className="mt-4 text-4xl font-bold text-[#273266] sm:text-5xl">
            Get In Touch With Us
          </h2>
          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-md bg-[#EEF1FD]">
                <Home className="w-6 h-6 text-[#4B5FFA]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#1A1F36]">Our Location</h4>
                <p className="text-[#637381]">
                  Concordia SGW Campus
                  <br /> 1455 De Maisonneuve Blvd. W. Montreal, QC H3G 1M8
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-md bg-[#EEF1FD]">
                <Phone className="w-6 h-6 text-[#4B5FFA]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#1A1F36]">Phone Number</h4>
                <p className="text-[#637381]">(514) 848-2424</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-md bg-[#EEF1FD]">
                <Mail className="w-6 h-6 text-[#4B5FFA]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#1A1F36]">Email Address</h4>
                <p className="text-[#637381]">eventful.io@mail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md text-[#273266]">
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-[#4B5FFA] focus:ring-2 focus:ring-[#4B5FFA] focus:outline-none rounded-md px-4 py-3 placeholder-gray-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#4B5FFA] focus:outline-none rounded-md px-4 py-3 placeholder-gray-400"
            />
            <input
              type="tel"
              placeholder="Your Phone"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#4B5FFA] focus:outline-none rounded-md px-4 py-3 placeholder-gray-400"
            />
            <textarea
              placeholder="Your Message"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#4B5FFA] focus:outline-none rounded-md px-4 py-3 placeholder-gray-400"
            ></textarea>
            <CustomButton width="w-full" hoverColor="hover:bg-[#3b4edb]">
              Send
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
}
