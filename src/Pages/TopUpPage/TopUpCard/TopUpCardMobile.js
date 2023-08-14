import React, { Suspense, useState } from "react";
import { Box } from "@mui/system";
import {
  Grid,
  Tooltip,
  Stack,
  Typography,
  Snackbar,
  Slide,
  Alert,
} from "@mui/material";

import {
  ComponentSkeleton,
  ModalSkeletons,
} from "../../../components/Skeletons/ComponentSkeletons";

// Custom Theme
import { useTheme } from "@mui/material/styles";

import { CopyToClipboard } from "react-copy-to-clipboard";

// Styles
import styles from "../TopUpPage.module.css";

import axios from "../../../api/axios";

import Tron from "../../../assets/tron.svg";
import Token from "../../../assets/token.svg";
import TableArea from "../Table/TableArea";

import { LoadingButton } from "@mui/lab";

import { useEffect } from "react";

import SendTokenModal from "../ProviderSelect/SendTokenModal";

// Lazy Image
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);



const TopUpCardMobile = (prop) => {
  const [coinData, setCoinData] = useState([]);

   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [walletData, setWalletData] = useState("");

  const [coinID, setCoinID] = useState("");

  const [loading, setLoading] = useState(false);

  const [walletID, setWalletID] = useState("");

  const [walletBalance, setWalletBalance] = useState("");

   const WALLET_MAIN_URL = "/wallet/";

   const getCyptoExchangeRate = (coin) => {
    setCoinID(coin);
     setLoading(true);
     axios
       .get(WALLET_MAIN_URL + coin, {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${user.token}`,
         },
       })
       .then((res) => {
         setLoading(false);
         let data = res.data.data.wallet;
         console.log(data?.balance);
         setWalletData(data);
         setWalletID(data?.walletAddress);
         setWalletBalance(data?.balance);
       });
   };

  useEffect(() => {
    console.log(prop)
    setCoinID(prop.coinID);
    setWalletData(prop.walletData);
    setWalletID(prop.walletID);
    setCoinData(prop.coinData);
    setWalletBalance(prop.walletBalance)
  }, [prop]);

  // Copy Snackbar
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const handleOpenSuccessModal = () => {
    setOpenSuccessModal(!openSuccessModal);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const theme = useTheme();
  return (
    <Box
      className={styles.cardBoxMobile}
      bgcolor={
        theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff"
      }
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Slide}
        open={showSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          sx={{ width: "100%", mt: 1 }}
          onClose={handleCloseSnackbar}
          severity="success"
        >
          Address Copied!
        </Alert>
      </Snackbar>
      <Suspense fallback={<ModalSkeletons />}>
        <SendTokenModal
          wallet={walletData}
          handleClose={handleOpenSuccessModal}
          open={openSuccessModal}
        />
      </Suspense>
      <Grid>
        <Grid item xs={12}>
          <Box
            borderRadius={4}
            // height={250}
            px={4}
            py={4}
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
                  Balance
                </Typography>
                {loading ? (
                  <Box>
                    <LoadingButton
                      fullWidth
                      style={{
                        height: 120,
                        borderRadius: 10,
                        fontSize: 20,
                        textTransform: "none",
                      }}
                      loading
                    >
                      Sign Up
                    </LoadingButton>
                  </Box>
                ) : (
                  <>
                    <Typography
                      mt={1}
                      fontWeight={500}
                      color={"#fff"}
                      fontSize={28}
                      variant="body2"
                    >
                      {walletBalance.length > 10
                        ? walletBalance.substr(0, 10) + "\u2026"
                        : walletBalance}
                    </Typography>

                    <CopyToClipboard
                      onCopy={() => setShowSnackbar(true)}
                      text={walletID}
                    >
                      <Tooltip title="Copy Address">
                        {/* <IconButton sx={{ ml: 5 }} size="small">
                                <ContentCopy color="#fff" />
                              </IconButton> */}
                        <Box button sx={{ cursor: "pointer" }}>
                          <Typography
                            fontWeight={500}
                            fontSize={15}
                            mt={1}
                            color={"#fff"}
                            variant="body2"
                          >
                            Wallet Address: {walletID.substr(0, 10) + "\u2026"}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </CopyToClipboard>

                    <Box
                      mt={2.5}
                      border={1}
                      borderColor={"#fff"}
                      borderRadius={3}
                      button
                      onClick={handleOpenSuccessModal}
                      sx={{ cursor: "pointer" }}
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
                  </>
                )}
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
              Cryptocurrencies
            </Typography>
            {coinData.map(({ id, cryptoCurrency, cryptoCurrencyId }, index) => (
              <Box
                border={1}
                padding={1.3}
                borderColor={coinID === id ? "#3063E9" : "#ddd"}
                Button
                sx={{ cursor: "pointer" }}
                onClick={() => getCyptoExchangeRate(id)}
                borderRadius={4}
                my={2}
                key={id}
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
                    <LazyImageComponent
                      style={{ width: 35, height: 35 }}
                      src={cryptoCurrency?.imgUri}
                    />

                    <Box>
                      <Typography
                        mt={0.3}
                        fontWeight={500}
                        ml={1}
                        fontSize={16}
                        variant="body2"
                      >
                        {cryptoCurrency?.abbreviation +
                          " - " +
                          cryptoCurrency?.blockchain?.standard}
                      </Typography>
                      {/* <Typography
                        mt={-0.4}
                        fontWeight={500}
                        ml={1}
                        fontSize={12}
                        variant="body2"
                        sx={{ opacity: 0.6 }}
                      >
                        ₦90,000
                      </Typography> */}
                    </Box>
                  </Stack>

                  {/* <Box
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
                          </Box> */}

                  {/* <Box>
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
                  </Box> */}
                </Stack>
                {/* {coinID != id && <hr color={"#f2f2f2"} />} */}
              </Box>
            ))}

            <Box mt={4}>
              <Typography
                fontSize={18}
                fontWeight={500}
                mb={0}
                variant="h6"
                color="secondary"
              >
                Recent Transactions
              </Typography>
              <TableArea coinID={coinID} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopUpCardMobile;
