// src/pages/Home.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home({ user }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        welcome {user ? user.firstName : ""}
      </Typography>

      {!user && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            onClick={() => navigate("/sign-in")}
            variant="contained"
            size="large"
            sx={{ borderRadius: 3 }}
          >
            sign in
          </Button>
          <Button
            onClick={() => navigate("/sign-up")}
            variant="outlined"
            size="large"
            sx={{ borderRadius: 3 }}
          >
            sign up
          </Button>
        </Box>
      )}
    </Box>
  );
}
