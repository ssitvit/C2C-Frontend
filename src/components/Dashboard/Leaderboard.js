import { Stack } from "@mui/material";
import React from "react";

function Leaderboard() {
  
  const array = [
    { id: 1, name: "Aryan" },
    { id: 2, name: "Satvik" },
  ];
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
