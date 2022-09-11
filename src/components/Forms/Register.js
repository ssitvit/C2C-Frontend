import {
  Alert,
  Button,
  ButtonGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { Box } from "@mui/system";
import React, {useState} from "react";
import { useFormik } from "formik";
import Snackbar from "@mui/material/Snackbar";
function Register() {

  const [open,setOpen] = useState(false);
  const [error,setError] = useState('');
  const [message,setMessage] = useState('');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }
  // FETCHING API
  const putData = async (values) => {
    values.mobile_number.split("-").join();
    let url = "https://c2c-backend.vercel.app/user/signup";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    let data = await response.json();
    if (data.success) {
      // snackbar comes here
      setMessage(data.data.data);
      setOpen(true);
      console.log(data);
    } else {
      // snackbar comes here
      setError(data.data.error);
      setOpen(true);
      console.log(data);
    }
  };

  // FORM HANDLING LIBRARY
  const formik = useFormik({
    initialValues: {
      registration_number: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      mobile_number: "",
    },
    onSubmit: async (values) => {
      // form validation
      try {
        putData(values);
      } catch (err) {
        console.log(err);
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
        alignItems: "center",
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
      <Typography variant="h6" m={2}>
        Login Form
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
        style={{ width: "100%" }}
        size="medium"
        autoFocus
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Stack direction="row" sx={{ width: "100%", gap: "2rem" }}>
        {/* FIRST NAME */}
        <TextField
          required
          id="first_name"
          name="first_name"
          label="First Name"
          placeholder="First Name"
          onChange={formik.handleChange}
          value={formik.values.first_name}
          style={{ width: "100%", fontSize: "0.5rem", margin: "0" }}
          size="medium"
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* LAST NAME */}
        <TextField
          required
          id="last_name"
          name="last_name"
          label="Last Name"
          placeholder="Last Name"
          onChange={formik.handleChange}
          value={formik.values.last_name}
          style={{ width: "100%", fontSize: "0.5rem", margin: "0" }}
          size="medium"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>
      
      {/* PHONE NUMBER */}
      <PhoneInput
        country={"in"}
        value={formik.values.mobile_number}
        inputProps={{
          id: "mobile_number",
          name: "mobile_number",
          onChange: formik.handleChange,
        }}
        specialLabel="Mobile Number"
        containerStyle={{ padding: "0" }}
        inputStyle={{ width: "100%" }}
        buttonStyle={{ background: "none" }}
        localization="in"
      />

      {/* EMAIL */}
      <TextField
        required
        id="email"
        type="email"
        name="email"
        label="Email"
        placeholder="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
        style={{ width: "100%", fontSize: "0.5rem" }}
        size="medium"
        InputLabelProps={{
          shrink: true,
        }}
        autoComplete="email"
      />

      {/* PASSWORD */}
      <TextField
        required
        id="password"
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        style={{ width: "100%" }}
        size="medium"
        autoComplete="current-password"
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* SUBMIT AND RESET BUTTONS */}
      <ButtonGroup>

        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          variant="contained"
          color="warning"
          sx={{ width: "100px" }}
          style={{ width: "100%" }}
          size="medium"
          autoComplete="on"
        >
          Submit
        </Button>

        {/* RESET BUTTON */}
        <Button
          type="reset"
          variant="contained"
          color="warning"
          sx={{ width: "100px" }}
          style={{ width: "100%" }}
          size="medium"
          onClick={formik.handleReset}
        >
          Reset
        </Button>

      </ButtonGroup>
      <Snackbar anchorOrigin={{ vertical:"bottom", horizontal:"center" }} open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error?"error":"success"} sx={{ width: '100%' }}>
          {message?message:error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Register;
