"use client"
import React from "react";
import { AppBar, Toolbar } from "@mui/material";

export default function Navbar({children}) {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#04090a", color: "#000", width: "100%", height: 80, borderBottom: "2px solid #0f8b96" }}>
      <Toolbar sx={{display: "flex", justifyContent: "flex-end", alignItems: "flex-center", height: "100%", width: "100%" }}>
        {children}
      </Toolbar>
    </AppBar>
  );
}
