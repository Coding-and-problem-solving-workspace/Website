"use client";
import { useState } from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import RemoteCodeEditor from "./Dashboard/RemoteCodeEditor";
import PracticeProblems from "./Dashboard/PracticeProblems";
export default function Dashboard() {
  const [section, setSection] = useState(1);
  return (
    <Box sx={{ backgroundColor: "inherit", height: "100vh", width: "100%" }}>
      <ButtonGroup
        disableElevation
        variant="outlined"
        aria-label="Disabled button group"
        fullWidth
        sx={{
          "& .MuiButton-outlined": {
            borderColor: "#0f8b96",
            "&:hover": {
              borderColor: "#0f8b96",
              backgroundColor: "#0f8b96",
              color: "white",
            },
          },
        }}
      >
        <Button
          onClick={() => setSection(1)}
          sx={{
            color: `${section === 1 ? "white" : "#0f8b96"}`,
            backgroundColor: `${section === 2 ? "inherit" : "#0f8b96"}`,
          }}
        >
          Remote Code Editor
        </Button>
        <Button
          onClick={() => setSection(2)}
          sx={{
            color: `${section === 2 ? "white" : "#0f8b96"}`,
            backgroundColor: `${section === 1 ? "inherit" : "#0f8b96"}`,
          }}
        >
          Practice Problems
        </Button>
      </ButtonGroup>
      <Box>
          {section === 1 ? <RemoteCodeEditor/> : <PracticeProblems/>}
      </Box>
    </Box>
  );
}
