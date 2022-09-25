import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Rounds() {
  return (
    <Stack spacing={4}>
      <Typography variant="h1" color="white" width="100%" textAlign="center" fontFamily="Audiowide">Admin Dashboard</Typography>
      <Stack direction="row" spacing={4} alignItems="center" justifyContent="center">
        <Link to="round/1" style={{textDecoration:"none"}}><Button variant="contained">ROUND 1</Button></Link>
        <Link to="round/2" style={{textDecoration:"none"}}><Button variant="contained">ROUND 2</Button></Link>
        <Link to="round/3" style={{textDecoration:"none"}}><Button variant="contained">ROUND 3</Button></Link>
      </Stack>
      <Outlet/>
    </Stack>
  )
}

export default Rounds