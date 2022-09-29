import {
  Alert,
  Button,
  ButtonGroup,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function Attended({ user, index, round }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [attendance,setAttendance]= useState('');
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  const handleSubmit = async (userDetails, roundno, round) => {
    setLoading(true);
    setMessage("");
    setErrorMessage("");
    let url = `https://${process.env.REACT_APP_BASE_URL}/admin/setroundpresent`;
    let response = await fetch(url, {
      method: "POST",
      credentials: "include",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userDetails,
        roundno: round>=10?Math.floor(roundno/10):round,
        round,
      }),
    });
    
    let data = await response.json();
    if (data.success) {
      setLoading(false);
      setOpen(true);
      setMessage(data.data.data);
      setAttendance('Present');
    } else {
      setLoading(false);
      setOpen(true);
      setErrorMessage(data.data.error);
    }
  };
  const handleSubmit2 = async (userDetails, roundno, round) => {
    setLoading2(true);
    setMessage("");
    setErrorMessage("");
    let url = `https://${process.env.REACT_APP_BASE_URL}/admin/setroundpresent`;
    let response = await fetch(url, {
      method: "POST",
      credentials: "include",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userDetails,
        roundno: round>=10?Math.floor(roundno/10):round,
        round,
      }),
    });
    let data = await response.json();
    if (data.success) {
      setLoading2(false);
      setOpen(true);
      setMessage(data.data.data);
      setAttendance('Absent');
    } else {
      setLoading2(false);
      setOpen(true);
      setMessage(data.data.error);
    }
  };
  // https://c2c-backend.vercel.app/admin/user/getUserDetails
  useEffect(() => {
    let url = `https://${process.env.REACT_APP_BASE_URL}/admin/user/getUserDetails`;
    setLoading3(true);
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userDetails: user._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading3(true);
        if(round>=10){
        setAttendance(data.data.data[`round${Math.floor(round/10)}`]?'Present':'Absent');}else{
          setAttendance(data.data.data[`round${round}`]?'Present':'Absent');
        }
      });
  },[round,user._id,attendance]);
  return (
    <Stack
      sx={{
        background: "rgb(255,255,255,0.6)",
        padding: "1.2rem",
        margin: "2rem",
        borderRadius: "1rem",
        boxShadow: "10px 10px 4px 0 #250101",
        "&:hover": { boxShadow: "5px 5px 4px 0 #250101" },
      }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      key={user._id}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        marginRight="2rem"
        spacing={4}
        width="100%"
      >
        <Typography sx={{ fontFamily: "Audiowide" }}>{index + 1}.</Typography>
        <Typography sx={{ fontFamily: "Audiowide" }}>
          {user.first_name} {user.last_name}
        </Typography>
        <Typography sx={{ fontFamily: "Audiowide" }}>
          {(!loading&&!loading2)&&attendance}
          {(loading||loading2) && <CircularProgress thickness={6} color="inherit" size="1.2rem" />}
        </Typography>
        
      </Stack>
      <ButtonGroup>
        <Button
          sx={{ fontFamily: "Audiowide" }}
          variant="contained"
          color="error"
          onClick={() => {
            handleSubmit2(user._id, round, false);
          }}
        >
          {!loading2 && "MARK ABSENT"}
          {loading2 && (
            <>
              <CircularProgress thickness={6} color="inherit" size="1.2rem" />
              <Typography
                variant="subtitle2"
                style={{ marginLeft: "0.5rem" }}
                sx={{ fontFamily: "Audiowide" }}
              >
                Marking Absent...
              </Typography>
            </>
          )}
        </Button>
        <Button
          sx={{ fontFamily: "Audiowide" }}
          variant="contained"
          onClick={() => {
            handleSubmit(user._id, round, true);
          }}
        >
          {!loading && "MARK PRESENT"}
          {loading && (
            <>
              <CircularProgress thickness={6} color="inherit" size="1.2rem" />
              <Typography
                variant="subtitle2"
                style={{ marginLeft: "0.5rem" }}
                sx={{ fontFamily: "Audiowide" }}
              >
                Marking Present...
              </Typography>
            </>
          )}
        </Button>
      </ButtonGroup>
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
    </Stack>
  );
}

export default Attended;
