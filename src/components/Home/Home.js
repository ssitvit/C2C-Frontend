import { Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Form from "../Forms/Form";
import Logo from "../Icons/Logo";
import Illustration from "./Illustration";
import KeyboardDoubleArrowDownTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowDownTwoTone";
function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  useEffect(() => {
    if (document.cookie) {
      navigate("/dashboard/user");
    }
  });
  return (
    <Stack
      direction={matches ? "row" : "column"}
      spacing={2}
      minHeight="100vh"
      alignItems="center"
      justifyContent="space-around"
    >
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        height={matches ? "" : "100vh"}
      >
        <Logo width={220} height={101} />
        <Illustration />
        {matches && <KeyboardDoubleArrowDownTwoToneIcon color="white" />}
      </Stack>
      <Form />
      <Outlet />
    </Stack>
  );
}

export default Home;
