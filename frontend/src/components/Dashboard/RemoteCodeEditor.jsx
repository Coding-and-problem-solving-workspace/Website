"use client"
import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Topbar from "./Topbar";
import { CODE_SNIPPETS } from "./data/constants";
import { Box, Typography } from "@mui/material";
export default function RemoteCodeEditor() {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("vs-dark");
  const [output, setOutput] = useState("");
  const [fontSize, setFontSize] = useState(14);
  // const [defaultCode, setDefaultCode] = useState(CODE_SNIPPETS[language]);
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

  const onFontSizeChange = (val) => {
    setFontSize(val);
  };

  const onThemeChange = (val) => {
    setTheme(val);
  };

  const onLanguageChange = (val) => {
    setLanguage(val);
    setCode(
      CODE_SNIPPETS[val]
    );
  }


  return (
    <Box sx={{marginTop: 3, border: "1px solid #0f8b96"}}>
      <Topbar language={language} theme={theme} fontSize={fontSize} onFontSizeChange={onFontSizeChange} onThemeChange={onThemeChange} onLanguageChange={onLanguageChange} editorRef={editorRef} setOutput={setOutput} />
      <Editor
        height="60vh"
        theme={theme}
        language={language}
        value={code}
        defaultValue={CODE_SNIPPETS[language]}
        onChange={() => setCode(code)}
        options={{
          fontSize: fontSize,
          minimap: {
            enabled: false,
          },
          contextmenu: false,
          scrollBeyondLastLine: false,
        }}
        onMount={onMount}
      />
      <Box
        sx={{
          height: "20vh",
          backgroundColor: theme === "vs-dark" ? "#1e1e1e" : "#fff",
          color: theme === "vs-dark" ? "#d4d4d4" : "#000",
          fontFamily: "monospace",
          fontSize: `${fontSize}px`,
          padding: "10px",
          borderTop: "5px solid #0f8b96",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" sx={{ color: theme === "vs-dark" ? "#ffffff" : "#000000" }}>
          Output:
        </Typography>
        <pre>{output || "// Click on run button to run code..."}</pre>
      </Box>
    </Box>
  );
}
