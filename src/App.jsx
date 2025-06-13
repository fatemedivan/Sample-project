import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VerifyOtp from "./pages/VerifyOtp";
import Upload from "./pages/Upload";
import InventoryTransfer from "./pages/InventoryTransfer";
import Dashboard from "./components/common/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRout";
import { useAuth } from "./context/AuthContext";
import { ThemeProviderContext } from "./context/ThemeContext";
import PublicRoute from "./components/common/PublicRout";

function App() {
  const location = useLocation();

  const { logout, user } = useAuth();

  const hideNavbarRoutes = ["/sign-in", "/sign-up", "/verify-otp"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <ThemeProviderContext>
      <CssBaseline />
      {shouldShowNavbar && <Navbar user={user} onLogout={logout} />}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route element={<PublicRoute user={user}/>}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/inventory-transfer" element={<InventoryTransfer />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </ThemeProviderContext>
  );
}

export default App;
