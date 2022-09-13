import { Stack } from "@mui/material";
import React from "react";
import {Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
function Form() {
  return (
    <Stack spacing={2}  justifyContent="center" alignItems="center">
        {/* setting routes for switching between the forms */}
      <Routes>
        <Route index element={<Register />}/>
        <Route exact path="register" element={<Register />} />
        <Route exact path="login" element={<Login />} />
      </Routes>      
    </Stack>
  );
}

export default Form;
