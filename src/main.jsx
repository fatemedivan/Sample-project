import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import { ThemeProviderContext } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProviderContext>
          <App />
        </ThemeProviderContext>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
