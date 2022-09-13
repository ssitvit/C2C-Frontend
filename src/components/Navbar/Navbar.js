import { Box } from "@mui/system";
import React from "react";
import Logo from "../Icons/Logo";
import NavLinks from "./NavLinks";
import Profile from './Profile';
import {useMediaQuery,
useTheme,
} from "@mui/material";
function Navbar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Box
      component="nav"
      sx={{
        padding: "0.5rem",
        // backgroundColor: "#ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: matches?"space-between":"center",
        position: "sticky",
        top: "0",
        backgroundColor: "transparent",
        zIndex: 99,
        paddingLeft: "2rem",
        paddingRight: "2rem",
      }}
    >
      <Logo />
      {matches && <NavLinks />}
      {document.cookie && <Profile />}
    </Box>
  );
}

export default Navbar;
