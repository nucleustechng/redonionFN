import { Box } from "@mui/system";
import React, { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ProgressLoader from "../../components/ProgressLoader/ProgressLoader";
import { useTheme } from "@mui/material/styles";
import useAuth from "../../hooks/useAuth";

// import TwoFAPinModal from "../Registration/TwoFAPage/TwoFAPinModal/TwoFAPinModal";
import {
  Alert,
  IconButton,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
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

  return (
    <Box bgcolor={theme.palette.background.default}>
      <Suspense fallback={<ProgressLoader />}>
        <Layout>
          <Box mt={3}>
             <Outlet />
          </Box>
        </Layout>
      </Suspense>
    </Box>
  );
};

export default Wallets;
