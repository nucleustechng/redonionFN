import React from "react";
import {
  Button,
  Divider,
  IconButton,
  Input,
  Modal,
  Stack,
  Tooltip,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

// Styles
import styles from "../../Account.module.css";
import { LightUIButtonPrimary } from "../../../../../Utilities/LightUIButtons";

const AddBankModal = ({
  open,
  handleClose,
  handleAddBankInformationChange,
  addBankInformation,
  handleSaveNewAddBank,
}) => {
  const theme = useTheme();

  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      keepMounted
      open={open}
      onClose={handleClose}
    >
      <Box bgcolor="background.paper" className={styles.bankInfoModalBody}>
        <Box className={styles.modalTopBar}>
          <Box>
            <Typography
              variant="h5"
              component="h2"
              fontWeight={600}
              color="primary"
              letterSpacing={1}
            >
              Add Bank Info
            </Typography>
            <Typography className={styles.textUnderScore}></Typography>
          </Box>
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
        <Box className={styles.bankInfoModalContentBox}>
          {/* Bank Name */}
          <Stack spacing={1} mb={2}>
            <Typography
              variant="body2"
              color={
                theme.palette.mode === "dark"
                  ? "text.secondary"
                  : "common.black"
              }
            >
              Bank Name
            </Typography>
            <Input
              disableUnderline
              className="inputField"
              value={
                addBankInformation.bankName ? addBankInformation.bankName : ""
              }
              name="bankName"
              onChange={handleAddBankInformationChange}
              variant="filled"
              size="small"
              color="secondary"
            />
          </Stack>
          {/* IFSC */}
          <Stack spacing={1} mb={2}>
            <Typography
              variant="body2"
              color={
                theme.palette.mode === "dark"
                  ? "text.secondary"
                  : "common.black"
              }
            >
              IFSC
            </Typography>
            <Input
              disableUnderline
              className="inputField"
              value={
                addBankInformation.bankIFSC ? addBankInformation.bankIFSC : ""
              }
              name="bankIFSC"
              onChange={handleAddBankInformationChange}
              variant="filled"
              size="small"
              color="secondary"
            />
          </Stack>
          {/* Account Holder */}
          <Stack spacing={1} mb={2}>
            <Typography
              variant="body2"
              color={
                theme.palette.mode === "dark"
                  ? "text.secondary"
                  : "common.black"
              }
            >
              Account Holder Name
            </Typography>
            <Input
              disableUnderline
              className="inputField"
              value={
                addBankInformation.bankAccountHolderName
                  ? addBankInformation.bankAccountHolderName
                  : ""
              }
              name="bankAccountHolderName"
              onChange={handleAddBankInformationChange}
              variant="filled"
              size="small"
              color="secondary"
            />
          </Stack>
        </Box>
        {theme.palette.mode === "dark" ? (
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            fullWidth
          >
            Save
          </Button>
        ) : (
          <LightUIButtonPrimary color="primary" fullWidth>
            Save
          </LightUIButtonPrimary>
        )}
      </Box>
    </Modal>
  );
};

export default AddBankModal;
