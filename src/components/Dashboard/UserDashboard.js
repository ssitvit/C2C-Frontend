import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import TestStarter from "../Test/TestStarter";
import Exam from "../Test/Exam/Exam";
import { useNavigate } from "react-router-dom";
function UserDashboard() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!document.cookie){
      navigate('/login');
    }
  })
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<TestStarter />} />
        <Route exact path="exam/:id" element={<Exam />} />
      </Routes>
    </div>
  );
}

export default UserDashboard;
