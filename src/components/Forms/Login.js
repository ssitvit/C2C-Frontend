import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import "react-phone-input-2/lib/material.css";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useFormik } from "formik";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [verified, setVerified] = useState(true);

  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShow((prevShow) => !prevShow);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const resendEmail = async () => {
    setError("");
    setMessage("");
    console.log(JSON.stringify({ email: formik.values.email }));
    let url = "https://c2c-backend.vercel.app/user/sendEmailAgain";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formik.values.email }),
    });
    let data = await response.json();
    if (data.success) {
      setOpen(true);
      setMessage(data.data.data);
    } else {
      setVerified(false);
      setOpen(true);
      setError(data.data.error);
    }
  };
  // FORM HANDLING LIBRARY
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      if (values.email === "" || values.password === "") {
        setOpen(true);
        setError(true);
        setMessage("Please fill all the fields");
      } else if (
        !values.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)
      ) {
        setOpen(true);
        setError(true);
        setMessage("Please Enter a valid email address");
      } else {
        setLoading(true);
        let url = "https://c2c-backend.vercel.app/user/login";
        try{
        fetch(url, {
          method: "POST",
          credentials: "include",
          headers:{
            "Accept": "application/json",
            "Content-Type": "application/json",
            // "Access-Control-Allow-Credentials": "true"
          },
          body: JSON.stringify(formik.values),
        })
          .then((response) => response.json())
          .then((data) => {
            setLoading(false);
            console.log(data);
            if (data.success) {
              navigate('/dashboard/user');
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      }catch(err){console.log(err)}}
    },
  });
  // JSX
  return (
    // FORM COMPONENT
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        alignItems: "left",
        justifyContent: "center",
        flexDirection: "column",
        margin: "2rem",
        padding: "1.5rem",
        gap: "1rem",
        borderRadius: "2rem",
        width: matches ? "70%" : "80%",
        position: "relative",
        transition: "0.3s all ease-in-out",
        background: "white",
        boxShadow: "10px 10px 5px 2px rgba(0,0,0,0.5)",
        "&:hover": { boxShadow: "5px 5px 3px 2px rgba(0,0,0,0.5)" },
      }}
      noValidate
      autoComplete="on"
      onSubmit={formik.handleSubmit}
      minWidth="27vw"
    >
      {/* FORM HEADING */}
      <Typography textAlign="center" variant="h6" m={2}>
        Login
      </Typography>

      {/* Email */}
      <TextField
        required
        id="email"
        name="email"
        label="Email ID"
        placeholder="Email ID"
        onChange={formik.handleChange}
        value={formik.values.email.trim()}
        style={{ width: "100%", margin: "0" }}
        size="medium"
        autoFocus
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          type: "email",
        }}
        autoComplete="username"
      />
      {/* PASSWORD */}
      <TextField
        required
        id="password"
        type={show ? "text" : "password"}
        name="password"
        label="Password"
        placeholder="Password"
        onChange={formik.handleChange}
        value={formik.values.password.trim()}
        style={{ width: "100%", margin: "0" }}
        size="medium"
        autoComplete="current-password"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {!show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* SUBMIT AND RESET BUTTONS */}
      <Stack direction="row" spacing={2}>
        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          variant="contained"
          color="error"
          size="medium"
          autoComplete="on"
          disabled={loading}
        >
          {loading && (
            <>
              <CircularProgress thickness={6} color="inherit" size="1.2rem" />
              <Typography variant="subtitle2" style={{ marginLeft: "0.5rem" }}>
                Logging In...
              </Typography>
            </>
          )}
          {!loading && "LOGIN"}
        </Button>

        {/* RESET BUTTON */}
        <Button
          type="reset"
          variant="contained"
          color="error"
          size="medium"
          onClick={formik.handleReset}
        >
          Reset
        </Button>
      </Stack>
      {!verified && (
        <Alert
          severity="warning"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Button size="small" color="warning" onClick={resendEmail}>
            Resend Verification Link
          </Button>
        </Alert>
      )}
      {/* custom snackbar */}
      {!loading && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {message ? message : error}
          </Alert>
        </Snackbar>
      )}

      {/* link to switch */}
      <Link
        component="button"
        style={{ cursor: "pointer", width: "fit-content", color: "#CC0707" }}
        onClick={() => {
          navigate("/register");
        }}
        underline="always"
      >
        Create an Account
      </Link>
    </Box>
  );
}

export default Login;
