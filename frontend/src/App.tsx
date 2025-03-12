import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)

export default App;