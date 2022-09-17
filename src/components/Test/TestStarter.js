import {
  Box,
  Button,
  Chip,
  Divider,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import ExamIcon from "../Icons/ExamIcon";
function TestStarter() {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { data, isLoading, error } = useFetch(
    "https://c2c-backend.vercel.app/user/checkauth"
  );
  const round1Time = new Date("Sep 30, 2022 14:00:00");
  const round3Time = new Date("Sep 30, 2022 16:00:00");
  const round2Time = new Date("Sep 30, 2022 18:00:00");
  const [timer, setTimer] = useState(0);

  const Ref = useRef(null);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const days = Math.floor((total / 1000 /60 / 60 /24));
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, days, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (days > 9 ? days : "0" + days) +
        " : " +
        (hours > 9 ? hours : "0" + hours) +
          " : " +
          (minutes > 9 ? minutes : "0" + minutes) +
          " : " +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00 : 00 : 00 : 00 ");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = (n) => {
    let deadline = round1Time;
    if(n===1)deadline=round1Time;
    if(n===2)deadline=round2Time;
    if(n===3)deadline=round3Time;
    else deadline=Date.now();
    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds()+10);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    if(data){
    clearTimer(getDeadTime(data.data.round1?1:data.data.round2?2:3));}
    // clearTimer(getDeadTime(data.data.round1?1:data.data.round2?2:3));}
  }, [data]);

  return (
    <Stack
      marginLeft="2rem"
      marginRight="2rem"
      direction={matches ? "row" : "column"}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        minHeight={matches ? "80vh" : "100vh"}
        width="50%"
        color="white"
        sx={{ fontFamily: "Vercel", textAlign: "center" }}
      >
        <Typography variant="h2">Welcome to Code2Clone!</Typography>
        <Box sx={{display:"flex", justifyContent: "center",alignItems: "center",gap:"2rem",flexDirection:"column"}}>
          <div>
          Next Round Begins in {" "}
          </div>
          {data && (
            <Chip label={timer} color="primary" sx={{fontSize:"30px",padding:"2rem",fontFamily:"monospace"}}>
            </Chip>
          )}
          {!data && <Skeleton height="50px"/>}
        </Box>
        <Stack direction="row" spacing={4}>
          {timer==="00 : 00 : 00 : 00" && <Button color="primary" variant="contained">
            Start Cloning
          </Button>}
          <Button color="secondary" variant="contained">
            View Results
          </Button>
        </Stack>
      </Stack>
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        width="50%"
        color="white"
      >
        <Typography variant="h4" sx={{ fontFamily: "Vercel" }}>
          Leaderboard
        </Typography>
      </Stack>
    </Stack>
  );
}

export default TestStarter;
