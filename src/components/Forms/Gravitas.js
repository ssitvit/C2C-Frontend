import { Link, Typography } from '@mui/material'
import React from 'react'
import './style.css'
function Gravitas() {
  return (
    <div style={{color: 'white', display: 'flex',alignItems: 'center',justifyContent: 'center',flexDirection:"column"}}>
        <Typography sx={{fontFamily: "Audiowide"}}>
        Do not forget to register on 
        </Typography>
        <Link className="gravitas-img" href="https://gravitas.vit.ac.in/">
        <img  src="/gravitas.jpeg" alt="" height="100vh"/>
        </Link>
    </div>
  )
}
export default Gravitas