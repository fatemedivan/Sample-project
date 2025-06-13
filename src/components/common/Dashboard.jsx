import React from "react";
import PropTypes from "prop-types";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import { Box, Typography, Button } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { useThemeMode } from "../../context/ThemeContext";

function ToolpadDashboard({ user }) {
  const { logout } = useAuth();
  const { theme } = useThemeMode();

  return (
    <AppProvider navigation={[]} theme={theme}>
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
            welcome to dashboard {user.firstName}
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
