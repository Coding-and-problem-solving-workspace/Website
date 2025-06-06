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
  Grid,
  Fade,
} from "@mui/material";
import { Code, Speed, Security, GroupWork, GitHub, Star, People, FlashOn } from "@mui/icons-material";
import Navbar from "./Global/Navbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useGetUserDetails } from "@/context/userContext";
import Image from "next/image";

// Simple animated particles background
const ParticleBackground = () => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      pointerEvents: "none",
      overflow: "hidden",
    }}
  >
    {[...Array(30)].map((_, i) => (
      <Box
        key={i}
        sx={{
          position: "absolute",
          width: 16 + Math.random() * 16,
          height: 16 + Math.random() * 16,
          borderRadius: "50%",
          background: `linear-gradient(135deg, #7f5af0 40%, #0f8b96 100%)`,
          opacity: 0.18 + Math.random() * 0.18,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          filter: "blur(2px)",
          animation: `float${i} 8s ease-in-out infinite alternate`,
          '@keyframes float${i}': {
            '0%': { transform: 'translateY(0px)' },
            '100%': { transform: `translateY(-${30 + Math.random() * 40}px)` },
          },
        }}
      />
    ))}
  </Box>
);

export default function LandingPage() {
  const [profileImg, setProfileImg] = useState("");
  const { userLoggedIn } = useAuth();
  const { userDetails } = useGetUserDetails();
  const router = useRouter();

  useEffect(() => {
    if (userLoggedIn) {
      setProfileImg(userDetails?.image);
    }
  }, [userDetails, userLoggedIn]);

  // Animation state for scroll reveals
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    setReveal(true);
  }, []);

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", width: "100vw", overflowX: "hidden", background: "linear-gradient(120deg, #181c2b 0%, #0f8b96 100%)" }}>
      <ParticleBackground />
      {/* Floating glassmorphic navbar shadow */}
      <Box sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: 120,
        zIndex: 1100,
        pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(24,28,43,0.18) 60%, transparent 100%)",
        filter: "blur(8px)",
      }} />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          px: { xs: 0, md: 4 },
        }}
      >
        <Navbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              fontWeight: 900,
              fontSize: { xs: 22, md: 28 },
              letterSpacing: 1.5,
              color: 'transparent',
              background: 'linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 12px rgba(127,90,240,0.10)',
              fontFamily: 'monospace',
              ml: 2
            }}>
              Coding And Problem Solving Workspace
            </Box>
          </Box>
          <Box>
            <Button
              className="login-button"
              sx={{ color: "#0f8b96", border: "2px solid #0f8b96", px: userLoggedIn === false ? 3 : 0, borderRadius: userLoggedIn === false ? "0px" : "100px", backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)", boxShadow: "0 2px 12px rgba(15,139,150,0.08)", transition: "all 0.2s", fontWeight: 700, fontSize: 18, letterSpacing: 1 }}
              onClick={() => { userLoggedIn === false ? router.push("/login") : router.push("/dashboard") }}
            >
              {userLoggedIn ? (
                <Avatar
                  alt="User Profile"
                  src={profileImg || "https://res.cloudinary.com/djxtxnp3i/image/upload/v1728986886/photo6_kruqk4.jpg"}
                  sx={{ cursor: "pointer", width: 38, height: 38, border: '2px solid #7f5af0', boxShadow: '0 2px 8px #0f8b96' }}
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
                sx={{ marginLeft: 2, background: 'rgba(127,90,240,0.10)', borderRadius: '50%', boxShadow: '0 2px 8px #7f5af0', transition: 'all 0.2s', '&:hover': { background: 'rgba(15,139,150,0.18)' } }}
              >
                <GitHub sx={{ color: "#0f8b96", fontSize: 32 }} />
              </IconButton>
            </a>
          </Box>
        </Navbar>

        {/* Hero Section */}
        <Box
          sx={{
            width: "100%",
            minHeight: { xs: 400, md: 600 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            mt: { xs: 8, md: 16 },
            mb: 6,
            position: "relative",
          }}
        >
          <Fade in={reveal} timeout={1200}>
            <Box
              sx={{
                flex: 1,
                zIndex: 2,
                textAlign: { xs: "center", md: "left" },
                px: { xs: 2, md: 6 },
                mt: { xs: 10, md: 0 },
              }}
            >
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{
                  background: "linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                  fontFamily: "monospace",
                  letterSpacing: 1,
                  fontSize: { xs: "2.2rem", md: "3.5rem" },
                }}
              >
                {"<Coding And Problem Solving Workspace/>"}
              </Typography>
              <Typography variant="h5" sx={{ color: "#e0e7ef", mb: 4, maxWidth: 540 }}>
                An online platform where users can practice coding and enhance their skills through guided problem-solving across various topics and difficulty levels.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)",
                  color: "#fff",
                  px: 5,
                  py: 1.5,
                  borderRadius: "30px",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  boxShadow: "0 4px 24px 0 rgba(127,90,240,0.18)",
                  textTransform: "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 32px 0 rgba(15,139,150,0.18)',
                    background: 'linear-gradient(90deg, #0f8b96 30%, #7f5af0 80%)',
                  },
                }}
                onClick={() => router.push(userLoggedIn ? "/dashboard" : "/signup")}
              >
                {userLoggedIn ? "Go to Dashboard" : "Get Started"}
              </Button>
            </Box>
          </Fade>
          <Fade in={reveal} timeout={1800}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                mt: { xs: 6, md: 0 },
                filter: 'drop-shadow(0 8px 32px #7f5af0)',
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: "32px",
                  background: "rgba(255,255,255,0.10)",
                  boxShadow: "0 8px 32px rgba(127,90,240,0.18)",
                  backdropFilter: "blur(12px)",
                  border: "1.5px solid rgba(255,255,255,0.18)",
                  maxWidth: 500,
                  width: "100%",
                  transition: "transform 0.3s",
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <Image
                  src="/icons/codeEditorPhoto.webp"
                  alt="Coding Platform"
                  layout="responsive"
                  width={500}
                  height={260}
                  style={{ borderRadius: '24px', boxShadow: '0 8px 32px rgba(127,90,240,0.18)' }}
                />
              </Box>
              {/* Floating animated elements */}
              <Box sx={{ position: "absolute", top: 10, left: -30, zIndex: 2, animation: "float1 5s ease-in-out infinite alternate", filter: 'drop-shadow(0 4px 16px #7f5af0)' }}>
                <Image src="/icons/cpp.webp" alt="C++" width={48} height={48} style={{ filter: "drop-shadow(0 2px 8px #7f5af0)" }} />
              </Box>
              <Box sx={{ position: "absolute", bottom: 10, right: -30, zIndex: 2, animation: "float2 6s ease-in-out infinite alternate", filter: 'drop-shadow(0 4px 16px #0f8b96)' }}>
                <Image src="/icons/python.webp" alt="Python" width={48} height={48} style={{ filter: "drop-shadow(0 2px 8px #0f8b96)" }} />
              </Box>
              <Box sx={{ position: "absolute", top: 60, right: -20, zIndex: 2, animation: "float3 7s ease-in-out infinite alternate", filter: 'drop-shadow(0 4px 16px #7f5af0)' }}>
                <Image src="/icons/java.webp" alt="Java" width={40} height={40} style={{ filter: "drop-shadow(0 2px 8px #7f5af0)" }} />
              </Box>
              <Box sx={{ position: "absolute", bottom: 60, left: -20, zIndex: 2, animation: "float4 8s ease-in-out infinite alternate", filter: 'drop-shadow(0 4px 16px #0f8b96)' }}>
                <Image src="/icons/javascript.webp" alt="JS" width={40} height={40} style={{ filter: "drop-shadow(0 2px 8px #0f8b96)" }} />
              </Box>
            </Box>
          </Fade>
        </Box>

        {/* Features Section */}
        <Fade in={reveal} timeout={2000}>
          <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", mt: 8, pb: 4 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 4, color: "#fff" }}>
              Key Features
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                { icon: <Code sx={{ fontSize: 48, color: "#7f5af0" }} />, title: "Real-Time Coding", description: "Code in real time in an online environment" },
                { icon: <Speed sx={{ fontSize: 48, color: "#0f8b96" }} />, title: "Language-agnostic", description: "Supports multiple languages for code practice" },
                { icon: <Security sx={{ fontSize: 48, color: "#7f5af0" }} />, title: "Secure Platform", description: "Your code and data are always safe and private" },
                { icon: <GroupWork sx={{ fontSize: 48, color: "#0f8b96" }} />, title: "Community Driven", description: "Empower users to create and share their own coding problems" },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      background: "rgba(30,42,76,0.85)",
                      color: "#fff",
                      borderRadius: "22px",
                      textAlign: "center",
                      boxShadow: "0 8px 32px rgba(127,90,240,0.10)",
                      backdropFilter: "blur(12px)",
                      border: '1.5px solid rgba(127,90,240,0.10)',
                      transition: "transform 0.3s, box-shadow 0.3s",
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.07)',
                        boxShadow: '0 16px 48px rgba(15,139,150,0.18)',
                        background: 'rgba(30,42,76,0.95)',
                      },
                    }}
                  >
                    <CardContent>
                      {feature.icon}
                      <Typography variant="h6" fontWeight="bold" mt={2}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" mt={1} sx={{ color: "#cfd8dc" }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Statistics / Social Proof Section */}
        <Fade in={reveal} timeout={2200}>
          <Box sx={{ width: "100%", maxWidth: 900, mx: "auto", mt: 10, mb: 6, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4 }}>
            {[
              { icon: <People sx={{ fontSize: 40, color: "#7f5af0" }} />, label: "Active Users", value: "10,000+" },
              { icon: <FlashOn sx={{ fontSize: 40, color: "#0f8b96" }} />, label: "Sessions Run", value: "100,000+" },
              { icon: <Star sx={{ fontSize: 40, color: "#7f5af0" }} />, label: "GitHub Stars", value: "2,500+" },
            ].map((stat, idx) => (
              <Box
                key={idx}
                sx={{
                  minWidth: 220,
                  background: "rgba(255,255,255,0.13)",
                  borderRadius: "24px",
                  p: 4,
                  m: 2,
                  textAlign: "center",
                  boxShadow: "0 4px 32px rgba(127,90,240,0.10)",
                  border: '1.5px solid rgba(127,90,240,0.10)',
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  '&:hover': { transform: 'scale(1.07)', boxShadow: '0 12px 48px rgba(15,139,150,0.18)' },
                }}
              >
                {stat.icon}
                <Typography variant="h5" fontWeight="bold" sx={{ color: "#fff", mt: 1 }}>{stat.value}</Typography>
                <Typography variant="body1" sx={{ color: "#cfd8dc" }}>{stat.label}</Typography>
              </Box>
            ))}
          </Box>
        </Fade>

        {/* How it Works Section */}
        <Fade in={reveal} timeout={2400}>
          <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", mt: 8, mb: 8, background: "rgba(30,42,76,0.90)", borderRadius: "32px", p: { xs: 3, md: 6 }, boxShadow: "0 8px 32px rgba(127,90,240,0.10)", border: '1.5px solid rgba(127,90,240,0.10)', backdropFilter: "blur(12px)" }}>
            <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center" sx={{ color: "#fff" }}>
              How it Works
            </Typography>
            {[
              "Sign up and log in to access all features.",
              "Choose from a variety of programming languages to get started.",
              "Receive instant feedback to improve your coding skills.",
              "Track your progress and strive to master new coding concepts."
            ].map((step, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar sx={{ bgcolor: "#7f5af0", color: "#fff", fontWeight: "bold", mr: 2 }}>{index + 1}</Avatar>
                <Typography variant="body1" sx={{ color: "#e0e7ef" }}>{step}</Typography>
              </Box>
            ))}
          </Box>
        </Fade>

        {/* Final CTA Section */}
        <Fade in={reveal} timeout={2600}>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 10 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(90deg, #0f8b96 30%, #7f5af0 80%)",
                color: "#fff",
                px: 7,
                py: 2.5,
                borderRadius: "40px",
                fontWeight: "bold",
                fontSize: "1.3rem",
                letterSpacing: 1.2,
                boxShadow: "0 8px 32px 0 rgba(127,90,240,0.18)",
                textTransform: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
                '&:hover': {
                  transform: 'scale(1.09)',
                  boxShadow: '0 16px 64px 0 rgba(15,139,150,0.18)',
                  background: 'linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)',
                },
              }}
              onClick={() => router.push(userLoggedIn ? "/dashboard" : "/signup")}
            >
              {userLoggedIn ? "Start Coding Now" : "Join the Community"}
            </Button>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}