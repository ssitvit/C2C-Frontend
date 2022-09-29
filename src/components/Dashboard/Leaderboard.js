import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { Error, Propane } from "@mui/icons-material";
function Leaderboard(props) {
  const [array, setArray] = useState([]);
  const {width,height} = useWindowSize();
  useEffect(() => {
    let url = `https://${process.env.REACT_APP_BASE_URL}/user/getScoreSort`;
    fetch(url, {
      method: "POST",
      credentials: "include",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ round: props.round==='0'?3:props.round }),
    })
      .then((res) => res.json())
      .then((data) => {
        setArray(data.data.data);
        console.log(array);
      });
  }, [props.round]);
  return (
    <div style={{ fontFamily: "Audiowide" }}>
      {/* {new Date().getTime()>=new Date(process.env.REACT_APP_RESULT3
                          ).getTime()&&<Confetti width={width} height={height} tweenDuration={2000}/>} */}
      {props.round==='3'&&<Confetti width={width} height={height} tweenDuration={5000}/>}
      {array &&
        (array.length === 0
          ? "Nothing to show yet :/"
          : array.slice(0, 10).map((user, index) => {
              if (
                props.round === 1 &&
                (user[`round${props.round}0Score`] ||
                user[`round${props.round}1Score`])
              ) {
                return (
                  <Stack direction="row" key={user._id}>
                    <div style={{ textAlign: "center", width: "100px" }}>
                      {index + 1}.
                    </div>
                    {
                      <div style={{ width: "100%" }}>
                        {user.first_name} {user.last_name}
                      </div>
                    }
                  </Stack>
                );
              } else {
                return (
                  <Stack direction="row" key={user._id}>
                    <div style={{ textAlign: "center", width: "100px" }}>
                      {index + 1}.
                    </div>
                    {
                      <div style={{ width: "100%" }}>
                        {user.first_name} {user.last_name}
                      </div>
                    }
                  </Stack>
                );
              }
            }))}
    </div>
  );
}

export default Leaderboard;
