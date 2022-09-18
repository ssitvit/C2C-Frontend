import { Fade, Link, Typography } from '@mui/material'
import React from 'react'
import './style.css'
function Gravitas() {
  return (
    <div style={{color: 'white', display: 'flex',alignItems: 'center',justifyContent: 'center',flexDirection:"column"}}>
        <Typography>
        Do not forget to register on 
        </Typography>
        <Link className="gravitas-img" href="https://gravitas.vit.ac.in/">
        <img  src="Gravitas2.jpeg" alt="" height="100vh"/>
        </Link>
    </div>
  )
}
export default Gravitas