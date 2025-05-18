import React, { useEffect, useState } from "react";
import { coderunner } from "../utils/code_runner";
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
import { sql } from "@codemirror/lang-sql";
import { php } from "@codemirror/lang-php";
import { rust } from "@codemirror/lang-rust";
import {go} from "@codemirror/lang-go";
import ACTIONS from "../Actions";
const Editor = ({ socketRef, roomId,onCodechange }) => {
  const languageMap = [
    {
      name: "javascript",
      language: javascript(),
      id: 102,
      code: `console.log("hello")`,
    },

    { name: "python", language: python(), id: 92, code: `print("hello")` },
    {
      name: "java",
      language: java(),
      id: 91,
      code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello");
    }
  }`,
    },
    {
      name: "cpp",
      language: cpp(),
      id: 105,
      code: `#include <iostream>
using namespace std;
int main() {
  cout << "Hello World" << endl;
  return 0;
}`,
    },
    {
      name: "sql",
      language: sql(),
      id: 82,
      code: `SELECT * FROM users;`,
    },
    {
      name: "php",
      language: php(),
      id:98,
      code: `<?php
echo "Hello World!"; ?>`,
    },{
      name: "rust",
      language: rust(),
      id: 108,
      code: `fn main() {
    println!("Hello, world!");  
    }`,
    },
    {
      name: "go",
      language: go(),
      id: 107,
      code: `package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}`,
    }
  ];
  const themeMap = {
    dracula: dracula,
    okaidia: okaidia,
    monokai: monokai,
    nord: nord,
    tokyoNight: tokyoNight,
  };
  const [language, setLanguage] = useState(javascript());
  const [languageId, setLanguageId] = useState(0);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("dracula");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [code, setcode] = useState(languageMap[languageId].code);

  const onChange = React.useCallback(
    (value) => {
      setcode(value);
      onCodechange(value);
      if (socketRef.current) {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          value,
        });
      }
    },
  );

  useEffect(() => {
    if (!socketRef.current) return;

    const handleCodeChange = ({ value }) => {
        setcode(value);
    };
    socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
    };
  }, [socketRef.current]);

  const runCode = () => {
    setLoader(true);
    setOutput("");
    setError("");
    coderunner(code, input, languageMap[languageId].id)
      .then((result) => {
        if (result.decodedOutput) {
          setOutput(result.decodedOutput);
        } else if (result.decodedStderr) {
          setError(result.decodedStderr);
        } else if (result.decodedCompileOutput) {
          setError(result.decodedCompileOutput);
        } else {
          setError("Unknown error occurred.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    <div>
      <div className="flex justify-between items-center bg-gray-800 p-2">
        <select
          onChange={(e) => {
            const index = e.target.value;
            setcode(languageMap[index].code);
            setLanguageId(index);
          }}
        >
          {languageMap.map((lang, index) => (
            <option key={lang.id} value={index}>
              {lang.name}
            </option>
          ))}
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
          height: "80vh-20vh",
          fontSize: "16px",
          lineHeight: 5,
          paddingTop: "20px",
        }}
        extensions={[languageMap[languageId].language]}
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
      <div>
        <div>
          <textarea type="text" onChange={(e) => setInput(e.target.value)} />
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              runCode();
            }}
          >
            Run Code
          </button>
        </div>
        <div>{loader && <div>loading..</div>}</div>
        <div>{!loader && output && <div>{output}</div>}</div>
        <div>{!loader && error && <div>{error}</div>}</div>
      </div>
    </div>
  );
};
export default Editor;
