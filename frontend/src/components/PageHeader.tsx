import CustomButton from '../components/CustomButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { FrontEndRoutes } from '../pages/routes';

interface PageHeaderProps {
  pageName: string;
}

const PageHeader = ({ pageName }: PageHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define sidebar accessible routes
  const sidebarRoutes = [
    FrontEndRoutes.Dashboard,
    FrontEndRoutes.Events,
    FrontEndRoutes.Schedule,
    FrontEndRoutes.Community,
    FrontEndRoutes.Analytics,
    FrontEndRoutes.Messages,
    FrontEndRoutes.Notifications,
    FrontEndRoutes.Support,
    FrontEndRoutes.Profile,
  ];

  const showBackButton = !sidebarRoutes.some((route) => location.pathname.startsWith(route));

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-5">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <CustomButton
              onClick={() => navigate(-1)}
              disableDefaults
              className="bg-white px-2 py-1 rounded-full text-[#273266] font-bold shadow"
            >
              ◀
            </CustomButton>
          )}
          <p className="text-2xl font-bold text-[#273266] bg-white px-4 py-2 rounded-full shadow">
            {pageName}
          </p>
        </div>
      </div>
      <div className="bg-[#273266] text-white py-2 px-4 rounded-xl font-medium text-sm">
        {currentDate}
      </div>
    </div>
  );
};

export { PageHeader };
