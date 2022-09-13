import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
function UserDashboard() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!document.cookie){
      navigate('/login');
    }
  })
  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard