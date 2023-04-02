import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula, okaidia } from "@uiw/codemirror-theme-dracula";
const Editor = () => {
  const [code, setcode] = useState("console.log('hello world!');");

  let change = (e) => {
    setcode(e);
  };
  return (
    <CodeMirror
      value={code}
      style={{
        height: "100vh-20vh",
        fontSize: "16px",
        lineHeight: 5,
        paddingTop: "20px",
      }}
      extensions={[javascript({ jsx: true })]}
      onChange={change}
      theme={dracula}
    />
  );
};
export default Editor;
