import { Alert, Button, CircularProgress, Snackbar, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

function Attended({user,index,round}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  const handleSubmit = async (userDetails,roundno,round)=>{
    setLoading(true);
    setMessage('');
    setErrorMessage('');
    let url = `https://${process.env.REACT_APP_BASE_URL}/admin/setroundpresent`;
    let response = await fetch(url,{
        method: 'POST',
        credentials: "include",
        cache:'no-cache',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userDetails,roundno:(parseInt(roundno)/10)%10,round})
    });
    let data = await response.json();
    if(data.success){
      setLoading(false);
      setOpen(true);
      setMessage(data.data.data);
      console.log(data);
    }else{
      setLoading(false);
      setOpen(true);
      setMessage(data.data.error);
    }
  }
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
        {user.first_name} {user.last_name}
      </Typography>
      <Typography sx={{ fontFamily: "Audiowide" }}>
        {" "}
        {user[`round${parseInt(round/10)%10}`] ? "Present" : "Absent"}
      </Typography>
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
