import React, { Suspense, useState } from "react";
import { Box } from "@mui/system";
import {
  Grid,
  Button,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

// Custom Theme
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "../TopUpPage.module.css";

// CoinImage
import BitCoinIcon from "../../../assets/bitCoinIcon.svg";
import EthereumIcon from "../../../assets/EthereumVectorLogo.svg";
import CardanoIcon from "../../../assets/CardanoVectorLogo.svg";
import LiteCoinIcon from "../../../assets/LiteCoinVectorLogo.svg";
import Tron from "../../../assets/tron.svg";
import Token from "../../../assets/token.svg";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";
import TableArea from "../Table/TableArea";

// Component Loader
import ComponentLoader from "../../../components/ProgressLoader/ComponentLoader";
import { useEffect } from "react";

// Lazy Image
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// Provider Select
const ProviderSelect = React.lazy(() =>
  import("../ProviderSelect/ProviderSelect")
);

// Modal Loader
const TopUpAuthorization = React.lazy(() =>
  import("../TopUpAuthorization/TopUpAuthorization")
);

// Coin Names
const coinNamesData = [
  {
    id: "1",
    name: "Bitcoin",
    icon: BitCoinIcon,
  },
  {
    id: "2",
    name: "Ethereum",
    icon: EthereumIcon,
  },
  {
    id: "3",
    name: "Cardano",
    icon: CardanoIcon,
  },
  {
    id: "4",
    name: "Litecoin",
    icon: LiteCoinIcon,
  },
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

const TopUpCardMobile = () => {
  const [coinNames, setCoinNames] = useState("Bitcoin");
  const [currencyName, setCurrencyName] = useState("USD");
  const [payInputText, setPayInputText] = useState("");

  // Loading Modal
  const [showAuthorization, setShowAuthorization] = useState(false);

  // Successfull Message Snackbar for the modal
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  // Handler for Modal
  const handleCloseAuthorizationModal = () => {
    setShowAuthorization(false);
  };

  // Handler for snackbar
  const handleCloseSuccessSnackbar = () => {
    setShowSuccessSnackbar(false);
  };

  const handleCoinNameSelection = (e) => {
    setCoinNames(e.target.value);
  };

  const handleCurrencyNameSelection = (e) => {
    setCurrencyName(e.target.value);
  };

  // Handler for handling topup
  const handleTopUp = () => {
    setShowAuthorization(true);

    // This will show the snackbar after the loader is closed
    const showTheSnackBar = setTimeout(() => {
      setShowSuccessSnackbar(true);
    }, 2500);

    return () => clearInterval(showTheSnackBar);
  };

  // It will close the authorization modal
  useEffect(() => {
    if (showAuthorization) {
      const closeTheAuthorization = setTimeout(() => {
        setShowAuthorization(false);
      }, 2000);

      return () => clearInterval(closeTheAuthorization);
    }
  }, [showAuthorization]);

  const theme = useTheme();
  return (
    <Box
      className={styles.cardBoxMobile}
      bgcolor={
        theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff"
      }
    >
      <Grid>
        <Grid item xs={12}>
          <Box
            borderRadius={4}
            // height={250}
            px={2}
            py={2}
            bgcolor={"#3063E9"}
          >
            <Stack>
              <Box>
                <Typography
                  fontWeight={500}
                  fontSize={16}
                  color={"#fff"}
                  variant="body2"
                >
                  Total Balance
                </Typography>
                <Typography
                  mt={1}
                  fontWeight={500}
                  color={"#fff"}
                  fontSize={28}
                  variant="body2"
                >
                  ₦2,564,530
                </Typography>
                <Typography
                  fontWeight={500}
                  fontSize={15}
                  mt={1}
                  color={"#fff"}
                  variant="body2"
                >
                  Wallet ID
                </Typography>

                <Box
                  mt={2.5}
                  border={1}
                  borderColor={"#fff"}
                  borderRadius={3}
                  p={1.6}
                >
                  <Stack direction="row" justifyContent={"center"}>
                    <Typography
                      textAlign={"center"}
                      color={"#fff"}
                      variant="body2"
                      mr={1}
                    >
                      Send Token
                    </Typography>
                    <LazyImageComponent src={Token} />
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Box>
          <Box
            mt={0}
            py={2.4}
            px={1.0}
            borderRadius={5}
            // height={760}
            // bgcolor={"#E8E8F3"}
          >
            <Typography
              fontSize={16}
              fontWeight={500}
              mb={2}
              mt={2}
              variant="h6"
              color="secondary"
            >
              Cryptocurrency
            </Typography>
            <Box
              borderRadius={4}
              my={2}
              // bgcolor={"#F6F0F8"}
            >
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <LazyImageComponent style={{ width: 35 }} src={Tron} />

                  <Box>
                    <Typography
                      mt={0.3}
                      fontWeight={500}
                      ml={1}
                      fontSize={16}
                      variant="body2"
                    >
                      USDT
                    </Typography>
                    <Typography
                      mt={-0.4}
                      fontWeight={500}
                      ml={1}
                      fontSize={12}
                      variant="body2"
                      sx={{ opacity: 0.6 }}
                    >
                      ₦90,000
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  height={25}
                  borderRadius={3}
                  py={0.4}
                  px={0.9}
                  bgcolor={"#49AC2780"}
                >
                  <Typography
                    fontWeight={500}
                    fontSize={11}
                    sx={{ opacity: 1, color: "#49AC27" }}
                    variant="body2"
                  >
                    +0.25%
                  </Typography>
                </Box>

                <Box>
                  <Stack direction="column" justifyItems={"flex-end"}>
                    <Typography
                      textAlign={"right"}
                      ml={0.5}
                      fontWeight={500}
                      fontSize={16}
                      color={"#000"}
                    >
                      2,000
                    </Typography>
                    <Typography
                      mt={-0.4}
                      fontWeight={500}
                      ml={1}
                      fontSize={12}
                      variant="body2"
                      sx={{ opacity: 0.6 }}
                    >
                      ₦890,340
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              <hr color="#f2f2f2" />
            </Box>

            <Box
              borderRadius={4}
              my={2}
              // bgcolor={"#F6F0F8"}
            >
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <LazyImageComponent style={{ width: 35 }} src={Tron} />

                  <Box>
                    <Typography
                      mt={0.3}
                      fontWeight={500}
                      ml={1}
                      fontSize={16}
                      variant="body2"
                    >
                      USDT
                    </Typography>
                    <Typography
                      mt={-0.4}
                      fontWeight={500}
                      ml={1}
                      fontSize={12}
                      variant="body2"
                      sx={{ opacity: 0.6 }}
                    >
                      ₦90,000
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  height={25}
                  borderRadius={3}
                  py={0.4}
                  px={0.9}
                  bgcolor={"#49AC2780"}
                >
                  <Typography
                    fontWeight={500}
                    fontSize={11}
                    sx={{ opacity: 1, color: "#49AC27" }}
                    variant="body2"
                  >
                    +0.25%
                  </Typography>
                </Box>

                <Box>
                  <Stack direction="column" justifyItems={"flex-end"}>
                    <Typography
                      textAlign={"right"}
                      ml={0.5}
                      fontWeight={500}
                      fontSize={16}
                      color={"#000"}
                    >
                      2,000
                    </Typography>
                    <Typography
                      mt={-0.4}
                      fontWeight={500}
                      ml={1}
                      fontSize={12}
                      variant="body2"
                      sx={{ opacity: 0.6 }}
                    >
                      ₦890,340
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <Box mt={4} >
              <Typography
                fontSize={18}
                fontWeight={500}
                mb={0}
                variant="h6"
                color="secondary"
              >
                Recent Transactions
              </Typography>
              <TableArea />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopUpCardMobile;
