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
        justifyContent: "center",
        backgroundColor: "transparent",
        zIndex: 9999,
        paddingLeft: "2rem",
        paddingRight: "2rem",
      }}
    >
      {document.cookie &&<Logo width={120} height={91}/>}
      {matches && !document.cookie && <NavLinks />}
      {document.cookie && <Profile />}
    </Box>
  );
}

export default Navbar;
