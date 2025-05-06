import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { markdown } from "@codemirror/lang-markdown";
import { dracula, okaidia } from "@uiw/codemirror-theme-dracula";
import ACTIONS from "../Actions";
const Editor = ({ socketRef, roomId }) => {
  const languageMap = {
    javascript: javascript(),
    python: python(),
    java: java(),
    cpp: cpp(),
    html: html(),
    css: css(),
    markdown: markdown(),
  };
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("dracula");
  const [code, setcode] = useState("console.log('hello world!');");

  const onChange = React.useCallback((value, viewUpdate) => {
    const init = () => {
      socketRef.current.emit(ACTIONS.CODE_CHANGE, {
        roomId,
        value,
      });
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ roomId, value }) => {
        console.log(value);
        setcode(value);
      });
    };

    if (socketRef.current != null) {
      init();
    }
  }, []);
  return (
    <div>
      <div>
        <select onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="markdown">Markdown</option>
        </select>
      </div>
      <CodeMirror
        value={code}
        style={{
          height: "100vh-20vh",
          fontSize: "16px",
          lineHeight: 5,
          paddingTop: "20px",
        }}
        extensions={[languageMap[language]]}
        onChange={onChange}
        theme={dracula}
      />
    </div>
  );
};
export default Editor;
