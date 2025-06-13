import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeMode } from "../../context/ThemeContext";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeMode();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          MyApp
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {user ? (
            <>
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
