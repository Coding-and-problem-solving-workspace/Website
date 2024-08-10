"use client"
import React from "react";
import { Container, Typography, Box, IconButton, Button } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import Navbar from "./Global/Navbar";
import { useRouter } from "next/navigation";
export default function LandingPage() {
  const router = useRouter(); 
  return (
    <Container
      id="container"
      sx={{
        background: "linear-gradient(150deg, #010203 50%, #0f8b96 90%)",
        minHeight: "100vh",
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "whitesmoke",
      }}
    >
      <Navbar>
        <Box>
          <Button className="login-button" sx={{color: "#0f8b96", border: "2px solid #0f8b96", paddingX: 3}} onClick={() => router.push('/login')}>
            Login
          </Button>
          <a
            href="https://github.com/Realtime-Live-Code-Collaboration-Space/Website"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <IconButton
              className="github-button"
              color="inherit"
              sx={{ marginLeft: 2 }}
            >
              <GitHub sx={{ color: '#0f8b96' }}/>
            </IconButton>
          </a>
        </Box>
      </Navbar>
      <Box textAlign="center" mt={20}>
        <Typography variant="h2" gutterBottom fontFamily="monospace">
          {"<"}Realtime Live Code Collaboration Space{"/>"}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" my={5}>
        <Box display="flex" alignItems="center" mb={3}>
          <Typography variant="h5" gutterBottom>
            Languages Supported:
          </Typography>
          <Box display="flex" ml={4} alignItems="center">
            <Box mx={2}>
              <img
                src="/icons/c.webp"
                alt="C++ Logo"
                style={{ width: 110, height: 110 }}
              />
            </Box>
            <Box mx={2}>
              <img
                src="/icons/cpp.webp"
                alt="C++ Logo"
                style={{ width: 80, height: 80 }}
              />
            </Box>
            <Box mx={2}>
              <img
                src="/icons/java.webp"
                alt="Java Logo"
                style={{ width: 80, height: 80 }}
              />
            </Box>
            <Box mx={2}>
              <img
                src="/icons/javascript.webp"
                alt="Javascript Logo"
                style={{ width: 80, height: 80 }}
              />
            </Box>
            <Box mx={2}>
              <img
                src="/icons/python.webp"
                alt="Python Logo"
                style={{ width: 80, height: 80 }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          mt={5}
          id="image"
          sx={{
            border: "5px solid white",
          }}
        >
          <img
            src="/icons/codeEditorPhoto.webp"
            alt="Coding Platform"
            style={{ maxWidth: 1500, height: 800 }}
          />
        </Box>

        <Box my={4} textAlign="left" sx={{border: "2px solid #0f8b96" , paddingY: 3, paddingX: 5}} id="desc">
        <Typography variant="h5" marginBottom={2}>Why Realtime Live Code Collaboration Space?</Typography>
          <Typography variant="body1">
            In today's digital landscape, coding skills are highly valued. Our
            project, Realtime Live Code Collaboration Space, introduces an
            online coding platform designed to meet the growing need for
            accessible coding education. The platform offers a vast library of
            coding problems, ranging from beginner to advanced levels, across
            various programming languages. Users can write, test, and submit
            code, receiving instant feedback. Key features include individual
            solution pages with YouTube tutorials, a flexible authentication
            system for problem submission, and a robust grading system. The
            platform aims to provide a user-friendly environment for improving
            coding skills through diverse challenges and problems.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
