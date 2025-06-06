import { Box, Select, MenuItem, Typography, Button } from "@mui/material";
import { FONT_SIZES, LANGUAGE_VERSIONS } from "./data/constants";
import { executeCode } from "./utils/executeCode";
import { useState } from "react";
export default function Topbar({
  language,
  theme,
  error,
  setError,
  fontSize,
  onFontSizeChange,
  onThemeChange,
  onLanguageChange,
  editorRef,
  setOutput,
  input,
  pageType,
}) {
  const [loading, setLoading] = useState(false);
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    try {
      setLoading(true);
      console.log("hello");
      const { run } = await executeCode(
        language,
        LANGUAGE_VERSIONS[language],
        sourceCode,
        input
      );
      console.log(run);
      console.log(run.stdout);
      if (!run.stderr) {
        setOutput(run.stdout);
        setError(null);
      } else {
        setError(run.stderr);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(30,42,76,0.95)",
        borderRadius: "24px",
        boxShadow: "0 4px 24px rgba(127,90,240,0.10)",
        border: "1.5px solid rgba(127,90,240,0.10)",
        backdropFilter: "blur(10px)",
        px: { xs: 2, md: 4 },
        py: { xs: 1, md: 2 },
        mb: 3,
        mt: 2,
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 900,
          fontSize: { xs: 18, md: 22 },
          letterSpacing: 1.2,
          color: "transparent",
          background:
            "linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "monospace",
        }}
      >
        {pageType === "problem-page" ? '</>Code' : "Code Playground"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          size="small"
          sx={{
            minWidth: 120,
            borderRadius: "12px",
            background: "rgba(24,28,43,0.85)",
            color: "#7f5af0",
            fontWeight: 700,
            mr: 1,
            "& .MuiSelect-icon": { color: "#7f5af0" },
          }}
        >
          {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
            <MenuItem
              key={lang}
              value={lang}
              sx={{ color: "#7f5af0", fontWeight: 700 }}
            >
              {lang.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={fontSize}
          onChange={(e) => onFontSizeChange(e.target.value)}
          size="small"
          sx={{
            minWidth: 80,
            borderRadius: "12px",
            background: "rgba(24,28,43,0.85)",
            color: "#0f8b96",
            fontWeight: 700,
            mr: 1,
            "& .MuiSelect-icon": { color: "#0f8b96" },
          }}
        >
          {FONT_SIZES.map((size) => (
            <MenuItem
              key={size}
              value={size}
              sx={{ color: "#0f8b96", fontWeight: 700 }}
            >
              {size}px
            </MenuItem>
          ))}
        </Select>
        <Select
          value={theme}
          onChange={(e) => onThemeChange(e.target.value)}
          size="small"
          sx={{
            minWidth: 100,
            borderRadius: "12px",
            background: "rgba(24,28,43,0.85)",
            color: "#e0e7ef",
            fontWeight: 700,
            mr: 1,
            "& .MuiSelect-icon": { color: "#e0e7ef" },
          }}
        >
          <MenuItem
            value="vs-dark"
            sx={{ color: "#7f5af0", fontWeight: 700 }}
          >
            Dark
          </MenuItem>
          <MenuItem
            value="light"
            sx={{ color: "#0f8b96", fontWeight: 700 }}
          >
            Light
          </MenuItem>
        </Select>
        {pageType !=="problem-page" && <Button
          onClick={runCode}
          disabled={loading}
          sx={{
            background:
              "linear-gradient(90deg, #0f8b96 30%, #7f5af0 80%)",
            color: "#fff",
            fontWeight: 900,
            fontSize: 18,
            borderRadius: "16px",
            px: 4,
            py: 1.2,
            boxShadow: "0 2px 12px #7f5af0",
            textTransform: "none",
            letterSpacing: 1.1,
            transition: "all 0.2s",
            "&:hover": {
              background:
                "linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)",
              boxShadow: "0 4px 24px #0f8b96",
            },
          }}
        >
          {loading ? "Running..." : "Run Code"}
        </Button>}
      </Box>
      {error && (
        <Typography
          sx={{
            color: "#ff5252",
            fontWeight: 700,
            ml: 3,
            fontSize: 16,
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}
