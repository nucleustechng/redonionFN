import React from "react";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

// Styles
import styles from "./CoinDetailsStyle.module.css";
import { LightUIButtonPrimary } from "../../Utilities/LightUIButtons";

const SendConfirmationModal = ({
  open,
  handleClose,
  amount = "23",
  coinName = "Bitcoin",
  handleConfirmation,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      keepMounted
      open={open}
      onClose={handleClose}
    >
      <Box
        bgcolor={theme.palette.background.paper}
        className={
          !isMobile ? styles.sendModalStyle : styles.sendModalStyleMobile
        }
      >
        <Box>
          <Stack mb={1} direction="row" justifyContent="space-between">
            <Typography color="primary" variant="h6">
              Are you sure?
            </Typography>
            <IconButton color="secondary" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Typography my={4} variant="body1">
            Once confirmed you will be sending {amount} {coinName} to the
            reciepient
          </Typography>
          <Stack mt={2} direction="row" alignItems="center" spacing={1}>
            {theme.palette.mode === "dark" ? (
              <Button
                disableElevation
                fullWidth
                onClick={handleConfirmation}
                variant="contained"
              >
                Yes
              </Button>
            ) : (
              <LightUIButtonPrimary fullWidth onClick={handleConfirmation}>
                Yes
              </LightUIButtonPrimary>
            )}
            <Button
              disableElevation
              fullWidth
              onClick={handleClose}
              variant="outlined"
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default SendConfirmationModal;
