import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function Home({ user }) {

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
    </Box>
  );
}
