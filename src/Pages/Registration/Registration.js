import React from "react";

import { Box } from "@mui/system";

// Custom Theme
import { useTheme } from "@mui/material/styles";

// React Router
import { Outlet } from "react-router-dom";

// Styles
import styles from "./Registration.module.css";
import { useMediaQuery } from "@mui/material";



const Registration = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      bgcolor={
        !isMobile
          ? theme.palette.background.default
          : theme.palette.background.paper
      }
      className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
    >
      <Outlet />
    </Box>
  );
};

export default Registration;
