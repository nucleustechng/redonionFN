import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  Skeleton,
  Chip,
  Snackbar,
  Alert,
  IconButton,
  useMediaQuery,
  Paper,
  List,
} from "@mui/material";
import moment from "moment";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Back from "../../../assets/backArrow.svg";
import Chat from "../../../assets/chat.svg";
import Confirmed from "../../../assets/confirmed.svg";

import { LoadingButton } from "@mui/lab";

// Image

import NGFlag from "../../../assets/NGFlag.svg";

// Styles
import styles from "./RewardTabArea.module.css";

// Custom Theme
import { useTheme } from "@mui/material/styles";

import UpArrow from "../../../assets/upArrow.svg";
import DownArrow from "../../../assets/arrowDown.svg";

import ExchanageIcon from "../../../assets/exchange.svg";

// Axios
import axios from "../../../api/axios";

// Router
import { useNavigate } from "react-router-dom";
import SellDetail from "./SellDetail";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const AvailableRewards = () => {
  const [openRewardModal, setOpenRewardModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [secondStep, setSecondStep] = React.useState(0);
  const [isloading, setIsLoading] = React.useState(false);

  const [tranz, setTransaz] = useState([]);

  const [stranz, setSTransaz] = useState("");

  const [selltranz, setSellTransaz] = useState([]);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const GET_CURRENCY_URL = "/transaction/my-offers";

  const GET_ESCROW_URL = "/transaction/withdraw-from-offer";

  const GET_BY_ID_URL = "/transaction/offer/";

  const GET_OFFER_URL = "/transaction/get-offers";

  const GET_transaction_URL = "/transaction/transactions";


  const getSubmit = (data) => {
    // console.log(data);
    setSTransaz(data);
    setLoading(true);
    axios
      .post(
        GET_transaction_URL,
        JSON.stringify({
          cryptoCurrencyId: data?.cryptoCurrencyId,
          offerId: data?.id,
          amount: data?.amountInCrypto,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res?.data?.data);
        setSellTransaz(res?.data?.data.offers);
        setSecondStep(1);
        setLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        GET_CURRENCY_URL,
        JSON.stringify({
          start: 0,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data)
        setIsLoading(false);
        setTransaz(res.data.data.offers);
      })
      .catch((err) => {
        // console.log(err?.response?.status);
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        }
      })
      .finally(() => {});
  }, [user, navigate]);

  return (
    <React.Fragment>
      {isloading ? (
        <center>
          <LoadingButton loading>Login</LoadingButton>
        </center>
      ) : (
        <>
          {secondStep === 0 && (
            <>
              {tranz.length > 0 ? (
                <List>
                  {tranz.map((info, index) => (
                    <>
                      {(info?.status === "ONGOING" ||
                        info?.status === "PENDING" ||
                        info?.status === "COMPLETED" ||
                        info.status === "REPORTED" ||
                        info.status === "EXPIRED") && (
                        <ListItem
                          key={index}
                          button
                          onClick={() => getSubmit(info)}
                          sx={{ cursor: "pointer" }}
                        >
                          <Box
                            borderWidth={1}
                            borderBottom={1}
                            m={isMobile ? 0 : 3}
                            width={"100%"}
                          >
                            <Stack
                              direction="row"
                              alignItems={"center"}
                              justifyContent="space-between"
                            >
                              <Box>
                                <Stack direction="row">
                                  <LazyImageComponent
                                    sx={{ marginRight: 4 }}
                                    src={UpArrow}
                                  />
                                  <Typography mt={0.2} fontSize={14}>
                                    Sent
                                  </Typography>
                                </Stack>
                                <Stack mt={2} ml={-1} direction="row">
                                  <Box ml={1.5}>
                                    <Stack
                                      direction="row"
                                      justifyItems={"center"}
                                      alignItems={"center"}
                                    >
                                      <LazyImageComponent
                                        style={{
                                          marginRight: 4,
                                          width: 25,
                                          height: 25,
                                        }}
                                        src={info?.cryptoCurrency?.imgUri}
                                      />
                                      <Typography
                                        color="secondary"
                                        fontWeight={400}
                                        fontSize={15}
                                        mt={0.5}
                                        variant="body2"
                                      >
                                        {info?.cryptoCurrency?.abbreviation}
                                      </Typography>
                                    </Stack>
                                    <Stack alignItems={"left"}>
                                      <Typography
                                        color="secondary"
                                        fontWeight={600}
                                        fontSize={18}
                                        mt={0.8}
                                        variant="body2"
                                      >
                                        {info?.amountInCrypto.toFixed(6)}
                                      </Typography>

                                      <Typography
                                        color="secondary"
                                        fontWeight={600}
                                        fontSize={16}
                                        mt={2}
                                        variant="body2"
                                      >
                                        Status
                                      </Typography>
                                    </Stack>
                                  </Box>
                                </Stack>
                              </Box>

                              <Box>
                                <Stack
                                  direction="row"
                                  justifyContent={"top"}
                                  alignItems={"center"}
                                  mt={-3}
                                >
                                  <LazyImageComponent src={ExchanageIcon} />
                                </Stack>
                              </Box>

                              <Box>
                                <Stack
                                  direction="row"
                                  mr={2}
                                  justifyContent="flex-end"
                                >
                                  <LazyImageComponent
                                    sx={{ marginRight: 4 }}
                                    src={DownArrow}
                                  />
                                  <Typography mt={0.2} fontSize={14}>
                                    To receive
                                  </Typography>
                                </Stack>

                                <Box mr={1.5} mt={2}>
                                  <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                  >
                                    <LazyImageComponent
                                      style={{ width: 25, marginRight: 4 }}
                                      src={NGFlag}
                                    />
                                    <Typography
                                      color="secondary"
                                      fontWeight={400}
                                      fontSize={15}
                                      mt={0.2}
                                      variant="body2"
                                    >
                                      {info?.currency?.currencyCode}
                                    </Typography>
                                  </Stack>
                                  <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                  >
                                    <Box
                                    // sx={{
                                    //   borderBottom: 1,
                                    //   borderBottomStyle: "dashed",
                                    // }}
                                    >
                                      <Typography
                                        fontSize={18}
                                        fontWeight={600}
                                        mt={0.4}
                                        color="secondary"
                                        variant="body2"
                                      >
                                        {(info?.amountInCrypto*info?.tokenPricePerUnit).toFixed(2)}
                                      </Typography>
                                    </Box>
                                  </Stack>

                                  <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                  >
                                    <Typography
                                      color="primary"
                                      fontWeight={600}
                                      fontSize={16}
                                      mt={2}
                                      variant="body2"
                                    >
                                      {/* paid */}
                                      {info?.status}
                                    </Typography>
                                  </Stack>
                                </Box>
                              </Box>
                            </Stack>
                          </Box>
                        </ListItem>
                      )}
                    </>
                  ))}
                </List>
              ) : (
                <Box height={400} p={4}>
                  <Box height={200}></Box>
                  <center>
                    <Typography
                      variant="caption"
                      textTransform={"none"}
                      fontSize={14}
                      color="background.dark"
                    >
                      You do not have any sell pending transactions.
                    </Typography>
                    <br />
                    {!isMobile && (
                      <Stack direction={"row"} justifyContent={"center"}>
                        <Typography
                          mr={0.5}
                          fontSize={14}
                          sx={{ color: "#3063E9" }}
                        >
                          Check your history
                        </Typography>
                        <Typography
                          variant="caption"
                          textTransform={"none"}
                          fontSize={14}
                          color="background.dark"
                        >
                          {" "}
                          to view completed transactions
                        </Typography>
                      </Stack>
                    )}
                  </center>
                </Box>
              )}
            </>
          )}
          {secondStep === 1 && (
            <>
              <Box
                button
                onClick={() => setSecondStep(0)}
                sx={{ cursor: "pointer" }}
                mt={3}
                ml={isMobile ? 2 : 0}
              >
                <LazyImageComponent src={Back} />
              </Box>

              <SellDetail stranz={stranz} selldetail={selltranz} />
            </>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default AvailableRewards;
