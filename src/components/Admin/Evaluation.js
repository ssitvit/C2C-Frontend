import {
  Button,
  Skeleton,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import Submission from "./Submission";

function Evaluation() {
  // {
  //     "userDetails":"63282a61a962e3cb947447f2",
  //     "roundno":3,
  //     "round":true
  // }
  const params = useParams();
  const round = params.id;
  const { data, isLoading, error } = useFetch(
    `https://${process.env.REACT_APP_BASE_URL}/admin/user/getAllSavedCode`,
    "POST",
    JSON.stringify({ round:round })
  );
  useEffect(()=>{
    if(error){
      console.log('Error getting codes');
    }
  })
  return (
    <Stack spacing={4} style={{ padding: "2rem", margin: "2rem" }}>
      {round===1&&<Button>Hello</Button>}
      {!isLoading &&
        data &&
        data.data.data.map((user, index) => {
          return (
            <Submission user={user} index={index} round={round} key={user._id}/>
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

export default Evaluation;
