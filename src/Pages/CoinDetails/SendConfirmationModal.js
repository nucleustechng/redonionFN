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
  Snackbar,
  Alert,
} from "@mui/material";
import OtpInput from "react-otp-input";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

import Close from "@mui/icons-material/Close";

import bcrypt from "bcryptjs-react";

// Styles
import styles from "./CoinDetailsStyle.module.css";
import { LightUIButtonPrimary } from "../../Utilities/LightUIButtons";

const SendConfirmationModal = ({
  open,
  onClose,
  handleConfirmation,
  result,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  var salt = bcrypt.genSaltSync(10);

  // console.log(a);

  const [otp, setOtp] = useState("");

  const [cotp, setCOtp] = useState("");

  const [stage, setStage] = useState(0);

  const [created, setCreated] = useState(localStorage.getItem("pin"));

  const [showMsg, setShowMsg] = useState("");

  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);

  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };

  const handleCreatePin = () => {
    if (otp.length < 4) {
      setShowSendSuccessfullSnackbar(true);
      setShowMsg("Empty message!");
    } else {
      setStage(1);
    }
  };

  console.log(created);

  const handleSubmitCreatePin = () => {
    if (otp !== cotp) {
      setShowSendSuccessfullSnackbar(true);
      setShowMsg("Wrong Confirm Transaction Pin");
    } else {
      var hash = bcrypt.hashSync(otp, salt);
      localStorage.setItem("pin", hash);
      // setStage(2);
    }
  };

  const handleSubmitPin = () => {
    if (otp === "") {
      setShowSendSuccessfullSnackbar(true);
      setShowMsg("Wrong Confirm Transaction Pin");
    } else {
       result = bcrypt.compareSync(otp, created);
      if (result) {
        // return result;
        onClose();
      } else {
        setShowSendSuccessfullSnackbar(true);
        setShowMsg("Wrong  Transaction Pin");
      }
    }
  };

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
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={showSendSuccessfullSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSendSnackbar}
        >
          <Alert
            action={
              <IconButton onClick={handleCloseSendSnackbar} sx={{ mt: -0.5 }}>
                <Close sx={{ fontSize: "1.5rem" }} />
              </IconButton>
            }
            icon={<CheckCircleOutline sx={{ fontSize: "1.5rem" }} />}
            sx={{ fontSize: "1rem" }}
            onClose={handleCloseSendSnackbar}
            severity={"error"}
          >
            {showMsg}
          </Alert>
        </Snackbar>
        {created === "" ? (
          <Box>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography color="primary" variant="h6">
                Transaction Pin
              </Typography>
              <IconButton
                color="secondary"
                onClick={() => {
                  setStage(0);
                  onClose();
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
            {/* <Divider /> */}
            <Box>
              {stage === 0 ? (
                <Stack alignItems="center" justifyContent={"center"} mb={6}>
                  <Typography my={4} variant="body1">
                    Create a new tansaction pin
                  </Typography>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    inputStyle={{
                      width: "60px",
                      height: "60px",
                      fontSize: "18px",
                      backgroundColor: "transparent",
                      color: theme.palette.mode === "dark" ? "#fff" : "#111",
                      borderColor:
                        theme.palette.mode === "dark" ? "#fff" : "#111",
                      marginRight: 20,
                      borderRadius: 10,
                    }}
                    numInputs={4}
                    renderSeparator={<span></span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </Stack>
              ) : (
                <Stack alignItems="center" justifyContent={"center"} mb={6}>
                  <Typography my={4} variant="body1">
                    Confirm tansaction pin
                  </Typography>
                  <OtpInput
                    value={cotp}
                    onChange={setCOtp}
                    inputStyle={{
                      width: "60px",
                      height: "60px",
                      fontSize: "18px",
                      backgroundColor: "transparent",
                      color: theme.palette.mode === "dark" ? "#fff" : "#111",
                      borderColor:
                        theme.palette.mode === "dark" ? "#fff" : "#111",
                      marginRight: 20,
                      borderRadius: 10,
                    }}
                    numInputs={4}
                    renderSeparator={<span></span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </Stack>
              )}
            </Box>
            <Stack mt={2} direction="row" alignItems="center" spacing={1}>
              {stage === 0 ? (
                <Button
                  disableElevation
                  fullWidth
                  onClick={handleCreatePin}
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
              ) : (
                <Button
                  disableElevation
                  fullWidth
                  onClick={handleSubmitCreatePin}
                  variant="contained"
                  style={{
                    height: 60,
                    borderRadius: 10,
                    fontSize: 18,
                    textTransform: "none",
                  }}
                  color="primary"
                >
                  Submit
                </Button>
              )}

              <Button
                disableElevation
                style={{
                  height: 60,
                  borderRadius: 10,
                  fontSize: 18,
                  textTransform: "none",
                  width: 250,
                }}
                onClick={() => {
                  setStage(0);
                  onClose();
                }}
                variant="outlined"
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography color="primary" variant="h6">
                Transaction Pin
              </Typography>
              <IconButton
                color="secondary"
                onClick={() => {
                  onClose();
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
            {/* <Divider /> */}
            <Box>
              <Stack alignItems="center" justifyContent={"center"} mb={6}>
                <Typography my={4} variant="body1">
                  Input tansaction pin
                </Typography>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  inputStyle={{
                    width: "60px",
                    height: "60px",
                    fontSize: "18px",
                    backgroundColor: "transparent",
                    color: theme.palette.mode === "dark" ? "#fff" : "#111",
                    borderColor:
                      theme.palette.mode === "dark" ? "#fff" : "#111",
                    marginRight: 20,
                    borderRadius: 10,
                  }}
                  numInputs={4}
                  renderSeparator={<span></span>}
                  renderInput={(props) => <input {...props} />}
                />
              </Stack>
            </Box>
            <Stack mt={2} direction="row" alignItems="center" spacing={1}>
              <Button
                disableElevation
                fullWidth
                onClick={handleSubmitPin}
                variant="contained"
                style={{
                  height: 60,
                  borderRadius: 10,
                  fontSize: 18,
                  textTransform: "none",
                }}
                color="primary"
              >
                Submit
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
                onClick={() => {
                  setStage(0);
                  onClose();
                }}
                variant="outlined"
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default SendConfirmationModal;
