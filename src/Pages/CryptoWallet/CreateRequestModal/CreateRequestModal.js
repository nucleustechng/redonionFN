import React, { Suspense, useState, useEffect, useCallback } from "react";
import {
  Divider, Modal, Stack, Typography, useMediaQuery, Input, Button,
  Radio, Tooltip,
  RadioGroup, FormControlLabel, Select, MenuItem, Skeleton, Zoom, IconButton, Snackbar, Alert
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

  const [amount, setAmount] = useState(0);

  const [amountFees, setAmountFees] = useState(0);

  const [coinNamesData, setCoinNamesData] = useState([]);
  const [coinNames, setCoinNames] = useState("0");


  const [coinName, setCoinName] = useState("");

  const [coinRate, setCoinRate] = useState("0");

  const [payTextField, setPayTextField] = useState("");

  const [transactionID, setSetTransactionID] = useState("");

  const [infoRadio, setinfoRadio] = useState("rate");

  const [loading, setLoading] = useState(false);

  const [firstModal, setFirstModal] = useState(false);

  const [firstModalA, setFirstModalA] = useState(0);

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

  }

  
  var user = JSON.parse(localStorage.getItem('user'));

  

  const getCyptoExchangeRate = (coin) => {
    setLoading(true);

    axios.get(
      GET_CURRENCY_RATE_URL + coin?.id,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      console.log(res.data)
      setCoinRate(res.data.data)

    }).catch((err) => {
      // console.log(err?.response?.status);
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
      }
    })
      .finally(() => { setLoading(false); });





  };

  const getFees = (coin) => {
    setLoading(true);

    axios.get(
      GET_FEES_URL + coin?.id,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      // console.log(res.data)
      setAmountFees(res.data.data)

    }).catch((err) => {
      if (err?.response?.status === 401) {
        // navigate("/user/sign-in")
      }
    })
      .finally(() => { setLoading(false); });





  };

  const handleCoinNameSelection = (e) => {
    setCoinNames(e.target.value);
    setCoinName(coinNamesData[e.target.value]);
    console.log(coinNamesData[coinNames]?.abbreviation);
    if (e.target.value !== "0") {
      getCyptoExchangeRate(coinNamesData[e.target.value]);
      getFees(coinNamesData[e.target.value]);
    }

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
         setCoinNamesData(res.data.data.cryptoCurrencies);
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
  }, [getCryto]);


 
  

  const onVerify = () => {


    if (transactionID === "") {
      return;
    }

    // console.log(transactionID)
    setLoading(true);

    axios
      .post(
        CREATE_OFFER_URL,
        JSON.stringify({
          amountInCrypto: Number(amount),
          cryptoCurrencyId: coinName?.id,
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
            {firstModalA !== 3 && (
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={"5px"}
              >
                <>
                  {firstModal && (
                    <Typography
                      // variant="body2"
                      color="primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setFirstModal(false)}
                    >
                      <LazyImageComponent src={Back} />
                    </Typography>
                  )}

                  <Typography
                    variant="caption"
                    fontSize={16}
                    fontWeight={500}
                    color="primary"
                  >
                    {firstModal ? "Create Offer" : "Sell"}
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
                {/* ) :
                    (
                      <Box />
                    )} */}
              </Stack>
            )}

            {!firstModal ? (
              <>
                <Box
                  mt={2}
                  bgcolor={theme.palette.mode === "dark" ? "#333" : "#E8E8F3"}
                  fullWidth
                  p={2}
                  borderRadius={2}
                >
                  <Box pl={4} pr={4} mt={2} mb={2}>
                    {infoRadio === "rate" ? (
                      <>
                        <Stack
                          direction="row"
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <Box mr={1.5}>
                            <Typography
                              variant="caption"
                              fontSize={15}
                              fontWeight={400}
                            >
                              Amount Received: {currency?.currencyCode}{" "}
                              {parseFloat(
                                amount / payTextField || 0
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                            </Typography>
                          </Box>
                        </Stack>
                      </>
                    ) : (
                      <>
                        <Stack
                          direction="row"
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <Box mr={1.5}>
                            <Typography
                              variant="caption"
                              fontSize={15}
                              fontWeight={400}
                            >
                              1 {coinName?.abbreviation || "--"}
                            </Typography>
                          </Box>
                          <Box mr={1.5}>
                            <LazyImageComponent src={ExchanageIcon} />
                          </Box>
                          <Box>
                            <Typography
                              variant="caption"
                              fontSize={15}
                              fontWeight={400}
                            >
                              {currency?.currencyCode}{" "}
                              {parseFloat(
                                payTextField / amount || 0
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                            </Typography>
                          </Box>
                        </Stack>
                      </>
                    )}
                  </Box>

                  <Divider color="#3063E9" />

                  <Box mt={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Box>
                        <Typography
                          variant="caption"
                          fontSize={14}
                          fontWeight={400}
                          color="#838383"
                        >
                          Red Onion rate:
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          fontSize={14}
                          fontWeight={600}
                        >
                          1 {coinName?.abbreviation || "--"} ={" "}
                          {currency?.currencyCode}{" "}
                          {parseFloat(
                            coinRate?.averageExchangeRate || 0
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Box>

                <Box mt={2}>
                  <RadioGroup
                    defaultValue="rate"
                    onChange={(e) => setinfoRadio(e.target.value)}
                    aria-labelledby="Choose a Payment Method"
                    name="payment-method-chooser"
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box className={styles.radioBox}>
                        <Box>
                          <FormControlLabel
                            value="rate"
                            control={<Radio />}
                            label={
                              <Typography variant="button" color="secondary">
                                Use Rate
                              </Typography>
                            }
                          />
                        </Box>
                      </Box>
                      <Box className={styles.radioBox}>
                        <FormControlLabel
                          value="amount"
                          control={<Radio />}
                          label={
                            <Typography variant="button" color="secondary">
                              Use Amount
                            </Typography>
                          }
                        />
                      </Box>
                    </Stack>
                  </RadioGroup>
                </Box>
                <Box mt={3}>
                  <Box mt={2}>
                    <Stack direction="row">
                      <Typography
                        variant="caption"
                        fontSize={16}
                        textAlign={"left"}
                        fontWeight={500}
                        color="secondary"
                        mb={1}
                      >
                        Offer
                      </Typography>
                    </Stack>

                    <Box borderRadius={2} height={50}>
                      <Stack direction="row">
                        <Select
                          className={
                            theme.palette.mode === "dark"
                              ? styles.currencyBoxDark
                              : styles.currencyBox
                          }
                          sx={{
                            width: isMobile ? "100%" : "100%",
                            height: 50,
                            border: 0,
                          }}
                          value={coinNames}
                          onChange={handleCoinNameSelection}
                        >
                          <MenuItem value="0">
                            <Typography textAlign={"left"}>
                              Select a coin
                            </Typography>
                          </MenuItem>
                          {coinNamesData.map(
                            (
                              { id, name, imgUri, network, abbreviation },
                              index
                            ) => (
                              <MenuItem key={id} value={index}>
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
                                  <Typography>
                                    {abbreviation} - {network}
                                  </Typography>
                                </Stack>
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </Stack>
                    </Box>
                  </Box>

                  <Box mt={2}>
                    <Stack direction="row">
                      <Typography
                        variant="caption"
                        fontSize={16}
                        textAlign={"left"}
                        fontWeight={500}
                        color="secondary"
                        mb={1}
                      >
                        Amount
                      </Typography>
                    </Stack>

                    <Box borderRadius={2} height={50}>
                      <Stack direction="row" justifyItems={"center"}>
                        <Input
                          fullWidth
                          // sx={{ width: isMobile ? 120 : 400}}
                          name="amount"
                          value={amount}
                          type="number"
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.0"
                          disableUnderline
                          className={
                            theme.palette.mode === "dark"
                              ? "inputField"
                              : styles.inputFieldLight
                          }
                        />
                      </Stack>
                    </Box>
                  </Box>

                  <Box mt={2}>
                    <Stack direction="row">
                      <Typography
                        variant="caption"
                        fontSize={16}
                        textAlign={"left"}
                        fontWeight={500}
                        color="secondary"
                        mb={1}
                      >
                        {infoRadio === "rate" ? "Rate" : "Receive"}
                      </Typography>
                    </Stack>

                    <Box borderRadius={2} height={50}>
                      <Stack direction="row" justifyItems={"center"}>
                        <Input
                          fullWidth
                          // sx={{ width: isMobile ? 120 : 400}}
                          name="payInput"
                          value={payTextField}
                          type="number"
                          onChange={(e) => setPayTextField(e.target.value)}
                          placeholder="0.0"
                          disableUnderline
                          className={
                            theme.palette.mode === "dark"
                              ? "inputField"
                              : styles.inputFieldLight
                          }
                        />
                      </Stack>
                    </Box>
                  </Box>
                </Box>

                <Stack direction="row" mt={5} justifyContent="space-between">
                  {loading ? (
                    <LoadingButton fullWidth loading variant="outlined">
                      Login
                    </LoadingButton>
                  ) : (
                    <>
                      <Button
                        onClick={onClickSuccess}
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
                        Create Offer <LazyImageComponent src={FrontArrow} />
                      </Button>
                    </>
                  )}
                </Stack>
              </>
            ) : (
              <>
                {firstModalA === 1 ? (
                  <>
                    <Box mt={3}>
                      <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={500}
                      >
                        Send your tokens to Wallet Address provided below
                      </Typography>
                    </Box>

                    <Stack
                      mt={3}
                      direction="row"
                      justifyContent="space-between"
                      spacing={"5px"}
                    >
                      <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={400}
                      >
                        Network:
                      </Typography>
                      <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={400}
                      >
                        {coinNames?.network}
                      </Typography>
                    </Stack>

                    <Stack
                      mt={2}
                      direction="row"
                      justifyContent="space-between"
                      spacing={"5px"}
                    >
                      <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={400}
                      >
                        Offer Value:
                      </Typography>
                      <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={400}
                      >
                        {amount || 0} {coinNames?.abbreviation}
                      </Typography>
                    </Stack>

                    <Stack
                      mt={2}
                      mb={2}
                      direction="row"
                      justifyContent="space-between"
                      spacing={"5px"}
                    >
                      <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={400}
                      >
                        Fee:
                      </Typography>
                      <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={400}
                      >
                        {amountFees?.feeAmount || 0} {coinNames?.abbreviation}
                      </Typography>
                    </Stack>
                    <Divider color="#3063E9" />

                    <Stack
                      mt={2}
                      direction="row"
                      justifyContent="space-between"
                      spacing={"5px"}
                    >
                      <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={400}
                      >
                        Total:
                      </Typography>
                      <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={400}
                      >
                        {parseInt(amount + amountFees?.feeAmount)}{" "}
                        {coinNames?.abbreviation}
                      </Typography>
                    </Stack>

                    <Box mt={3}>
                      <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={500}
                      >
                        Wallet Address
                      </Typography>
                    </Box>

                    <Box
                      mt={3}
                      bgcolor={
                        theme.palette.mode === "dark" ? "#333" : "#E8E8F3"
                      }
                      fullWidth
                      p={2}
                      borderRadius={2}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Input
                          disableUnderline
                          value={coinName?.depositWalletAddress}
                          readOnly
                          fullWidth
                        />
                        <CopyToClipboard
                          text={coinName?.depositWalletAddress}
                          onCopy={() => setCopied(true)}
                        >
                          <Tooltip
                            title={
                              copied ? (
                                <Typography
                                  variant="caption"
                                  color="text.success"
                                >
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

                    <Box mt={3} mb={5}>
                      <Typography
                        color={"#ff0000"}
                        lineHeight={1.4}
                        fontSize={13}
                        fontWeight={300}
                      >
                        Ensure you send the total specified above, which is a
                        sum of the offer Value and Fee, not just the Offer
                        Value. Verification will fail for Transactions that do
                        not include the Fee
                      </Typography>
                    </Box>

                    {loading ? (
                      <LoadingButton fullWidth loading variant="outlined">
                        Login
                      </LoadingButton>
                    ) : (
                      <>
                        <Button
                          onClick={() => setFirstModalA(2)}
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
                ) : (
                  <>
                    {firstModalA === 2 ? (
                      <>
                        <Box mt={1}>
                          <Typography
                            variant="h3"
                            mt={!isMobile ? 2 : 8}
                            color="secondary"
                            fontSize={20}
                            fontWeight={500}
                          >
                            Transaction ID
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
                            Provide your transaction ID after completing the
                            Transaction the verify
                          </Typography>

                          <Box borderRadius={2} mt={4} height={50}>
                            <Stack direction="row" justifyItems={"center"}>
                              <Input
                                fullWidth
                                name="payInput"
                                value={transactionID}
                                type="number"
                                onChange={(e) =>
                                  setSetTransactionID(e.target.value)
                                }
                                placeholder="Transaction ID"
                                disableUnderline
                                className={
                                  theme.palette.mode === "dark"
                                    ? "inputField"
                                    : styles.inputFieldLight
                                }
                              />
                            </Stack>
                          </Box>

                          <Stack
                            direction="row"
                            mt={5}
                            justifyContent="space-between"
                          >
                            {loading ? (
                              <LoadingButton
                                fullWidth
                                loading
                                variant="outlined"
                              >
                                Login
                              </LoadingButton>
                            ) : (
                              <>
                                <Button
                                  onClick={onVerify}
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
                                  Verifiy Transaction{" "}
                                  <LazyImageComponent src={FrontArrow} />
                                </Button>
                              </>
                            )}
                          </Stack>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box mt={3}>
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
                            You will recieve your token once your payment has
                            been confirmed by the 2nd party.{" "}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateRequestModal;
