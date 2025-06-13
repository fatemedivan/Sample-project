import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Box, CircularProgress, Typography } from "@mui/material";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="h6">در حال بررسی وضعیت احراز هویت...</Typography>
      </Box>
    );
  }

  return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
