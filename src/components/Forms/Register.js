import {
  Alert,
  Autocomplete,
  Button,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./style.css";
import CircularProgress from "@mui/material/CircularProgress";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate, useParams } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NumbersIcon from "@mui/icons-material/Numbers";
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
function Register() {
  // const fs = require('fs');
  const params = useParams();
  const refrealValue = params.id;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [other, setOther] = useState(true);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [fetching, setFetching] = useState();
  const [validationObj, setValidationObj] = useState({
    universityName: {
      error: false,
      message: "",
    },
    registration_number: {
      error: false,
      message: "",
    },
    email: {
      error: false,
      message: "",
    },
    first_name: {
      error: false,
      message: "",
    },
    last_name: {
      error: false,
      message: "",
    },
    mobile_number: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
    cpassword: {
      error: false,
      message: "",
    },
  });
  // navigation
  const navigate = useNavigate();
  // handle snackbar close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // FETCHING API
  const putData = async (values) => {
    // clear any messages before hand
    setMessage("");
    setError("");
    // setloading to true
    setLoading(true);
    values.mobile_number.split("-").join();
    let url = `https://${process.env.REACT_APP_BASE_URL}/user/signup`;
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      let data = await response.json();
      if (data.success) {
        // setloading to false
        setLoading(false);
        // snackbar comes here
        setMessage(data.data.data);
        setOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        // setloading to false
        setLoading(false);
        // snackbar comes here
        if (typeof data.data.error === "object") {
          setError("Please fill all the fields correctly");
        } else {
          setError(data.data.error);
        }
        setOpen(true);
      }
    } catch (err) {
      setLoading(false);
      setOpen(true);
      setError("Something went wrong. Please try again later.");
    }
  };

  // FORM HANDLING LIBRARY
  const formik = useFormik({
    initialValues: {
      universityName: "",
      registration_number: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      mobile_number: "",
      cpassword: "",
      refreal: refrealValue,
    },
    onSubmit: async (values) => {
      if (checkHandler()) {
        try {
          putData(values);
        } catch (err) {
          console.log(err);
        }
      } else {
        setError(true);
        setMessage("Invalid Entries");
        setOpen(true);
      }
    },
  });

  // to show and hide password
  const handleClickShowPassword = () => {
    setShow((prevShow) => !prevShow);
  };
  const handleClickShowPassword2 = () => {
    setShow2((prevShow) => !prevShow);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // to check if there are any errors in
  const checkHandler = () => {
    for (let i in validationObj) {
      if (validationObj[i].error === true || formik.values[i] === "") {
        return false;
      }
    }
    return true;
  };
  // to validate the form
  const handleOnChange = (e) => {
    formik.handleChange(e);
    // updating error state
    let error = "";
    let message = "";
    let name = e.target.name;
    let value = e.target.value;
    // for first and last names
    if (name === "registration_number") {
      if (value === "") {
        error = true;
        message = "Field cannot be empty";
        setValidationObj({
          ...validationObj,
          registration_number: { error, message },
        });
      } else {
        setValidationObj({
          ...validationObj,
          registration_number: { error: false, message: "" },
        });
      }
    } else if (name === "first_name") {
      if (!value.match(/^[a-zA-Z\s]+$/)) {
        error = true;
        message = value
          ? "Enter a valid name (Without special chars)"
          : "Field cannot be empty";
        setValidationObj({ ...validationObj, first_name: { error, message } });
      } else {
        setValidationObj({
          ...validationObj,
          first_name: { error: false, message: "" },
        });
      }
    } else if (name === "last_name") {
      if (!value.match(/^[a-zA-Z\s]+$/)) {
        error = true;
        message = value
          ? "Enter a valid name (Without special chars)"
          : "Field cannot be empty";
        setValidationObj({ ...validationObj, last_name: { error, message } });
      } else {
        setValidationObj({
          ...validationObj,
          last_name: { error: false, message: "" },
        });
      }
    } else if (name === "email") {
      if (!value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)) {
        error = true;
        message = value ? "Enter a valid email" : "Field cannot be empty";
        setValidationObj({ ...validationObj, email: { error, message } });
      } else {
        setValidationObj({
          ...validationObj,
          email: { error: false, message: "" },
        });
      }
    } else if (name === "password") {
      if (value !== formik.values.cpassword) {
        error = true;
        message = "Passwords must match!";
        setValidationObj({ ...validationObj, cpassword: { error, message } });
      } else {
        setValidationObj({
          ...validationObj,
          cpassword: { error: false, message: "" },
        });
      }
      if (
        !value.match(/^(?=.*\d)(?=.*[!@#$%^&*_-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      ) {
        error = true;
        message = value
          ? "Password must contain at least a symbol, upper and lower case letters and a number"
          : "Field cannot be empty";
        setValidationObj({ ...validationObj, password: { error, message } });
      } else {
        setValidationObj({
          ...validationObj,
          password: { error: false, message: "" },
        });
      }
    } else if (name === "cpassword") {
      if (value !== formik.values.password) {
        error = true;
        message = "Passwords must match!";
        setValidationObj({ ...validationObj, cpassword: { error, message } });
      } else {
        setValidationObj({
          ...validationObj,
          cpassword: { error: false, message: "" },
        });
      }
    }
  };
  // to fetch universities name from
  useEffect(() => {
    setFetching(true);
    fetch("/universities.json")
      .then((response) => response.json())
      .then((data) => {
        let array = [];
        for (let i in data) {
          if (!array.includes(data[i].name)) {
            array.push(data[i].name);
          }
        }
        setUniversities(array);
        setFetching(false);
      });
  }, []);
  // JSX
  return (
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
    >
      {/* FORM HEADING */}
      <Typography textAlign="center" variant="h6" m={2}>
        Registration
      </Typography>

      <Autocomplete
        disablePortal
        autoHighlight
        id="combo-box-demo"
        style={{ "&.input": { width: "100%" } }}
        options={universities}
        loading={fetching}
        loadingText="Loading..."
        onChange={(e, v) => {
          if (v) {
            setOther(false);
            formik.setValues({ ...formik.values, universityName: v });
            setValidationObj({
              ...validationObj,
              universityName: { error: false, message: "" },
            });
          } else {
            setOther(true);
          }
        }}
        renderInput={(params) => (
          <TextField
            required
            id="universityName"
            name="universityName"
            label="UniversityName"
            error={validationObj.universityName.error}
            helperText={
              validationObj.universityName.error
                ? validationObj.universityName.message
                : ""
            }
            value={formik.values?.universityName}
            {...params}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "100%", margin: "0" }}
            autoFocus
            placeholder="University"
          />
        )}
      />

      {/* OTHER UNIVERSITIES */}
      <TextField
        disabled={!other}
        required
        id="universityName"
        name="universityName"
        label="Other Universities"
        error={validationObj.universityName.error}
        helperText={
          validationObj.universityName.error
            ? validationObj.universityName.message
            : ""
        }
        value={formik.values?.universityName}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ width: "100%", margin: "0" }}
        placeholder="University"
        onChange={(e) => {
          if (!e.target.value) {
            setValidationObj({
              ...validationObj,
              universityName: {
                error: true,
                message: "Field Cannot be empty",
              },
            });
          } else {
            setValidationObj({
              ...validationObj,
              universityName: {
                error: false,
                message: "",
              },
            });
          }
          formik.setValues({
            ...formik.values,
            universityName: e.target.value,
          });
        }}
      />
      {/* REGISTRATION NUMBER */}
      <TextField
        required
        error={validationObj.registration_number.error}
        helperText={
          validationObj.registration_number.error
            ? validationObj.registration_number.message
            : ""
        }
        id="reg"
        name="registration_number"
        label="Registration Number"
        placeholder="Registration Number"
        onChange={handleOnChange}
        value={formik.values.registration_number.toUpperCase()}
        style={{ width: "100%", margin: "0" }}
        size="medium"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <NumbersIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* first name last name */}
      <Stack direction="row" sx={{ width: "100%", gap: "2rem" }}>
        {/* FIRST NAME */}
        <TextField
          error={validationObj.first_name.error}
          helperText={
            validationObj.first_name.error
              ? validationObj.first_name.message
              : ""
          }
          required
          id="first_name"
          name="first_name"
          label="First Name"
          placeholder="First Name"
          onChange={handleOnChange}
          value={formik.values.first_name}
          style={{ width: "100%", fontSize: "0.5rem", margin: "0" }}
          size="medium"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* LAST NAME */}
        <TextField
          error={validationObj.last_name.error}
          helperText={
            validationObj.last_name.error ? validationObj.last_name.message : ""
          }
          required
          id="last_name"
          name="last_name"
          label="Last Name"
          placeholder="Last Name"
          onChange={handleOnChange}
          value={formik.values.last_name}
          style={{ width: "100%", fontSize: "0.5rem", margin: "0" }}
          size="medium"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* PHONE NUMBER */}
      <PhoneInput
        country={"in"}
        placeholder="+91 12345-66789"
        value={formik.values.mobile_number}
        inputProps={{
          id: "mobile_number",
          name: "mobile_number",
          onChange: (e) => {
            formik.handleChange(e);
            if (!e.target.value || e.target.value.length < 15) {
              setValidationObj({
                ...validationObj,
                mobile_number: {
                  error: true,
                  message: "Invalid Phone Number",
                },
              });
            } else {
              setValidationObj({
                ...validationObj,
                mobile_number: {
                  error: false,
                  message: "",
                },
              });
            }
          },
          required: true,
          // label: "Mobile Number"
        }}
        specialLabel="Mobile Number"
        containerStyle={{ padding: "0" }}
        inputStyle={{
          width: "100%",
          bakcgorundColor: "transparent",
          outline: "none !important",
          "&:focus": { outline: "none !important" },
          borderColor: validationObj.mobile_number.error ? "red" : "",
        }}
        buttonStyle={{ background: "none" }}
        localization="in"
      />
      {validationObj.mobile_number.error && (
        <Typography
          variant="body2"
          color="error"
          sx={{ fontSize: "12px", marginTop: "-10px" }}
        >
          {validationObj.mobile_number.message}
        </Typography>
      )}

      {/* EMAIL */}
      <TextField
        error={validationObj.email.error}
        helperText={
          validationObj.email.error ? validationObj.email.message : ""
        }
        required
        id="email"
        type="email"
        name="email"
        label="Email"
        placeholder="Email"
        onChange={handleOnChange}
        value={formik.values.email}
        style={{ width: "100%", fontSize: "0.5rem", margin: "0" }}
        size="medium"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        autoComplete="email"
      />

      {/* PASSWORD */}
      <TextField
        required
        error={validationObj.password.error}
        helperText={
          validationObj.password.error ? validationObj.password.message : ""
        }
        id="password"
        type={show ? "text" : "password"}
        name="password"
        label="Password"
        placeholder="Password"
        onChange={handleOnChange}
        value={formik.values.password}
        style={{ width: "100%", margin: "0" }}
        size="medium"
        autoComplete="current-password"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
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

      {/* confirm password */}
      <TextField
        required
        error={validationObj.cpassword.error}
        helperText={
          validationObj.cpassword.error ? validationObj.cpassword.message : ""
        }
        id="cpassword"
        type={show2 ? "text" : "password"}
        name="cpassword"
        label="Confirm Password"
        placeholder="Password"
        onChange={handleOnChange}
        value={formik.values.cpassword}
        style={{ width: "100%", margin: "0" }}
        size="medium"
        autoComplete="current-password"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword2}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {!show2 ? <VisibilityOff /> : <Visibility />}
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
                Creating Account..
              </Typography>
            </>
          )}
          {!loading && "SUBMIT"}
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

      {/* custom snackbar */}
      {!loading && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={900}
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
      <Link
        component="button"
        style={{ cursor: "pointer", width: "fit-content", color: "#CC0707" }}
        onClick={() => {
          matches ? navigate("/login") : navigate("/form/login");
        }}
        underline="always"
      >
        Existing User?
      </Link>
    </Box>
  );
}

export default Register;
