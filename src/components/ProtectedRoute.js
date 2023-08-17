// ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/overview" />
      }
    />
  );
}

export default ProtectedRoute;
