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
      sx={{
        height: "100vh",
        minWidth: "100%",
        display: "flex",
        bgcolor: "black",
        padding: 0,
      }}
    >
      <Box
        width="60%"
        sx={{
          background: "linear-gradient(160deg, #010203 75%, #0f8b96 95%)",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "100%",
          paddingX: 4,
        }}
      >
        <Box width="fit-content">
          <Typography
            color="white"
            fontFamily="monospace"
            fontSize={70}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              borderRight: "2px solid white",
              animation: `${typewriter} 9s steps(40, end) 1s infinite,  ${blink} 1s step-end infinite`,
              width: "fit-content",
            }}
          >
            Plan. Code. Execute.
          </Typography>
        </Box>
      </Box>
      {children}
    </Container>
  );
}
