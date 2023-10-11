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
import { ModalSkeletons } from "../../../components/Skeletons/ComponentSkeletons";
import SendConfirmationModal from "../../CoinDetails/SendConfirmationModal";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const CreateRequestModal = ({ open, onClose, country, currency, coin }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [amount, setAmount] = useState(0);

  const [amountFees, setAmountFees] = useState(0);

  const [coinNamesData, setCoinNamesData] = useState([]);

  const [coinNamesDataTo, setCoinNamesDataTo] = useState("");
  const [coinNames, setCoinNames] = useState("0");

  const [coinName, setCoinName] = useState("");
  const [currencyNames, setcurrencyNames] = useState("");
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

  const [msgShow, setMsgShow] = useState("");

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Send Snackbar
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);
  const [openTransactionPinModal, setOpenTransactionPinModal] = useState(false);

  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };

   const handleTransactionPinModal = () => {
     setOpenTransactionPinModal(!openTransactionPinModal);
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

  const getCyptoExchangeRate = (coin) => {
    setLoading(true);

    axios
      .post(
        GET_CURRENCY_RATE_URL,
        JSON.stringify({
          cryptoCurrencyId: coin,
          currencyId: user?.currency?.id,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.data.averageExchangeRate);
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
        console.log(res.data);
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
    const nameCryptos = e.target.value;

    let dataa = coinNamesData.find((data) => data.id === nameCryptos);

    console.log(dataa);
    setCoinNames(nameCryptos);
    setCoinNamesDataTo(dataa?.abbreviation);
    if (e.target.value !== "0") {
      // getCyptoExchangeRate(coinNamesData[e.target.value]);
      getCyptoExchangeRate(e.target.value);
    }
  };

  useEffect(() => {
    console.log(2, coin);
    setCoinNamesData(coin);
    setcurrencyNames(currency);
  }, [coin, currency, user]);

  const onVerify = () => {
    setLoading(true);

    axios
      .post(
        CREATE_OFFER_URL,
        JSON.stringify({
          amountInCrypto: Number(amount),
          cryptoCurrencyId: coinNames,
          currencyId: currency?.id,
          tokenPricePerUnit: Number(amountFees),
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
        // if (res.data.data === null) {
        setMsgShow("success");
        setShowMsg(res.data.msg);
        setShowSendSuccessfullSnackbar(true);
        // } else {
        //   setFirstModalA(2);
        // }
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        } else {
          // console.log(err?.response?.data);
          setShowMsg(err?.response?.data.msg);
          setShowSendSuccessfullSnackbar(true);
        }
      })
      .finally(() => setLoading(false));
  };

  const handleConfirmationModal = (e) => {
    console.log(e);
    if (e === "success") {
      onVerify();
    } else {
      // setShowSnackbar(true);
      // setMsg("Something went wrong!");
    }
  };

  return (
    <>
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
          severity={msgShow === "success" ? "success" : "error"}
        >
          {showMsg}
        </Alert>
      </Snackbar>
      {openTransactionPinModal ? (
        <Suspense fallback={<ModalSkeletons />}>
          <SendConfirmationModal
            open={openTransactionPinModal}
            onClose={handleTransactionPinModal}
            handleConfirmation={handleConfirmationModal}
          />
        </Suspense>
      ) : (
        <>
          {!isMobile ? (
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
              <Box
                className={
                  !isMobile ? styles.modalStyle : styles.modalStyleMobile
                }
              >
                <Box
                  bgcolor={theme.palette.background.paper}
                  className={styles.modalContentBox}
                >
                  {msgShow === "" ? (
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
                                (
                                  {
                                    id,
                                    name,
                                    imgUri,
                                    network,
                                    abbreviation,
                                    blockchain,
                                  },
                                  index
                                ) => (
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
                                      <Typography>
                                        {abbreviation +
                                          " - " +
                                          blockchain?.standard}
                                      </Typography>
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
                              Receive
                            </Typography>
                          </Box>
                        </Stack>
                        <Box mb={3}>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"center"}
                          >
                            <Box mr={2}>
                              <Typography>Amount</Typography>
                            </Box>
                            <Input
                              disableUnderline
                              className="inputField"
                              size="small"
                              type="number"
                              value={amountFees * amount}
                              // onChange={(e) => setAmount(e.target.value)}
                              placeholder="0.00"
                              fullWidth
                              readOnly
                            />
                          </Stack>
                        </Box>
                      </Box>

                      {coinNamesDataTo !== "" && (
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
                            <Stack
                              direction={"row"}
                              px={2}
                              alignItems={"center"}
                              justifyContent="space-between"
                            >
                              <Typography fontSize={20} fontWeight={400}>
                                1 {coinNamesDataTo}
                              </Typography>
                              <Typography
                                fontSize={20}
                                color="primary"
                                fontWeight={400}
                              >
                                =
                              </Typography>
                              <Input
                                disableUnderline
                                className="inputField"
                                size="small"
                                type="number"
                                // value={coinRate * amount}
                                onChange={(e) => setAmountFees(e.target.value)}
                                placeholder="0.00"
                              />
                            </Stack>
                          </Box>
                          <Stack mb={4} direction={"row"}>
                            <Box mt={-2} mb={1}>
                              <Typography fontSize={16} fontWeight={400}>
                                Official rate: 1{coinNamesDataTo} ={" "}
                                {currencyNames?.currencyCode} {coinRate}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      )}

                      <Stack direction={"row"}>
                        <>
                          {loading ? (
                            <LoadingButton fullWidth loading variant="outlined">
                              Login
                            </LoadingButton>
                          ) : (
                            <>
                              <Button
                                // onClick={() => onVerify()}
                                onClick={handleTransactionPinModal}
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
                          onClick={() => onClose()}
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
                    </Box>
                  ) : (
                    <Box mt={3} py={3} px={3}>
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
                        Offer Noted
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
                        {showMsg}
                      </Typography>
                      <Typography
                        // variant="body2"
                        color="primary"
                        sx={{ cursor: "pointer" }}
                        onClick={onClose}
                      >
                        Close
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Modal>
          ) : (
            <Box>
              <Box pt={1} px={0.5}>
                <Box>
                  <Stack direction={"row"}>
                    <Box mb={1} mt={3}>
                      <Typography fontSize={12} fontWeight={400}>
                        Sell
                      </Typography>
                    </Box>
                  </Stack>
                  <Box mb={3}>
                    <Stack>
                      <Select
                        className={
                          theme.palette.mode === "dark"
                            ? styles.currencyBoxDark
                            : styles.currencyBox
                        }
                        sx={{
                          width: "100%",
                          height: 50,
                          border: 0,
                        }}
                        value={coinNames}
                        onChange={handleCoinNameSelection}
                      >
                        <MenuItem value="0">
                          <Typography>Select</Typography>
                        </MenuItem>

                        {coinNamesData.map(
                          (
                            {
                              id,
                              name,
                              imgUri,
                              network,
                              abbreviation,
                              blockchain,
                            },
                            index
                          ) => (
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
                                <Typography>
                                  {abbreviation + " - " + blockchain?.standard}
                                </Typography>
                              </Stack>
                            </MenuItem>
                          )
                        )}
                      </Select>
                      <Box mt={2}>
                        <Input
                          disableUnderline
                          className="inputField"
                          size="small"
                          type="number"
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          fullWidth
                        />
                      </Box>
                    </Stack>
                  </Box>
                </Box>

                <Box>
                  <Stack direction={"row"}>
                    <Box mb={1}>
                      <Typography fontSize={12} fontWeight={400}>
                        Receive
                      </Typography>
                    </Box>
                  </Stack>
                  <Box mb={3}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      {/* <Box mr={2}>
                    <Typography>Amount</Typography>
                  </Box> */}
                      <Input
                        disableUnderline
                        className="inputField"
                        size="small"
                        type="number"
                        value={amountFees * amount}
                        // onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        fullWidth
                        readOnly
                      />
                    </Stack>
                  </Box>
                </Box>

                {coinNamesDataTo !== "" && (
                  <Box>
                    <Stack direction={"row"}>
                      <Box mb={1}>
                        <Typography fontSize={12} fontWeight={400}>
                          Rate
                        </Typography>
                      </Box>
                    </Stack>
                    <Box
                      mb={3}
                      borderRadius={5}
                      p={2}
                      py={0.5}
                      fullWidth
                      bgcolor={"#dddddd50"}
                    >
                      <Stack
                        direction={"row"}
                        px={2}
                        alignItems={"center"}
                        justifyContent="space-between"
                      >
                        <Typography fontSize={12} fontWeight={400}>
                          1 {coinNamesDataTo}
                        </Typography>
                        <Typography
                          fontSize={12}
                          color="primary"
                          fontWeight={400}
                        >
                          =
                        </Typography>
                        <Input
                          disableUnderline
                          className="inputField"
                          size="small"
                          type="number"
                          value={amountFees}
                          // value={coinRate * amount}
                          onChange={(e) => setAmountFees(e.target.value)}
                          placeholder="0.00"
                        />
                      </Stack>
                    </Box>
                    <Stack mb={4} direction={"row"}>
                      <Box mt={-2} mb={1}>
                        <Typography fontSize={12} fontWeight={400}>
                          Official rate: 1{coinNamesDataTo} ={" "}
                          {currencyNames?.currencyCode} {coinRate}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                )}

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

                  {/* <Button
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
              </Button> */}
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
                You will receive your token once your payment has been confirmed
                by the 2nd party.{" "}
              </Typography>
            </Box> */}
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default CreateRequestModal;
