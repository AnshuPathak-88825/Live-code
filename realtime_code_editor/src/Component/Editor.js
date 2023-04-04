import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula, okaidia } from "@uiw/codemirror-theme-dracula";
import ACTIONS from "../Actions";
const Editor = ({ socketRef, roomId }) => {
  const [code, setcode] = useState("console.log('hello world!');");
  console.log(code);
  // useEffect(() => {
  //   const init = () => {
  //     socketRef.current.emit(ACTIONS.CODE_CHANGE, {
  //       roomId,
  //       code,
  //     });
  //   };
  //   if (socketRef.current != null) {
  //     init();
  //   }
  // }, [socketRef.current]);
  const onChange = React.useCallback((value, viewUpdate) => {
    const init = () => {
      socketRef.current.emit(ACTIONS.CODE_CHANGE, {
        roomId,
        value,
      });
    };
    if (socketRef.current != null) {
      init();
    }
  }, []);
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
      onChange={onChange}
      theme={dracula}
    />
  );
};
export default Editor;
