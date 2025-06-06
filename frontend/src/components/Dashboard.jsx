"use client";
import { useEffect, useState } from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import RemoteCodeEditor from "./Dashboard/RemoteCodeEditor";
import PracticeProblems from "./Dashboard/PracticeProblems";
import { useAuth } from "@/context/authContext";
import axios from "axios";
export default function Dashboard() {
  const [section, setSection] = useState(1);
  const [problems, setProblems] = useState([]);
  const { currentUser, userLoggedIn } = useAuth();
  const fetchProblems = async () => {
    console.log("fetch")
    if(!userLoggedIn){
      return;
    }
    const token = await currentUser?.getIdToken();
    const resp = await axios.get("http://localhost:9000/api/v1/problems", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (resp.status === 200) {
      console.log(resp.data.problems);
      setProblems(resp.data.problems);
    }
  };
  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <Box
      sx={{
        background: "rgba(30,42,76,0.85)",
        minHeight: "70vh",
        width: "100%",
        borderRadius: "32px",
        boxShadow: "0 8px 32px 0 rgba(127,90,240,0.10)",
        border: "1.5px solid rgba(127,90,240,0.10)",
        backdropFilter: "blur(12px)",
        p: { xs: 2, md: 6 },
        mt: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ButtonGroup
        disableElevation
        variant="outlined"
        aria-label="Section switch"
        fullWidth
        sx={{
          // mb: 4,
          borderRadius: "18px",
          background: "rgba(24,28,43,0.65)",
          boxShadow: "0 4px 24px rgba(127,90,240,0.10)",
          border: "1.5px solid rgba(127,90,240,0.10)",
          backdropFilter: "blur(8px)",
          "& .MuiButton-outlined": {
            borderColor: "#0f8b96",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: 1,
            color: "#e0e7ef",
            borderRadius: "18px",
            transition: "all 0.2s",
            "&:hover": {
              borderColor: "#7f5af0",
              backgroundColor: "#0f8b96",
              color: "white",
            },
          },
        }}
      >
        <Button
          onClick={() => setSection(1)}
          sx={{
            color: section === 1 ? "#fff" : "#0f8b96",
            background:
              section === 1
                ? "linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)"
                : "inherit",
            fontWeight: 700,
            boxShadow: section === 1 ? "0 2px 12px #7f5af0" : "none",
            borderRadius: "18px",
          }}
        >
          Remote Code Editor
        </Button>
        <Button
          onClick={() => setSection(2)}
          sx={{
            color: section === 2 ? "#fff" : "#0f8b96",
            background:
              section === 2
                ? "linear-gradient(90deg, #0f8b96 30%, #7f5af0 80%)"
                : "inherit",
            fontWeight: 700,
            boxShadow: section === 2 ? "0 2px 12px #0f8b96" : "none",
            borderRadius: "18px",
          }}
        >
          Practice Problems
        </Button>
      </ButtonGroup>
      <Box sx={{ width: "100%" }}>
        {section === 1 ? <RemoteCodeEditor/> : <PracticeProblems problems={problems}/>}
      </Box>
    </Box>
  );
}
