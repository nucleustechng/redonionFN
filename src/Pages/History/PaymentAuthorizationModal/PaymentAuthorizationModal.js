import React from "react";
import { CircularProgress, Modal, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

// Styles
import styles from "./PaymentAuthorizationModal.module.css";

const PaymentAuthorizationModal = ({ open, handleClose, message }) => {
  return (
    <Modal keepMounted open={open} onClose={handleClose}>
      <Box className={styles.modalStyle} bgcolor="background.default">
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Box>
            <CircularProgress color="primary" />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography mt={2} color="secondary" variant="body2" component="p">
              {message}...
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default PaymentAuthorizationModal;
