import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import Editor from "./Editor";

function Exam() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const htmlTemplate = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <!-- Start writing your code here -->
        
    </body>
    </html>`;
  const [htmlObj, setHtmlObj] = useState(
    sessionStorage.getItem("html")
      ? sessionStorage.getItem("html")
      : htmlTemplate
  );
  const [cssObj, setCssObj] = useState(
    sessionStorage.getItem("css") ? sessionStorage.getItem("css") : null
  );
  const [userObj, setUserObj] = useState("Hi everyone");

  useEffect(() => {
    const finalObj = `<html><head><style>${cssObj}</style></head><body>${htmlObj}</body>`;
    setUserObj(finalObj);
  }, [htmlObj, cssObj]);
  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <Stack direction="column" alignItems="center" spacing={2} width="100%">
        <Box sx={{ color: "white" }}>
          <Typography>Timer</Typography>
        </Box>
        <Stack
          direction={matches ? "row" : "column"}
          alignItems="center"
          justifyContent="center"
          spacing={8}
          width="100%"
        >
          {/* Question */}
          <Box
            style={{
              width: "100%",
              border: "none",
              height: "500px",
              color: "white",
              backgroundColor: "white",
            }}
            
          ></Box>
          {/* USER RESPONSE */}
          <iframe
            sandbox="allow-scripts"
            style={{
              width: "100%",
              border: "none",
              height: "500px",
              color: "white",
              background: "white",
              margin: "2rem",
            }}
            srcDoc={userObj}
            title="userResponse"
          />
        </Stack>
        <Stack
          direction={matches ? "row" : "column"}
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <Editor type="html" obj={htmlObj} setObj={setHtmlObj} />
          <Editor type="css" obj={cssObj} setObj={setCssObj} />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ padding: "2rem" }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Button variant="contained" color="error">
            Submit
          </Button>
          <Button variant="contained" color="error">
            Next
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
export default Exam;
