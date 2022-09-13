import { Stack, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Form from '../Forms/Form';
import Illustration1 from '../Icons/Illustration1';

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  useEffect(()=>{
    if(document.cookie){
      navigate('/dashboard/user');
    }
  })
  return (
    <Stack direction="row" spacing={2} minHeight="85vh" alignItems="center" justifyContent="center" >
      {matches&&<Illustration1/>}
      <Form/>
      <Outlet/>
    </Stack>
  )
}

export default Home