import { Box } from "@mui/system";
import React, { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ProgressLoader from "../../components/ProgressLoader/ProgressLoader";
import { useTheme } from "@mui/material/styles";
import useAuth from "../../hooks/useAuth";

import TwoFAPinModal from "../Registration/TwoFAPage/TwoFAPinModal/TwoFAPinModal";
import { Alert, IconButton, Snackbar, useMediaQuery } from "@mui/material";
import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import AuthProgress from "../../components/AuthProgress/AuthProgress";

// Lazy Component
const Layout = React.lazy(() => import("../../components/Layout/Layout"));

const Wallets = () => {
  const [openAuthProgressModal, setOpenAuthProgressModal] = useState(true);
  const [showAuthenticationSnackbar, setShowAuthenticationSnackbar] =
    useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { showPin, setShowPin } = useAuth();

  const handleCloseTwoFAPin = () => {
    setShowPin(false);
  };

  // handler for auth progress
  const handleOpenAuthProgressModal = () => {
    handleCloseTwoFAPin();
    setOpenAuthProgressModal(true);
  };

  const handleCloseAuthProgressModal = () => {
    setOpenAuthProgressModal(false);
  };

  // Handler for authentication successfull snackbar
  const handleCloseAuthenticationSnackbar = () => {
    setShowAuthenticationSnackbar(false);
  };

  // Close the authorization modal
  useEffect(() => {
    if (openAuthProgressModal) {
      const closeTheAuthorization = setTimeout(() => {
        setOpenAuthProgressModal(false);
        setShowAuthenticationSnackbar(true);
      }, 2500);

      return () => clearTimeout(closeTheAuthorization);
    }
  }, [openAuthProgressModal]);

  return (
    <Box bgcolor={theme.palette.background.default}>
      {/* <Snackbar
        anchorOrigin={
          !isMobile
            ? { vertical: "top", horizontal: "right" }
            : { vertical: "bottom", horizontal: "center" }
        }
        open={showAuthenticationSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseAuthenticationSnackbar}
      >
        <Alert
          action={
            <IconButton
              onClick={handleCloseAuthenticationSnackbar}
              sx={{ mt: -0.5 }}
            >
              <Close sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          }
          icon={<CheckCircleOutline sx={{ fontSize: "1.5rem" }} />}
          sx={!isMobile ? { fontSize: "1rem" } : { width: "100%" }}
          onClose={handleCloseAuthenticationSnackbar}
          severity="success"
        >
          Authentication Successfull!
        </Alert>
      </Snackbar> */}
      {/* <AuthProgress
        open={openAuthProgressModal}
        onClose={handleCloseAuthProgressModal}
      /> */}
      {/* <TwoFAPinModal
        open={true}
        onClose={handleCloseTwoFAPin}
        openAuthorizationModal={handleOpenAuthProgressModal}
      /> */}
      <Suspense  fallback={<ProgressLoader />}>
        <Layout >
          <Box  mt={3}>
            <Outlet />
          </Box>
        </Layout>
      </Suspense>
    </Box>
  );
};

export default Wallets;
