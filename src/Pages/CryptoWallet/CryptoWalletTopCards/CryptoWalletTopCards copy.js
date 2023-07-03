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
  InputAdornment,
  MenuItem,
  Input,
  useMediaQuery,
} from "@mui/material";
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

  const handleCoinNameSelection = (e) => {
    setCoinNames(e.target.value);
  };

  const handleCurrencyNameSelection = (e) => {
    setCurrencyName(e.target.value);
  };

  return (
    <Box className={styles.mainBox} mt={isMobile ? 0 : -8}>

      <Box mb={5}>
        <Button variant="contained" color="primary">
          <Typography variant="caption" p={0.3} color="background.light">
            <a
              style={{ textDecoration: "none", color: "inherit", textTransform: "none", fontSize: 15, fontWeight: 400 }}
              href="/registration/sign-up"
            >

              Create A Sell Offer

            </a>
          </Typography>
        </Button>
      </Box>

      <Box mb={4} >
        <Typography variant="caption" fontSize={23} fontWeight={500} color="secondary">
          Buy </Typography>

      </Box>
      <Box className={styles.cardBox} bgcolor={"#E8E8F3"}>

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
                sx={{ width: "75%", height: 50, border: 0 }}
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
                fullWidth

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
              bgcolor={"#eee"}
            >
              <Select
                className={theme.palette.mode === "dark" ? "" : styles.currencyBox}
                sx={{ width: "100%", height: 50, border: 0 }}
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

              <Button variant="contained" color="primary">
                <Typography variant="caption" pl={4} pr={4} textTransform={"none"} fontSize={14} color="background.light">

                  Search

                </Typography>
              </Button>

            </Stack>

          </Box>


          {/* <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              bgcolor={theme.palette.background.paper}
              className={styles.card}
            >
              <Box>
                <Typography
                  className={styles.cardSubTitle}
                  sx={{ fontSize: { xs: "10px", sm: "10px", md: "14px" } }}
                  color="secondary"
                  variant="body2"
                >
                  Total fund value
                </Typography>
                <Typography
                  mt={3}
                  mb={2}
                  variant="h4"
                  className={styles.cardTitle}
                  sx={{ fontSize: { xs: "10px", sm: "24px", md: "24px" } }}
                >
                  $73,275
                </Typography>
              </Box>
              <Box className={styles.cardImageArea}>
                <Suspense
                  fallback={
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={210}
                      height={175}
                    />
                  }
                >
                  {theme.palette.mode === "dark" ? (
                    <LazyImageComponent
                      className={styles.cardImage}
                      src={TotalFundValueImage}
                    />
                  ) : (
                    <LazyImageComponent
                      className={styles.cardImage}
                      src={TotalFundValueImageLight}
                    />
                  )}
                </Suspense>
              </Box>
            </Stack>
          </Box> */}
          {/* <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              className={styles.card}
              bgcolor={theme.palette.background.paper}
            >
              <Box>
                <Typography
                  sx={{ fontSize: { xs: "10px", sm: "10px", md: "14px" } }}
                  color="secondary"
                  variant="body2"
                >
                  Buy Cryptocurrency from FIAT
                </Typography>
                {theme.palette.mode === "dark" ? (
                  <Box mt={3} className={styles.buyCryptoButton}>
                    <Box
                      className={styles.buyCryptoButtonInnerBox}
                      borderRadius="4px"
                      bgcolor={theme.palette.background.paper}
                    >
                      <Button
                        fullWidth
                        onClick={() => navigate("/dashboard/top-up")}
                        variant="text"
                        color="primary"
                        sx={{ py: 1.5 }}
                      >
                        <Typography
                          className={styles.buttonText}
                          color="primary"
                          variant="body2"
                          sx={{
                            textTransform: "capitalize",
                            fontSize: { xs: "10px", md: "14px" },
                          }}
                        >
                          Buy Crypto
                        </Typography>
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <LightUIButtonPrimary
                    onClick={() => navigate("/dashboard/top-up")}
                    variant="text"
                    color="primary"
                    fullWidth
                    sx={{ py: 1.5, mt: 3 }}
                  >
                    <Typography
                      className={styles.buttonText}
                      color="#ffffff"
                      variant="body2"
                      sx={{
                        textTransform: "capitalize",
                        fontSize: { xs: "10px", md: "14px" },
                      }}
                    >
                      Buy Crypto
                    </Typography>
                  </LightUIButtonPrimary>
                )}
              </Box>
              <Box className={styles.cardImageArea}>
                <Suspense
                  fallback={
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={210}
                      height={175}
                    />
                  }
                >
                  {theme.palette.mode === "dark" ? (
                    <LazyImageComponent
                      className={styles.cardImage}
                      src={BuyCryptoCardImage}
                    />
                  ) : (
                    <LazyImageComponent
                      className={styles.cardImage}
                      src={BuyCryptoCardImageLight}
                    />
                  )}
                </Suspense>
              </Box>
            </Stack>
          </Box> */}
        </Stack>
      </Box>
    </Box>
  );
};

export default CryptoWalletTopCards;
