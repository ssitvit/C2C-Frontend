import { Stack } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Form from '../Forms/Form';
import Illustration1 from '../Icons/Illustration1';

function Home() {
  return (
    <Stack direction="row" spacing={2} minHeight="80vh" alignItems="center" justifyContent="center">
      <Illustration1/>
      <Form/>
      <Outlet/>
    </Stack>
  )
}

export default Home