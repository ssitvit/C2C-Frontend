import { Stack,Button, useMediaQuery, useTheme, Skeleton } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Form from "../Forms/Form";
import Logo from "../Icons/Logo";
import { useFetch } from "../Hooks/useFetch";
import Illustration from "./Illustration";

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const {data, isLoading, error} = useFetch('https://c2c-backend.vercel.app/user/checkauth');
  useEffect(() => {
    if(data.success){
      navigate('/dashboard/user');
    }else if(error){
      console.log(error);
    }
  });
  return (
    <>
    {isLoading && <Skeleton/>}
    {!isLoading &&
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
          {!matches && <Stack direction="row" alignItems="center" spacing={2}>
            <Button onClick={()=>{navigate("/login")}}variant="contained" color="error">Login</Button>
            <Button onClick={()=>{navigate("/register")}}variant="contained" color="error">Register</Button>
          </Stack>}
        </Stack>
        <Form />
      </Stack>
      }<Outlet />
    </>
  );
}

export default Home;
