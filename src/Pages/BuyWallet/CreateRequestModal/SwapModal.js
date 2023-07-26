import React, { Suspense, useState, useEffect, useCallback } from "react";
import {
  Divider,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  Input,
  Button,
  Radio,
  Tooltip,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  Skeleton,
  Zoom,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

import Close from "@mui/icons-material/Close";

import { CopyToClipboard } from "react-copy-to-clipboard";

// Styles
import styles from "./CreateRequestModal.module.css";

import { LoadingButton } from "@mui/lab";

import useAuth from "../../../hooks/useAuth";

// Axios
import axios from "../../../api/axios";

// Router
import { useNavigate } from "react-router-dom";

import Back from "../../../assets/backArrow.svg";

import FrontArrow from "../../../assets/frontArrow.svg";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const SwapModal = ({ open, onClose, amount, fromCurrency, toCurrency }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);

  const [showMsg, setShowMsg] = useState("");

  // Send Snackbar
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);

  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };

  const GET_SWAP_URL = "/transaction/swap";

  const getCyptoExchangeRate = () => {
    setLoading(true);

    axios
      .post(
        GET_SWAP_URL,
        JSON.stringify({
          amountInCrypto: Number(amount),
          fromCryptoCurrencyId: fromCurrency,
          toCryptoCurrencyId: toCurrency,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        // setCoinRate(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err?.response?.status);
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        } else {
          setShowMsg(err?.response.data.msg);

          console.log(err?.response.data.msg);
          setShowSendSuccessfullSnackbar(true);
        }
      });
  };

  var user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {}, []);

  return (
    <Modal
      disableAutoFocus
      disableEscapeKeyDown
      keepMounted
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
    >
      <Box className={!isMobile ? styles.modalStyle : styles.modalStyleMobile}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
        <Box
          bgcolor={theme.palette.background.paper}
          className={styles.modalContentBox}
        >
          <Box p={4} borderRadius="10px">
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={"5px"}
            >
              <>
                <Typography
                  variant="caption"
                  fontSize={20}
                  fontWeight={500}
                  color="primary"
                >
                  Confirm Swap
                </Typography>
              </>

              <Typography
                // variant="body2"
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={onClose}
              >
                <CloseIcon />
              </Typography>
            </Stack>

            <Box mt={5}>
              <Typography>
                You will receive a email notifying you of the status.
              </Typography>
            </Box>

            <Stack mt={5} direction={"row"}>
              <>
                {loading ? (
                  <LoadingButton fullWidth loading variant="outlined">
                    Login
                  </LoadingButton>
                ) : (
                  <>
                    <Button
                      onClick={() => getCyptoExchangeRate()}
                      fullWidth
                      style={{
                        height: 50,
                        borderRadius: 10,
                        fontSize: 20,
                        textTransform: "none",
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Proceed
                    </Button>
                  </>
                )}
              </>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SwapModal;
