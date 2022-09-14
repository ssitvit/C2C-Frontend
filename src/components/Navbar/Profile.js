import * as React from "react";
// import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { Avatar, Divider, Skeleton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [loading, setLoading] = React.useState(true);
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
  React.useEffect(() => {
    setLoading(true);
    let url = "";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);
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
                }}
              >
                {!loading &&
                  //profile data comes here only
                  "Nanduri Jayant Vishnu"}
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
                {!loading && "vishnu@gmail.com"}
              </Typography>
              <Button
                variant="contained"
                color="error"
                sx={{ width: "100%" }}
                onClick={(event) => {
                  setOpen((prev) => !prev);
                  navigate("/dashboard/user");
                }}
              >
                Go To Dashboard
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
      {loading && (
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      )}
      {!loading && (
        <Tooltip title="Nanduri Jayant Vishnu">
          <Avatar
            {...stringAvatar("Nanduri Jayant Vishnu")}
            component="button"
            onClick={handleClick("bottom")}
          />
        </Tooltip>
      )}
    </div>
  );
}

export default Profile;
