import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import lightTheme from "../theme/lightTheme";
import darkTheme from "../theme/darkTheme";

const ThemeContext = createContext();

export const ThemeProviderContext = ({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("themeMode");
    if (saved) setMode(saved);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);
