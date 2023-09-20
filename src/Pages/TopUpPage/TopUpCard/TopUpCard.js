import React, { Suspense, useState } from "react";
import { Box } from "@mui/system";
import {
  Alert,
  Button,
  IconButton,
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
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";

// Component Loader
import ComponentLoader from "../../../components/ProgressLoader/ComponentLoader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

// Lazy Image
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
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

const TopUpCard = () => {
  const [coinNames, setCoinNames] = useState("Bitcoin");
  const [currencyName, setCurrencyName] = useState("USD");
  const [payTextField, setPayTextField] = useState("");

  // Loading Modal
  const [showAuthorization, setShowAuthorization] = useState(false);

  // Successfull Message Snackbar for the modal
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  const navigate = useNavigate();

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
    }, 2000);

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

  useEffect(() => {
    if (showSuccessSnackbar) {
      const navigateToHome = setTimeout(() => {
        navigate("/dashboard/exchange");
      }, 2000);

      return () => clearInterval(navigateToHome);
    }
  }, [showSuccessSnackbar, navigate]);

  const theme = useTheme();
  return (
    <Box
      className={styles.cardBox}
      bgcolor={
        theme.palette.mode === "dark"
          ? theme.palette.background.paper
          : theme.palette.background.card
      }
    >
      <Box>
        <Typography
          variant="caption"
          textAlign="justify"
          component="p"
          color="text.secondary"
        >
          Moonpay is a secure way to buy cryptocurrency with your payment
          method. Start by entering an amount below to get a quote before making
          a purchase
        </Typography>
        <Typography mt={2} mb={1} variant="button" component="p">
          you topup
        </Typography>
        <Select
          className={theme.palette.mode === "dark" ? "" : styles.currencyBox}
          sx={{ width: "50%" }}
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
        <Typography mt={2} mb={1} variant="button" component="p">
          you pay
        </Typography>
        <Stack
          direction="row"
          alignItems="stretch"
          justifyContent="space-between"
          spacing={2}
        >
          <Input
            fullWidth
            name="payInput"
            value={payTextField}
            type="number"
            onChange={(e) => setPayTextField(e.target.value)}
            placeholder="00 (Min $24)"
            disableUnderline
            className={
              theme.palette.mode === "dark"
                ? "inputField"
                : styles.inputFieldLight
            }
            endAdornment={
              <InputAdornment position="end">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Button
                    onClick={() => setPayTextField("100")}
                    className={styles.payInputCoupon}
                  >
                    100
                  </Button>
                  <Button
                    onClick={() => setPayTextField("200")}
                    className={styles.payInputCoupon}
                  >
                    200
                  </Button>
                </Stack>
              </InputAdornment>
            }
          />
          <Select
            className={theme.palette.mode === "dark" ? "" : styles.currencyBox}
            value={currencyName}
            onChange={handleCurrencyNameSelection}
          >
            {currenciesData.map(({ id, name }) => (
              <MenuItem key={id} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Typography mt={2} mb={1} variant="button" component="p">
          you receive
        </Typography>
        <Typography color="secondary" mt={1} variant="subtitle1">
          {payTextField
            ? (parseFloat(payTextField) * 0.05 - 0.0004).toFixed(2)
            : "~0.05"}{" "}
          <Typography
            color="primary"
            fontWeight={500}
            variant="subtitle1"
            component="span"
          >
            BTC
          </Typography>
        </Typography>
        <Typography variant="subtitle1">
          <Typography
            color="secondary"
            variant="body2"
            sx={{ textTransform: "capitalize" }}
            component="span"
          >
            TRANSACTION FEE: 0.0004
          </Typography>
          <Typography
            color="primary"
            sx={{ textTransform: "capitalize", fontSize: "10px" }}
            component="span"
          >
            {" "}
            BTC
          </Typography>
        </Typography>
        <Typography variant="subtitle1" mb={2}>
          <Typography
            color="secondary"
            variant="body2"
            sx={{ textTransform: "capitalize" }}
            component="span"
          >
            RATE: 1BTC = $38,929.40
          </Typography>
          <Typography
            color="primary"
            sx={{ textTransform: "capitalize", fontSize: "10px" }}
            component="span"
          >
            {" "}
            USD
          </Typography>
        </Typography>
        {theme.palette.mode === "dark" ? (
          <Button
            onClick={handleTopUp}
            className={styles.topUpCardButton}
            color="primary"
            variant="contained"
          >
            Continue
          </Button>
        ) : (
          <LightUIButtonPrimary
            onClick={handleTopUp}
            className={styles.topUpCardButton}
            color="primary"
          >
            Continue
          </LightUIButtonPrimary>
        )}
      </Box>
      {/* Loading Modal */}
      <Box>
        <Suspense fallback={<ComponentLoader />}>
          <TopUpAuthorization
            open={showAuthorization}
            handleClose={handleCloseAuthorizationModal}
            message={"Processing"}
          />
        </Suspense>
      </Box>
      {/* Authorize Payment Success Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSuccessSnackbar}
      >
        <Alert
          action={
            <IconButton onClick={handleCloseSuccessSnackbar} sx={{ mt: -0.5 }}>
              <Close sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          }
          icon={<CheckCircleOutline sx={{ fontSize: "1.5rem" }} />}
          sx={{ fontSize: "1rem" }}
          onClose={handleCloseSuccessSnackbar}
          severity="success"
        >
          Topup Successfull
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TopUpCard;
