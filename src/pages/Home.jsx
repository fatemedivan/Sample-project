import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  useEffect(()=>{
    const storedUserData = JSON.parse(localStorage.getItem('user'))
    if (storedUserData) {
      setFirstName(storedUserData.firstName)
      setLastName(storedUserData.lastName)
    }
    
  },[])
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
        welcome to homepage {firstName && firstName} {lastName && lastName}
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
