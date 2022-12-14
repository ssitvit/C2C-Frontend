import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";

document.onkeydown = function(e) {
  if(e.keyCode === 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
     return false;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
    <Box backgroundColor="#C00000">
      <App />
    </Box>
    </BrowserRouter>
);
reportWebVitals();
