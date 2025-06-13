import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ user }) => {
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet/>;
};

export default PublicRoute;
