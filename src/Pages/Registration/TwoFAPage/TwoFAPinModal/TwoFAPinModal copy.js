import React from "react";
import { Modal, Stack, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "./TwoFAPinModal.module.css";
import { ReactPinField } from "react-pin-field";

// Logos
import ReusableVectorLogo from "../../../../assets/mainLogo.svg";
import useAuth from "../../../../hooks/useAuth";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../../components/LazyImageComponent/LazyImageComponent")
);

const TwoFAPinModal = ({ open, onClose, openAuthorizationModal }) => {
  const { user, logOut } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Generate user name out of the email
  const userName = "alex";
  // user?.email.split("@").slice(0, 1).toString();

  return (
    <Modal
      disableAutoFocus
      disableEscapeKeyDown
      keepMounted
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
    >
      <Box className={!isMobile ? styles.modalStyle : styles.modalStyleMobile}>
        <Box
          bgcolor={theme.palette.background.paper}
          className={styles.modalContentBox}
        >
          <Box p={4} borderRadius="10px">
            <LazyImageComponent
              className={!isMobile ? "" : styles.modalLogo}
              src={ReusableVectorLogo}
              style={{ width: "60px", height: "60px" }}
            />
            {/* <Typography color="secondary" variant="h6" mt={3} mb={2}>
              Hi, {userName.charAt(0).toUpperCase() + userName.slice(1)}
            </Typography> */}
            <Stack direction="row" justifyContent="center" spacing={"5px"}>
              <Typography variant="body2" color="secondary">
                {user.email}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={logOut}
              >
                logout
              </Typography>
            </Stack>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                my: 3,
              }}
            >
              <ReactPinField
                onComplete={openAuthorizationModal}
                className={
                  theme.palette.mode === "dark"
                    ? styles.pinFieldDark
                    : styles.pinFieldLight
                }
                type="password"
                validate="0123456789"
                inputMode="numeric"
                autoComplete="nope"
                style={{
                  width: isMobile ? "2rem" : "3rem",
                }}
              />
            </Box>
            <Typography variant="body2" color="secondary" mb={2}>
              Please enter your PIN
            </Typography>
            <Typography
              variant="caption"
              color="primary"
              sx={{ cursor: "pointer" }}
            >
              Forgot PIN?
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TwoFAPinModal;
