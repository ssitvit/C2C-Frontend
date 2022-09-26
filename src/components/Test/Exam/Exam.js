import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Modal,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "./Editor";
import ErrorIcon from "@mui/icons-material/Error";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  gap: "1rem",
  borderRadius: "1.2rem",
};
function Exam(props) {
  const params = useParams();
  const round = params.id;
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // to open snackbar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  // to get the questions and the current question number
  const [qnum, setQnum] = useState(0);
  const [qLinks, setQlinks] = useState([]);
  const [timer, setTimer] = useState();
  // for modal
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const htmlTemplate = `<body>
    <!-- Start writing your code here -->
    </body>`;

  const cssTemplate = `body{
  height:90vh;
  display:flex;
  align-items:center;
  justify-content:center;
}`;

  const [htmlObj, setHtmlObj] = useState(
    sessionStorage.getItem("html")
      ? sessionStorage.getItem("html")
      : htmlTemplate
  );
  const [cssObj, setCssObj] = useState(
    sessionStorage.getItem("css") ? sessionStorage.getItem("css") : cssTemplate
  );
  const [userObj, setUserObj] = useState("");

  // const { data, isLoading, error } = useFetch(
  //   "https://c2c-backend.vercel.app/save/check",
  //   "POST",
  //   JSON.stringify({ round: qLinks.length>1?round*10+qnum:round })
  // );
  // submitting the final code.
  const handleSubmit = useCallback(async () => {
    setOpen(false);
    setLoading(true);
    setMessage("");
    setErrorMessage("");
    let url = `https://${process.env.REACT_APP_BASE_URL}/save/submit`;
    let response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({
        html: htmlObj,
        css: cssObj,
        round: qLinks.length === 1 ? round : 10 * round + qnum,
      }),
    });

    let data = await response.json();
    if (data.success) {
      setOpen(true);
      setMessage("Code Submitted Successfully");
      setLoading(false);
      if (qLinks.length === 1 || (qnum + 1) % qLinks.length === 0) {
        setTimeout(() => {
          navigate("/dashboard/user");
        }, 800);
        sessionStorage.clear();
      } else {
        setHtmlObj(htmlTemplate);
        setCssObj(cssTemplate);
        qLinks.shift();
        setQnum((prev) => prev + 1);
        sessionStorage.clear();
      }
    } else {
      setOpen(true);
      setErrorMessage(data.data.error);
      setLoading(false);
      if (qLinks.length === 1 || (qnum + 1) % qLinks.length === 0) {
        setTimeout(() => {
          navigate("/dashboard/user");
        }, 2000);
      } else {
        setQnum((prev) => prev + 1);
      }
    }
    handleClose2();
  },[cssObj,cssTemplate,htmlObj, htmlTemplate, navigate, qLinks, qnum,round]);
  // setting deadline times
  const round1StartTime = new Date(process.env.REACT_APP_ROUND1_S);
  const round2StartTime = new Date(process.env.REACT_APP_ROUND2_S);
  const round3StartTime = new Date(process.env.REACT_APP_ROUND3_S);

  const round1EndTime = new Date(process.env.REACT_APP_ROUND1_E);
  const round2EndTime = new Date(process.env.REACT_APP_ROUND2_E);
  const round3EndTime = new Date(process.env.REACT_APP_ROUND3_E);

  // timer

  const Ref = useRef(null);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
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

  const getDeadTime = (n) => {
    let deadline = round1EndTime;
    if (n === 1) deadline = round1EndTime;
    else if (n === 2) deadline = round2EndTime;
    else if (n === 3) deadline = round3EndTime;
    else deadline = Date().now;
    return deadline;
  };

  const getCurrentRoundEndTime = () => {
    if (round === "1") {
      return round1EndTime;
    } else if (round === "2") {
      return round2EndTime;
    } else {
      return round3EndTime;
    }
  };

  const getCurrentRoundStartTime = () => {
    if (round === "1") {
      return round1StartTime;
    } else if (round === "2") {
      return round2StartTime;
    } else {
      return round3StartTime;
    }
  };

  const checkSubmitted = useCallback(async (n) => {
    let url = `https://${process.env.REACT_APP_BASE_URL}/save/check`;
    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ round: round }),
    });
    let data = await response.json();
    if(!data.success){
      setMessage('');
      setErrorMessage('');
      handleSubmit();
    }
  },[round,handleSubmit]);
  useEffect(() => {
    setOpen(false);
    setErrorMessage("");
    setMessage("");
    const finalObj = `<html><head><style>${cssObj}</style></head>${htmlObj}</html>`;
    setUserObj(finalObj);
    checkSubmitted();
    // check if the user has already submitted the test;
    // if (error) {
    //   setOpen(true);
    //   setErrorMessage(error);
    //   qnum===0?setQnum((prev) => prev + 1):
    //   setTimeout(() => {
    //     navigate("/dashboard/user");
    //   }, 2000);
    // }
    // check if the test time is over
    if (
      new Date().getTime() > getCurrentRoundEndTime() ||
      new Date().getTime() < getCurrentRoundStartTime()
    ) {
      setLoading(true);
      setErrorMessage("Test Unavailable");
      setOpen(true);
      setTimeout(() => {
        navigate("/dashboard/user");
      }, 2000);
    } else {
      setOpen(false);
      //  to set the timer
      clearTimer(getDeadTime(parseInt(round)));
      // get the questions as image string base64
      let getqArray = async () => {
        let url = `https://${process.env.REACT_APP_BASE_URL}/save/getimage`;

        let response = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ round: round }),
        });

        let data = await response.json();

        if (data.success) {
          setOpen(false);
          setErrorMessage("");
          setMessage("");
          setLoading2(false);
          setQlinks(data.data.data);
          // checkSubmitted();
        } else {
          setLoading2(false);
          setErrorMessage("Could not fetch Question");
          setOpen(true);
          setTimeout(() => {
            navigate("/dashboard/user");
          }, 2000);
        }
      };
      getqArray();
    }
  }, [htmlObj, cssObj, round,qnum]);
  return (
    <>
      {(loading2 || loading) && (
        <Stack>
          <Stack direction="row" spacing={2}>
            <Skeleton animation="wave" height="50vh" width="50%" />
            <Skeleton animation="wave" height="50vh" width="50%" />
          </Stack>

          <Skeleton animation="wave" height="30vh" />
        </Stack>
      )}
      {!loading2 && !loading && (
        <Stack direction="column" alignItems="center">
          <Stack
            width="100%"
            sx={{
              color: "white",
              marginLeft: "2rem",
              marginRight: "2rem",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ marginRight: "1rem" }}
            >
              <Typography
                sx={{
                  fontFamily: "Audiowide",
                  width: "fit-content",
                }}
              >
                Time Left: {timer}
                {timer === "00m : 00s" ? handleSubmit() : ""}
              </Typography>
            </Stack>

            <Stack
              direction={matches ? "row" : "column"}
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{ background: "black", height: "100%", padding: "1.5rem" }}
              // width="100%"
            >
              {/* tabs */}
              <Box sx={{ width: "50vw", height: "80vh", overflow: "auto" }}>
                <TabContext value={value}>
                  <Box>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        sx={{ fontFamily: "Audiowide", color: "white" }}
                        label="HTML"
                        value="3"
                      />
                      <Tab
                        sx={{ fontFamily: "Audiowide", color: "white" }}
                        label="CSS"
                        value="2"
                      />
                      <Tab
                        sx={{ fontFamily: "Audiowide", color: "white" }}
                        label="QUESTION"
                        value="1"
                      />
                    </TabList>
                  </Box>
                  <TabPanel value="3" sx={{ padding: 0 }}>
                    <Editor type="html" obj={htmlObj} setObj={setHtmlObj} />
                  </TabPanel>
                  <TabPanel value="2" sx={{ padding: 0 }}>
                    <Editor type="css" obj={cssObj} setObj={setCssObj} />
                  </TabPanel>
                  <TabPanel value="1">
                    <Stack
                      style={{
                        border: "none",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ color: "white", fontFamily: "Audiowide" }}
                      >
                        Question {qnum + 1}
                      </Typography>

                      <Box
                        style={{
                          width: "100%",
                          color: "black",
                          backgroundColor: "white",
                          height: "500px",
                        }}
                      >{loading2 && <Skeleton height="50vh"/>}
                        
                        {!loading2 &&
                        <img
                          src={qLinks[qnum]}
                          alt=""
                          height="100%"
                          width="100%"
                        />}
                      </Box>
                    </Stack>
                  </TabPanel>
                </TabContext>
              </Box>
              {/* user output */}
              <Stack
                style={{
                  width: "50vw",
                  height: "80vh",
                  border: "none",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="h4"
                    sx={{ color: "white", fontFamily: "Audiowide" }}
                  >
                    Your Output
                  </Typography>
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleOpen2}
                      height="30px"
                    >
                      Submit and move to next
                    </Button>
                  </ButtonGroup>
                </Stack>
                <iframe
                  sandbox="allow-scripts"
                  style={{
                    width: "100%",
                    border: "none",
                    height: "100%",
                    color: "white",
                    background: "white",
                    // margin: "2rem",
                  }}
                  srcDoc={userObj}
                  title="userResponse"
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
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
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            This action cannot be undone <ErrorIcon color="warning" />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please make sure you have verified your code before final
            submission.This action cannot be undone.
          </Typography>
          <Typography>
            Total Questions in this round: {qLinks.length}
          </Typography>
          <Typography>You are on question number: {qnum + 1}</Typography>
          <Button variant="contained" color="error" onClick={handleSubmit}>
            {!loading && "Submit for Evaluation"}
            {loading && (
              <>
                <CircularProgress thickness={6} color="inherit" size="1.2rem" />
                <Typography
                  variant="subtitle2"
                  style={{ marginLeft: "0.5rem" }}
                >
                  Submitting Code...
                </Typography>
              </>
            )}
          </Button>
        </Box>
      </Modal>
    </>
  );
}
export default Exam;
