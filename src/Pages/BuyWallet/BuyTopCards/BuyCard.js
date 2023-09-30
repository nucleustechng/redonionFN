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
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";

import ExchanageIcon from "../../../assets/exchange.svg";

// Axios
import axios from "../../../api/axios";

// Router
import { useNavigate } from "react-router-dom";

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
  const [coinNames, setCoinNames] = useState(0);
  const [coinNamesShow, setCoinNamesShow] = useState("");

  const [coinRate, setCoinRate] = useState("0");

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

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));




  const onClickSuccess = () => {
   
    if (amount === "" || coinNames === "0") {
      return;
    } else {
      props.sendData({
        cryptoCurrencyId: coinNames.split(" ")[0],
        amount: parseFloat(amount),
        coinAbb: coinNames.split(" ")[1],
        coinImg: coinNames.split(" ")[2],
      });
    }
  };

  const GET_CURRENCY_RATE_URL = "/transaction/get-exchange-rate/";

  const getCyptoExchangeRate = (coin) => {
    // setLoading(true);
    // console.log(user?.currency?.id);
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
        console.log(res.data);
        setCoinRate(res.data.data);
      })
      .catch((err) => {
        // console.log(err?.response?.status);
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        }
      });
  };



  useEffect(() => {
    setCoinNamesData(props.coinNamesData);
  }, [props]);


  return (
    <>
      <Box
        mt={isMobile ? -12 : -8}
        borderBottom={isMobile ? 0 : 6}
        borderColor={"#D048DC"}
        borderRadius={10}
      >
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
                mr={isTablet ? 0 : 4}
                mb={isTablet ? 2 : 0}
                width={isMobile ? "120%" : isTablet ? "100%" : "25%"}
              >
                <Box>
                  <Typography fontSize={15} mb={1.5} fontWeight={600}>
                    CryptoCurrency
                  </Typography>
                </Box>

                <Select
                  className={
                    theme.palette.mode === "dark"
                      ? styles.currencyBoxDark
                      : styles.currencyBox
                  }
                  sx={{
                    width: isTablet ? "100%" : "100%",
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
                      { id, name, imgUri, network, abbreviation, blockchain },
                      index
                    ) => (
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
                            {abbreviation + " - " + blockchain?.standard}
                          </Typography>
                        </Stack>
                      </MenuItem>
                    )
                  )}
                </Select>
              </Box>

              <Box
                mr={isTablet ? 0 : 4}
                width={isMobile ? "120%" : isTablet ? "100%" : "25%"}
              >
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

              {isMobile && isTablet && (
                <Stack
                  mt={3}
                  mb={-1}
                  direction="row"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box mr={1}>
                    <Typography fontWeight={400} fontSize={12}>
                      Official Rate:{" "}
                    </Typography>
                  </Box>
                  <Typography fontWeight={600} fontSize={12}>
                    {" "}
                    1 {coinNamesShow || "--"} = {user?.currency?.currencyCode}{" "}
                    {parseFloat(
                      coinRate?.averageExchangeRate || 0
                    ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </Typography>
                </Stack>
              )}

              <Box
                mt={4}
                mb={isTablet ? 4 : 0}
                width={isMobile ? "120%" : isTablet ? "100%" : "25%"}
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

          {!isMobile && !isTablet && (
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
          )}
        </Box>
      </Box>
    </>
  );
};

export default CryptoWalletTopCards;
