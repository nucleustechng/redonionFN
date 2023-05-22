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

const KYCInfoModal = ({
  open,
  handleClose,
  KYCInformation,
  handleKYCInformationChange,
  handleEdit,
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
      <Box bgcolor="background.paper" className={styles.KYCInfoModalBody}>
        <Box className={styles.modalTopBar}>
          <Box>
            <Typography
              variant="h5"
              component="h2"
              fontWeight={600}
              color="primary"
              letterSpacing={1}
            >
              Resubmit KYC Info
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
        <Box className={styles.KYCInfoModalContentBox}>
          {/* Full Name */}
          <Stack spacing={1} mb={2}>
            <Typography
              variant="body2"
              color={
                theme.palette.mode === "dark"
                  ? "text.secondary"
                  : "common.black"
              }
            >
              Full Name
            </Typography>
            <Input
              disableUnderline
              className="inputField"
              value={KYCInformation.fullName ? KYCInformation.fullName : ""}
              name="fullName"
              onChange={handleKYCInformationChange}
              variant="filled"
              size="small"
              color="secondary"
            />
          </Stack>
          {/* Address */}
          <Stack spacing={1} mb={2}>
            <Typography
              variant="body2"
              color={
                theme.palette.mode === "dark"
                  ? "text.secondary"
                  : "common.black"
              }
            >
              Address
            </Typography>
            <Input
              disableUnderline
              className="inputField"
              value={KYCInformation.address ? KYCInformation.address : ""}
              name="address"
              onChange={handleKYCInformationChange}
              variant="filled"
              size="small"
              color="secondary"
            />
          </Stack>
          {/* Adhar Card */}
          <Stack spacing={1} mb={2}>
            <Typography
              variant="body2"
              color={
                theme.palette.mode === "dark"
                  ? "text.secondary"
                  : "common.black"
              }
            >
              Adhar Card
            </Typography>
            <Input
              disableUnderline
              className="inputField"
              value={
                KYCInformation.adharCardNumber
                  ? KYCInformation.adharCardNumber
                  : ""
              }
              name="adharCardNumber"
              onChange={handleKYCInformationChange}
              variant="filled"
              size="small"
              color="secondary"
              type="number"
            />
          </Stack>
        </Box>
        {theme.palette.mode === "dark" ? (
          <Button
            onClick={handleEdit}
            color="primary"
            variant="contained"
            fullWidth
          >
            Save
          </Button>
        ) : (
          <LightUIButtonPrimary onClick={handleEdit} color="primary" fullWidth>
            Save
          </LightUIButtonPrimary>
        )}
      </Box>
    </Modal>
  );
};

export default KYCInfoModal;
