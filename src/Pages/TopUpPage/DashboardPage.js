import React, { Suspense, useEffect, useState, useCallback } from "react";
import { Box } from "@mui/system";
import {
  Typography,
  useMediaQuery,
  useTheme,
  Stack,
  Button,
  Snackbar,
  Tooltip,
  Slide,
  Alert,
  IconButton,
} from "@mui/material";

import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopy from "@mui/icons-material/ContentCopy";

// Styles
import styles from "./TopUpPage.module.css";
import Grid from "@mui/material/Grid";
import MobileNavDrawerPermanent from "../../components/Layout/MobileNavDrawerPermanent";

// Axios
import axios from "../../api/axios";
import { LoadingButton } from "@mui/lab";
// Route
import { Link, useNavigate } from "react-router-dom";

import {
  ComponentSkeleton,
  ModalSkeletons,
} from "../../components/Skeletons/ComponentSkeletons";

import LocationIcon from "../../assets/location.svg";
import ArrowUp from "../../assets/arrowTop.svg";
import Token from "../../assets/token.svg";
import Tron from "../../assets/tron.svg";
import moment from "moment";
import TableArea from "./Table/TableArea";
import TopUpCardMobile from "./TopUpCard/TopUpCardMobile";
import SendTokenModal from "./ProviderSelect/SendTokenModal";
import Notification from "../../assets/notification.svg";
import CreateNotifcationModal from "../BuyWallet/CreateRequestModal/CreateNotifcationModal";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../components/LazyImageComponent/LazyImageComponent")
);

