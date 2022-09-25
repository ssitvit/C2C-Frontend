import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";

function Attendance() {
  // {
  //     "userDetails":"63282a61a962e3cb947447f2",
  //     "roundno":3,
  //     "round":true
  // }
  const params = useParams();
  const round = params.id;
  const { data, isLoading, error } = useFetch(
    `https://${process.env.REACT_APP_BASE_URL}/admin/getScoreSort`,
    "POST",
    JSON.stringify({ round: round })
  );
  const handleSubmit = async (userDetails,roundno,round)=>{
    let url = `https://${process.env.REACT_APP_BASE_URL}/admin/setroundpresent`;
    let response = await fetch(url,{
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userDetails,roundno:round,round})
    });
    let data= await response.json();
    console.log(data);
  }
  useEffect(() => {
    console.log(data);
  });
  return (
    <Stack spacing={4} style={{padding:"2rem",margin:"2rem"}}>
      {!isLoading &&
        data &&
        data.data.data.map((user, index) => {
            return (
            <Stack sx={{background:"white",padding:"1.2rem",borderRadius:"1rem"}} direction="row" alignItems="center" justifyContent="space-between" key={user._id} >
              <Typography>{index + 1}.</Typography>
              <Typography>{user.first_name}</Typography>
              <Typography> {user[`round${round}`]?"Present":"Absent"}</Typography>
              <Button variant="contained" onClick={()=>{handleSubmit(user._id,round,true)}}>Mark Present</Button>
              <Button variant="contained" onClick={()=>{handleSubmit(user._id,round,false)}}color="error">Mark Absent</Button>
            </Stack>
          );
        })}
    </Stack>
  );
}

export default Attendance;
