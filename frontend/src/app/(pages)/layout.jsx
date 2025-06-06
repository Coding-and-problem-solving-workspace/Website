"use client";

import Navbar from "@/components/Global/Navbar";
import {
  Container,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doSignOut } from "@/firebase/auth";
import { useGetUserDetails, UserProvider } from "@/context/userContext";
export default function PageLayout({ children }) {
  const [profileImg, setProfileImg] = useState("");
  const { setUserDetails } = useGetUserDetails();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const { userDetails } = useGetUserDetails();
  const router = useRouter();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleProfileClick = () => {
    handleClose();
    router.push("/profile");
  };

  const handleLogoutClick = async () => {
    try {
      await doSignOut();
      console.log("user logged out");
      handleClose();
      setUserDetails(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    setProfileImg(
      userDetails?.image ||
        "https://res.cloudinary.com/djxtxnp3i/image/upload/v1728986886/photo6_kruqk4.jpg"
    );
  }, [userDetails]);

  return (
    <Container
      id="container"
      disableGutters
      maxWidth={false}
      sx={{
        background: "linear-gradient(120deg, #181c2b 0%, #0f8b96 100%)",
        minHeight: "100vh",
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#e0e7ef",
        px: { xs: 0, md: 4 },
        pt: { xs: 12, md: 14 },
        pb: 0,
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Floating glassmorphic navbar shadow */}
      <Navbar>
        <Typography
          sx={{
            color: "transparent",
            fontSize: { xs: 20, md: 26 },
            fontWeight: 900,
            letterSpacing: 1.5,
            background:
              "linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 2px 12px rgba(127,90,240,0.10)",
            fontFamily: "monospace",
            ml: 2,
          }}
        >
          Coding And Problem Solving Workspace
        </Typography>
        <Avatar
          alt="User Profile"
          src={profileImg}
          sx={{
            cursor: "pointer",
            width: 38,
            height: 38,
            border: "2px solid #7f5af0",
            boxShadow: "0 2px 8px #0f8b96",
            ml: 2,
          }}
          onClick={handleAvatarClick}
        />
      </Navbar>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          mt: { xs: 4, md: 8 },
          mb: 0,
          borderRadius: "32px",
          background: "rgba(30,42,76,0.85)",
          boxShadow: "0 8px 32px 0 rgba(127,90,240,0.10)",
          border: "1.5px solid rgba(127,90,240,0.10)",
          backdropFilter: "blur(12px)",
          p: { xs: 2, md: 6 },
          minHeight: "70vh",
        }}
      >
        {children}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: -1,
            borderRadius: "18px",
            background: "rgba(30,42,76,0.95)",
            color: "#fff",
            boxShadow: "0 4px 32px rgba(127,90,240,0.10)",
            border: "1.5px solid rgba(127,90,240,0.10)",
            backdropFilter: "blur(10px)",
            "& .MuiMenuItem-root": {
              color: "#fff",
              fontWeight: 600,
              fontSize: 17,
              borderRadius: "12px",
              transition: "background 0.2s",
              "&:hover": {
                background: "rgba(127,90,240,0.10)",
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </Container>
  );
}
