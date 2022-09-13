import { Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import {Route, Routes } from "react-router-dom";
import NotFound from "../Notfound/NotFound";
import Login from "./Login";
import Register from "./Register";
function Form() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Stack spacing={2}  justifyContent="center" alignItems="center" minHeight={matches?"":"100vh"}>
        {/* setting routes for switching between the forms */}
      <Routes>
        <Route exact path="/" element={<Register />}/>
          <Route exact path="register" element={<Register />} />
          <Route exact path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </Stack>
  );
}

export default Form;
