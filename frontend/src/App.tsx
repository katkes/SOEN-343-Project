import { Routes, Route, BrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { FrontEndRoutes } from "./pages/routes";
import { Dashboard } from "./pages/Dashboard";
import { SignUp } from "./pages/SignUp";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={FrontEndRoutes.Home} element={<Home />} />
      <Route path={FrontEndRoutes.Login} element={<Login />} />
      <Route path={FrontEndRoutes.SignUp} element={<SignUp />} />
      <Route path={FrontEndRoutes.Dashboard} element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
)

export default App;