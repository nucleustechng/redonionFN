import React, { useState } from "react";
import {
  Alert,
  Button,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  Slide,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";
import { CopyToClipboard } from "react-copy-to-clipboard";

// Icons
import CopyIcon from "../../../assets/receiveCopyIcon.svg";
import QRIconSend from "../../../assets/qrImageIconReceive.svg";
import QRIconSendLight from "../../../assets/qrImageIconReceiveLight.svg";
import CopyIconDark from "../../../assets/copyIconDark.svg";

// styles
import styles from "./CoinDetailsChildrenMobile.module.css";

// Confirmation modal for send
import SendConfirmationModal from "../SendConfirmationModal";
import QRCodeScannerModal from "../QRCodeScannerModal";

const SendBoxMobile = ({
  isSending,
  coinData,
  handleOpenSendBox,
  handleOpenReceiveBox,
}) => {
  const [amount, setAmount] = useState("");
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [addressChange, setAddressChange] = useState("");
  // Send Confirmation modal
  const [showSendConfirmationModal, setShowSendConfirmationModal] =
    useState(false);
  const [showSendErrorSnackbar, setShowSendErrorSnackbar] = useState(false);

  const [openReceivingQRModal, setOpenReceivingQRModal] = useState(false);
  const [startCamera, setStartCamera] = useState(false);

  const theme = useTheme();

  // Send Snackbar
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);

  const handleSendButton = () => {
    if (amount) {
      setShowSendConfirmationModal(true);
    } else if (!amount) {
      setShowSendErrorSnackbar(true);
      handleOpenSendBox();
    }
  };

  const closeSnackBar = () => {
    setShowSnackBar(false);
  };

  const closeErrorSnackbar = () => {
    setShowSendErrorSnackbar(false);
  };

  // Send confirmation handlers
  const handleCloseSendModal = () => {
    setShowSendConfirmationModal(false);
  };

  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };

  const handleConfirmation = () => {
    setShowSendConfirmationModal(false);
    setShowSendSuccessfullSnackbar(true);
    setAmount("");
  };

  // Modal
  const handleOpenReceivingQRModal = () => {
    setOpenReceivingQRModal(true);
    setStartCamera(true);
  };

  const handleCloseReceivingQRModal = () => {
    setOpenReceivingQRModal(false);
    setStartCamera(false);
  };

  return (
    <Box pb={5} px={2}>
      <QRCodeScannerModal
        open={openReceivingQRModal}
        handleClose={handleCloseReceivingQRModal}
        startCamera={startCamera}
      />
      <SendConfirmationModal
        open={showSendConfirmationModal}
        handleClose={handleCloseSendModal}
        amount={amount}
        coinName={coinData.coinCode}
        handleConfirmation={handleConfirmation}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Slide}
        open={showSendSuccessfullSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSendSnackbar}
      >
        <Alert
          onClose={handleCloseSendSnackbar}
          severity="success"
          sx={{ width: "100%", mt: 1 }}
        >
          Payment Successfull
        </Alert>
      </Snackbar>
      <Snackbar
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={closeSnackBar}
      >
        <Alert
          sx={{ width: "100%", mt: 1 }}
          onClose={closeSnackBar}
          severity="success"
        >
          Address Copied!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Slide}
        open={showSendErrorSnackbar}
        autoHideDuration={6000}
        onClose={closeErrorSnackbar}
      >
        <Alert
          sx={{ width: "100%" }}
          onClose={closeErrorSnackbar}
          severity="warning"
        >
          Please enter a valid amount
        </Alert>
      </Snackbar>
      <Typography variant="body2" color="text.secondary" mb={1}>
        Available Balance
      </Typography>
      <Typography variant="h4" fontWeight={500} color="secondary" mb={1}>
        0.8458{" "}
        <Typography
          component="span"
          color="primary"
          variant="h4"
          fontWeight={500}
        >
          {coinData?.coinCode}
        </Typography>
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        $12,754,23
      </Typography>
      <Divider />
      <Box mt={1} className={styles.sendBox}>
        <Typography variant="caption" color="text.secondary">
          Recipent address
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2} mb={2} mt={2}>
          <Box
            sx={{ p: "5px", borderRadius: "5px" }}
            bgcolor={theme.palette.mode === "dark" ? "#3E4041" : "#f5f5f5"}
            width={"95%"}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Input
                disableUnderline
                width={"90%"}
                letterSpacing={1}
                defaultValue="0x1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                onChange={(e) => setAddressChange(e.target.value)}
              />
              <CopyToClipboard
                text={
                  addressChange
                    ? addressChange
                    : "0x1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                }
                onCopy={() => setShowSnackBar(true)}
              >
                <IconButton edge="start">
                  {theme.palette.mode === "dark" ? (
                    <img
                      src={CopyIconDark}
                      alt="Scan Code"
                      style={{ height: "100%", width: "100%" }}
                    />
                  ) : (
                    <img
                      src={CopyIcon}
                      alt="Scan Code"
                      style={{ height: "100%", width: "100%" }}
                    />
                  )}
                </IconButton>
              </CopyToClipboard>
            </Stack>
          </Box>
          <Box
            sx={{ p: "5px", borderRadius: "5px" }}
            bgcolor={theme.palette.mode === "dark" ? "#3E4041" : "#f5f5f5"}
          >
            <IconButton onClick={handleOpenReceivingQRModal} color="secondary">
              {theme.palette.mode === "dark" ? (
                <img
                  src={QRIconSend}
                  alt="Scan Code"
                  style={{ height: "100%", width: "100%" }}
                />
              ) : (
                <img
                  src={QRIconSendLight}
                  alt="Scan Code"
                  style={{ height: "100%", width: "100%" }}
                />
              )}
            </IconButton>
          </Box>
        </Stack>
        <Divider />
        <Box className={styles.qrBox}>
          <Typography variant="h3" color="#525252" fontWeight={600}>
            ~$0
          </Typography>
        </Box>
        <Stack>
          <Typography variant="button" color="secondary" mb={1}>
            Enter Amount
          </Typography>
          <Input
            inputProps={{ style: { textAlign: "right" } }}
            disableUnderline
            className="inputField"
            onChange={(e) => setAmount(e.target.value)}
            size="small"
            type="number"
            name="recipentSendBox"
            value={amount}
            endAdornment={
              <InputAdornment position="end">
                <Typography color="primary" component="span">
                  {coinData.coinCode}
                </Typography>
              </InputAdornment>
            }
          />
        </Stack>
        <Stack mt={2} mb={4}>
          <Typography variant="caption" color="text.secondary">
            Transaction Fee{" "}
            <Typography variant="caption" color="primary">
              0.0002 {coinData.coinCode}
            </Typography>
          </Typography>
          {amount && (
            <Typography variant="caption" color="text.secondary">
              Reciepient will recieve{" "}
              <Typography variant="caption" color="primary">
                {parseFloat(amount) - 0.0002} {coinData.coinCode}
              </Typography>
            </Typography>
          )}
        </Stack>
        <Divider />
        <Stack direction="row" spacing={1} mt={2}>
          {theme.palette.mode === "dark" ? (
            <Button
              onClick={handleSendButton}
              className={styles.balanceButton}
              color="primary"
              variant={isSending ? "contained" : "outlined"}
              fullWidth
            >
              Send
            </Button>
          ) : (
            <>
              {!isSending ? (
                <Button
                  onClick={handleSendButton}
                  className={styles.balanceButton}
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  Send
                </Button>
              ) : (
                <LightUIButtonPrimary
                  onClick={handleSendButton}
                  className={styles.balanceButton}
                  color="primary"
                  fullWidth
                >
                  Send
                </LightUIButtonPrimary>
              )}
            </>
          )}
          {theme.palette.mode === "dark" ? (
            <Button
              onClick={handleOpenReceiveBox}
              className={styles.balanceButton}
              color="primary"
              variant={isSending ? "outlined" : "contained"}
              fullWidth
            >
              receive
            </Button>
          ) : (
            <>
              {isSending ? (
                <Button
                  onClick={handleOpenReceiveBox}
                  className={styles.balanceButton}
                  color="primary"
                  variant="outlined"
                  fullWidth
                >
                  receive
                </Button>
              ) : (
                <LightUIButtonPrimary
                  onClick={handleOpenReceiveBox}
                  className={styles.balanceButton}
                  fullWidth
                >
                  receive
                </LightUIButtonPrimary>
              )}
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default SendBoxMobile;
