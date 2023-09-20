import React, { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
  Slide,
  SnackbarContent,
} from "@mui/material";
import { Box } from "@mui/system";

const InstallationModal = ({ open, handleOpen, onClose }) => {
  const [promptInstall, setPromptInstall] = useState(null);
  const [showInstalledSnackbar, setShowInstalledSnackbar] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCloseSnackbar = () => {
    setShowInstalledSnackbar(false);
  };

  useEffect(() => {
    // Initialize deferredPrompt for use later to show browser install prompt.
    let deferredPrompt;

    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      setPromptInstall(e);
      deferredPrompt.prompt();
      // Update UI notify the user they can install the PWA
      handleOpen();
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired now.`);
    });
  }, [handleOpen]);

  useEffect(() => {
    window.addEventListener("appinstalled", () => {
      // Hide the app-provided install promotion
      onClose();
      // Clear the deferredPrompt so it can be garbage collected
      setPromptInstall(null);
      // Optionally, send analytics event to indicate successful install
      setShowInstalledSnackbar(true);
    });
  }, [onClose]);

  // handle pwa installaion
  const handleInstallation = async (e) => {
    e.preventDefault();
    onClose();
    if (!promptInstall) {
      return;
    } else {
      promptInstall.prompt();
    }
  };

  return (
    <React.Fragment>
      <Snackbar
        open={showInstalledSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thrifty Wallet PWA has been installed successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={
          !isMobile
            ? { vertical: "bottom", horizontal: "center" }
            : { vertical: "bottom", horizontal: "center" }
        }
        TransitionComponent={Slide}
        open={open}
        autoHideDuration={null}
        onClose={onClose}
      >
        <SnackbarContent
          
          sx={{ backgroundColor: theme.palette.background.default }}
          message={
            <Box  p={2}>
              <Stack>
                <Typography
                  color="secondary"
                  textAlign="center"
                  variant="h6"
                  component="p"
                  mb={2}
                >
                  Thrifty Wallet is now available as{" "} 
                  <Typography variant="h6" color="primary" component="span">
                    PWA!
                  </Typography>
                </Typography>
              </Stack>
              <Stack gap={2} justifyContent="center" alignItems="center">
                <Button
                  fullWidth
                  onClick={handleInstallation}
                  variant="contained"
                  color="primary"
                >
                  Install
                </Button>
                <Button
                  color="secondary"
                  fullWidth
                  onClick={onClose}
                  variant="text"
                >
                  Not Now
                </Button>
              </Stack>
            </Box>
          }
          // action={
          //   <Stack>
          //     <Button fullWidth onClick={onClose} variant="outlined">
          //       Not Now
          //     </Button>
          //     <Button
          //       fullWidth
          //       onClick={handleInstallation}
          //       variant="contained"
          //       color="primary"
          //     >
          //       Install
          //     </Button>
          //   </Stack>
          // }
        />
      </Snackbar>
    </React.Fragment>
  );
};

export default InstallationModal;
