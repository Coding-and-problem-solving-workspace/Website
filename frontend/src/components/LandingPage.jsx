"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  IconButton,
  Button,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { Code, Speed, Security, GroupWork ,GitHub } from "@mui/icons-material";
import Navbar from "./Global/Navbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useGetUserDetails } from "@/context/userContext";
import Image from "next/image";
export default function LandingPage() {
  const [profileImg, setProfileImg] = useState("");
  const { userLoggedIn } = useAuth();
  const { userDetails } = useGetUserDetails();
  const router = useRouter();

  useEffect(()=>{
    if(userLoggedIn){
      setProfileImg(userDetails?.image);
    }
  },[userDetails])

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
        <Box />
        <Box>
          <Button
            className="login-button"
            sx={{ color: "#0f8b96", border: "2px solid #0f8b96", paddingX: `${userLoggedIn===false ? 3 : 0}`, borderRadius: `${userLoggedIn===false ? "0px": "100px"}`}}
            onClick={() => {userLoggedIn===false ? router.push("/login"): router.push("/dashboard")}}
          >
            {userLoggedIn ? (
              <Avatar
                alt="User Profile"
                src={profileImg || "https://res.cloudinary.com/djxtxnp3i/image/upload/v1728986886/photo6_kruqk4.jpg"}
                sx={{ cursor: "pointer" }}
              />
            ) : (
              "Login"
            )}
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
              <GitHub sx={{ color: "#0f8b96" }} />
            </IconButton>
          </a>
        </Box>
      </Navbar>
      <Box textAlign="center" mt={20}>
        <Typography variant="h2" gutterBottom fontFamily="monospace">
          {"<"}coding-and-problem-solving-workspace{"/>"}
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
            border: '5px solid white',
            borderRadius: '20px', 
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', 
            overflow: 'hidden', 
            border: '5px solid white',
            borderRadius: '20px', 
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', 
            overflow: 'hidden', 
          }}
        >
        <Image
          src="/icons/codeEditorPhoto.webp"
          alt="Coding Platform"
          layout="responsive"
          width={1050} 
          height={560} 
          style={{
            borderRadius: '20px', 
          }}
        />
      </Box>

        
      <Typography variant="h4" fontWeight="bold" mt={7}>
          Key Features
      </Typography>

      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4} mt={5}>
        {[
          { icon: <Code sx={{ fontSize: 50, color: "#0f8b96" }} />, title: "Real-Time Coding", description: "Code in real time in an online environment" },
          { icon: <Speed sx={{ fontSize: 50, color: "#0f8b96" }} />, title: "Instant Feedback", description: "Receive instant feedback on your code submissions." },
          { icon: <Security sx={{ fontSize: 50, color: "#0f8b96" }} />, title: "Secure Platform", description: "Enjoy a safe and secure coding environment." },
          { icon: <GroupWork sx={{ fontSize: 50, color: "#0f8b96" }} />, title: "Community Driven", description: "Engage with a community of passionate coders." },
        ].map((feature, index) => (
          <Card key={index} sx={{ width: 280, backgroundColor: "#1e3a4c", color: "white", borderRadius: "12px", textAlign: "center", transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)', }}}>
            <CardContent>
              {feature.icon}
              <Typography variant="h6" fontWeight="bold" mt={2}>
                {feature.title}
              </Typography>
              <Typography variant="body2" mt={1}>
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box textAlign="center" mt={10} sx={{ maxWidth: 800 }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          How it Works
        </Typography>
        {[
          "Sign up and log in to access all features.",
          "Choose from a variety of programming languages to get started.",
          "Receive instant feedback to improve your coding skills.",
          "Track your progress and strive to master new coding concepts."
        ].map((step, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar sx={{ bgcolor: "#0f8b96", marginRight: 2 }}>{index + 1}</Avatar>
            <Typography variant="body1">{step}</Typography>
          </Box>
        ))}
      </Box>
       
      </Box>
    </Container>
  );
}