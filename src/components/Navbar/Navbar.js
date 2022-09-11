import { Box } from "@mui/system";
import React from "react";
import Logo from "../Icons/Logo";
import NavLinks from "./NavLinks";

function Navbar() {
  return (
    <Box
      sx={{
        padding: "1.2rem",
        // backgroundColor: "#ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Logo />
      <NavLinks/>
    </Box>
  );
}

export default Navbar;
