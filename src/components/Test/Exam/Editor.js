import { Stack, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { color} from "@uiw/codemirror-extensions-color";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import "./editor.css";


function Editor(props) {
  const { type, obj, setObj } = props;
  const [value, setValue] = useState(obj);
  useEffect(() => {
    setObj(value);
  },[setObj,value]);
  const onChange = React.useCallback(
    (value, viewUpdate) => {
      sessionStorage.setItem(type, value);
      setValue(value);
    },
    [type]
  );
  return (
    <Stack width="100%" style={{ paddingTop: "0" }}>
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
        height="100%"
        width="100%"
        extensions={[
          type === "html" ? html({ jsx: true }) : css({ jsx: true }),
          color,
        ]}
        onChange={onChange}
        placeholder={type === "html" ? "Enter Html" : "Enter Css"}
        theme={githubDark}
      />
    </Stack>
  );
}

export default Editor;
