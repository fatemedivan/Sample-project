import React from "react";
import PropTypes from "prop-types";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import { Box, Typography } from "@mui/material";

import { useThemeMode } from "../../context/ThemeContext";

function Dashboard({ user }) {
  const { theme } = useThemeMode();

  return (
    <AppProvider navigation={[]} theme={theme}>
      <DashboardLayout>
        <Box
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            width: "100%",
            overflowX: "hidden",
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: {
                xs: "1.8rem",
                sm: "2.2rem",
                md: "2.8rem",
              },
              mb: { xs: 3, md: 4 },
            }}
          >
            welcome to dashboard {user?.firstName}
          </Typography>
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Dashboard;
