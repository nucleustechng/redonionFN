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

import BitCoinIcon from "../../../assets/bitCoinIcon.svg";
import ExchanageIcon from "../../../assets/exchangeBlue.svg";
import FrontArrow from "../../../assets/frontArrow.svg";
import successClock from "../../../assets/clockSuccess.svg";

import CopyIcon from "../../../assets/receiveCopyIcon.svg";
import CopyIconDark from "../../../assets/copyIconDark.svg";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const CreateRequestModal = ({ open, onClose, country, currency }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [amount, setAmount] = useState(1);

  const [amountFees, setAmountFees] = useState(0);

  const [coinNamesData, setCoinNamesData] = useState([]);

  const [coinNamesDataTo, setCoinNamesDataTo] = useState([]);
  const [coinNames, setCoinNames] = useState("0");

  const [coinName, setCoinName] = useState("");;
const [currencyNames, setcurrencyNames] = useState("USD");
  const [coinRate, setCoinRate] = useState("0");

  const [payTextField, setPayTextField] = useState("");

  const [transactionID, setSetTransactionID] = useState("");

  const [infoRadio, setinfoRadio] = useState("rate");

  const [loading, setLoading] = useState(false);

  const [firstModal, setFirstModal] = useState(true);

  const [firstModalA, setFirstModalA] = useState(2);

  const [addi, setAdd] = useState(0);

  const [copied, setCopied] = useState(false);

  const [showMsg, setShowMsg] = useState("");

  // Send Snackbar
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);

  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };

  const GET_CURRENCY_URL = "/user/get-crypto-currencies";

  const GET_CURRENCY_RATE_URL = "/transaction/get-exchange-rate/";

  const GET_FEES_URL = "/user/get-fees/";

  const CREATE_OFFER_URL = "/transaction/create-offer";

  const onClickSuccess = () => {
    if (amount === 0 || coinNames === "0" || payTextField === "") {
      return;
    } else {
      setFirstModal(true);
      setFirstModalA(1);
    }
  };

  var user = JSON.parse(localStorage.getItem("user"));

  const getCyptoExchangeRate = (coin) => {
    setLoading(true);

    axios
      .get(GET_CURRENCY_RATE_URL + coin, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.averageExchangeRate);
        setCoinRate(res.data.data?.averageExchangeRate || 0);
      })
      .catch((err) => {
        // console.log(err?.response?.status);
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getFees = (coin) => {
    setLoading(true);

    axios
      .get(GET_FEES_URL + coin, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data)
        setAmountFees(res.data.data.fee);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          // navigate("/user/sign-in")
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCoinNameSelection = (e) => {
    console.log(e.target.value)
    setCoinNames(e.target.value);
    // setCoinName(coinNamesData[e.target.value]);
    // console.log(coinNamesData[coinNames]?.abbreviation);
    // if (e.target.value !== "0") {
      // getCyptoExchangeRate(coinNamesData[e.target.value]);
      getCyptoExchangeRate(e.target.value);
    // }
  };

  const getCryto = useCallback(() => {
    axios
      .get(GET_CURRENCY_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        // eslint-disable-next-line
        // setAdd(addi++);
        // console.log(res.data.data.cryptoCurrencies);
        setCoinNamesData(res.data.data.cryptoCurrencies);
        // setCoinNamesDataTo(res.data.data.cryptoCurrencies);
      })
      .catch((err) => {
        // console.log(err?.response?.status);
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        }
      })
      .finally(() => {});
  }, [navigate, user]);

  useEffect(() => {
    getCryto();
  }, );

  const onVerify = () => {
    // if (transactionID === "") {
    //   return;
    // }

    // console.log(transactionID)
    setLoading(true);

    axios
      .post(
        CREATE_OFFER_URL,
        JSON.stringify({
          amountInCrypto: Number(amount),
          cryptoCurrencyId: coinName,
          currencyId: user?.currency?.id,
          tokenPricePerUnit:
            infoRadio === "rate"
              ? parseFloat(amount / payTextField)
              : parseFloat(payTextField / amount),
          transactionId: transactionID,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.data === null) {
          setShowMsg(res.data.msg);
          setShowSendSuccessfullSnackbar(true);
        } else {
          setFirstModalA(2);
        }
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        } else {
          console.log(err?.response?.data.message);
          setShowMsg(err?.response?.data.message);
          setShowSendSuccessfullSnackbar(true);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      disableAutoFocus
      disableEscapeKeyDown
      keepMounted
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          onClose();
          setFirstModal(false);
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
                {/* {firstModal && (
                    <Typography
                      // variant="body2"
                      color="primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setFirstModal(false)}
                    >
                      <LazyImageComponent src={Back} />
                    </Typography>
                  )} */}

                <Typography
                  variant="caption"
                  fontSize={20}
                  fontWeight={500}
                  color="primary"
                >
                  Create Offer
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

            <Box>
              <Stack direction={"row"}>
                <Box mb={1} mt={3}>
                  <Typography fontSize={17} fontWeight={400}>
                    Sell
                  </Typography>
                </Box>
              </Stack>
              <Box mb={3}>
                <Stack direction={"row"}>
                  <Select
                    className={
                      theme.palette.mode === "dark"
                        ? styles.currencyBoxDark
                        : styles.currencyBox
                    }
                    sx={{
                      width: "35%",
                      height: 50,
                      border: 0,
                    }}
                    value={coinNames}
                    onChange={handleCoinNameSelection}
                  >
                    <MenuItem value="0">
                      <Typography>Select A Coin</Typography>
                    </MenuItem>

                    {coinNamesData.map(
                      ({ id, name, imgUri, network, abbreviation }, index) => (
                        <MenuItem key={id} value={id}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Suspense
                              fallback={
                                <Skeleton
                                  animation="wave"
                                  variant="circular"
                                  width={40}
                                  height={40}
                                  sx={{
                                    backgroundColor: `${
                                      theme.palette.mode === "dark"
                                        ? "#111"
                                        : "#f5f5f5"
                                    }`,
                                  }}
                                />
                              }
                            >
                              <LazyImageComponent
                                className={styles.coinIcons}
                                src={imgUri}
                              />
                            </Suspense>
                            <Typography>{abbreviation}</Typography>
                          </Stack>
                        </MenuItem>
                      )
                    )}
                  </Select>
                  <Input
                    disableUnderline
                    className="inputField"
                    size="small"
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    fullWidth
                  />
                </Stack>
              </Box>
            </Box>

            <Box>
              <Stack direction={"row"}>
                <Box mb={1}>
                  <Typography fontSize={17} fontWeight={400}>
                    Recieve
                  </Typography>
                </Box>
              </Stack>
              <Box mb={3}>
                <Stack direction={"row"}>
                  <Select
                    className={
                      theme.palette.mode === "dark"
                        ? styles.currencyBoxDark
                        : styles.currencyBox
                    }
                    sx={{
                      width: "35%",
                      height: 50,
                      border: 0,
                    }}
                    value={currencyNames}
                  >
                    <MenuItem value="USD">
                      <Typography>USD</Typography>
                    </MenuItem>
                  </Select>
                  <Input
                    disableUnderline
                    className="inputField"
                    size="small"
                    type="number"
                    value={coinRate * amount}
                    // onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    fullWidth
                    readOnly
                  />
                </Stack>
              </Box>
            </Box>

            <Box>
              <Stack direction={"row"}>
                <Box mb={1}>
                  <Typography fontSize={17} fontWeight={400}>
                    Rate
                  </Typography>
                </Box>
              </Stack>
              <Box
                mb={3}
                borderRadius={5}
                p={2}
                py={2}
                fullWidth
                bgcolor={"#dddddd50"}
              >
                <Stack direction={"row"} px={2} justifyContent="space-between">
                  <Typography fontSize={20} fontWeight={400}>
                    1$
                  </Typography>
                  <Typography fontSize={20} color="primary" fontWeight={400}>
                    =
                  </Typography>
                  <Typography fontSize={20} fontWeight={400}>
                    ₦700.00
                  </Typography>
                </Stack>
              </Box>
              <Stack mb={4} direction={"row"}>
                <Box mt={-2} mb={1}>
                  <Typography fontSize={16} fontWeight={400}>
                    Official rate: 1BTC = ₦433.72
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Stack direction={"row"}>
              <>
                {loading ? (
                  <LoadingButton fullWidth loading variant="outlined">
                    Login
                  </LoadingButton>
                ) : (
                  <>
                    <Button
                      onClick={() => onVerify()}
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
                      Complete <LazyImageComponent src={FrontArrow} />
                    </Button>
                  </>
                )}
              </>

              <Button
                onClick={() => setFirstModalA(2)}
                fullWidth
                style={{
                  height: 50,
                  width: "50%",
                  borderRadius: 10,
                  marginLeft: 10,
                  fontSize: 16,
                  textTransform: "none",
                  backgroundColor: "#E8E8F3",
                  color: "#3063E9",
                }}
                variant="contained"
                // color="primary"
              >
                Cancel
              </Button>
            </Stack>

            {/* <Box mt={3}>
              <center>
                <LazyImageComponent src={successClock} />
              </center>
              <Typography
                variant="h3"
                mt={!isMobile ? 4 : 8}
                color="secondary"
                fontSize={24}
                fontWeight={500}
              >
                Payment successful
              </Typography>

              <Typography
                color="secondary"
                variant="caption"
                mt={!isMobile ? 3 : 8}
                mb={2}
                component="p"
                fontSize={16}
                textAlign={"center"}
              >
                You will recieve your token once your payment has been confirmed
                by the 2nd party.{" "}
              </Typography>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateRequestModal;
