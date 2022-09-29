import {
  Alert,
  Box,
  Button,
  Chip,
  Fade,
  Modal,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TimerIcon from "@mui/icons-material/Timer";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";

import Leaderboard from "../Dashboard/Leaderboard";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
// import ExamIcon from "../Icons/ExamIcon";
import Instructions from "./Exam/Instructions";
import Socials from "../Home/Socials";

function TestStarter() {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: matches?500:300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "1.2rem",
    fontFamily: "Audiowide",
    boxShadow: 24,
    p: 4,
  };
  const { data, isLoading, error } = useFetch(
    `https://${process.env.REACT_APP_BASE_URL}/user/checkauth/`);

  const round1StartTime = new Date(process.env.REACT_APP_ROUND1_S);
  const round2StartTime = new Date(process.env.REACT_APP_ROUND2_S);
  const round3StartTime = new Date(process.env.REACT_APP_ROUND3_S);

  const round1EndTime = new Date(process.env.REACT_APP_ROUND1_E);
  const round2EndTime = new Date(process.env.REACT_APP_ROUND2_E);
  const round3EndTime = new Date(process.env.REACT_APP_ROUND3_E);

  const [timer, setTimer] = useState("00d : 00h : 00m : 00s");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
 
  const Ref = useRef(null);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleOpen2 = () => setOpen2(true);

  const handleClose2 = () => setOpen2(false);

  const handleClose3 = () => setOpen3(false);

  
  // to not allow if not qualified.
  const handleCloning = () => {
    setErrorMessage('');
    setMessage('');
    if (data.data.data[`round${getCurrentRound()}`]) {
      navigate(`exam/${getCurrentRound()}`);
    } else {
      setOpen3(true);
      setErrorMessage("You are not allowed to give the test");
    }
  };

  // timer
  const getTimeRemaining = async (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const days = Math.floor(total / 1000 / 60 / 60 / 24);
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

  const getCurrentRound = () => {
    const currentRound =
      new Date().getTime() <= round1EndTime.getTime()
        ? "1"
        : new Date().getTime() <= round2EndTime.getTime()
        ? "2"
        : new Date().getTime() <= round3EndTime.getTime()
        ? "3"
        : "0";
    return currentRound;
  };

  const round = getCurrentRound();
  
  const startTimer = async (e) => {
    let { total, days, hours, minutes, seconds } = await getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (days > 9 ? days : "0" + days) +
          `d : ` +
          (hours > 9 ? hours : "0" + hours) +
          `h : ` +
          (minutes > 9 ? minutes : "0" + minutes) +
          `m : ` +
          (seconds > 9 ? seconds : "0" + seconds) +
          "s"
      );
    }
  };

  const clearTimer = (e) => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = getCurrentRoundStartTime();
    return deadline;
  };

  const getCurrentRoundEndTime = ()=>{
    
    if (round === '1'){
      return round1EndTime;
    }else if(round === '2'){
      return round2EndTime;
    }else{
      return round3EndTime;
    }
  }

  const getCurrentRoundStartTime = ()=>{
    if (round === '1'){
      return round1StartTime;
    }else if(round === '2'){
      return round2StartTime;
    }else if(round==='3'){
      return round3StartTime;
    }
  }
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <Stack
      marginLeft="2rem"
      marginRight="2rem"
      direction={matches ? "row" : "column"}
      alignItems="center"
      justifyContent="space-between"
    >
      {/* left side */}
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        minHeight={matches ? "80vh" : "100vh"}
        width="50%"
        color="white"
        sx={{ fontFamily: "Audiowide", textAlign: "center" }}
      >
        <Typography
          variant={matches ? "h2" : "h4"}
          sx={{ fontFamily: "Audiowide" }}
        >
          Welcome to Code2Clone!
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            flexDirection: "column",
          }}
        >
          {data && !(timer==="00d : 00h : 00m : 00s") && (
            <>
              <div style={{ fontFamily: "Audiowide" }}>
                Next Round Begins in{" "}
              </div>
              <Chip
                label={timer}
                color="error"
                sx={{
                  fontSize: matches ? "30px" : "20px",
                  padding: "2rem",
                  fontFamily: "Audiowide",
                }}
              ></Chip>
            </>
          )}
          {!data && <Skeleton height="100px" width="500px" />}
        </Box>

        {/* start cloning button */}
        <Stack direction="row" spacing={4}>
          {!isLoading && (new Date().getTime() >= getCurrentRoundStartTime() && (new Date()).getTime() < getCurrentRoundEndTime()) && (
            <>
              <Button
                color="warning"
                variant="contained"
                size="large"
                
                onClick={handleOpen2}
              >
                Start Cloning
              </Button>
            </>
          )}
          {!isLoading && (
            <>
              <Button
                color="warning"
                variant="contained"
                size="large"
                onClick={handleOpen}
              >
                View Results
              </Button>
            </>
          )}

          {/* MODAL */}
          {/* RESULTS */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
          >
            <Fade in={open}>
              <Box sx={style}>      
                <Typography
                  id="transition-modal-title"
                  variant="h5"
                  component="h2"
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    fontFamily: "Audiowide",
                  }}
                >
                  Round-Wise Results
                </Typography>
                {data && (
                  <Typography
                    component="div"
                    id="transition-modal-description"
                    sx={{
                      mt: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "2rem",
                    }}
                  >
                    <Box
                      component="div"
                      w="100%"
                      textAlign="center"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1.2rem",
                        width: "100%",
                        fontFamily: "Audiowide",
                      }}
                    >
                      <Typography variant="h6">Round 1</Typography>
                      <Typography>
                        {new Date().getTime() >
                        new Date(process.env.REACT_APP_RESULT1
                          )? data.data.data.round2
                            ? "Qualified"
                            : "Disqualified"
                          : "Yet to be disclosed"}
                      </Typography>
                      {new Date().getTime() >
                      new Date(process.env.REACT_APP_RESULT1 )? (
                        data.data.data.round2 ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CancelIcon color="error" />
                        )
                      ) : (
                        <TimerIcon color="warning" />
                      )}
                    </Box>
                    <Box
                      component="div"
                      textAlign="center"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1.2rem",
                        width: "100%",
                      }}
                    >
                      <Typography variant="h6">Round 2</Typography>
                      <Typography>
                        {new Date().getTime() >
                        new Date(process.env.REACT_APP_RESULT2
                          )? data.data.data.round3
                            ? "Qualified"
                            : "Disqualified"
                          : "Yet to be disclosed"}
                      </Typography>
                      {new Date().getTime() >
                      new Date(process.env.REACT_APP_RESULT2 )? (
                        data.data.data.round3 ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CancelIcon color="error" />
                        )
                      ) : (
                        <TimerIcon color="warning" />
                      )}
                    </Box>
                    <Box
                      component="div"
                      w="100%"
                      textAlign="center"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1.2rem",
                        width: "100%",
                      }}
                    >
                      <Typography variant="h6">Round 3</Typography>
                      <Typography>
                        {new Date().getTime() >
                        new Date(process.env.REACT_APP_RESULT3
                          )? data.data.data.position!==-1
                            ? data.data.data.position
                            : "Disqualified"
                          : "Yet to be disclosed"}
                      </Typography>
                      {new Date().getTime() >
                      new Date(process.env.REACT_APP_RESULT3 )? (
                        data.data.data.position!==-1
                            ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CancelIcon color="error" />
                        )
                      ) : (
                        <>
                          <TimerIcon color="warning" />
                        </>
                      )}
                    </Box>
                  </Typography>
                )}
              </Box>
            </Fade>
          </Modal>

          {/* INSTRUCTIONS FOR EXAM */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open2}
            onClose={handleClose2}
            closeAfterTransition
          >
            <Fade in={open2}>
              <Box sx={style}>
                {data && (
                  <>
                    <Typography
                      id="transition-modal-title"
                      variant="h4"
                      component="h2"
                      sx={{ width: "100%", textAlign: "center" }}
                    >
                      Instructions for the exam
                    </Typography>
                    <Instructions />
                    <Box sx={{ width: "100%", textAlign: "center" }}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleCloning}
                      >
                        Start Now
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </Fade>
          </Modal>
        </Stack>

        {/* socials */}
        <Socials/>
      </Stack>

      {/* right side */}
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        width={matches?"50%":'100%'}
        color="white"
      >
        <Typography variant="h4" sx={{ fontFamily: "Audiowide",width:"100%",textAlign:"center" }}>
          {round==='0'?'Results': 'Leaderboard'} {!round==='0'&&`for Round ${round}`}
        </Typography>
        <Leaderboard round={round}/>
      </Stack>
      
      {/* snackbar */}
      <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'center' }} open={open3} autoHideDuration={3000} onClose={handleClose3} key="bottom center">
        <Alert onClose={handleClose3} severity={errorMessage?"error":"success"} sx={{ width: "100%" }}>
          {errorMessage? errorMessage:message}
        </Alert>
      </Snackbar>

    </Stack>
  );
}

export default TestStarter;
