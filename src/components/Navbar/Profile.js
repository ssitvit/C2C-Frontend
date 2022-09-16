import * as React from "react";
// import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Box,
  ButtonGroup,
  Divider,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";

function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  // const [arrowRef, setArrowRef] = React.useState(null);
  const navigate = useNavigate();
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        border: "none",
        cursor: "pointer",
        color: "white",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  const { data, isLoading, error } = useFetch(
    "https://c2c-backend.vercel.app/user/checkauth"
  );
  React.useEffect(() => {
    console.log(error);
  }, [error]);
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
            <Paper sx={{ padding: "2" }}>
              <Typography
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 0,
                }}
              >
                {!isLoading &&
                  //profile data comes here only
                  data.data.data.first_name + " " + data.data.data.last_name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Avatar
                  {...stringAvatar(
                    data.data.data.first_name + " " + data.data.data.last_name
                  )}
                  sx={{ cursor: "normal" }}
                />
              </Box>
              <Typography
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  margin: 0,
                }}
              >
                {!isLoading && data.data.data.universityName}
              </Typography>
              <Divider />
              <Typography
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {!isLoading && data.data.data.email}
              </Typography>
              <Divider />
              <ButtonGroup orientation="vertical" sx={{ width: "100%" }}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ width: "100%", borderRadius: "0" }}
                  onClick={(event) => {
                    setOpen((prev) => !prev);
                    navigate("/dashboard/user");
                  }}
                >
                  Go To Dashboard
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ width: "100%", borderRadius: "0" }}
                  onClick={async (event) => {
                    let response = await fetch(
                      "https://c2c-backend.vercel.app/user/logout",
                      {
                        method: "GET",
                        credentials: "include",
                        headers: {
                          "Content-Type": "application/json",
                          "Access-Control-Allow-Credentials": "true",
                        },
                      }
                    );
                    let data = await response.json();
                    console.log(data);
                    if(data.success){
                      navigate('/');
                    }
                  }}
                >
                  Logout
                </Button>
              </ButtonGroup>
            </Paper>
          </Fade>
        )}
      </Popper>
      {isLoading && (
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      )}
      {!isLoading && data && (
        <Tooltip title="Nanduri Jayant Vishnu" sx={{ margin: "2rem" }}>
          <Avatar
            {...stringAvatar(
              data.data.data.first_name + " " + data.data.data.last_name
            )}
            component="button"
            onClick={handleClick("bottom-start")}
          />
        </Tooltip>
      )}
    </div>
  );
}

export default Profile;
