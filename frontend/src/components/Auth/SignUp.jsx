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
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { doCreateUserWithEmailAndPassword } from "@/firebase/auth";
import { useGetUserDetails } from "@/context/userContext";

export default function SignUp() {
  const { userLoggedIn } = useAuth();
  const { userDetails, setUserDetails } = useGetUserDetails();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [githubId, setGithubId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (userLoggedIn) {
      router.push("/dashboard");
    }
  }, [userLoggedIn, router]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }

      try {
        const res = await doCreateUserWithEmailAndPassword(username, password);
        const firebaseUid = res?.user?.uid;
        const formData = new FormData();
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("githubId", githubId);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("firebaseUid", firebaseUid);
        if (image) {
          formData.append("image", image);
        }

        const response = await axios.post(
          "http://localhost:9000/api/v1/auth/signup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          setUserDetails(response.data.user);
          console.log(userDetails);
          console.log("User signed up:", response.data);
          if(userDetails){
            console.log("user signed up");
          router.push('/dashboard');
          }
        }
      } catch (error) {
        console.error("There was an error signing up:", error);
      } finally {
        setIsSigningUp(false);
      }
    }
  };
  return (
    <Box
      sx={{
        minHeight: 480,
        width: '100%',
        maxWidth: 440,
        mx: 'auto',
        background: 'rgba(24,28,43,0.92)',
        borderRadius: '28px',
        boxShadow: '0 8px 32px 0 rgba(127,90,240,0.18)',
        border: '1.5px solid rgba(127,90,240,0.13)',
        backdropFilter: 'blur(16px)',
        p: { xs: 3, md: 5 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#e0e7ef',
        mt: { xs: 6, md: 0 },
        gap: 2,
        transition: 'box-shadow 0.2s',
      }}
    >
      <Typography
        variant="h4"
        fontWeight={900}
        sx={{
          mb: 2,
          background: 'linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'monospace',
          letterSpacing: 1.2,
          textAlign: 'center',
        }}
      >
        Create Account
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
        width="100%"
        onSubmit={handleSubmit}
        sx={{ gap: 2 }}
      >
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          required
          value={firstname}
          onChange={e => setFirstname(e.target.value)}
          sx={{
            input: { color: '#e0e7ef', fontWeight: 600 },
            label: { color: '#b3b8c5' },
            fieldset: { borderColor: '#7f5af0' },
            background: 'rgba(30,42,76,0.85)',
            borderRadius: '12px',
            mb: 1,
          }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          required
          value={lastname}
          onChange={e => setLastname(e.target.value)}
          sx={{
            input: { color: '#e0e7ef', fontWeight: 600 },
            label: { color: '#b3b8c5' },
            fieldset: { borderColor: '#7f5af0' },
            background: 'rgba(30,42,76,0.85)',
            borderRadius: '12px',
            mb: 1,
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
          sx={{
            input: { color: '#e0e7ef', fontWeight: 600 },
            label: { color: '#b3b8c5' },
            fieldset: { borderColor: '#7f5af0' },
            background: 'rgba(30,42,76,0.85)',
            borderRadius: '12px',
            mb: 1,
          }}
        />
        <TextField
          label="GitHub link"
          variant="outlined"
          fullWidth
          required
          value={githubId}
          onChange={e => setGithubId(e.target.value)}
          sx={{
            input: { color: '#e0e7ef', fontWeight: 600 },
            label: { color: '#b3b8c5' },
            fieldset: { borderColor: '#7f5af0' },
            background: 'rgba(30,42,76,0.85)',
            borderRadius: '12px',
            mb: 1,
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          required
          value={password}
          onChange={handlePasswordChange}
          error={!!passwordError}
          sx={{
            input: { color: '#e0e7ef', fontWeight: 600 },
            label: { color: '#b3b8c5' },
            fieldset: { borderColor: '#7f5af0' },
            background: 'rgba(30,42,76,0.85)',
            borderRadius: '12px',
            mb: 1,
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleClickShowPassword} edge="end" tabIndex={-1}>
                {showPassword ? <VisibilityOff sx={{ color: '#7f5af0' }} /> : <Visibility sx={{ color: '#0f8b96' }} />}
              </IconButton>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type={showConfirmPassword ? 'text' : 'password'}
          fullWidth
          required
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={!!passwordError}
          helperText={passwordError}
          sx={{
            input: { color: '#e0e7ef', fontWeight: 600 },
            label: { color: '#b3b8c5' },
            fieldset: { borderColor: '#7f5af0' },
            background: 'rgba(30,42,76,0.85)',
            borderRadius: '12px',
            mb: 1,
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleClickShowConfirmPassword} edge="end" tabIndex={-1}>
                {showConfirmPassword ? <VisibilityOff sx={{ color: '#7f5af0' }} /> : <Visibility sx={{ color: '#0f8b96' }} />}
              </IconButton>
            ),
          }}
        />
        <input
          type="file"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
        />
        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 1,
            borderRadius: '12px',
            color: '#7f5af0',
            borderColor: '#7f5af0',
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: 1,
            background: 'rgba(127,90,240,0.08)',
            transition: 'all 0.2s',
            '&:hover': {
              background: 'rgba(127,90,240,0.18)',
              borderColor: '#0f8b96',
              color: '#0f8b96',
            },
          }}
          onClick={handleButtonClick}
        >
          Upload Profile Picture
        </Button>
        {image && <FormHelperText sx={{ color: '#7f5af0', fontWeight: 600 }}>{image.name}</FormHelperText>}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{
            mt: 2,
            py: 1.3,
            fontWeight: 700,
            fontSize: 18,
            borderRadius: '16px',
            background: 'linear-gradient(90deg, #0f8b96 30%, #7f5af0 80%)',
            boxShadow: '0 4px 24px 0 rgba(127,90,240,0.18)',
            letterSpacing: 1,
            transition: 'all 0.2s',
            '&:hover': {
              background: 'linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)',
              boxShadow: '0 8px 32px 0 rgba(15,139,150,0.18)',
            },
          }}
        >
          {isSigningUp ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </Box>
      <Typography sx={{ mt: 2, color: '#b3b8c5', fontWeight: 500, fontSize: 16 }}>
        Already have an account?{' '}
        <Link href="/login" style={{ color: '#7f5af0', fontWeight: 700, textDecoration: 'none' }}>
          Login
        </Link>
      </Typography>
    </Box>
  );
}
