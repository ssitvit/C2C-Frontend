import { Stack, Typography } from "@mui/material";
import React from "react";

function NotFound() {
  return (
    <div>
      <Stack alignItems="center" justifyContent="center" spacing={8}>
        <Typography sx={{
        color: "white",
        padding: "1.5rem",
        backgroundColor: "black",
        fontFamily: "Audiowide",
        fontSize: "4rem",
        borderRadius: "2rem"}}>Register Now!!</Typography>
        <img src="/qrcode.jpeg" alt="" height="300vh" width="300vw" />
      </Stack>
    </div>
  );
}

export default NotFound;
