import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import TestStarter from "../Test/TestStarter";
import Exam from "../Test/Exam/Exam";
import { useFetch } from "../Hooks/useFetch";
function UserDashboard() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch(
    `https://${process.env.REACT_APP_BASE_URL}/user/checkauth`);
  useEffect(()=>{
    if(data && error){
      navigate('/login');
    }
  })

  return (
    <>

    {!isLoading && 
    <>
    <Navbar />
      <div>
      <Routes>
      <Route index element = {<TestStarter/>}/>
        <Route exact path="exam/:id" element={<Exam />} />
      </Routes>
    </div>
    </>}
    </>
  );
}

export default UserDashboard;
