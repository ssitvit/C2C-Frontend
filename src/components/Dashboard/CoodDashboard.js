import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';

function CoodDashboard() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!sessionStorage.getItem('token')){
      navigate('/');
    }
  })
  return (
    <div>CoodDashboard</div>
  )
}

export default CoodDashboard