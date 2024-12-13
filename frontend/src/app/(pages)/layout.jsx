"use client";

import Navbar from "@/components/Global/Navbar";
import { Container, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doSignOut } from "@/firebase/auth";
import { useGetUserDetails, UserProvider } from "@/context/userContext";
export default function pageLayout({ children }) {
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
      sx={{
        background: "linear-gradient(150deg, #010203 50%, #0f8b96 90%)",
        minHeight: "100vh",
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "whitesmoke",
        paddingTop: "80px",
      }}
    >
      <Navbar>
        <Typography sx={{ color: "white", fontSize: 20 }}>
          Coding And Problem Solving Workspace 
        </Typography>
        <Avatar
          alt="User Profile"
          src={profileImg}
          sx={{ cursor: "pointer" }}
          onClick={handleAvatarClick}
        />
      </Navbar>
      {children}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: -1,
            "& .MuiMenuItem-root": {
              color: "black",
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
