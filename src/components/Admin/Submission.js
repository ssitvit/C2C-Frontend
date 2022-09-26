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
import React, { useEffect, useState } from "react";

function Submission({ user, index, round }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "rgb(0,0,0,0.6)",
    color: "white",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "2rem",
    p: 4,
  };
  const [initialScore, setInitialScore] = useState(0);
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
        setInitialScore(
          data.data.data[`round${parseInt(round)}Score`]
        );
      });
  }, [round, user.userDetails]);
  return (
    <Stack
      sx={{
        background: "white",
        padding: "1.2rem",
        borderRadius: "1rem",
        boxShadow: "10px 10px 4px 0 #250101",
        "&:hover": { boxShadow: "5px 5px 4px 0 #250101" },
      }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      key={user._id}
    >
      <Typography sx={{ fontFamily: "Audiowide" }}>{index + 1}.</Typography>
      <Typography sx={{ fontFamily: "Audiowide" }}>
        {"..." +
          user.userDetails.slice(
            user.userDetails.length - 4,
            user.userDetails.length
          )}
      </Typography>
      <Typography sx={{ fontFamily: "Audiowide" }}>
        {new Date(user.time).toISOString()}
      </Typography>
      <Typography sx={{ fontFamily: "Audiowide" }}>Round Score: {initialScore}</Typography>
      <Button
        sx={{ fontFamily: "Audiowide" }}
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
            <CircularProgress thickness={6} color="inherit" size="1.2rem" />
            <Typography variant="subtitle2" style={{ marginLeft: "0.5rem" }}>
              Saving Score...
            </Typography>
          </>
        )}
      </Button>
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

          <Box>
            <iframe
              title="userresponse"
              srcDoc={`<html><head><style>${user.css}</style></head>${user.html}</html>`}
              sandbox="allow-scripts"
              height="500px"
              width="100%"
            ></iframe>
          </Box>
        </Box>
      </Modal>
    </Stack>
  );
}

export default Submission;
