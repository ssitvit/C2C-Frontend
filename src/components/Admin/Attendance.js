import {  Skeleton, Stack} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import Attended from "./Attended";

function Attendance() {
  // {
  //     "userDetails":"63282a61a962e3cb947447f2",
  //     "roundno":3,
  //     "round":true
  // }
  const params = useParams();
  const round = params.id;
  const { data, isLoading, error } = useFetch(
    `https://${process.env.REACT_APP_BASE_URL}/admin/getAllUsersData`
  );
  useEffect(()=>{
    if(error){
      console.log(error);
    }
  },[])
  return (
    <Stack spacing={4} style={{padding:"2rem",margin:"2rem"}}>
      {!isLoading &&
        data &&
        data.data.data.map((user, index) => {
            return (
            <Attended key={user._id} user={user} round={round} index={index}/>
          );
        })}
        {!isLoading &&
        data && data.data.data.length===0 &&
        <Stack sx={{background:"rgb(255,255,255,0.3)",color:"white",padding:"1.2rem",borderRadius:"1rem",boxShadow:"5px 5px 4px 0 #250101"}} direction="row" alignItems="center" justifyContent="center" height="30vh">Nothing to display</Stack>
        }
        {isLoading && <Skeleton height="50vh"/>}
    </Stack>
  );
}

export default Attendance;
