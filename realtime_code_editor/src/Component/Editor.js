import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { markdown } from "@codemirror/lang-markdown";

import { dracula } from "@uiw/codemirror-theme-dracula";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { monokai } from "@uiw/codemirror-theme-monokai";
import { nord } from "@uiw/codemirror-theme-nord";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";

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
  const themeMap = {
    dracula: dracula,
    okaidia: okaidia,
    monokai: monokai,
    nord: nord,
    tokyoNight: tokyoNight,
  };
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("dracula");
  const [code, setcode] = useState(`function debounce(func, delay) {
let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const fetchData = () => {
  console.log("Fetching data from server...");
};

const debouncedFetch = debounce(fetchData, 1000);

window.addEventListener("resize", debouncedFetch);
`);

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
      <div className="flex justify-between items-center bg-gray-800 p-2">
        <select onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="markdown">Markdown</option>
        </select>
        <select onChange={(e) => setTheme(e.target.value)}>
          <option value="dracula">Dracula</option>
          <option value="okaidia">Okaidia</option>
          <option value="monokai">Monokai</option>
          <option value="nord">Nord</option>
          <option value="tokyoNight">Tokyo Night</option>
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
        theme={themeMap[theme]}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          foldGutter: true,
          lint: true,
        }}
      />
    </div>
  );
};
export default Editor;
