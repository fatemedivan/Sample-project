import React, { useState, useEffect, createContext } from "react";
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
import ProtectedRoute from "./components/common/ProtectedRout";

// 💡 ساخت context برای اشتراک‌گذاری themeMode
export const ThemeModeContext = createContext();

function App() {
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("themeMode");
    if (saved) setThemeMode(saved);
  }, []);

  const toggleTheme = () => {
    const next = themeMode === "light" ? "dark" : "light";
    setThemeMode(next);
    localStorage.setItem("themeMode", next);
  };

  return (
    <ThemeModeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <Button
          sx={{ m: 2 }}
          onClick={toggleTheme}
          variant="contained"
        >
          {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </Button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/inventory-transfer"
              element={<InventoryTransfer />}
            />
            <Route path="/upload" element={<Upload />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
