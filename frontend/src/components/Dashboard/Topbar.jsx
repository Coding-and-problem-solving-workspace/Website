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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
      }}
    >
      <Box>
        <Typography
          sx={{
            color: "white",
            fontSize: 32,
            fontFamily: "monospace",
            fontWeight: "bold",
          }}
        >
           {'</>Code'}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Select
            value={language}
            onChange={(event) => onLanguageChange(event.target.value)}
            displayEmpty
            inputProps={{
              name: "language",
              id: "controlled-select",
            }}
            sx={{
              color: "white",
              backgroundColor: "#333",
              border: "1px solid #555",
              borderRadius: "4px",
              paddingX: 1,
              "&:hover": {
                backgroundColor: "#444",
              },
              "& .MuiSelect-icon": {
                color: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#555",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#444",
                  color: "white",
                },
              },
            }}
          >
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="cpp">C++</MenuItem>
            <MenuItem value="c">C</MenuItem>
            <MenuItem value="java">Java</MenuItem>
            <MenuItem value="javascript">Javascript</MenuItem>
          </Select>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Select
            value={theme}
            onChange={(event) => onThemeChange(event.target.value)}
            displayEmpty
            inputProps={{
              name: "theme",
              id: "controlled-select",
            }}
            sx={{
              color: "white",
              backgroundColor: "#333",
              border: "1px solid #555",
              borderRadius: "4px",
              paddingX: 1,
              "&:hover": {
                backgroundColor: "#444",
              },
              "& .MuiSelect-icon": {
                color: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#555",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#444",
                  color: "white",
                },
              },
            }}
          >
            <MenuItem value="vs-light">Light</MenuItem>
            <MenuItem value="vs-dark">Dark</MenuItem>
          </Select>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Select
            value={fontSize}
            onChange={(event) => onFontSizeChange(event.target.value)}
            displayEmpty
            inputProps={{
              name: "theme",
              id: "controlled-select",
            }}
            sx={{
              color: "white",
              backgroundColor: "#333",
              border: "1px solid #555",
              borderRadius: "4px",
              paddingX: 1,
              "&:hover": {
                backgroundColor: "#444",
              },
              "& .MuiSelect-icon": {
                color: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#555",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#444",
                  color: "white",
                },
              },
            }}
          >
            {FONT_SIZES.map((fSize, index) => (
              <MenuItem key={index} value={fSize}>
                {fSize}
              </MenuItem>
            ))}
          </Select>
        </Box>
        {/* <Button
          sx={{
            bgcolor: "green",
            color: "white",
            fontWeight: "bold",
            height: "40px",
            width: "100px",
            borderRadius: "5px",
            textTransform: "none",
            "&:hover": {
              bgcolor: "darkgreen",
            },
          }}
          onClick={() => runCode()}
        >
          {loading ? "RUNNING" : "RUN"}
        </Button> */}
      </Box>
    </Box>
  );
}
