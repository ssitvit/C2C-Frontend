import { Button, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { useFormik } from "formik";
function Login() {
  const formik = useFormik({
    initialValues: {
      reg: "",
      first_name: "",
      last_name: "",
      email: "",
      pass: "",
      phone: "",
      refer: "",
    },
  });
  const handleSubmit = (event)=>{
    event.preventDefault();
    alert("Hehehe");
  }
  console.log(formik.values);
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="1px solid black"
      margin="2rem"
      padding="2rem"
      borderRadius="2rem"
    >
      <Stack spacing={2} textAlign="center">
        <Typography variant="h3" m={4}>Login Form</Typography>
        <TextField
          id="reg"
          name="reg"
          label="Registration Number"
          placeholder="Registration Number"
          onChange={formik.handleChange}
          value={formik.values.reg}
        />
        <Stack direction="row" spacing={2}>
          <TextField
            id="first_name"
            name="first_name"
            label="First Name"
            placeholder="First Name"
            onChange={formik.handleChange}
            value={formik.values.first_name}
          />
          <TextField
            id="last_name"
            name="last_name"
            label="Last Name"
            placeholder="Last Name"
            onChange={formik.handleChange}
            value={formik.values.last_name}
          />
        </Stack>
        {/* <Input variant="outlined" id="email" name="email" type="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email}/> */}
        <TextField
            id="email"
            type="email"
            name="email"
            label="Email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <TextField
            id="pass"
            type="password"
            name="pass"
            label="Password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.pass}
          />
          <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
      </Stack>
    </Box>
  );
}

export default Login;
