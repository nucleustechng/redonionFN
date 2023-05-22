import React from "react";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

// Styles
import styles from "../RewardTabArea/RewardTabArea.module.css";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";

const ClaimRewardModal = ({ open, handleClose, handleOpenSnackBar }) => {
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
        bgcolor="background.paper"
        className={
          !isMobile
            ? styles.claimRewardModalBody
            : styles.claimRewardModalBodyMobile
        }
      >
        <Box className={styles.modalTopBar}>
          <Typography variant={!isMobile ? "h6" : "subtitle1"} component="h2">
            Claim your reward
          </Typography>
          <IconButton color="secondary" onClick={handleClose}>
            <Tooltip
              placement="right"
              TransitionComponent={Zoom}
              title="Close Modal"
            >
              <CloseIcon fontSize="medium" />
            </Tooltip>
          </IconButton>
        </Box>
        <Divider />
        <Box
          className={
            !isMobile
              ? styles.claimRewardModalContentBox
              : styles.claimRewardModalContentBoxMobile
          }
        >
          <Typography
            mb={3}
            textAlign="center"
            lineHeight={2}
            color="secondary"
            variant={!isMobile ? "body2" : "caption"}
          >
            Are you sure you want to claim your reward using your loyality
            coins. Loyality coin will be deducted from your Wallet.
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          {theme.palette.mode === "dark" ? (
            <Button
              className={
                !isMobile
                  ? styles.rewardClaimModalButton
                  : styles.rewardClaimModalButtonMobile
              }
              onClick={handleOpenSnackBar}
              color="primary"
              variant="contained"
              fullWidth
            >
              <Typography fontWeight={!isMobile ? 700 : 500}>Claim</Typography>
            </Button>
          ) : (
            <LightUIButtonPrimary
              className={
                !isMobile
                  ? styles.rewardClaimModalButton
                  : styles.rewardClaimModalButtonMobile
              }
              onClick={handleOpenSnackBar}
              color="primary"
              variant="contained"
              fullWidth
            >
              <Typography fontWeight={!isMobile ? 700 : 500}>Claim</Typography>
            </LightUIButtonPrimary>
          )}
          <Button
            className={
              !isMobile
                ? styles.rewardClaimModalButton
                : styles.rewardClaimModalButtonMobile
            }
            onClick={handleClose}
            color="primary"
            variant="outlined"
            fullWidth
          >
            <Typography fontWeight={!isMobile ? 700 : 500}>Cancel</Typography>
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ClaimRewardModal;
