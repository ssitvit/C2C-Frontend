import React from 'react'

function Instructions() {
  return (
    <ul style={{padding:0,display:"flex",flexDirection:"column",justifyContent:"center",gap:"2rem",listStyle:"none",width:"100%",fontFamily:"sans-serif"}}>
        <li>Make sure that you are using Chrome/Firefox as your web browser.</li>
        <li>The test is available for the duration of 60 mins.</li>
        <li>The timer wont stop in case of network loss/error.</li>
        <li>The test consists of two questions, both of which are compulsory.</li>
        <li>If you do not submit the code before proceeding to the next question, it wont be accepted for evaluation.</li>
    </ul>
  )
}

export default Instructions