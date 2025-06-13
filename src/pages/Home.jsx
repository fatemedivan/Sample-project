import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/common/Dashboard";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    } else {
      setUser(null);
    }
  }, []);

  if (user) {
    return <Dashboard user={user} />;
  }

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
      <Typography variant="h3" fontWeight="bold">
        welcome
      </Typography>

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
    </Box>
  );
}
