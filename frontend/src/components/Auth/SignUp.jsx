"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  FormHelperText,
} from "@mui/material";
import Link from "next/link";
import { useRef, useState } from "react";

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [githubId, setGithubId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const fileInputRef = useRef(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  return (
    <Box
      height="100vh"
      width="40%"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      bgcolor="#165f6e"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
        height={800}
        width={400}
        bgcolor="white"
        border="2px solid white"
        borderRadius="30px"
        padding={3}
      >
        <Typography variant="h4">Sign Up</Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          display="flex"
          flexDirection="column"
          width="100%"
        >
          <TextField
            label="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="GitHub link"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={githubId}
            onChange={(e) => setGithubId(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            margin="normal"
            fullWidth
            required
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            margin="normal"
            fullWidth
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <input
            type="file"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleButtonClick}
          >
            Upload Profile Picture
          </Button>
          {image && <FormHelperText>{image.name}</FormHelperText>}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 4 }}
          >
            Sign Up
          </Button>
        </Box>
        <Box
          width="100%"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Link href="/login" className="hover:text-blue-600 hover:underline">
            Already have an account? Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
