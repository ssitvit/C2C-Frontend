import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(()=>{
    // add admin check here too.
  })
  
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard