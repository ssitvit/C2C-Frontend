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
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';

function Login(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
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
    setLoading2(true);
    setError("");
    setMessage("");
    let url = props.admin?`https://${process.env.REACT_APP_BASE_URL}/user/sendEmailAgain`:`https://${process.env.REACT_APP_BASE_URL}/user/sendEmailAgain`;
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formik.values.email }),
      });
      let data = await response.json();
      if (data.success) {
        setLoading2(false);
        setOpen(true);
        setMessage(data.data.data);
      } else {
        setLoading2(false);
        setVerified(false);
        setOpen(true);
        setError(data.data.error);
      }
    } catch (err) {
      console.log(err);
      setLoading2(false);
      setOpen(true);
      setError("Something Went Wrong. Please try again later.");
    }
  };
  // FORM HANDLING LIBRARY
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setError(false);
      setMessage("");
      setVerified(true);
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
        let url = `https://${process.env.REACT_APP_BASE_URL}/user/login/`;
        try {
          fetch(url, {
            method: "POST",
            credentials: "include",
            // mode:"no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // "Access-Control-Allow-Credentials": "true"
            },
            body: JSON.stringify(formik.values),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                setOpen(true);
                setMessage("Logged In Successfully");
                // document.cookie='authentication=true;SameSite=none;Secure=true;';
                setTimeout(() => {
                  navigate("/dashboard/user");
                }, 1000);
              } else if (data.data.error === "Email Not verified") {
                setLoading(false);
                setVerified(false);
                setError(data.data.error);
                setOpen(true);
              } else if (data.data.error) {
                setLoading(false);
                setError(data.data.error);
                setOpen(true);
              } else {
                setError(
                  "Some error occurred while logging you in. Please Try again Later"
                );
                setOpen(true);
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
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
            startAdornment: (
              <InputAdornment position="start">
                  <EmailIcon/>
              </InputAdornment>
            ),
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
          startAdornment:(
            <InputAdornment position="start">
            <KeyIcon/>
            </InputAdornment>
          ),
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

      {/* RESEND BUTTON */}
      {!verified && (
        <Alert
          severity="warning"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Button size="small" color="warning" onClick={resendEmail}>
            {!loading2 && "Resend Verification Link"}
            {loading2 && (
              <>
                <CircularProgress thickness={6} color="inherit" size="1.2rem" />
                <Typography
                  variant="subtitle2"
                  style={{ marginLeft: "0.5rem" }}
                >
                  Sending Mail..
                </Typography>
              </>
            )}
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
          matches ? navigate("/register") : navigate("/form/register");
        }}
        underline="always"
      >
        Create an Account
      </Link>
    </Box>
  );
}

export default Login;
