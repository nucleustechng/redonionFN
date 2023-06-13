import React, { useState, useEffect } from "react"; 
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useTheme } from "@mui/material/styles";

const PrivateRoute = ({ children }) => {
  // hooks
  const { getUser, isLoading } = useAuth();
  const theme = useTheme();
  const location = useLocation();
  var user = JSON.parse(localStorage.getItem('user'));

   
  





  if (isLoading) {
    return (
      <Box
        bgcolor={theme.palette.background.default}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <CircularProgress color="primary" />
        </Box>
      </Box>
    );
  }

  if (user.token) {
    return children;
  } else {
    return  <Navigate to="/auth/sign-in" state={{ from: location }} />;
  }
};

export default PrivateRoute;
