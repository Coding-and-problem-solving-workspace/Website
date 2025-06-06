"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Typography, TextField, IconButton } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doSignInUserWithEmailAndPassword } from "@/firebase/auth";
import { useAuth } from "@/context/authContext";
export default function Login() {
  const { currentUser, userLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(userLoggedIn, currentUser);
    if (userLoggedIn) {
      router.push("/dashboard");
    }
  }, [userLoggedIn, currentUser, router]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const res = await doSignInUserWithEmailAndPassword(username, password);
        if (res.user) {
          console.log("User logged in", res);
          router.push("/dashboard");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: 420,
        width: "100%",
        maxWidth: 420,
        mx: "auto",
        background: "rgba(24,28,43,0.92)",
        borderRadius: "28px",
        boxShadow: "0 8px 32px 0 rgba(127,90,240,0.18)",
        border: "1.5px solid rgba(127,90,240,0.13)",
        backdropFilter: "blur(16px)",
        p: { xs: 3, md: 5 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#e0e7ef",
        mt: { xs: 6, md: 0 },
        gap: 2,
        transition: "box-shadow 0.2s",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={900}
        sx={{
          mb: 2,
          background:
            "linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "monospace",
          letterSpacing: 1.2,
          textAlign: "center",
        }}
      >
        Login
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
          label="Email"
          variant="outlined"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            input: { color: "#e0e7ef", fontWeight: 600 },
            label: { color: "#b3b8c5" },
            fieldset: { borderColor: "#7f5af0" },
            background: "rgba(30,42,76,0.85)",
            borderRadius: "12px",
            mb: 1,
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          required
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            input: { color: "#e0e7ef", fontWeight: 600 },
            label: { color: "#b3b8c5" },
            fieldset: { borderColor: "#7f5af0" },
            background: "rgba(30,42,76,0.85)",
            borderRadius: "12px",
            mb: 1,
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
                tabIndex={-1}
              >
                {showPassword ? (
                  <VisibilityOff sx={{ color: "#7f5af0" }} />
                ) : (
                  <Visibility sx={{ color: "#0f8b96" }} />
                )}
              </IconButton>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSigningIn}
          sx={{
            mt: 1,
            py: 1.3,
            fontWeight: 700,
            fontSize: 18,
            borderRadius: "16px",
            background:
              "linear-gradient(90deg, #0f8b96 30%, #7f5af0 80%)",
            boxShadow: "0 4px 24px 0 rgba(127,90,240,0.18)",
            letterSpacing: 1,
            transition: "all 0.2s",
            "&:hover": {
              background:
                "linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)",
              boxShadow: "0 8px 32px 0 rgba(15,139,150,0.18)",
            },
          }}
        >
          {isSigningIn ? "Logging in..." : "LOGIN"}
        </Button>
      </Box>
      <Typography
        sx={{
          mt: 2,
          color: "#b3b8c5",
          fontWeight: 500,
          fontSize: 16,
        }}
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          style={{
            color: "#7f5af0",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Create an Account
        </Link>
      </Typography>
    </Box>
  );
}
