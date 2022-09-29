import {  Alert,Skeleton, Snackbar, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import {  Route, Routes, useNavigate } from "react-router-dom";
import Actions from "../Admin/Actions";
import Attendance from "../Admin/Attendance";
import Evaluation from "../Admin/Evaluation";

import Rounds from "../Admin/Rounds";
import { useFetch } from "../Hooks/useFetch";
function AdminDashboard() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  const { data, isLoading, error } = useFetch(
    `https://${process.env.REACT_APP_BASE_URL}/admin/checkauth`,
    "POST"
  );
  useEffect(() => {
    //check if logged in
    if ((data && !data.success) || error) {
      setOpen(true);
      setErrorMessage(data.data.error);
      setTimeout(()=>{navigate("/admin/login")},2000);
    }
  },[open,data,error,navigate]);

  return (<>
  {isLoading && <>
  <Skeleton height="80vh"/>
  </>}
    {!isLoading &&
    <>
      <Rounds />
      <Routes>
        <Route exact path="/" element={
        <Stack sx={{background:"rgb(255,255,255,0.3)",color:"white",padding:"1.2rem",borderRadius:"1rem",boxShadow:"5px 5px 4px 0 #250101", margin:"2rem"}} direction="row" alignItems="center" justifyContent="center" minHeight="50vh">Choose a Round</Stack>
        }/>
        <Route exact path="round/:id/*" element={<Actions />}>
          <Route exact path="" element={<Attendance/>}/>
          <Route
            path="submitAttendance"
            element={<Attendance/>}
          />
          <Route path="evaluate" element={<Evaluation/>} />
          </Route>
      </Routes>
    </>}
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
    </>
  );
}

export default AdminDashboard;
