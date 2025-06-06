"use client"
import React from "react";
import { AppBar, Toolbar } from "@mui/material";

export default function Navbar({children}) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(24,28,43,0.65)",
        color: "#fff",
        width: "calc(100% - 48px)",
        left: 24,
        right: 24,
        top: 24,
        borderRadius: "24px",
        boxShadow: "0 8px 32px 0 rgba(15,139,150,0.18)",
        border: "1.5px solid rgba(127,90,240,0.18)",
        backdropFilter: "blur(18px)",
        zIndex: 1200,
        transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Toolbar sx={{
        display: "flex",
        justifyContent: 'space-between',
        alignItems: "center",
        height: "80px",
        width: "100%",
        px: { xs: 2, md: 6 },
        minHeight: "80px !important",
      }}>
        {children}
      </Toolbar>
    </AppBar>
  );
}
