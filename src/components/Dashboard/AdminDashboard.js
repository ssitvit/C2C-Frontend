import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!sessionStorage.getItem('token')){
      navigate('/');
    }
  })
  
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard