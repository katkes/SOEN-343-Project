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
import { Community } from './pages/Community';
import { Analytics } from './pages/Analytics';
import { Messages } from './pages/Messages';
import { Notifications } from './pages/Notifications';
import { Support } from './pages/Support';
import { Profile } from './pages/Profile';
import { EventDetails } from './pages/EventDetails';
import { EventRegistration } from './pages/EventRegistration';
import { EventStreaming } from './pages/EventStreaming';
import { Discussion} from './pages/Discussion';

import './App.css';
import { ChatRoom } from './pages/ChatRoom';


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
      <Route path={FrontEndRoutes.Events} element={<Events />} />
      <Route path={FrontEndRoutes.EventDetails} element={<EventDetails />} />
      <Route path={FrontEndRoutes.Schedule} element={<Schedule />} />
      <Route path={FrontEndRoutes.Community} element={<Community />} />
      <Route path={FrontEndRoutes.Analytics} element={<Analytics />} />
      <Route path={FrontEndRoutes.Messages} element={<Messages />} />
      <Route path={FrontEndRoutes.Notifications} element={<Notifications />} />
      <Route path={FrontEndRoutes.Support} element={<Support />} />
      <Route path={FrontEndRoutes.Profile} element={<Profile />} />
      <Route path={FrontEndRoutes.EventRegistration} element={<EventRegistration />} />
      <Route path={FrontEndRoutes.EventStreaming} element={<EventStreaming />} />
      <Route path={FrontEndRoutes.Discussion} element={<Discussion />} />
      <Route path={"/message"} element={<ChatRoom />} />
    </Routes>
  </BrowserRouter>
);

export default App;
