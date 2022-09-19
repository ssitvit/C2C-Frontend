import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../Hooks/useFetch";
import Editor from "./Editor";

function Exam(props) {
  const params = useParams();
  const round = params.id;
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
  const cssTemplate = `body{
    height:90vh;
    display:flex;
    align-items:center;
    justify-content:center
  }`;
  const [htmlObj, setHtmlObj] = useState(
    sessionStorage.getItem("html")
      ? sessionStorage.getItem("html")
      : htmlTemplate
  );
  const [cssObj, setCssObj] = useState(
    sessionStorage.getItem("css") ? sessionStorage.getItem("css") : cssTemplate
  );
  const [userObj, setUserObj] = useState("Hi everyone");

  const { data, isLoading, error } = useFetch(
    "https://c2c-backend.vercel.app/save/check",
    "POST",
    JSON.stringify({ round: round })
  );

  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    setErrorMessage("");
    let url = "https://c2c-backend.vercel.app/save/submit";
    let response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({
        html: htmlObj,
        css: cssObj,
        round: round,
      }),
    });
    let data = await response.json();
    if (data.success) {
      setOpen(true);
      setMessage("Code Submitted Successfully");
      setLoading(false);
    } else {
      setOpen(true);
      setErrorMessage(data.data.error);
      setLoading(false);
      console.log(data);
    }
  };
  useEffect(() => {
    console.log(data);
    setErrorMessage("");
    setMessage("");
    if (error) {
      setErrorMessage(error);
      setOpen(true);
      setTimeout(() => {
        navigate("/dashboard/user");
      }, 2000);
    }
    const finalObj = `<html><head><style>${cssObj}</style></head><body>${htmlObj}</body>`;
    setUserObj(finalObj);
  }, [htmlObj, cssObj, data, error, navigate]);
  return (
    <>
      {(isLoading || error) && (
        <Stack>
          <Stack direction="row" spacing={2}>
            <Skeleton animation="wave" height="50vh" width="50%" />
            <Skeleton animation="wave" height="50vh" width="50%" />
          </Stack>

          <Skeleton animation="wave" height="30vh" />
        </Stack>
      )}
      {!isLoading && !error && (
        <Stack direction="column" alignItems="center" spacing={2}>
          <Stack width="100%">
            <Box
              sx={{
                color: "white",
                textAlign: "right",
                marginLeft: "2rem",
                marginRight: "2rem",
              }}
            >
              <Typography>Timer</Typography>
            </Box>
            <Stack
              direction={matches ? "row" : "column"}
              alignItems="center"
              justifyContent="center"
              // width="100%"
              sx={{marginLeft:"2rem",marginRight:"2rem",marginBottom:"2rem"}}
            >
              <Editor type="html" obj={htmlObj} setObj={setHtmlObj} />
              <Editor type="css" obj={cssObj} setObj={setCssObj} />
            </Stack>
            <Stack
              direction={matches ? "row" : "column"}
              alignItems="center"
              justifyContent="center"
              spacing={8}
              sx={{marginLeft:"2rem",marginRight:"2rem"}}
            >

              {/* Question */}
              <Stack
                style={{
                  width: "100%",
                  border: "none",
                }}
              >
                <Typography variant="h4" sx={{ color: "white",fontFamily:"Audiowide" }}>
                  Question
                </Typography>
                <Box
                  style={{
                    width: "100%",
                    color: "white",
                    backgroundColor: "white",
                    height: "500px",
                  }}
                ></Box>
              </Stack>
              {/* USER RESPONSE */}
              <Stack
                style={{
                  width: "100%",
                  border: "none",
                }}
              >
                <Typography variant="h4" sx={{ color: "white",fontFamily:"Audiowide" }}>
                  Your Output
                </Typography>
                <iframe
                  sandbox="allow-scripts"
                  style={{
                    width: "100%",
                    border: "none",
                    height: "500px",
                    color: "white",
                    background: "white",
                    // margin: "2rem",
                  }}
                  srcDoc={userObj}
                  title="userResponse"
                />
              </Stack>
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
              <Button variant="contained" color="error" onClick={handleSubmit}>
                {!loading && "Submit"}
                {loading && (
                  <>
                    <CircularProgress
                      thickness={6}
                      color="inherit"
                      size="1.2rem"
                    />
                    <Typography
                      variant="subtitle2"
                      style={{ marginLeft: "0.5rem" }}
                    >
                      Submitting Code...
                    </Typography>
                  </>
                )}
              </Button>
              <Button variant="contained" color="error">
                Next
              </Button>
            </Stack>
          </Stack>
        </Stack>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        key="bottom center"
      >
        <Alert
          onClose={handleClose}
          severity={errorMessage ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {errorMessage ? errorMessage : message}
        </Alert>
      </Snackbar>
    </>
  );
}
export default Exam;
