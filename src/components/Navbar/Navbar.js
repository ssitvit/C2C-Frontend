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
        justifyContent: "space-between",
        backgroundColor: "transparent",
        zIndex: 9999,
        paddingLeft: "2rem",
        paddingRight: "2rem",
      }}
    >
      <Logo width={120} height={91}/>
      {matches && <NavLinks />}
      <Profile />
    </Box>
  );
}

export default Navbar;
