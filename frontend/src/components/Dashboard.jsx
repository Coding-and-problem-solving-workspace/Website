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
    <Box sx={{ backgroundColor: "inherit", height: "100%", width: "100%" }}>
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
          {section === 1 ? <RemoteCodeEditor/> : <PracticeProblems problems={problems}/>}
      </Box>
    </Box>
  );
}
