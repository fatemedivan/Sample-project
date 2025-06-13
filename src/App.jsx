import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import darkTheme from "./theme/darkTheme";
import lightTheme from "./theme/lightTheme";

import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VerifyOtp from "./pages/VerifyOtp";
import Upload from "./pages/Upload";
import InventoryTransfer from "./pages/InventoryTransfer";
import Dashboard from "./components/common/Dashboard";
import ProtectedRoute from './components/common/ProtectedRout'

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/sign-in");
  };

  const hideNavbarRoutes = ["/sign-in", "/sign-up", "/verify-otp"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      {shouldShowNavbar && <Navbar user={user} onLogout={logout} />}

      
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route element={<ProtectedRoute />}>
            <Route
              path="/inventory-transfer"
              element={<InventoryTransfer />}
            />
            <Route path="/upload" element={<Upload />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
