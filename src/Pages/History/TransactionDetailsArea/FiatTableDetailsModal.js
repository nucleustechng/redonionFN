import React from "react";
import {
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";

// Styles
import styles from "../../../components/TableDetailsModal/TableDetailsModal.module.css";
import Close from "@mui/icons-material/Close";

const FiatTableDetailsModal = ({
  open,
  onClose,
  modalTitle,
  tableHeads,
  tableData,
}) => {
  const theme = useTheme();

  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      keepMounted
      open={open}
      onClose={onClose}
    >
      <Box
        bgcolor={theme.palette.background.paper}
        className={styles.modalBody}
      >
        <Box className={styles.modalContent}>
          <Stack
            p={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="primary" variant="subtitle1">
              {modalTitle}
            </Typography>
            <IconButton size="small" onClick={onClose}>
              <Close />
            </IconButton>
          </Stack>
          <Divider />
          <Box mt={2} px={1} className={styles.tableDataBox}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="column" spacing={2}>
                {tableHeads.map((th) => (
                  <Typography
                    key={th.id}
                    color="text.secondary"
                    variant="body1"
                  >
                    {th?.name}
                  </Typography>
                ))}
              </Stack>
              <Stack direction="column" spacing={2} sx={{ textAlign: "right" }}>
                <Typography variant="body1" color="text.primary">
                  {tableData[0]?.amount}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {tableData[0]?.paymentMethod}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {tableData[0]?.status}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {tableData[0]?.timeStamp}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {tableData[0]?.transactionID}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FiatTableDetailsModal;
