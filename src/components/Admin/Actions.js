import { Button, Stack } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Actions() {
  return (<>

    <Stack direction="row" spacing={4} alignItems="center" justifyContent="center" margin="2rem">
          <Link to="submitAttendance" style={{textDecoration:"none"}}><Button variant="contained" color="error">SUBMIT ATTENDANCE</Button></Link>
          <Link to="evaluate" style={{textDecoration:"none"}}><Button variant="contained" color="error">EVALUATE</Button></Link>
    </Stack>
    <Outlet/>
    </>
  )
}

export default Actions