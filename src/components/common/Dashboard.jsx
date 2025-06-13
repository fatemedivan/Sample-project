import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import { Box, Typography, Button } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import darkTheme from "../../theme/darkTheme";
import lightTheme from "../../theme/lightTheme";
import { useAuth } from "../../context/AuthContext";
import { ThemeModeContext } from "../../App"; // 👈 ایمپورت کانتکست

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

function ToolpadDashboard({ user }) {
  const { logout } = useAuth();
  const { themeMode } = useContext(ThemeModeContext); // 👈 گرفتن themeMode

  return (
    <AppProvider navigation={[]} theme={themes[themeMode]}>
      <DashboardLayout>
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography variant="h4">
            welcome to dashboard{user.firstName}
          </Typography>

          <Button
            onClick={logout}
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
          >
            logout
          </Button>
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

ToolpadDashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ToolpadDashboard;
