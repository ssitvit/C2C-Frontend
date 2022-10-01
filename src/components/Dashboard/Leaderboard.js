import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
function Leaderboard(props) {
  const [array, setArray] = useState([]);
  const { width, height } = useWindowSize();
  useEffect(() => {
    let url = `https://${process.env.REACT_APP_BASE_URL}/user/getScoreSort`;
    fetch(url, {
      method: "POST",
      credentials: "include",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ round: props.round === "0" ? 3 : props.round }),
    })
      .then((res) => res.json())
      .then((data) => {
        setArray(data.data.data);
      });
  }, [props.round]);
  return (
    <Stack spacing={4} style={{ fontFamily: "Audiowide" }}>
      {/* {new Date().getTime()>=new Date(process.env.REACT_APP_RESULT3
                          ).getTime()&&<Confetti width={width} height={height} tweenDuration={2000}/>} */}
      {props.round === "0" && (
        <Confetti width={width} height={height} tweenDuration={5000} />
      )}
      {/* {array &&
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
            }))} */}
      <Stack direction="row">
        <div style={{ textAlign: "center", width: "100px" }}>1.</div>
        <div style={{ width: "100%" }}>Likhit Ajeesh</div>
      </Stack>
      <Stack direction="row">
        <div style={{ textAlign: "center", width: "100px" }}>2.</div>
        <div style={{ width: "100%" }}>Aryan Shah</div>
      </Stack>
      <Stack direction="row">
        <div style={{ textAlign: "center", width: "100px" }}>3.</div>
        <div style={{ width: "100%" }}>Yashaswini Shivathaya</div>
      </Stack>
    </Stack>
  );
}

export default Leaderboard;
