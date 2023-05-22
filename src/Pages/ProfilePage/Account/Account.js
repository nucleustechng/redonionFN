import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/system";

// Styles
import styles from "./Account.module.css";

import {
  Alert,
  Divider,
  IconButton,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SettingsMenu from "../../../components/Layout/SettingsMenu";
// Component Loader
import { AccountCardSkeletons } from "../../../components/Skeletons/ComponentSkeletons";
import useAuth from "../../../hooks/useAuth";
import TwoFAPinModal from "../../Registration/TwoFAPage/TwoFAPinModal/TwoFAPinModal";
import AuthProgress from "../../../components/AuthProgress/AuthProgress";
import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

// Lazy Components
const ProfileInfo = React.lazy(() => import("./ProfileInfo/ProfileInfo"));
const BankInfo = React.lazy(() => import("./BankInfo/BankInfo"));
const KYCInfo = React.lazy(() => import("./KYCInfo/KYCInfo"));
const OtherOptions = React.lazy(() => import("./OtherOptions/OtherOptions"));

const Account = () => {
  const { showPin, setShowPin } = useAuth();
  const [openAuthProgressModal, setOpenAuthProgressModal] = useState(false);
  const [showAuthenticationSnackbar, setShowAuthenticationSnackbar] =
    useState(false);

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

  // Menu
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);

  const openMenu = Boolean(anchorElMenu);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  // Close the authorization modal
  useEffect(() => {
    if (openAuthProgressModal) {
      const closeTheAuthorization = setTimeout(() => {
        setOpenAuthProgressModal(false);
        setShowAuthenticationSnackbar(true);
      }, 5000);

      return () => clearTimeout(closeTheAuthorization);
    }
  }, [openAuthProgressModal]);

  return (
    <Box className={styles.mainBox}>
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
      </Snackbar>
      <AuthProgress
        open={openAuthProgressModal}
        onClose={handleCloseAuthProgressModal}
      />
      <TwoFAPinModal
        open={
          true
          // showPin
        }
        onClose={handleCloseTwoFAPin}
        openAuthorizationModal={handleOpenAuthProgressModal}
      /> */}
      <Box>
        <Suspense
          fallback={<AccountCardSkeletons width={!isMobile ? "58%" : "100%"} />}
        >
          <ProfileInfo handleClickMenu={handleClickMenu} />
        </Suspense>
      </Box>
      <Divider />
      <Box>
        <Suspense
          fallback={<AccountCardSkeletons width={!isMobile ? "58%" : "100%"} />}
        >
          <BankInfo handleClickMenu={handleClickMenu} />
        </Suspense>
      </Box>
      <Divider />
      <Box>
        <Suspense
          fallback={<AccountCardSkeletons width={!isMobile ? "58%" : "100%"} />}
        >
          <KYCInfo handleClickMenu={handleClickMenu} />
        </Suspense>
      </Box>
      <Divider />
      <Box>
        <Suspense
          fallback={<AccountCardSkeletons width={!isMobile ? "58%" : "100%"} />}
        >
          <OtherOptions handleClickMenu={handleClickMenu} />
        </Suspense>
      </Box>
      {isMobile && (
        <Box>
          <SettingsMenu
            open={openMenu}
            anchorEl={anchorElMenu}
            handleClose={handleCloseMenu}
          />
        </Box>
      )}
    </Box>
  );
};

export default Account;
