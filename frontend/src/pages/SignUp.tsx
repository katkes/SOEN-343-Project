import { Main } from '../layouts/Main';
import { useNavigate } from 'react-router';
import { FrontEndRoutes } from './routes';
import loginPNG from '../assets/signup.png';
import NavBar from '../components/NavBar';
import CustomButton from '../components/CustomButton';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Main>
      <div className="min-h-screen bg-[#EAF5FF] flex items-center justify-center px-4 relative">
        <NavBar showTabs={false} />

        <div className="flex flex-col md:flex-row items-center w-full max-w-6xl rounded-xl overflow-hidden shadow-lg p-16 bg-[#EAF5FF] form">
          <div className="w-full md:w-1/2 text-center px-6">
            <img src={loginPNG} alt="SignUp Visual" className="mx-auto w-80 h-80" />
            <h2 className="text-2xl font-bold mt-6 text-[#273266]">Get started with Eventful.io</h2>
            <p className="mt-2 text-[#637381]">
              Create an account that fits your purpose and unlock seamless event experiences.
            </p>
            <p className="mt-6 text-[#637381]">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 font-medium hover:underline">
                Login here!
              </a>
            </p>
          </div>

          <div className="w-full md:w-1/2 bg-white p-10 rounded-2xl shadow-md">
            <h2 className="text-3xl font-semibold text-center mb-6 text-[#273266]">
              Choose Account Type
            </h2>

            <div className="space-y-6">
              <CustomButton
                width="w-full"
                hoverColor="hover:bg-[#3b4edb]"
                onClick={() => navigate(FrontEndRoutes.CompanySignUp)}
              >
                I want to create a Company account
              </CustomButton>

              <CustomButton
                width="w-full"
                bgColor="bg-gray-200"
                textColor="text-[#1E2A78]"
                hoverColor="hover:bg-gray-300"
                onClick={() => navigate(FrontEndRoutes.AttendeeSignUp)}
              >
                I want to join as an Attendee
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
