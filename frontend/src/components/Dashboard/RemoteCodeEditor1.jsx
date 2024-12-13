"use client";
import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Topbar from "./Topbar";
import { CODE_SNIPPETS } from "./data/constants";
import { Box, Typography } from "@mui/material";

export default function RemoteCodeEditor({ testCases }) {
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

  const runCode = () => {
    // simulate running code and updating results
    const newResults = testCases.map((testCase, index) => {
      // simulate code execution and comparison with expected output
      const passed = Math.random() > 0.5; // randomly pass or fail for demo
      return passed ? "Passed" : "Failed";
    });
    setResults(newResults);
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
          marginTop: 2,
          width: "100%",
          backgroundColor: theme === "vs-dark" ? "#1e1e1e" : "#f5f5f5",
          border: "1px solid #0f8b96",
          borderRadius: "4px",
          padding: 1,
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: theme === "vs-dark" ? "#ffffff" : "#1e1e1e" }}
        >
          Test Cases
        </Typography>
        <table className="min-w-full shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Sl. No.
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Input
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Expected Output
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((testCase, index) => (
              <tr key={testCase._id} className="border-b">
                <td
                  className={`py-4 px-6 text-sm ${
                    theme === "vs-dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {index + 1}
                </td>
                <td
                  className={`py-4 px-6 text-sm ${
                    theme === "vs-dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {testCase.input}
                </td>
                <td
                  className={`py-4 px-6 text-sm ${
                    theme === "vs-dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {testCase.expectedOutput}
                </td>
                <td
                  className={`py-4 px-6 text-sm ${
                    results[index] === "Passed"
                      ? "text-green-500"
                      : results[index] === "Failed"
                      ? "text-red-500"
                      : "text-gray-700"
                  }`}
                >
                  {results[index]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={runCode}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </Box>
    </Box>
  );
}
