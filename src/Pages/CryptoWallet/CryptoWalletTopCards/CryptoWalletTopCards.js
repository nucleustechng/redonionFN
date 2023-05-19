import React, { Suspense, useState } from "react";

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

// Router
import { useNavigate } from "react-router-dom";

import CreateRequestModal from "../CreateRequestModal/CreateRequestModal";

// Lazy Image component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// Coin Names
const coinNamesData = [
  {
    id: "1",
    name: "NGN",
    icon: BitCoinIcon,
  },
  {
    id: "2",
    name: "USD",
    icon: EthereumIcon,
  },
  // {
  //   id: "3",
  //   name: "Cardano",
  //   icon: CardanoIcon,
  // },
  // {
  //   id: "4",
  //   name: "Litecoin",
  //   icon: LiteCoinIcon,
  // },
];

// Currency Name
const currenciesData = [
  {
    id: "1",
    name: "USD",
  },
  {
    id: "2",
    name: "EUR",
  },
  {
    id: "3",
    name: "INR",
  },
];

const CryptoWalletTopCards = () => {
  const [coinNames, setCoinNames] = useState("NGN");

  const theme = useTheme();
  const navigate = useNavigate();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [currencyName, setCurrencyName] = useState("USD");

  const [payTextField, setPayTextField] = useState("");

  const [showPin, setShowPin] = useState(false);



  const handleCloseTwoFAPin =() => {
    setShowPin(!showPin);
  };

  const handleCoinNameSelection = (e) => {
    setCoinNames(e.target.value);
  };

  const handleCurrencyNameSelection = (e) => {
    setCurrencyName(e.target.value);
  };

  return (
    <>

      <CreateRequestModal
        open={showPin}
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
        <Box className={styles.cardBox} bgcolor={"#E8E8F3"}>
          <Stack
            direction={!isTablet ? "row" : "column"}
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Box>
              <Stack
                direction={!isTablet ? "row" : "column"}
                spacing={4}
                alignItems="stretch"
              >

                <Box>
                  <Typography fontSize={15} mb={1.5} fontWeight={600}>
                    From
                  </Typography>



                  <Stack
                    direction="row"
                    alignItems="stretch"
                    justifyContent="space-between"
                    spacing={2}
                    height={50}
                    bgcolor={"#eee"}
                  >
                    <Select
                      className={theme.palette.mode === "dark" ? "" : styles.currencyBox}
                      sx={{ width: isMobile ? "40%" : "30%", height: 50, border: 0 }}
                      value={coinNames}
                      onChange={handleCoinNameSelection}
                    >
                      {coinNamesData.map(({ id, name, icon }) => (
                        <MenuItem key={id} value={name}>
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
                              <LazyImageComponent className={styles.coinIcons} src={icon} />
                            </Suspense>
                            <Typography>{name}</Typography>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>

                    <Input
                      // fullWidth
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

                    <Stack direction="row" pl={4} pr={1} alignItems={"center"} bgcolor={"#E8E8F3"}>
                      <LazyImageComponent

                        src={ExchanageIcon}
                      />
                    </Stack>

                  </Stack>

                </Box>

                <Box>
                  <Typography fontSize={15} mb={1.5} fontWeight={600}>
                    To
                  </Typography>



                  <Stack
                    direction="row"
                    alignItems="stretch"
                    justifyContent="space-between"
                    spacing={2}
                    height={50}
                  // bgcolor={"#eee"}
                  >
                    <Select
                      className={theme.palette.mode === "dark" ? "" : styles.currencyBox}
                      sx={{ width: isMobile ? "40%" : "100%", height: 50, border: 0 }}
                      value={coinNames}
                      onChange={handleCoinNameSelection}
                    >
                      {coinNamesData.map(({ id, name, icon }) => (
                        <MenuItem key={id} value={name}>
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
                              <LazyImageComponent className={styles.coinIcons} src={icon} />
                            </Suspense>
                            <Typography>{name}</Typography>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>

                    <Button variant="contained" fullWidth color="primary">

                      <SearchIcon color="background.light" />
                      <Typography variant="caption" textTransform={"none"} fontSize={16} color="background.light">



                        Search

                      </Typography>
                    </Button>

                  </Stack>

                </Box>


              </Stack>
            </Box>


            <Stack direction={"row"} alignItems={"end"} >
              <Typography variant="caption" fontSize={14} fontWeight={300} color="secondary">
                Official rate: </Typography>
              <Typography variant="caption" ml={2} fontSize={14} fontWeight={600} color="secondary">
                1 BTC = 433.72 NGN </Typography>
            </Stack>


          </Stack>
        </Box>
        <Box mr={3} mt={0} sx={{ opacity: 0.4 }} ml={3} borderRadius={1} height={10} bgcolor={"#D048DC"}>

        </Box>
      </Box>
    </>
  );
};

export default CryptoWalletTopCards;
