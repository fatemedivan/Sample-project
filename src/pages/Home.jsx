import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          mb: 3,
        }}
      >
        welcome to homepage
      </Typography>

      <Button
        onClick={() => navigate("/sign-up")}
        variant="contained"
        size="large"
        sx={{
          px: 4,
          py: 1.5,
          fontSize: "1rem",
          textTransform: "none",
          borderRadius: 3,
        }}
      >
        Get started
      </Button>
    </Box>
  );
}
