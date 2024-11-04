"use client";
import { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  Divider,
  Snackbar,
  Alert,
  Avatar,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useGetUserDetails } from "@/context/userContext";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { userDetails } = useGetUserDetails();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    firstname: userDetails?.firstname || "",
    lastname: userDetails?.lastname || "",
    email: userDetails?.username || "",
    githubId: userDetails?.githubId || "",
    image: userDetails?.image || null,
  });
  const [preview, setPreview] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log(userDetails);
    setPreview(userDetails?.image || null);
  }, [userDetails]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setProfile((prev) => ({ ...prev, image: file }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const token = await currentUser?.getIdToken();

    const formData = new FormData();
    formData.append("firstname", profile.firstname);
    formData.append("lastname", profile.lastname);
    formData.append("githubId", profile.githubId);
    formData.append("username", profile.email);

    if (profile?.image instanceof File) {
      formData.append("image", profile.image);
    }

    try {
      const response = await axios.put(
        "http://localhost:9000/api/v1/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOpenSnackbar(true);
      } else {
        console.error("Failed to update profile:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "fit-content",
        width: "100%",
        bgcolor: "inherit",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <IconButton
        onClick={() => router.back()}
        sx={{
          position: "absolute",
          top: 0,
          left: 10,
          bgcolor: "white",
          color: "black",
          "&:hover": {
            bgcolor: "lightgray", 
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 600 }}>
        <Stack spacing={3}>
          <Typography variant="h4" fontWeight={600}>
            Profile
          </Typography>
          <Typography variant="body2" color="#b0b0b0">
            Manage your profile information
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              alt="user's image"
              src={preview}
              sx={{ width: 130, height: 130, boxShadow: 2 }}
            />
            <Button
              variant="outlined"
              component="label"
              size="small"
              sx={{ textTransform: "none" }}
            >
              Change Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Box>

          <Divider sx={{ borderColor: "#424242" }} />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              First Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="firstname"
              value={profile.firstname}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              sx={{ bgcolor: "#1c1c1c", borderRadius: 1 }}
              InputProps={{ style: { color: "#fff" } }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Last Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="lastname"
              value={profile.lastname}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              sx={{ bgcolor: "#1c1c1c", borderRadius: 1 }}
              InputProps={{ style: { color: "#fff" } }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              GitHub ID
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="githubId"
              value={profile.githubId}
              onChange={handleInputChange}
              placeholder="Enter your GitHub ID"
              sx={{ bgcolor: "#1c1c1c", borderRadius: 1 }}
              InputProps={{ style: { color: "#fff" } }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Email
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              sx={{ bgcolor: "#1c1c1c", borderRadius: 1 }}
              InputProps={{ style: { color: "#fff" } }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              alignSelf: "flex-end",
              borderRadius: 2,
              paddingX: 3,
              textTransform: "none",
            }}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </Stack>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
