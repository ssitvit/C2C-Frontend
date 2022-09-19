import { Route, Routes } from "react-router-dom";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
// import Navbar from "./components/Navbar/Navbar";
// import NotFound from "./components/Notfound/NotFound";
import UserDashboard from "./components/Dashboard/UserDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import CoodDashboard from "./components/Dashboard/CoodDashboard";
import { Box } from "@mui/material";
import Verify from "./components/Verification/Verify";
import { CookiesProvider } from "react-cookie";
function App() {
  return (
    <CookiesProvider>
      <Box minHeight="100vh" sx={{ background: "black" }}>
        <Routes>
          <Route exact path="/*" element={<Home />} />
          <Route exact path="/dashboard/user/*" element={<UserDashboard />} />
          <Route exact path="/dashboard/admin" element={<AdminDashboard />} />
          <Route exact path="/dashboard/cood" element={<CoodDashboard />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/user/verify/:id/:token" element={<Verify />} />
          <Route exact path="*" element={<Verify />} />
        </Routes>
      </Box>
    </CookiesProvider>
  );
}

export default App;
