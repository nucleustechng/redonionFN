import React from "react";
import { Typography, Button, useTheme } from "@mui/material";
import { Box } from "@mui/system";

// Styles
import styles from "../Account.module.css";

// Authentication
import { useNavigate } from "react-router-dom";
import { LightUIButtonPrimary } from "../../../../Utilities/LightUIButtons";

const DeleteAccountModalMobile = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      px={2}
      py={2}
      height={"100%"}
      bgcolor="background.paper"
      className={styles.deleteAccountModalBodyMobile}
    >
      <Box className={styles.deleteAccountModalContentBox}>
        <Typography
          mb={3}
          textAlign="center"
          lineHeight={2}
          color="secondary"
          variant="body2"
        >
          Are you sure you want to delete your account? Once deleted, it can't
          be recovered again.
        </Typography>
      </Box>
      {theme.palette.mode === "dark" ? (
        <Button
          onClick={() => navigate("/registration/sign-up")}
          color="primary"
          variant="contained"
          fullWidth
        >
          <Typography
            variant="caption"
            className={styles.deleteAccountModalButton}
            color="common.black"
            fontWeight={700}
          >
            Yes, delete my account
          </Typography>
        </Button>
      ) : (
        <LightUIButtonPrimary
          fullWidth
          onClick={() => navigate("/registration/sign-up")}
        >
          <Typography
            variant="caption"
            className={styles.deleteAccountModalButton}
            color="common.white"
            fontWeight={700}
          >
            Yes, delete my account
          </Typography>
        </LightUIButtonPrimary>
      )}
    </Box>
  );
};

export default DeleteAccountModalMobile;
