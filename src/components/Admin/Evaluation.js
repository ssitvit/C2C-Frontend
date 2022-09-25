import {
  Alert,
  Button,
  CircularProgress,
  Skeleton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";

function Evaluation() {
  // {
  //     "userDetails":"63282a61a962e3cb947447f2",
  //     "roundno":3,
  //     "round":true
  // }
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const round = params.id;
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  const { data, isLoading, error } = useFetch(
    `https://${process.env.REACT_APP_BASE_URL}/admin/getScoreSort`,
    "POST",
    JSON.stringify({ round: round })
  );
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
        round: parseInt(round),
        score: parseInt(score),
      }),
    });
    let data = await response.json();
    if (data.success) {
      setLoading(false);
      setMessage(data.data.data);
      setOpen(true);
    } else {
      setLoading(false)
      setErrorMessage(data.data.error);
      setOpen(true);
    }
  };
  return (
    <Stack spacing={4} style={{ padding: "2rem", margin: "2rem" }}>
      {!isLoading &&
        data &&
        data.data.data.map((user, index) => {
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
              <Typography sx={{fontFamily:"Audiowide"}}>{index + 1}.</Typography>
              <Typography sx={{fontFamily:"Audiowide"}}>{user.first_name} {user.last_name}</Typography>
              <Typography sx={{fontFamily:"Audiowide"}}>
                {" "}
                {user[`round${round}`] ? "Present" : "Absent"}
              </Typography>
              <Button sx={{fontFamily:"Audiowide"}} variant="contained">View Submission</Button>
              <TextField
                value={score}
                onChange={(e) => {
                  setScore(e.target.value);
                }}
                label="Score"
              />
              {/* <TextField  label="Remarks"/> */}
              <Button
              sx={{fontFamily:"Audiowide"}}
                variant="contained"
                color="error"
                onClick={() => {
                  handleSubmit(user._id, round);
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
          );
        })}
        {isLoading && <Skeleton height="50vh"/>}
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

export default Evaluation;
