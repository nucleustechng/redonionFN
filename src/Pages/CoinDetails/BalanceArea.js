import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Alert,
  Button,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { LightUIButtonPrimary } from "../../Utilities/LightUIButtons";
import { CopyToClipboard } from "react-copy-to-clipboard";

// Icons
import QRIcon from "../../assets/receiveQRIcon.svg";
import CopyIcon from "../../assets/receiveCopyIcon.svg";
import QRIconDark from "../../assets/qrIconDark.svg";
import QRIconSend from "../../assets/qrImageIconReceive.svg";
import QRIconSendLight from "../../assets/qrImageIconReceiveLight.svg";
import CopyIconDark from "../../assets/copyIconDark.svg";

// Styles
import styles from "./CoinDetailsStyle.module.css";

// Custom theme
import { useTheme } from "@mui/material/styles";

// Router
import { useLocation } from "react-router-dom";

// Component Loader
import ComponentLoader from "../../components/ProgressLoader/ComponentLoader";

// QR Image
import QRImage from "../../assets/qrCode.svg";
import QRCodeScannerModal from "./QRCodeScannerModal";
import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../components/LazyImageComponent/LazyImageComponent")
);

// Modal
const SendConfirmationModal = React.lazy(() =>
  import("./SendConfirmationModal")
);

