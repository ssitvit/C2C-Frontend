import { Box } from "@mui/system";
import React from "react";
import Logo from "../Icons/Logo";
import NavLinks from "./NavLinks";

function Navbar() {
  return (
    <Box
    component="nav"
      sx={{
        padding: "0.5rem",
        // backgroundColor: "#ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position:"sticky",
        top:"0",
        backgroundColor: "#ddd",
        zIndex:99
      }}
    >
      <Logo />
      <NavLinks/>
    </Box>
  );
}

export default Navbar;
