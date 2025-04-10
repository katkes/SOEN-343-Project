import { Routes, Route, BrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { FrontEndRoutes } from './pages/routes';
import { Dashboard } from './pages/Dashboard';
import { SignUp } from './pages/SignUp';
import { CompanySignUp } from './pages/CompanySignUp';
import { AttendeeSignUp } from './pages/AttendeeSignUp';
import { CreateCompanyUser } from './pages/CreateCompanyUser';
import { Events } from './pages/Events';
import { Schedule } from './pages/Schedule';
import { Analytics } from './pages/Analytics';
import { Profile } from './pages/Profile';
import { EventDetails } from './pages/EventDetails';
import { EventRegistration } from './pages/EventRegistration';
import { EventStreaming } from './pages/EventStreaming';
import { EventConfirmation } from './pages/EventConfirmation';
import { EditProfile } from './pages/EditProfile';

import './App.css';
import { ChatRoom } from './pages/ChatRoom';
import { SponsorSignUp } from './pages/SponsorSignUp';
import { EventOrganizerSignUp } from './pages/EventOrganizerSignUp';


const App = () => {

  return <BrowserRouter>
    <Routes>
      <Route path={FrontEndRoutes.Home} element={<Home />} />
      <Route path={FrontEndRoutes.Login} element={<Login />} />
      <Route path={FrontEndRoutes.SignUp} element={<SignUp />} />
      <Route path={FrontEndRoutes.SponsorSignUp} element={<SponsorSignUp />} />
      <Route path={FrontEndRoutes.EventOrganizerSignUp} element={<EventOrganizerSignUp />} />
      <Route path={FrontEndRoutes.CompanySignUp} element={<CompanySignUp />} />
      <Route path={FrontEndRoutes.AttendeeSignUp} element={<AttendeeSignUp />} />
      <Route path={FrontEndRoutes.CreateCompanyUser} element={<CreateCompanyUser />} />
      <Route path={FrontEndRoutes.Dashboard} element={<Dashboard />} />
      <Route path={FrontEndRoutes.Events} element={<Events />} />
      <Route path={FrontEndRoutes.EventDetails} element={<EventDetails />} />
      <Route path={FrontEndRoutes.Schedule} element={<Schedule />} />
      <Route path={FrontEndRoutes.Analytics} element={<Analytics />} />
      <Route path={FrontEndRoutes.Profile} element={<Profile />} />
      <Route path={FrontEndRoutes.EventRegistration} element={<EventRegistration />} />
      <Route path={FrontEndRoutes.EventStreaming} element={<EventStreaming />} />
      <Route path={"/message"} element={<ChatRoom />} />
      <Route path={FrontEndRoutes.EventConfirmation} element={<EventConfirmation />} />
      <Route path={FrontEndRoutes.EditProfile} element={<EditProfile />} />
    </Routes>
  </BrowserRouter>
};

export default App;
