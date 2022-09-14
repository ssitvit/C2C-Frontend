import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
// import {useNavigate} from 'react-router-dom';
function UserDashboard() {
  // const navigate = useNavigate();
  useEffect(()=>{
    // check if user exists
    // if(!document.cookie){
    //   navigate('/login');
    // }
    console.log("login successful");
  })
  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default UserDashboard