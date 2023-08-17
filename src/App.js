import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Overview from "./components/Overview";
import Users from "./components/Users";
import Admins from "./components/Admin";
import Logout from "./components/Logout";
// import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<SignUp isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/login"
          element={
            <Login
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        {/* <Route
          path="/protectedroute"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        /> */}
        <Route
          path="/overview"
          element={<Overview isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/users"
          element={<Users isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/admins"
          element={<Admins isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/logout"
          element={
            <Logout
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
