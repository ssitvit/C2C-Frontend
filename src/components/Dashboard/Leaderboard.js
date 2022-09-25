import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useFetch } from "../Hooks/useFetch";

function Leaderboard() {
  
  const [array,setArray] = useState([]);
  const {data, isLoading, error} = useFetch();
  return (
    <div style={{ fontFamily: "Audiowide" }}>
      {array.map((user) => {
        return (
          <Stack direction="row" key={user.id}>
          <div style={{textAlign:"center",width:"100px"}}>
            {user.id}
          </div>
          <div style={{width:"100%"}}>
          {user.name}
          </div>
          </Stack>
        );
      })}
    </div>
  );
}

export default Leaderboard;
