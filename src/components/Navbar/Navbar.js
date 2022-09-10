import { Box } from "@mui/system";
import React from "react";
import Logo from "../Icons/Logo";
import NavLinks from "./NavLinks";

function Navbar() {
  return (
    <Box
      sx={{
        padding: "1rem",
        // backgroundColor: "#ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Logo />
      <NavLinks/>
    </Box>
  );
}

export default Navbar;
