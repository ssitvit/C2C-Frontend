import { Box, Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

function NavLinks() {  
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <NavLink to="/" style={{textDecoration: "none"}}>
        <Button variant="contained">
          Home
        </Button>
      </NavLink>
      <NavLink to="contact" style={{textDecoration: "none"}}>
        <Button variant="contained">Contact</Button>
      </NavLink>
    </Box>
  );
}

export default NavLinks;
