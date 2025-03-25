import { Routes, Route, BrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { FrontEndRoutes } from './pages/routes';
import { Dashboard } from './pages/Dashboard';
import { SignUp } from './pages/SignUp';
import { CompanySignUp } from './pages/CompanySignUp';
import { AttendeeSignUp } from './pages/AttendeeSignUp';
import { CreateCompanyUser } from './pages/CreateCompanyUser';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={FrontEndRoutes.Home} element={<Home />} />
      <Route path={FrontEndRoutes.Login} element={<Login />} />
      <Route path={FrontEndRoutes.SignUp} element={<SignUp />} />
      <Route path={FrontEndRoutes.CompanySignUp} element={<CompanySignUp />} />
      <Route path={FrontEndRoutes.AttendeeSignUp} element={<AttendeeSignUp />} />
      <Route path={FrontEndRoutes.CreateCompanyUser} element={<CreateCompanyUser />} />
      <Route path={FrontEndRoutes.Dashboard} element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);

export default App;