const TopUpPage = () => {
  // Menu
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const navigate = useNavigate();

  const [coinData, setCoinData] = useState([]);

  const [coinID, setCoinID] = useState("");

  const [walletData, setWalletData] = useState("");

  const [walletID, setWalletID] = useState("");

  const [loading, setLoading] = useState(false);

  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const [showNotification, setShowNotification] = useState(false);

  const [unread, setUnread] = useState(0);

  const openMenu = Boolean(anchorElMenu);

  const handleOpenSuccessModal = () => {
    setOpenSuccessModal(!openSuccessModal);
  };

  // Copy Snackbar
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Close Handler for Snackbar
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleNotification = () => {
    setShowNotification(!showNotification);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const WALLET_URL = "/wallet/my-wallets";

  const WALLET_MAIN_URL = "/wallet/";

  const GET_UNREAD_URL = "/user/notification/unread";

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
        console.log(res.data.data.wallet);
        setWalletData(data);
        setWalletID(data?.walletAddress);
      });
  };

  useEffect(() => {
    axios
      .get(WALLET_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        let data = res.data.data.wallets;
        setCoinID(data[0]?.id);
        axios
          .get(WALLET_MAIN_URL + data[0]?.id, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
            setLoading(false);
            let data = res.data.data.wallet;
            // console.log(res.data.data.wallet);
            setWalletData(data);
            setWalletID(data?.walletAddress);
          });

        setCoinData(data);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        }
      });
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
  }, [navigate, user]);

  return (
    <React.Fragment>
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
      <CreateNotifcationModal
        open={showNotification}
        onClose={handleNotification}
      />

      {!isMobile && (
        <Box
          px={3}
          mt={-8}
          className={!isTablet ? styles.mainBox : styles.mainBoxTab}
        >
          <Box borderRadius={3} px={2} py={1.5} bgcolor={"#E8E8F3"}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Stack mt={0.5} direction="row">
                <Typography fontSize={18} variant="h6" color="secondary">
                  Hello, {user?.user?.firstName}
                </Typography>
                <Typography
                  fontSize={18}
                  fontWeight={200}
                  ml={1}
                  variant="h6"
                  color="secondary"
                >
                  |
                </Typography>
                <Stack pl={1} direction="row">
                  <Box mt={0.8}>
                    <LazyImageComponent
                      style={{ width: 15 }}
                      src={LocationIcon}
                    />
                  </Box>
                  <Typography
                    mt={0.3}
                    fontWeight={400}
                    ml={1}
                    fontSize={16}
                    variant="body2"
                  >
                    {user?.country.name}
                  </Typography>
                </Stack>
                <Typography
                  fontSize={18}
                  fontWeight={200}
                  ml={1}
                  variant="h6"
                  color="secondary"
                >
                  |
                </Typography>
                <Typography
                  fontSize={16}
                  fontWeight={500}
                  ml={1}
                  mt={0.2}
                  variant="h6"
                  color="secondary"
                >
                  {moment().format("Do MMMM, YYYY")}
                </Typography>
              </Stack>
              <Box
                mt={1}
                Button
                onClick={handleNotification}
                sx={{ cursor: "pointer" }}
              >
                <Box
                  position={"absolute"}
                  borderRadius={"50%"}
                  top={isMobile ? 105 : 32}
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

          <Box mt={6} px={2}>
            <Grid container spacing={2}>
              <Grid item xs={isTablet ? 12 : 9}>
                <Grid container spacing={5}>
                  {coinData.map(({ id, cryptoCurrency, icon }, index) => (
                    <>
                      {index <= 3 && (
                        <Grid item xs={isTablet ? 12 : 3}>
                          <Box
                            borderRadius={4}
                            // height={250}
                            px={3}
                            py={2}
                            bgcolor={"#E8E8F3"}
                          >
                            <Stack
                              direction="row"
                              justifyContent={"space-between"}
                            >
                              <Box>
                                <LazyImageComponent
                                  style={{ width: 60, height: 60 }}
                                  src={cryptoCurrency?.imgUri}
                                />
                                {/* <Typography
                                  mt={0.5}
                                  fontWeight={600}
                                  ml={1}
                                  fontSize={19}
                                  variant="body2"
                                >
                                  2,000
                                </Typography> */}
                                {/* <Typography
                                  mt={-0.4}
                                  fontWeight={500}
                                  ml={1}
                                  fontSize={14}
                                  variant="body2"
                                  sx={{ opacity: 0.4 }}
                                >
                                  ₦890,000
                                </Typography> */}
                                <Typography
                                  mt={2}
                                  fontWeight={500}
                                  ml={1}
                                  fontSize={13}
                                  sx={{ opacity: 0.5 }}
                                  variant="body2"
                                >
                                  {cryptoCurrency?.name} -{" "}
                                  {cryptoCurrency?.abbreviation}
                                </Typography>
                              </Box>
                              {/* <Box>
                                <Stack direction="row">
                                  <LazyImageComponent src={ArrowUp} />
                                  <Typography
                                    ml={0.5}
                                    fontWeight={500}
                                    fontSize={15}
                                    color={"#49AC27"}
                                  >
                                    +0.25%
                                  </Typography>
                                </Stack>
                              </Box> */}
                            </Stack>
                          </Box>
                        </Grid>
                      )}
                    </>
                  ))}
                </Grid>

                {!isTablet && (
                  <Box mt={4}>
                    <Typography
                      fontSize={20}
                      fontWeight={500}
                      mb={0}
                      variant="h6"
                      color="secondary"
                    >
                      Recent Transactions
                    </Typography>
                    <TableArea />
                  </Box>
                )}
              </Grid>
              <Grid item xs={isTablet ? 12 : 3}>
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
                        Total Balance
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
                            {walletData?.balance}
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
                                  Wallet Address:{" "}
                                  {walletID.substr(0, 10) + "\u2026"}
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
                  mt={2}
                  py={2.4}
                  px={3.0}
                  borderRadius={5}
                  // height={760}
                  bgcolor={"#E8E8F3"}
                >
                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    mb={2}
                    mt={2}
                    variant="h6"
                    color="secondary"
                  >
                    Current Official Rate
                  </Typography>

                  {coinData.map(
                    ({ id, cryptoCurrency, cryptoCurrencyId }, index) => (
                      <Box
                        border={coinID === id ? 1 : 0}
                        borderColor={"#3063E9"}
                        borderRadius={4}
                        bgcolor={"#F6F0F8"}
                        Button
                        sx={{ cursor: "pointer" }}
                        onClick={() => getCyptoExchangeRate(id)}
                        px={2}
                        my={2}
                        py={2}
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
                                {cryptoCurrency?.abbreviation}
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
                      </Box>
                    )
                  )}
                </Box>
              </Grid>
              {isTablet && (
                <Grid item xs={12}>
                  <Box mt={4}>
                    <Typography
                      fontSize={20}
                      fontWeight={500}
                      mb={0}
                      variant="h6"
                      color="secondary"
                    >
                      Recent Transactions
                    </Typography>
                    <TableArea />
                  </Box>
                </Grid>
              )}
            </Grid>

            {/* <Suspense fallback={<ComponentSkeleton />}>
              <ProviderSelect />
            </Suspense> */}
            {/* <Suspense fallback={<ComponentSkeleton />}>
              <TopUpCard />
            </Suspense> */}
          </Box>
        </Box>
      )}
      {isMobile && (
        <MobileNavDrawerPermanent
          user={user}
          // handleClickMenu={handleClickMenu}
          // topBarContent={"Top Up"}
        >
          <Box className={styles.contentBoxMobile}>
            <Suspense fallback={<ComponentSkeleton />}>
              <TopUpCardMobile
                walletData={walletData}
                walletID={walletID}
                coinData={coinData}
              />
            </Suspense>
          </Box>
        </MobileNavDrawerPermanent>
      )}
    </React.Fragment>
  );
};

export default TopUpPage;
