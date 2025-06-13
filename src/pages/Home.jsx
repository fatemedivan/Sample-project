import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    } else {
      setUser(null);
      navigate('/sign-in')
    }
  }, []);

  const { logout } = useAuth();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          mb: 3,
        }}
      >
        welcome to homepage {user ? `${user.firstName} ${user.lastName}` : ""}
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

      {user && (
        <Button
          onClick={logout}
          variant="outlined"
          color="error"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            textTransform: "none",
            borderRadius: 3,
          }}
        >
          Logout
        </Button>
      )}
    </Box>
  );
}
