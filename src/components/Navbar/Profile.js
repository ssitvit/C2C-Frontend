import * as React from "react";
// import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {
  Alert,
  Avatar,
  CircularProgress,
  Divider,
  Skeleton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import { useEffect } from "react";

function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [deleting, setDeleting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
  // const [arrowRef, setArrowRef] = React.useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen2(false);
  };
  const onLogout = async (event) => {
    setDeleting(true);
    setErrorMessage("");
    setMessage("");
    let response = await fetch("https://c2c-backend.vercel.app/user/logout", {
      method: "GET",
      // mode:"no-cors",
      credentials: "include",
      cache:"reload",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Credentials": "true",
      },
    });
    let data = await response.json();
    if (data.success) {
      setOpen2(true);
      setMessage(data.data.data);
      document.cookie='header=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=None;';
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  function stringToColor(string) {
    // let hash = 0;
    // let i;

    // /* eslint-disable no-bitwise */
    // for (i = 0; i < string.length; i += 1) {
    //   hash = string.charCodeAt(i) + ((hash << 5) - hash);
    // }

    // let color = "#";

    // for (i = 0; i < 3; i += 1) {
    //   const value = (hash >> (i * 8)) & 0xff;
    //   color += `00${value.toString(16)}`.slice(-2);
    // }
    // /* eslint-enable no-bitwise */

    return "black";
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        border: "2px solid white",
        padding:"20px",
        cursor: "pointer",
        color: "white",
        fontFamily:"Audiowide"
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  const { data, isLoading, error } = useFetch(
    `https://${process.env.REACT_APP_BASE_URL}/user/checkauth`);
  useEffect(() => {
    if ((data && !data.success) || error) {
      navigate("/login");
    }
  }, [data, navigate, error]);
  return (
    <div>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        sx={{ offset: "2rem" }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              sx={{
                padding: "2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding:"1.2rem",
                  fontFamily: "Audiowide"
                }}
              >
                {!isLoading && (
                  <>
                    {data.data.data.email}
                  </>
                )}
              </Typography>
              <Divider />
              <Divider />
              <Button
                variant="contained"
                color="error"
                sx={{ width: "100%", borderRadius: "0",fontFamily:"Audiowide" }}
                onClick={(event) => {
                  setOpen((prev) => !prev);
                  navigate("/dashboard/user");
                }}
              >
                <DashboardIcon sx={{marginRight:"20px"}}/>Go To Dashboard
              </Button>
              <Divider sx={{ backgroundColor: "white" }} />
              <Button
                variant="contained"
                disabled={deleting}
                color="error"
                sx={{ width: "100%", borderRadius: "0",fontFamily:"Audiowide" }}
                onClick={onLogout}
              >
                {!deleting && 
                <>
                <LogoutIcon sx={{marginRight:"20px"}}/>Logout
                </>}
                {deleting && (
                  <>
                    <CircularProgress
                      thickness={6}
                      color="inherit"
                      size="1.2rem"
                    />
                    <Typography
                      variant="subtitle2"
                      style={{ marginLeft: "0.5rem",fontFamily:"Audiowide" }}
                    >
                      Logging Out...
                    </Typography>
                  </>
                )}
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
      {isLoading && (
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      )}
      {!isLoading && data && (
        <Tooltip
          title={data.data.data.first_name + " " + data.data.data.last_name}
          sx={{ margin: "2rem"}}
        >
          <Avatar
          
            {...stringAvatar(
              data.data.data.first_name + " " + data.data.data.last_name
            )}
            component="button"
            onClick={handleClick("bottom-start")}
          />
        </Tooltip>
      )}
      {!isLoading && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open2}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={errorMessage ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {message ? message : errorMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default Profile;
