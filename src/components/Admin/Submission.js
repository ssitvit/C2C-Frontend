import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ReactCodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";
import { color } from "@uiw/codemirror-extensions-color";
import { githubDark } from "@uiw/codemirror-theme-github";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

function Submission({
  user,
  index,
  round,
  threshold,
  setQualified,
  qualified,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height:'80vh',
    bgcolor: "rgb(0,0,0,0.6)",
    color: "white",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "2rem",
    p: 4,
    overflowY: "scroll"
  };
  const [initialScore, setInitialScore] = useState(0);
  const [name,setName] = useState('');
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  const handleSubmit = async (userDetails, round) => {
    setLoading(true);
    let url = `https://${process.env.REACT_APP_BASE_URL}/admin/score`;
    let response = await fetch(url, {
      method: "POST",
      credentials: "include",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userDetails: userDetails,
        round: parseInt(round) === 1 ? parseInt(round) : parseInt(round),
        score: parseInt(score),
      }),
    });
    let data = await response.json();
    if (data.success) {
      setLoading(false);
      setMessage(data.data.data);
      setOpen(true);
      setInitialScore(score);
    } else {
      setLoading(false);
      setErrorMessage("Something went wrong. Please try again later.");
      setOpen(true);
    }
  };
  useEffect(() => {
    let url = `https://${process.env.REACT_APP_BASE_URL}/admin/user/getUserDetails`;
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userDetails: user.userDetails }),
    })
      .then((response) => response.json())
      .then((data) => {
        setInitialScore(data.data.data[`round${parseInt(round)}Score`]);
        setName(data.data.data["first_name"]+data.data.data["last_name"]);
      });
        
  }, [round, user.userDetails, threshold]);
  return (
    <Stack
      sx={{
        background: "rgb(255,255,255,0.6)",
        padding: "1.2rem",
        margin: "2rem",
        borderRadius: "0.5rem",
        "&:hover": { boxShadow: "5px 5px 4px 0 #250101" },
      }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      key={user._id}
      spacing={2}
    >
      <Typography sx={{ fontFamily: "Audiowide" }}>{index + 1}.</Typography>
      <Typography sx={{ fontFamily: "Audiowide",width:'100%' }}>
        {name}
      </Typography>
      <Typography sx={{ fontFamily: "Audiowide",width:'100%' }}>
        {new Date(user.time).toDateString()}
      </Typography>
      <Typography sx={{ fontFamily: "Audiowide",width:"100%" }}>
        Round Score: {initialScore}
      </Typography>
      <Button
        sx={{ fontFamily: "Audiowide",width:'100%' }}
        variant="contained"
        onClick={handleOpen2}
      >
        View Submission
      </Button>
      <TextField
        value={score}
        onChange={(e) => {
          setScore(e.target.value);
        }}
        label="Score out of 100"
      />
      {/* <TextField  label="Remarks"/> */}
      <Button
        sx={{ fontFamily: "Audiowide",width:'100%' }}
        variant="contained"
        color="error"
        onClick={() => {
          handleSubmit(user.userDetails, round);
        }}
      >
        {!loading && "Submit Score"}
        {loading && (
          <>
            <CircularProgress thickness={6} color="inherit" size="1.2rem" />
            <Typography variant="subtitle2" style={{ marginLeft: "0.5rem" }}>
              Saving Score...
            </Typography>
          </>
        )}
      </Button>
      <Typography
        sx={{
          fontFamily: "Audiowide",
          color: "white",
          background: "black",
          padding: "0.5rem",
          borderRadius: "1rem",
          width:'100%',
          textAlign: "center", 
        }}
      >
        {initialScore >= parseInt(threshold)
          ? "Qualified"
          : "Not Qualified"}
      </Typography>
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
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "2rem" }}
          >
            User Response Looks Like ...
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={4}
            marginBottom="2rem"
          >
            <TextField
              value={score}
              onChange={(e) => {
                setScore(e.target.value);
              }}
              label="Update Score out of 100"
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              autoFocus
              sx={{ input: { color: "white", outline: "white" } }}
            />
            <Button
              sx={{ fontFamily: "Audiowide" }}
              variant="contained"
              color="error"
              onClick={() => {
                handleSubmit(user.userDetails, round);
              }}
            >
              {!loading && "Submit Score"}
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
                    Saving Score...
                  </Typography>
                </>
              )}
            </Button>
          </Stack>
          <Box height="fit-content" width="100%">
            <Box>
              <Typography variant="body">HTML</Typography>
              <ReactCodeMirror
                className="outline"
                value={user.html}
                height="100%"
                width="100%"
                extensions={[html({ jsx: true }), color]}
                placeholder="html"
                theme={githubDark}
              />
            </Box>
            <Box>
              <Typography variant="body">CSS</Typography>
              <ReactCodeMirror
                className="outline"
                value={user.css}
                height="100%"
                width="100%"
                extensions={[css({ jsx: true }), color]}
                placeholder="css"
                theme={githubDark}
              />
            </Box>
            <Box>
              <Typography variant="body">OUTPUT</Typography>
              <iframe
                title="userresponse"
                srcDoc={`<html><head><style>${user.css}</style></head>${user.html}</html>`}
                sandbox="allow-scripts"
                height="500px"
                width="100%"
              ></iframe>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Stack>
  );
}

export default Submission;
