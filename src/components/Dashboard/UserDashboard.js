import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
function UserDashboard() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!sessionStorage.getItem('token')){
      navigate('/');
    }
  })
  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard