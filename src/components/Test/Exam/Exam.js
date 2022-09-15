import { Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import Editor from "./Editor";

function Exam() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
    const htmlTemplate=
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <!-- Start writing your code here -->
        
    </body>
    </html>`
    const [htmlObj,setHtmlObj] = useState(htmlTemplate);
    const [cssObj,setCssObj] = useState(null);
    const [userObj,setUserObj] = useState("Hi everyone");
    
    useEffect(()=>{
        const finalObj = `<html><head><style>${cssObj}</style></head><body>${htmlObj}</body>`;
        setUserObj(finalObj);
    },[htmlObj,cssObj])
    console.log(userObj);
  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <Stack direction={matches?"row":"column"} alignItems="center" justifyContent="center" width="90%">
        <Editor type="html" obj ={htmlObj} setObj={setHtmlObj}/>
        <Editor type="css" obj ={cssObj} setObj={setCssObj}/>
      </Stack>
      <Stack direction={matches?"row":"column"} alignItems="center" justifyContent="center" spacing={8} >
        <iframe
        sandbox="allow-scripts"
        style={{ width:"80%",border:"none",height:"500px",color: "white",backgroundColor: "rgba(255,255,255,0.3",margin:"2rem"}}
        srcDoc={userObj}
        title="userResponse"
      />
      <iframe
        sandbox="allow-scripts"
        style={{ width:"80%",border:"none",height:"500px",color: "white",backgroundColor: "rgba(255,255,255,0.3"}}
        srcDoc={userObj}
        title="userResponse2"
      />
      </Stack>
    </Stack>
  );
}
export default Exam;
