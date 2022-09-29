import { Button, Link, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
function Verify() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const token = params.token;
  const [verified, setVerified] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    let url = `https://c2c-backend.vercel.app/user/verify/${id}/${token}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setLoading(false);
          setVerified(true);
        } else {
          setLoading(false);
          setVerified(false);
        }
      })
      .catch((err) => console.log(err));
  }, [id, token]);
  return (
    <Stack
      color="white"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      {loading && <CircularProgress />}
      {verified && !loading && (
        <>
          <Typography sx={{ fontFamily: "Audiowide"}} variant="h3">"Verified Successfully!"</Typography>
          <Link
            component="button"
            variant="filled"
            onClick={() => {
              navigate("/login");
            }}
          >
            <Button variant="contained" color="success" margin="2rem">Login Now</Button>
          </Link>
        </>
      )}
      {!verified && !loading && <Typography>"Invalid Link!"</Typography>}
    </Stack>
  );
}

export default Verify;
