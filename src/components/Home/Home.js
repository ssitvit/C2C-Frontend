import {
  Stack,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Form from "../Forms/Form";
import Login from "../Forms/Login";
import Register from "../Forms/Register";
import { useFetch } from "../Hooks/useFetch";
import Logo from "../Icons/Logo";
import Illustration from "./Illustration";

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { data, error } = useFetch(
    "https://c2c-backend.vercel.app/user/checkauth"
  );
  useEffect(() => {
    if (data && !error) {
      navigate("/dashboard/user");
    }
  });
  return (
    <>
      {matches && (
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
          </Stack>
          <Form />
        </Stack>
      )}
      {!matches && (
        <Stack
          direction={matches ? "row" : "column"}
          spacing={2}
          minHeight="100vh"
          alignItems="center"
          justifyContent="space-around"
        >
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Stack
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  height={matches ? "" : "100vh"}
                >
                  <Logo width={220} height={101} />
                  <Illustration />
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button
                      onClick={() => {
                        navigate("/form/login");
                      }}
                      variant="contained"
                      color="error"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/form/register");
                      }}
                      variant="contained"
                      color="error"
                    >
                      Register
                    </Button>
                  </Stack>
                </Stack>
              }
            />
            <Route exact path="/form/login" element={<Login/>}/>
            <Route exact path="/form/register" element={<Register/>}/>
          </Routes>
        </Stack>
      )}
      <Outlet />
    </>
  );
}

export default Home;
