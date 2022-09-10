import { Button, Stack } from "@mui/material";
import React from "react";
import {Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import {useNavigate} from "react-router-dom";
function Form() {
    const navigate = useNavigate();
  return (
    <Stack spacing={4} minWidth="50vw">
        {/* setting routes for switching between the forms */}
      <Routes>
        <Route index element={<Login />}/>
        <Route exact path="login" element={<Login />} />
        <Route exact path="register" element={<Register />} />
      </Routes>
      {/* buttons to switch between the forms */}
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" disableRipple onClick={()=>{navigate('login')}}>Login</Button>
        <Button variant="contained" color="secondary" disableRipple onClick={()=>{navigate('register')}}>Register</Button>
      </Stack>
      
    </Stack>
  );
}

export default Form;
