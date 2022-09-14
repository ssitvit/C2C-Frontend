import React, { useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import TestStarter from "../Test/TestStarter";
import Editor from "../Test/Exam/Editor";
// import {useNavigate} from 'react-router-dom';
function UserDashboard() {

  // const navigate = useNavigate();
  useEffect(() => {
    // check if user exists
    // if(!document.cookie){
    //   navigate('/login');
    // }
    console.log("login successful");

    // fetching user details.
  });
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<TestStarter/>}/>
          <Route exact path="exam/:id" element={<Editor/>}/>
      </Routes>
    </div>
  );
}

export default UserDashboard;
