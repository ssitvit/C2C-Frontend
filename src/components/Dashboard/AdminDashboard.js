import {  Typography } from "@mui/material";
import React, { useEffect } from "react";
import {  Route, Routes, useNavigate } from "react-router-dom";
import Actions from "../Admin/Actions";
import Attendance from "../Admin/Attendance";
import Evaluation from "../Admin/Evaluation";

import Rounds from "../Admin/Rounds";
import { useFetch } from "../Hooks/useFetch";
function AdminDashboard() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch(
    `https://${process.env.REACT_APP_BASE_URL}/admin/checkauth`,
    "POST"
  );
  useEffect(() => {
    //check if logged in
    if (data && !data.success) {
      navigate("/admin/login");
    } else {
      console.log(data);
    }
  });

  return (
    <>
      <Rounds />
      
      <Routes>
        <Route exact path="/" element={<Typography variant="h4" color="white">CHOOSE A ROUND TO START</Typography>}/>
        <Route exact path="round/:id/*" element={<Actions />}>
          <Route exact path="" element={<Attendance/>}/>
          <Route
            path="submitAttendance"
            element={<Attendance/>}
          />
          <Route path="evaluate" element={<Evaluation/>} />
          </Route>
      </Routes>
    </>
  );
}

export default AdminDashboard;
