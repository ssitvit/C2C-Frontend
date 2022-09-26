import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

function Leaderboard(props) {
  const [array,setArray] = useState([]);
  useEffect(() => {
    let url = `https://${process.env.REACT_APP_BASE_URL}/user/getScoreSort`;
    fetch(url,{
      method:'POST',
      credentials:'include',
      cache:'reload',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ round: props.round })
    }).then(res => res.json()).then(data => {
      setArray(data.data.data);
      console.log(array);
    })
  }, [props.round]);
  return (
    <div style={{ fontFamily: "Audiowide" }}>
      {array.length === 0
        ? "Nothing to show yet :/"
        : array.slice(0,10).map((user,index) => {
            return (
              <Stack direction="row" key={user._id}>
                <div style={{ textAlign: "center", width: "100px" }}>
                  {index+1}.
                </div>
                <div style={{ width: "100%" }}>{user.first_name} {user.last_name}</div>
              </Stack>
            );
          })}
    </div>
  );
}

export default Leaderboard;
