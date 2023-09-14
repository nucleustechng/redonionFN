import React, { useState } from "react";
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
import OtpInput from "react-otp-input";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

// Styles
import styles from "./CoinDetailsStyle.module.css";
import { LightUIButtonPrimary } from "../../Utilities/LightUIButtons";

const SendConfirmationModal = ({ open, onClose, handleConfirmation }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [otp, setOtp] = useState("");

  // var bcrypt = require("bcryptjs");


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
        className={
          !isMobile ? styles.sendModalStyle : styles.sendModalStyleMobile
        }
      >
        <Box>
          <Stack mb={1} direction="row" justifyContent="space-between">
            <Typography color="primary" variant="h6">
              Transaction Pin
            </Typography>
            <IconButton color="secondary" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          {/* <Divider /> */}
          <Typography my={4} variant="body1">
            Create a new tansaction pin
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
            my={5}
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              inputStyle={{
                width: "60px",
                height: "60px",
                fontSize: "18px",
                backgroundColor: "transparent",
                color: theme.palette.mode === "dark" ? "#fff" : "#111",
                borderColor: theme.palette.mode === "dark" ? "#fff" : "#111",
                marginRight: 20,
                borderRadius: 10,
              }}
              numInputs={4}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
            />
          </Stack>
          <Stack mt={2} direction="row" alignItems="center" spacing={1}>
            <Button
              disableElevation
              fullWidth
              onClick={handleConfirmation}
              variant="contained"
              style={{
                height: 60,
                borderRadius: 10,
                fontSize: 18,
                textTransform: "none",
              }}
              color="primary"
            >
              Create
            </Button>

            <Button
              disableElevation
              style={{
                height: 60,
                borderRadius: 10,
                fontSize: 18,
                textTransform: "none",
                width: 250,
              }}
              onClick={onClose}
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
