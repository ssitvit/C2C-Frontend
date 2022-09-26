import { Alert, Button, CircularProgress, Snackbar, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function Actions() {
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    let url = `https://${process.env.REACT_APP_BASE_URL}/admin/logout`;
    fetch(url,{
      method:"GET",
      credentials:'include',
      cache:'reload',
      headers:{"Content-Type": "application/json"}
    })
  .then(response=>response.json()).then((data)=>{
    console.log(data);
    setLoading(false);
    setOpen(true);
    if(data.success){
      setMessage(data.data.data);
      setTimeout(() => {navigate('/admin/login')},800);
    }else{
      setErrorMessage(data.data.error);
    }
  })}
  return (<>

    <Stack direction="row" spacing={4} alignItems="center" justifyContent="center" margin="2rem">
          <Link to="submitAttendance" style={{textDecoration:"none"}}><Button variant="contained" color="error">SUBMIT ATTENDANCE</Button></Link>
          <Link to="evaluate" style={{textDecoration:"none"}}><Button variant="contained" color="error">EVALUATE</Button></Link>
          <Button variant="contained" color="warning" width="fit-content" onClick={handleLogout}>
            {!loading && 'LOGOUT'}
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
                      Logging Out...
                    </Typography>
                  </>)}</Button>
    </Stack>
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
    <Outlet/>
    </>
  )
}

export default Actions