const BalanceArea = ({ coinData }) => {
  const [isSending, setIsSending] = useState(false);
  const [isReceiving, setIsReceiving] = useState(true);
  const [amount, setAmount] = useState("");
  const [recipentAddress, setRecipentAdress] = useState("");
  const [copied, setCopied] = useState(false);
  const [openReceivingQRModal, setOpenReceivingQRModal] = useState(false);
  const [startCamera, setStartCamera] = useState(false);

  // Send Confirmation modal
  const [showSendConfirmationModal, setShowSendConfirmationModal] =
    useState(false);
  // Send Snackbar
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);

  const theme = useTheme();
  const location = useLocation();

  // Button Handler
  const handleSendButton = () => {
    setIsSending(true);
    if (amount) {
      setShowSendConfirmationModal(true);
    }
    setIsReceiving(false);
  };

  const handleReceiveButton = () => {
    setIsReceiving(true);
    setIsSending(false);
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

  // This will set the copy status to its preavious state
  useEffect(() => {
    if (copied) {
      const changeCopyStatus = setTimeout(() => {
        setCopied(false);
      }, 1000);

      return () => clearInterval(changeCopyStatus);
    }
  }, [copied]);

  useLayoutEffect(() => {
    if (location.state?.isSending) {
      setIsSending(true);
      setIsReceiving(false);
    } else {
      setIsSending(false);
      setIsReceiving(true);
    }
  }, [location]);

  return (
    <Box bgcolor={theme.palette.background.paper} className={styles.balanceBox}>
      <SendConfirmationModal
        open={showSendConfirmationModal}
        handleClose={handleCloseSendModal}
        amount={amount}
        coinName={coinData}
        handleConfirmation={handleConfirmation}
      />
      <QRCodeScannerModal
        open={openReceivingQRModal}
        handleClose={handleCloseReceivingQRModal}
        startCamera={startCamera}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSendSuccessfullSnackbar}
        autoHideDuration={6000}
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
          severity="success"
        >
          Payment Successfull!
        </Alert>
      </Snackbar>
      <Typography variant="body2" color="text.secondary" mb={1}>
        Available Balance
      </Typography>
      <Typography variant="h3" fontWeight={500} color="secondary" mb={1}>
        0.8458
        <Typography
          component="span"
          color="primary"
          variant="h3"
          fontWeight={500}
        >
          {coinData[0]}
        </Typography>
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        $12,754,23
      </Typography>
      <Divider />
      <React.Fragment>
        {isReceiving && (
          <Box className={styles.sendBox}>
            <Typography variant="caption" color="text.secondary">
              My address
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2} my={2}>
              <Box
                sx={{ p: "5px" }}
                bgcolor={theme.palette.mode === "dark" ? "#3E4041" : "#f5f5f5"}
                width={"95%"}
                borderRadius={"4px"}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Input
                    disableUnderline
                    value="0x1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                    readOnly
                    fullWidth
                  />
                  <CopyToClipboard
                    text="0x1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                    onCopy={() => setCopied(true)}
                  >
                    <Tooltip
                      title={
                        copied ? (
                          <Typography variant="caption" color="text.success">
                            Address Copied!
                          </Typography>
                        ) : (
                          "Copy"
                        )
                      }
                      TransitionComponent={Zoom}
                    >
                      <IconButton>
                        {theme.palette.mode === "dark" ? (
                          <img
                            src={CopyIconDark}
                            alt="Scan QR"
                            style={{ width: "100%", height: "100%" }}
                          />
                        ) : (
                          <img
                            src={CopyIcon}
                            alt="Scan QR"
                            style={{ width: "100%", height: "100%" }}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                  </CopyToClipboard>
                </Stack>
              </Box>
              <Box
                sx={{ p: "5px" }}
                bgcolor={theme.palette.mode === "dark" ? "#3E4041" : "#f5f5f5"}
              >
                <IconButton>
                  {theme.palette.mode === "dark" ? (
                    <img
                      src={QRIconDark}
                      alt="Scan QR"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <img
                      src={QRIcon}
                      alt="Scan QR"
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </IconButton>
              </Box>
            </Stack>
            <Divider />
            <Box className={styles.qrBox}>
              <Box bgcolor={theme.palette.common.white}>
                <Suspense fallback={<ComponentLoader />}>
                  <LazyImageComponent src={QRImage} />
                </Suspense>
              </Box>
            </Box>
            <Divider />
          </Box>
        )}
      </React.Fragment>
      <React.Fragment>
        {isSending && (
          <Box className={styles.receiveBox}>
            <Typography variant="caption" color="text.secondary">
              Recipent address
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2} my={2}>
              <Box
                sx={{ p: "5px" }}
                bgcolor={theme.palette.mode === "dark" ? "#3E4041" : "#f5f5f5"}
                width={"95%"}
                borderRadius="4px"
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    width={"90%"}
                    variant="subtitle2"
                    letterSpacing={1}
                    color="text.secondary"
                  >
                    <Input
                      fullWidth
                      disableUnderline
                      onChange={(e) => setRecipentAdress(e.target.value)}
                      type="text"
                      defaultValue="0x1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                    />
                  </Typography>
                  <CopyToClipboard
                    text={
                      recipentAddress
                        ? recipentAddress
                        : "0x1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                    }
                    onCopy={() => setCopied(true)}
                  >
                    <Tooltip
                      title={
                        copied ? (
                          <Typography variant="caption" color="text.success">
                            Address Copied!
                          </Typography>
                        ) : (
                          "Copy"
                        )
                      }
                      TransitionComponent={Zoom}
                    >
                      <IconButton>
                        {theme.palette.mode === "dark" ? (
                          <img
                            src={CopyIconDark}
                            alt="Scan QR"
                            style={{ width: "100%", height: "100%" }}
                          />
                        ) : (
                          <img
                            src={CopyIcon}
                            alt="Scan QR"
                            style={{ width: "100%", height: "100%" }}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                  </CopyToClipboard>
                </Stack>
              </Box>
              <Box
                sx={{ p: "5px" }}
                bgcolor={theme.palette.mode === "dark" ? "#3E4041" : "#f5f5f5"}
              >
                <IconButton onClick={handleOpenReceivingQRModal}>
                  {theme.palette.mode === "dark" ? (
                    <img
                      src={QRIconSend}
                      alt="Scan QR"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <img
                      src={QRIconSendLight}
                      alt="Scan QR"
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </IconButton>
              </Box>
            </Stack>
            <Divider />
            <Box className={styles.qrBox}>
              <Typography variant="h1" color="#525252" fontWeight={600}>
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
                value={amount}
                name="recipentSendBox"
                className="inputField"
                onChange={(e) => setAmount(e.target.value)}
                size="small"
                type="number"
                endAdornment={
                  <InputAdornment position="end">
                    <Typography color="primary" component="span" variant="h6">
                      {coinData[0]}
                    </Typography>
                  </InputAdornment>
                }
              />
            </Stack>
            <Stack mt={2} mb={4}>
              <Typography variant="caption" color="text.secondary">
                Transaction Fee{" "}
                <Typography variant="caption" color="primary">
                  0.0002 {coinData[0]}
                </Typography>
              </Typography>
              {amount && (
                <Typography variant="caption" color="text.secondary">
                  Reciepient will recieve{" "}
                  <Typography variant="caption" color="primary">
                    {parseFloat(amount) - 0.0002} {coinData[0]}
                  </Typography>
                </Typography>
              )}
            </Stack>
            <Divider />
          </Box>
        )}
      </React.Fragment>

      <Stack direction="row" spacing={1} mt={2}>
        {theme.palette.mode === "dark" ? (
          <Button
            onClick={handleSendButton}
            className={styles.balanceButton}
            color="primary"
            variant={isReceiving ? "outlined" : "contained"}
            fullWidth
          >
            Send
          </Button>
        ) : (
          <>
            {isReceiving ? (
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
            onClick={handleReceiveButton}
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
                onClick={handleReceiveButton}
                className={styles.balanceButton}
                color="primary"
                variant="outlined"
                fullWidth
              >
                receive
              </Button>
            ) : (
              <LightUIButtonPrimary
                onClick={handleReceiveButton}
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
  );
};

export default BalanceArea;
