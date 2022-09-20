import {
  Stack,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Form from "../Forms/Form";
import Gravitas from "../Forms/Gravitas";
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
    `https://${process.env.REACT_APP_BASE_URL}/user/checkauth`
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
          justifyContent="space-between"
        >
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            height={matches ? "" : "100vh"}
            width="50%"
          >
            <Logo width={220} height={95} />
            <Illustration />
          <Gravitas/>
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
          justifyContent="center"
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
                  <Logo width={215} height={95} />
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
                    <Gravitas/>
                </Stack>
              }
            />
            <Route exact path="/form/login" element={<Login/>}/>
            <Route exact path="admin/login" element={<Login admin={true} />} />
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/form/register" element={<Register/>}/>
            <Route exact path="/register" element={<Register/>}/>
          </Routes>
        </Stack>
      )}
      <Outlet />
    </>
  );
}

export default Home;
