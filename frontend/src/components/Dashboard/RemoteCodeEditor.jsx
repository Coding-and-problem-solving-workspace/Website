"use client";
import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Topbar from "./Topbar";
import { CODE_SNIPPETS } from "./data/constants";
import { Box, TextField, Typography } from "@mui/material";

export default function RemoteCodeEditor() {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(CODE_SNIPPETS[language]);
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [error, setError] = useState(null);
  const [editorHeight, setEditorHeight] = useState(40);
  const [inputWidth, setInputWidth] = useState(50);
  const [outputWidth, setOutputWidth] = useState(50);
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");

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

  const handleHorizontalResizeInputOutput = (e) => {
    e.preventDefault();
    const initialX = e.clientX;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - initialX;
      const totalWidth = window.innerWidth;

      const newInputWidth = Math.min(
        Math.max(inputWidth + (deltaX / totalWidth) * 100, 20),
        80
      );
      const newOutputWidth = 100 - newInputWidth;

      if (newInputWidth + newOutputWidth <= 100) {
        setInputWidth(newInputWidth);
        setOutputWidth(newOutputWidth);
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
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
        setOutput={setOutputCode}
        input={inputCode}
        error={error}
        setError={setError}
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

      <Box
        sx={{
          display: "flex",
          marginTop: 2,
          width: "100%",
          height: `30vh`,
          backgroundColor: theme === "vs-dark" ? "#1e1e1e" : "#f5f5f5",
          border: "1px solid #0f8b96",
          borderRadius: "4px",
          padding: 1,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${inputWidth}%`,
            borderRight: "2px solid #4d4d4d",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: theme === "vs-dark" ? "#ffffff" : "#1e1e1e" }}
          >
            Input
          </Typography>
          <TextField
            multiline
            variant="outlined"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder=""
            InputProps={{
              style: {
                fontSize: fontSize,
                fontFamily: "monospace",
                backgroundColor: theme === "vs-dark" ? "#1e1e1e" : "#f5f5f5",
                color: theme === "vs-dark" ? "#ffffff" : "#000000",
                padding: "10px",
                height: "100%",
                borderRadius: "4px",
                boxShadow:
                  theme === "dark"
                    ? "0px 0px 10px rgba(0, 255, 0, 0.3)"
                    : "none",
                border: "none",
                overflow: "auto",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              },
            }}
            sx={{
              width: "100%",
              height: "400px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
            }}
          />
        </Box>

        <Box
          sx={{
            width: "5px",
            backgroundColor: "#4d4d4d",
            cursor: "ew-resize",
          }}
          onMouseDown={handleHorizontalResizeInputOutput}
        />

        <Box sx={{ width: `${outputWidth}%`, overflow: "hidden" }}>
          <Typography
            variant="h6"
            sx={{ color: theme === "vs-dark" ? "#ffffff" : "#1e1e1e" }}
          >
            Output
          </Typography>
          <Box
            sx={{
              padding: 1,
              height: "100%",
              backgroundColor: theme === "vs-dark" ? "#1e1e1e" : "#f5f5f5",
              color:
                error !== null
                  ? "#FF0000"
                  : theme === "vs-dark"
                  ? "#ffffff"
                  : "#1e1e1e",
            }}
          >
            <Typography variant="body1" sx={{ cursor: "default" }}>
              {error === null
                ? outputCode || "// Click on run button to run code..."
                : error}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
