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
import {useNavigate} from 'react-router-dom'
import { Visibility, VisibilityOff } from "@mui/icons-material";
function Login() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  
  const handleClickShowPassword = () => {
    setShow((prevShow)=>!prevShow);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // FORM HANDLING LIBRARY
  const formik = useFormik({
    initialValues: {
      registration_number: "",
      password: "",
    },
    onSubmit: async (values) => {
      // form validation
      
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
        padding: "0.2rem",
        gap: "1rem",
        borderRadius: "2rem",
        width: "70%",
      }}
      noValidate
      autoComplete="on"
      onSubmit={formik.handleSubmit}
    >
      {/* FORM HEADING */}
      <Typography textAlign="center"variant="h6" m={2}>
        Login
      </Typography>

      {/* REGISTRATION NUMBER */}
      <TextField
        required
        id="reg"
        name="registration_number"
        label="Registration Number"
        placeholder="Registration Number"
        onChange={formik.handleChange}
        value={formik.values.registration_number}
        style={{ width: "100%",margin:"0" }}
        size="medium"
        autoFocus
        InputLabelProps={{
          shrink: true,
        }}
        autoComplete="username"
      />
      {/* PASSWORD */}
      <TextField
        required
        id="password"
        type={show?"text":"password"}
        name="password"
        label="Password"
        placeholder="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        style={{ width: "100%",margin:"0" }}
        size="medium"
        autoComplete="current-password"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment:(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {!show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>),
        }}
      />

      {/* SUBMIT AND RESET BUTTONS */}
      <Stack direction="row" spacing={2}>
        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          autoComplete="on"
          disabled = {loading}
        >
          {loading && (
            <>
              <CircularProgress thickness={6} color="inherit" size="1.2rem" />
              <Typography variant="subtitle2" style={{ marginLeft: "0.5rem" }}>
                Creating Account...
              </Typography>
            </>
          )}
          {!loading && "LOGIN"}
        </Button>

        {/* RESET BUTTON */}
        <Button
          type="reset"
          variant="contained"
          color="primary"
          size="medium"
          onClick={formik.handleReset}
        >
          Reset
        </Button>
      </Stack>

      {/* custom snackbar */}
      {!loading &&<Snackbar
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
      </Snackbar>}
      <Link component="button" style={{cursor: "pointer",width:"fit-content"}} onClick={()=>{navigate('/register')}} underline="always">
        Create an Account
      </Link>
    </Box>
  );
}

export default Login;
