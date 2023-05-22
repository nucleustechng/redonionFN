import {
  Alert,
  Button,
  Divider,
  IconButton,
  Input,
  Slide,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Suspense, useState } from "react";

// Icons
import QRIcon from "../../../assets/receiveQRIcon.svg";
import CopyIcon from "../../../assets/receiveCopyIcon.svg";
import QRIconDark from "../../../assets/qrIconDark.svg";
import CopyIconDark from "../../../assets/copyIconDark.svg";

// styles
import styles from "./CoinDetailsChildrenMobile.module.css";
import ComponentLoader from "../../../components/ProgressLoader/ComponentLoader";
import QRImage from "../../../assets/qrCode.svg";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";
import { CopyToClipboard } from "react-copy-to-clipboard";

// Lazy Image
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const ReceiveBoxMobile = ({
  coinData,
  isReceiving,
  handleOpenSendBox,
  handleOpenReceiveBox,
}) => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  const theme = useTheme();

  const closeSnackBar = () => {
    setShowSnackBar(false);
  };

  return (
    <Box pb={5} px={2}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Slide}
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
                width={"90%"}
                readOnly
                value="0x1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
              />
              <CopyToClipboard
                text="0x1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
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
            <IconButton color="secondary">
              {theme.palette.mode === "dark" ? (
                <img
                  src={QRIconDark}
                  alt="Scan Code"
                  style={{ height: "100%", width: "100%" }}
                />
              ) : (
                <img
                  src={QRIcon}
                  alt="Scan Code"
                  style={{ height: "100%", width: "100%" }}
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
        <Stack direction="row" spacing={1} mt={2}>
          {theme.palette.mode === "dark" ? (
            <Button
              onClick={handleOpenSendBox}
              className={styles.balanceButton}
              color="primary"
              variant={isReceiving ? "contained" : "outlined"}
              fullWidth
            >
              Send
            </Button>
          ) : (
            <>
              {!isReceiving ? (
                <Button
                  onClick={handleOpenSendBox}
                  className={styles.balanceButton}
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  Send
                </Button>
              ) : (
                <LightUIButtonPrimary
                  onClick={handleOpenSendBox}
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
              variant={isReceiving ? "outlined" : "contained"}
              fullWidth
            >
              receive
            </Button>
          ) : (
            <>
              {isReceiving ? (
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

export default ReceiveBoxMobile;
