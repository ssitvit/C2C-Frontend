import { Link } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  return (
    <div>
    <Link component="button" style={{cursor: "pointer",width:"fit-content"}} onClick={()=>{navigate('/register')}} underline="always">
        Create a new Account
      </Link>
      </div>
  )
}

export default Login