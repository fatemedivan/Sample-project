import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          MyApp
        </Typography>

        <Box>
          {user ? (
            <>
              <Typography variant="body1" component="span" sx={{ mr: 2 }}>
                hi {user.firstName}
              </Typography>
              <Button color="inherit" onClick={onLogout}>
                logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/sign-in")}>
                sign in
              </Button>
              <Button color="inherit" onClick={() => navigate("/sign-up")}>
                sign up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
