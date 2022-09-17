import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import TestStarter from "../Test/TestStarter";
import Exam from "../Test/Exam/Exam";
import { useFetch } from "../Hooks/useFetch";
import { Skeleton } from "@mui/material";
function UserDashboard() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch(
    "https://c2c-backend.vercel.app/user/checkauth"
  );
  useEffect(()=>{
    if(error){
      navigate('/login');
    }
  })
  return (<>
      <Navbar />
      <div>
      <Routes>
        <Route exact path="/" element={<TestStarter />} />
        <Route exact path="exam/:id" element={<Exam />} />
      </Routes>
    </div>
    </>
  );
}

export default UserDashboard;
