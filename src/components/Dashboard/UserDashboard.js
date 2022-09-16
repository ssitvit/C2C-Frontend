import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import TestStarter from "../Test/TestStarter";
import Exam from "../Test/Exam/Exam";
import { useNavigate } from "react-router-dom";
function UserDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const getDetails = async () => {
      let url = "https://c2c-backend.vercel.app/user/checkauth";
      let response = await fetch(url,{
        method:"GET",
        
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Credentials':'true',
        }
      });
      let data = await response.json();
      if (!data.success) {
        navigate('/login');
      }
    };
    try{getDetails()}catch(err){console.log(err)}
  });
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
