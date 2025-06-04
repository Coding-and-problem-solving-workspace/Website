"use client";
import { io } from "socket.io-client";
import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Topbar from "./Topbar";
import { CODE_SNIPPETS } from "./data/constants";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import TestCases from "./PracticeProblems/TestCases";

const socket = io("http://localhost:9000");

export default function RemoteCodeEditor({ testCases, problemId }) {
  const { currentUser, userLoggedIn } = useAuth();
  const editorRef = useRef(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(CODE_SNIPPETS[language]);
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [error, setError] = useState(null);
  const [editorHeight, setEditorHeight] = useState(40);
  const [results, setResults] = useState(testCases.map(() => "-"));

  const onMount = (editor) => {
    editorRef.current = editor;
    const model = editor.getModel();
    const lineCount = model.getLineCount();

    editor.setPosition({
      lineNumber: lineCount,
      column: model.getLineMaxColumn(lineCount),
    });
    editor.focus();
  };

  const onFontSizeChange = (val) => setFontSize(val);
  const onThemeChange = (val) => setTheme(val);
  const onLanguageChange = (val) => {
    setLanguage(val);
    setCode(CODE_SNIPPETS[val]);
  };

  const handleVerticalResizeEditor = (e) => {
    e.preventDefault();
    const initialY = e.clientY;

    const handleMouseMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - initialY;
      const totalHeight = window.innerHeight;
      const newEditorHeight = Math.min(
        Math.max(editorHeight + (deltaY / totalHeight) * 100, 10),
        90
      );
      setEditorHeight(newEditorHeight);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const runCode = async () => {
    if (!userLoggedIn) {
      return;
    }
    if (!editorRef.current) {
      console.error("Editor reference is null");
      return;
    }
    try {
      const token = await currentUser?.getIdToken();
      console.log({
        problemId,
        code: editorRef.current.getValue(),
        testCases,
        language,
      });
      const resp = await axios.post(
        "http://localhost:9000/api/v1/submission",
        {
          problemId,
          code: editorRef.current.getValue(),
          testCases,
          language,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp?.data);
      console.log("Tokens returned:", resp.data.tokens);

      socket.on("submissionResult", (results) => {
        console.log("Final Output:", results);
        const finalres = [];
        results.forEach((result) => {
          console.log(`Token: ${result.token}, Output: ${result.stdout}`);
          if (result.status_id === 3) {
            finalres.push("Passed");
          } else {
            finalres.push("Failed");
          }
        });
        setResults(finalres);
      });
    } catch (error) {
      console.error("Error submitting code:", error);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 3,
        marginX: 2,
        border: "1px solid #0f8b96",
        position: "relative",
      }}
    >
      <Topbar
        language={language}
        theme={theme}
        fontSize={fontSize}
        onFontSizeChange={onFontSizeChange}
        onThemeChange={onThemeChange}
        onLanguageChange={onLanguageChange}
        editorRef={editorRef}
        setOutput={() => {}}
        input=""
        error={error}
        setError={setError}
        pageType={"problem-page"}
      />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: `${editorHeight}vh`,
        }}
      >
        <Editor
          theme={theme}
          language={language}
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            fontSize: fontSize,
            minimap: { enabled: false },
            contextmenu: false,
            scrollBeyondLastLine: false,
          }}
          onMount={onMount}
        />

        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "5px",
            backgroundColor: theme === "vs-dark" ? "#3b3b3b" : "#ccc",
            cursor: "ns-resize",
          }}
          onMouseDown={handleVerticalResizeEditor}
        />
      </Box>
      <TestCases testCases={testCases} runCode={runCode} results={results} theme={theme} />
    </Box>
  );
}
