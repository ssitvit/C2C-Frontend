import { Route, Routes } from "react-router-dom";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/Notfound/NotFound";
import UserDashboard from "./components/Dashboard/UserDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import CoodDashboard from "./components/Dashboard/CoodDashboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/*" element={<Home />}/>
        <Route exact path="dashboard/user" element={<UserDashboard />} />
        <Route exact path="dashboard/admin" element={<AdminDashboard />} />
        <Route exact path="dashboard/cood" element={<CoodDashboard />} />
        <Route exact path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
