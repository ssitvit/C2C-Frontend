import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Rounds() {
  return (
    <Stack spacing={4} alignItems="center" justifyContent="center" hewight="100%">
      <Typography variant="h3" margin="1rem" color="white" width="100%" textAlign="center" fontFamily="Audiowide">Admin Dashboard</Typography>
      <Stack direction="row" spacing={4} alignItems="center" justifyContent="center">
        <Link to="round/10" style={{textDecoration:"none"}}><Button variant="contained">ROUND 1_0</Button></Link>
        <Link to="round/11" style={{textDecoration:"none"}}><Button variant="contained">ROUND 1_1</Button></Link>
        <Link to="round/2" style={{textDecoration:"none"}}><Button variant="contained">ROUND 2</Button></Link>
        <Link to="round/3" style={{textDecoration:"none"}}><Button variant="contained">ROUND 3</Button></Link>
      </Stack>
      <Outlet/>
    </Stack>
  )
}

export default Rounds