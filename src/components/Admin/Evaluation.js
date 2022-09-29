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
import Submission from "./Submission";

function Evaluation() {
  const params = useParams();
  const round = params.id;
  const [threshold, setThreshold] = useState(0);
  const [qualified, setQualified] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  const { data, isLoading, error } = useFetch(
    `https://${process.env.REACT_APP_BASE_URL}/admin/user/getAllSavedCode`,
    "POST",
    JSON.stringify({ round: round })
  );
  const handleThreshold = async (round) => {
    setErrorMessage("");
    setMessage("");
    setLoading(true);
    let url = `https://${process.env.REACT_APP_BASE_URL}/admin/setThresold`;
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        round: round>=1?Math.floor(parseInt(round) / 10):parseInt(round),
        value: parseInt(threshold),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setOpen(true);
        console.log(JSON.stringify({ round: round, value: threshold }));
        if (data.success) {
          setMessage("Successfully Commited");
        } else {
          setErrorMessage("Something Went Wrong!");
        }
      });
  };
  useEffect(() => {
    if (error) {
      console.log("Error getting codes");
    }
  }, [error]);
  return (
    <Stack spacing={4} style={{ padding: "2rem" }}>
      <Stack direction="row" spacing={4} alignItems="center">
        <TextField
          value={threshold}
          onChange={(e) => {
            setThreshold(e.target.value);
          }}
          label="Set Threshold"
          InputLabelProps={{
            style: {
              color: "#fff",
              background: "black",
              paddingLeft: "10px",
              paddingRight: "10px",
            },
          }}
          autoFocus
          sx={{
            input: {
              color: "white",
              borderRadius: "2px",
              outline: "2px solid white",
              "&:focus": { border: "none" },
              "&:hover": { outlineColor: "orange" },
            },
          }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            handleThreshold(round);
          }}
          sx={{ width: "fit-content" }}
        >
          {!loading && "Commit Threshold"}
          {loading && (
            <>
              <CircularProgress thickness={6} color="inherit" size="1.2rem" />
              <Typography variant="subtitle2" style={{ marginLeft: "0.5rem" }}>
                Commiting...
              </Typography>
            </>
          )}
        </Button>
      </Stack>
      {!isLoading &&
        data &&
        data.data.data.map((user, index) => {
          return (
            <Submission
              user={user}
              index={index}
              round={round}
              threshold={threshold}
              setQualified={setQualified}
              qualified={qualified}
              key={user._id}
            />
          );
        })}
      {!isLoading && data && data.data.data.length === 0 && (
        <Stack
          sx={{
            background: "rgb(255,255,255,0.3)",
            color: "white",
            padding: "1.2rem",
            borderRadius: "1rem",
            boxShadow: "5px 5px 4px 0 #250101",
          }}
          direction="row"
          alignItems="center"
          justifyContent="center"
          height="30vh"
        >
          Nothing to display
        </Stack>
      )}
      {isLoading && <Skeleton height="50vh" />}
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
