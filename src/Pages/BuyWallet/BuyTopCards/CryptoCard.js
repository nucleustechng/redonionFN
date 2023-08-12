import React, { Suspense, useEffect, useState, useCallback } from "react";

// Theme
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "./CryptoWalletTopCards.module.css";

// Material
import {
  Button,
  Skeleton,
  Stack,
  Typography,
  Select,
  IconButton,
  InputAdornment,
  MenuItem,
  Input,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";

import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import Close from "@mui/icons-material/Close";

import ExchanageIcon from "../../../assets/exchange.svg";

// Axios
import axios from "../../../api/axios";

// Router
import { useNavigate } from "react-router-dom";

import SwapModal from "../CreateRequestModal/SwapModal";

import { LoadingButton } from "@mui/lab";

// Lazy Image component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const CryptoWalletTopCards = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [currencyName, setCurrencyName] = useState("USD");

  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  const [coinNamesData, setCoinNamesData] = useState([]);
  const [coinNames, setCoinNames] = useState(0);
  const [coinNamesSecond, setCoinNamesSecond] = useState(0);
  const [coinNamesShow, setCoinNamesShow] = useState("");
  const [showPin, setShowPin] = useState(false);
   const [info, setInfo] = useState("");

  const [coinRate, setCoinRate] = useState("0");

   const [showMsg, setShowMsg] = useState("");

   // Send Snackbar
   const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
     useState(false);

   const handleCloseSendSnackbar = () => {
     setShowSendSuccessfullSnackbar(false);
   };

  const handleCoinNameSelection = (e) => { console.log(e.target.value);
    setCoinNames(e.target.value);
  };

  const handleSelectionSecond = (e) => {
    console.log(e.target.value);
    setCoinNamesSecond(e.target.value);
  };

  const handleCurrencyNameSelection = (e) => {
    setCurrencyName(e.target.value);
  };

  var user = JSON.parse(localStorage.getItem("user"));

  const GET_CURRENCY_URL = "/user/get-crypto-currencies";
  const GET_SWAP_FEE_URL = "/transaction/swap-fee";

  const onClickSuccess = () => {
    //  setShowPin(!showPin);
    if (amount === "" || coinNames === "0" || coinNamesSecond === "0") {
      return;
    } else {
      setLoading(true);
      axios
        .post(
          GET_SWAP_FEE_URL,
          JSON.stringify({
            amount: Number(amount),
            fromCryptoCurrencyId: coinNames,
            toCryptoCurrencyId: coinNamesSecond,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          if (res?.data?.data){
            setInfo(res?.data?.data);
            setShowPin(!showPin);
          } else{
              setShowSendSuccessfullSnackbar(true);
              setShowMsg(res?.data?.msg);
          }
          setLoading(false);
         
          
        })
        .catch((err) => {
         
          if (err?.response?.status === 401) {
            navigate("/user/sign-in");
          }else{
              // console.log(err);
          }
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
     
    axios
      .get(GET_CURRENCY_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        
        // console.log(res.data.data.cryptoCurrencies);
        setCoinNamesData(res.data.data.cryptoCurrencies);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        }
      })
      .finally(() =>   setLoading(false));
  }, [GET_CURRENCY_URL, user, navigate]);

  return (
    <>
      <Box
        mt={isMobile ? -12 : -8}
        borderBottom={isMobile ? 0 : 6}
        borderColor={"#D048DC"}
        borderRadius={10}
      >
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
        <SwapModal
          fromCurrency={coinNames}
          toCurrency={coinNamesSecond}
          amount={amount}
          open={showPin}
          info={info}
          onClose={onClickSuccess}
        />
        <Box
          className={!isMobile ? styles.cardBox : ""}
          bgcolor={
            !isMobile
              ? theme.palette.mode === "dark"
                ? "#222"
                : "#E8E8F3"
              : ""
          }
        >
          <Box>
            <Stack
              direction={isTablet ? "column" : "row"}
              // justifyContent="space-between"
              alignItems="center"
              p={1}
            >
              <Box
                mb={isTablet ? 2 : 0}
                width={isMobile ? "115%" : isTablet ? "100%" : "25%"}
              >
                <Box>
                  <Typography fontSize={15} mb={1.5} fontWeight={600}>
                    From
                  </Typography>
                </Box>

                <Select
                  className={
                    theme.palette.mode === "dark"
                      ? styles.currencyBoxDark
                      : styles.currencyBox
                  }
                  sx={{
                    width: isTablet ? "100%" : "60%",
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
                        <Stack direction="row" alignItems="center" spacing={2}>
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
              </Box>

              <Box
                ml={isTablet ? 0 : -13}
                mr={isTablet ? 0 : 4}
                mt={isTablet ? 0 : 4.3}
                width={isMobile ? "115%" : isTablet ? "100%" : "25%"}
              >
                {/* <Box>
                  <Typography fontSize={15} mb={1.5} fontWeight={600}>
                    Amount
                  </Typography>
                </Box> */}
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

              <Box mt={isTablet ? 2 : 5} mr={3}>
                <LazyImageComponent src={ExchanageIcon} />
              </Box>

              <Box
                mb={isMobile ? 2 : 0}
                width={isMobile ? "115%" : isTablet ? "100%" : "25%"}
              >
                <Box>
                  <Typography fontSize={15} mb={1.5} fontWeight={600}>
                    To
                  </Typography>
                </Box>

                <Select
                  className={
                    theme.palette.mode === "dark"
                      ? styles.currencyBoxDark
                      : styles.currencyBox
                  }
                  sx={{
                    width: isTablet ? "100%" : "60%",
                    height: 50,
                    border: 0,
                  }}
                  value={coinNamesSecond}
                  onChange={handleSelectionSecond}
                >
                  <MenuItem value="0">
                    <Typography>Select A Coin</Typography>
                  </MenuItem>

                  {coinNamesData.map(
                    ({ id, name, imgUri, network, abbreviation }, index) => (
                      <MenuItem key={id} value={id}>
                        <Stack direction="row" alignItems="center" spacing={2}>
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
              </Box>

              <Box
                ml={isTablet ? 0 : -10}
                mt={4}
                mb={isTablet ? 2 : 0}
                width={isMobile ? "115%" : isTablet ? "100%" : "15%"}
              >
                {loading ? (
                  <LoadingButton
                    style={{
                      height: 60,
                      borderRadius: 10,
                      fontSize: 16,
                      textTransform: "none",
                    }}
                    loading
                    variant="outlined"
                  >
                    Sign Up
                  </LoadingButton>
                ) : (
                  <Button
                    onClick={onClickSuccess}
                    fullWidth
                    style={{
                      height: 50,
                      borderRadius: 10,
                      fontSize: 16,
                      textTransform: "none",
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Swap
                  </Button>
                )}
              </Box>
            </Stack>
          </Box>

          {/* <Stack
            mb={-2}
            mr={2}
            direction="row"
            justifyContent={"flex-end"}
            alignItems={"flex-end"}
          >
            <Box mr={1}>
              <Typography fontWeight={400} fontSize={16}>
                Official Rate:{" "}
              </Typography>
            </Box>
            <Typography fontWeight={600} fontSize={16}>
              {" "}
              1 {coinNamesShow || "--"} = {user?.currency?.currencyCode}{" "}
              {parseFloat(coinRate?.averageExchangeRate || 0).toLocaleString(
                undefined,
                { maximumFractionDigits: 2 }
              )}
            </Typography>
          </Stack> */}
        </Box>
      </Box>
    </>
  );
};

export default CryptoWalletTopCards;
