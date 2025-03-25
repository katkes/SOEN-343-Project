import { useNavigate } from 'react-router';
import { Main } from '../layouts/Main';
import { authService } from '../services/backend/auth';
import { FrontEndRoutes } from './routes';
import CustomButton from '../components/CustomButton';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await authService.logout();
      // logout success, navigate to login page!
      navigate(FrontEndRoutes.Login);
    } catch (e) {
      console.error('Could not logout: ', e);
    }
  };
  return (
    <Main>
      Dashboard
      <br></br>
      <CustomButton onClick={logout}>logout</CustomButton>
    </Main>
  );
};
