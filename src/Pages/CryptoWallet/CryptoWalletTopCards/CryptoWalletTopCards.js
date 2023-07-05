import React, { Suspense, useEffect, useState } from "react";

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
  Radio,
  RadioGroup,
  FormControlLabel
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";

// Card Images
import TotalFundValueImage from "../../../assets/totalFundValueImage.svg";
import BuyCryptoCardImage from "../../../assets/buyCryptoCurrencyCardImg.svg";
import TotalFundValueImageLight from "../../../assets/totalFundValueImageLight.svg";
import BuyCryptoCardImageLight from "../../../assets/buyCryptoCurrencyCardImgLight.svg";

// CoinImage
import BitCoinIcon from "../../../assets/bitCoinIcon.svg";
import EthereumIcon from "../../../assets/EthereumVectorLogo.svg";
import CardanoIcon from "../../../assets/CardanoVectorLogo.svg";
import Notification from "../../../assets/notification.svg";

import ExchanageIcon from "../../../assets/exchange.svg";

// Axios
import axios from "../../../api/axios";

// Router
import { useNavigate } from "react-router-dom";

import CreateRequestModal from "../CreateRequestModal/CreateRequestModal";

import CreateNotifcationModal from "../CreateRequestModal/CreateNotifcationModal";

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

  const [coinNamesData, setCoinNamesData] = useState([]);
  const [coinNames, setCoinNames] = useState("0");
  const [coinNamesShow, setCoinNamesShow] = useState("");

  const [showPin, setShowPin] = useState(false);

   const [unread, setUnread] = useState(0);

  const [showNotification, setShowNotification] = useState(false);

  const [coinRate, setCoinRate] = useState("0");



  const handleCloseTwoFAPin = () => {
    setShowPin(!showPin);
  };

  const handleNotification = () => {
    setShowNotification(!showNotification);
  };

  const handleCoinNameSelection = (e) => {
    setCoinNames(e.target.value);
   
    var coin = e.target.value;
    setCoinNamesShow(coin.split(" ")[1]);
    // console.log(coin.split(" ")[0])
      getCyptoExchangeRate(coin.split(" ")[0]);
    
  };

  const handleCurrencyNameSelection = (e) => {
    setCurrencyName(e.target.value);
  };

  var user = JSON.parse(localStorage.getItem('user'));

  const GET_CURRENCY_URL = "/user/get-crypto-currencies";

  const onClickSuccess = () => {
    if (amount === "" || coinNames === "0") {
      return;
    } else {
      props.sendData({ cryptoCurrencyId: coinNames.split(' ')[0], amount: parseFloat(amount), coinAbb: coinNames.split(' ')[1], coinImg: coinNames.split(' ')[2], });
    }

  }

 
  const GET_CURRENCY_RATE_URL = "/transaction/get-exchange-rate/";
  const GET_UNREAD_URL = "/user/notification/unread";

  const getCyptoExchangeRate = (coin) => {
    // setLoading(true);

    axios.get(
      GET_CURRENCY_RATE_URL + coin,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      // console.log(res.data)
      setCoinRate(res.data.data)

    }).catch((err) => {
      // console.log(err?.response?.status);
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
      }
    });
      // .finally(() => { setLoading(false); });





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
        setCoinNamesData(res.data.data.cryptoCurrencies);
      })
      .catch((err) => {
        // console.log(err?.response?.status);
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        }
      })
      .finally(() => {});

       axios
         .get(GET_UNREAD_URL, {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${user.token}`,
           },
         })
         .then((res) => {
          setUnread(res.data.data.unread);
         })
         .catch((err) => {
           // console.log(err?.response?.status);
           if (err?.response?.status === 401) {
             navigate("/user/sign-in");
           }
         })
         .finally(() => {});
  }, [GET_CURRENCY_URL, user, navigate, setCoinNamesData]);

  return (
    <>
      <CreateRequestModal
        open={showPin}
        country={props.country}
        currency={props.currency}
        onClose={handleCloseTwoFAPin}
      />
      <CreateNotifcationModal
        open={showNotification}
        onClose={handleNotification}
      />
      <Box
        mt={isMobile ? 0 : -8}
        borderBottom={6}
        borderColor={"#D048DC"}
        borderRadius={10}
      >
        <Box mb={5}>
          <Stack direction="row" mt={5} justifyContent="space-between">
            <Button
              onClick={handleCloseTwoFAPin}
              width={200}
              style={{
                height: 50,
                borderRadius: 10,
                fontSize: 16,
                textTransform: "none",
              }}
              variant="contained"
              color="primary"
            >
              Create A Sell Offer
            </Button>

            <Box
              p={3}
              Button
              onClick={handleNotification}
              sx={{ cursor: "pointer" }}
            >
              <Box
                position={"absolute"}
                borderRadius={"50%"}
                top={isMobile ? 105 : 50}

                width={25}
                height={25}
                bgcolor={"#ff0000"}
              >
                <center>
                  <Typography
                    variant="caption"
                    fontSize={11}
                    fontWeight={500}
                    color="secondary"
                  >
                   {unread > 100 ? "99+" : unread}
                  </Typography>
                </center>
              </Box>
              <LazyImageComponent src={Notification} />
            </Box>
          </Stack>
        </Box>

        <Box mb={4}>
          <Typography
            variant="caption"
            fontSize={25}
            fontWeight={500}
            color="secondary"
          >
            Buy{" "}
          </Typography>
        </Box>
        <Box
          className={styles.cardBox}
          bgcolor={theme.palette.mode === "dark" ? "#222" : "#E8E8F3"}
        >
          <Box>
            <Stack
              direction={isMobile ? "column" : "row"}
              // justifyContent="space-between"
              alignItems="center"
              p={1}
            >
              <Box
                mr={isMobile ? 0 : 4}
                mb={isMobile ? 2 : 0}
                width={isMobile ? "100%" : "25%"}
              >
                <Box>
                  <Typography fontSize={15} mb={1.5} fontWeight={600}>
                    Network
                  </Typography>
                </Box>

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
                    <Typography>Select A Coin</Typography>
                  </MenuItem>
                  {coinNamesData.map(
                    ({ id, name, imgUri, network, abbreviation }, index) => (
                      <MenuItem
                        key={id}
                        value={id + " " + abbreviation + " " + imgUri}
                      >
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
                          <Typography>
                            {abbreviation} - {network}
                          </Typography>
                        </Stack>
                      </MenuItem>
                    )
                  )}
                </Select>
              </Box>

              <Box mr={isMobile ? 0 : 4} width={isMobile ? "100%" : "25%"}>
                <Box>
                  <Typography fontSize={15} mb={1.5} fontWeight={600}>
                    Amount
                  </Typography>
                </Box>
                <Input
                  disableUnderline
                  className="inputField"
                  size="small"
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  fullWidth
                ></Input>
              </Box>

              <Box
                mt={4}
                mb={isMobile ? 4 : 0}
                width={isMobile ? "100%" : "25%"}
              >
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
                  Search
                  {/* <SearchIcon color="background.light" /> */}
                </Button>
              </Box>
            </Stack>
          </Box>

          <Stack
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
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default CryptoWalletTopCards;
