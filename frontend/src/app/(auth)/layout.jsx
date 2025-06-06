"use client";
import { Box, Container, Typography } from "@mui/material";

import { keyframes } from "@mui/system";

const typewriter = keyframes`
   0% {
    width: 0;
  }
  40% {
    width: 100%;
  }
  60% {
    width: 100%;
  }
  100% {
    width: 0;
    animation-timing-function: steps(40, end);
  }
`;

const blink = keyframes`
   0%, 100% {
    border-color: transparent;
  }
  50% {
    border-color: white;
  }
`;

export default function AuthLayout({ children }) {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "row",
        bgcolor: "#101624",
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Left: Animated, modern SaaS hero */}
      <Box
        width={{ xs: "0%", md: "55%" }}
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background:
            "radial-gradient(ellipse at 60% 40%, #7f5af0 0%, #0f8b96 60%, #101624 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glassmorphic floating card with logo and tagline */}
        <Box
          sx={{
            background: "rgba(24,28,43,0.65)",
            borderRadius: "32px",
            boxShadow: "0 8px 32px 0 rgba(127,90,240,0.18)",
            border: "1.5px solid rgba(127,90,240,0.18)",
            backdropFilter: "blur(18px)",
            px: 7,
            py: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontWeight: 900,
              fontSize: 44,
              letterSpacing: 2,
              background:
                "linear-gradient(90deg, #fff 10%, #7f5af0 60%, #0f8b96 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              textAlign: "center",
            }}
          >
            
          </Typography>
          <Typography
            sx={{
              color: "#e0e7ef",
              fontSize: 28,
              fontWeight: 700,
              mb: 2,
              textAlign: "center",
              letterSpacing: 1.2,
            }}
          >
            Plan. Code. Execute.
          </Typography>
          <Typography
            sx={{
              color: "#b3b8c5",
              fontSize: 18,
              fontWeight: 500,
              textAlign: "center",
              maxWidth: 340,
              mt: 1,
            }}
          >
            The modern platform for coding, problem solving, and
            learning. Join a vibrant platform and accelerate your journey.
          </Typography>
        </Box>
        {/* Subtle animated gradient blobs */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #7f5af0 0%, transparent 80%)",
              top: 40,
              left: 60,
              opacity: 0.25,
              filter: "blur(12px)",
              animation:
                "floatBlob1 7s ease-in-out infinite alternate",
              "@keyframes floatBlob1": {
                "0%": { transform: "translateY(0px)" },
                "100%": { transform: "translateY(40px)" },
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #0f8b96 0%, transparent 80%)",
              bottom: 60,
              right: 40,
              opacity: 0.18,
              filter: "blur(16px)",
              animation:
                "floatBlob2 9s ease-in-out infinite alternate",
              "@keyframes floatBlob2": {
                "0%": { transform: "translateY(0px)" },
                "100%": { transform: "translateY(-30px)" },
              },
            }}
          />
        </Box>
      </Box>
      {/* Right: Auth form area */}
      <Box
        width={{ xs: "100%", md: "45%" }}
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: {
            xs: "linear-gradient(120deg, #181c2b 0%, #0f8b96 100%)",
            md: "none",
          },
          px: { xs: 2, md: 0 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 420, mx: "auto" }}>{children}</Box>
      </Box>
    </Container>
  );
}
