import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import lightTheme from "./theme/lightTheme";
import darkTheme from "./theme/darkTheme";

import Button from "@mui/material/Button";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import VerifyOtp from "./pages/VerifyOtp";
import Home from "./pages/Home";
import InventoryTransfer from "./pages/InventoryTransfer";
import Upload from "./pages/Upload";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Button
        sx={{
          m: 2,
          backgroundColor: "main.primary",
        }}
        onClick={toggleTheme}
        variant="contained"
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </Button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/inventory-transfer" element={<InventoryTransfer />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
