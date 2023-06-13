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
import LiteCoinIcon from "../../../assets/LiteCoinVectorLogo.svg";

import ExchanageIcon from "../../../assets/exchange.svg";

// Axios
import axios from "../../../api/axios";

// Router
import { useNavigate } from "react-router-dom";

import CreateRequestModal from "../CreateRequestModal/CreateRequestModal";

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

  const [showPin, setShowPin] = useState(false);



  const handleCloseTwoFAPin = () => {
    setShowPin(!showPin);
  };

  const handleCoinNameSelection = (e) => {
    setCoinNames(e.target.value);
  };

  const handleCurrencyNameSelection = (e) => {
    setCurrencyName(e.target.value);
  };

  const GET_CURRENCY_URL = "/user/get-crypto-currencies";

  const onClickSuccess = () => {
    if (amount === "" || coinNames === "0") {
      return;
    } else {
      props.sendData({ cryptoCurrencyId: coinNames.split(' ')[0], amount: parseFloat(amount), coinAbb: coinNames.split(' ')[1], coinImg: coinNames.split(' ')[2], });
    }

  }

  const getCypto = () => {
    var user = JSON.parse(localStorage.getItem('user'));

    axios.get(
      GET_CURRENCY_URL,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      console.log(res.data.data.cryptoCurrencies)
      setCoinNamesData(res.data.data.cryptoCurrencies);
    }).catch((err) => {
      // console.log(err?.response?.status);
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
      }
    })
      .finally(() => { });



  };

  useEffect(() => {
    getCypto();
  }, []);

  return (
    <>

      <CreateRequestModal
        open={showPin}
        country={props.country} currency={props.currency}
        onClose={handleCloseTwoFAPin}
      />
      <Box mt={isMobile ? 0 : -8}>

        <Box mb={5}>
          <Button
            onClick={handleCloseTwoFAPin}
            variant="contained" color="primary">
            <Typography variant="caption" p={0.6} textTransform={"none"} fontSize={14} color="background.light">


              Create a sell offer

            </Typography>
          </Button>
        </Box>

        <Box mb={4} >
          <Typography variant="caption" fontSize={25} fontWeight={500} color="secondary">
            Buy </Typography>

        </Box>
        <Box className={styles.cardBox}
          bgcolor={theme.palette.mode === 'dark' ? "#222" : "#E8E8F3"}
        >
          <center  >
            <Typography fontWeight={700} fontSize={20}>Buy</Typography>
          </center>


          <Box mt={4} ml={30} mr={30}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"

            >
              <Box>

                <Typography fontSize={15} mb={1.5} fontWeight={600}>
                  Network
                </Typography>

              </Box>

              <Box>
                <Typography fontSize={15} mb={1.5} fontWeight={600}>
                  Amount
                </Typography>
              </Box>

            </Stack>
          </Box>
          <Box >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"

            >
              <Box mr={2} width={"100%"}>

                <Select
                  className={theme.palette.mode === "dark" ? styles.currencyBoxDark : styles.currencyBox}
                  sx={{ width: isMobile ? "100%" : "100%", height: 50, border: 0 }}
                  value={coinNames}
                  onChange={handleCoinNameSelection}
                >
                  <MenuItem value="0">
                    <Typography>Select a coin</Typography>
                  </MenuItem>
                  {coinNamesData.map(({ id, name, imgUri, network, abbreviation }, index) => (
                    <MenuItem key={id} value={id + " " + abbreviation + " " + imgUri}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Suspense
                          fallback={
                            <Skeleton
                              animation="wave"
                              variant="circular"
                              width={40}
                              height={40}
                              sx={{
                                backgroundColor: `${theme.palette.mode === "dark" ? "#111" : "#f5f5f5"
                                  }`,
                              }}
                            />
                          }
                        >
                          <LazyImageComponent className={styles.coinIcons} src={imgUri} />
                        </Suspense>
                        <Typography>{abbreviation} - {network}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>

              </Box>

              <Box ml={2} width={"100%"}>
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

            </Stack>
          </Box>
          <Box mt={2}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"

            >


              <Box mt={4} width={"50%"}>
                <Button
                  onClick={onClickSuccess}
                  variant="contained" fullWidth color="primary">

                  <Typography pr={1} variant="caption" textTransform={"none"} fontSize={16} color="background.light">
                    Search
                  </Typography>
                  <SearchIcon color="background.light" />
                </Button>
              </Box>

            </Stack>
          </Box>
        </Box>
        <Box mr={3} mt={0} sx={{ opacity: 0.4 }} ml={3} borderRadius={1} height={10} bgcolor={"#D048DC"}>

        </Box>
      </Box>
    </>
  );
};

export default CryptoWalletTopCards;
