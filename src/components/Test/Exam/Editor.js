import { Stack, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { color} from '@uiw/codemirror-extensions-color';
import { createTheme } from '@uiw/codemirror-themes';
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { tags as t } from '@lezer/highlight';
import "./editor.css";

const myTheme = createTheme({
  dark: 'dark',
  settings: {
    background: '#000',
    foreground: 'white',
    caret: 'white',
    selection: '#250101',
    selectionMatch: '#a1a1a1',
    gutterBackground: '#000',
    gutterForeground: '#4D4D4C',
    gutterBorder: '#000',
    lineHighlight: '#232323',
  },
  styles: [
    { tag: t.comment, color: 'green' },
    { tag: t.definition(t.typeName), color: '#194a7b' },
    { tag: t.typeName, color: '#194a7b' },
    { tag: t.tagName, color: 'orange' },
    { tag: t.variableName, color: '#1a00db' },
  ],
});

function Editor(props) {
  const { type, obj, setObj } = props;
  const [value, setValue] = useState(obj);
  useEffect(() => {
    setObj(value);
  });
  const onChange = React.useCallback((value, viewUpdate) => {
    sessionStorage.setItem(type, value);
    setValue(value);
  }, [type]);
  return (
    <Stack width="50%" style={{border:"1px solid grey",padding:"2rem",paddingTop:"0"}}>
      <Typography variant="h4" color="white" margin="0.5rem">
        {type.charAt(0).toUpperCase() + type.substr(1).toLowerCase()}
      </Typography>
      {/* <TextareaAutosize
        className="outline"
        rows={50}
        style={{
          width: "50vw",
          background: "transparent",
          "&:focus": { outline: "none" },
          color: "white",
          height:"25vh",
          overflowY:"scroll",
        }}
        value={value ? value : ""}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      /> */}
      <CodeMirror
      className="outline"
        value={value ? value : ""}
        maxHeight="50vh"
        minHeight="50vh"
        width="100%"
        extensions={[type==="html"?html({ jsx: true }):css({ jsx: true }),color]}
        onChange={onChange}
        placeholder={type==="html"?"Enter Html":"Enter Css"}
        theme={myTheme}
      />
    </Stack>
  );
}

export default Editor;
