"use client"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Typography, TextField, IconButton } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");  
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
        height={500}
        width={400}
        bgcolor="white"
        border="2px solid white"
        borderRadius="30px"
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          display="flex"
          flexDirection="column"
        >
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            margin="normal"
            fullWidth
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 4 }}
          >
            Login
          </Button>
        </Box>
        <Box
          width="100%"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          paddingX={5}
        >
          <Link
            href="/signup"
            className="hover:text-blue-600 hover:underline"
          >
            Create an Account
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
