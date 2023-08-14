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

import BitCoinIcon from "../../../assets/bitCoinIcon.svg";

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

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const AvailableRewards = () => {
  const [openRewardModal, setOpenRewardModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [secondStep, setSecondStep] = React.useState(0);

  const [tranz, setTransaz] = useState([]);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const GET_CURRENCY_URL = "/transaction/my-offers";

  const GET_ESCROW_URL = "/transaction/withdraw-from-offer";

  const escrowSubmit = () => {
    setLoading(true);
    axios
      .post(
        GET_ESCROW_URL,
        JSON.stringify({
          amount: 0.01,
          offerId: "1317730a-2873-4007-82b1-00a52a9fa3e8",
          reason: "I no wan do again, na your business?",
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
      });
  };

  useEffect(() => {
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
        // console.log(res.data.data)
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
      {secondStep === 0 && (
        <>
          {tranz.length > 0 ? (
            <List>
              {tranz.map((info) => (
                <>
                  {(info?.status === "ONGOING" ||
                    info?.status === "PENDING" ||
                    info.status === "REPORTED" ||
                    info.status === "EXPIRED") && (
                    <ListItem
                      button
                      onClick={() => setSecondStep(1)}
                      sx={{ cursor: "pointer" }}
                    >
                      <Box m={isMobile ? 0 : 3} width={"100%"}>
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
                                <Stack alignItems={"left"}>
                                  <Typography
                                    color="secondary"
                                    fontWeight={400}
                                    fontSize={15}
                                    mt={0.8}
                                    variant="body2"
                                  >
                                    {info?.offer?.currency?.currencyCode}
                                    {/* code */}
                                  </Typography>

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
                                      {/* {"776.00"} */}
                                      {parseFloat(
                                        info?.amountInFiat || 0
                                      ).toFixed(2)}
                                    </Typography>
                                  </Box>

                                  {/* <Typography
                          color="secondary"
                          fontWeight={400}
                          fontSize={12}
                          mt={0.8}
                          variant="body2"
                        >
                          {moment(info?.createdAt).format(
                                    "Do MMMM YYYY"
                                  )}
                          date
                        </Typography> */}

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
                              justifyContent={"center"}
                              alignItems={"center"}
                              mt={4}
                            >
                              <LazyImageComponent src={ExchanageIcon} />
                            </Stack>
                            {/* <Box ml={0}>
                    <center>
                      <Typography
                        color="secondary"
                        fontWeight={400}
                        fontSize={14}
                        mt={0.8}
                        variant="body2"
                      >
                        date
                        {moment(info?.createdAt).format("h:mm a")}{" "}
                      </Typography>

                      <Typography
                        color="secondary"
                        ml={-1}
                        fontWeight={400}
                        fontSize={16}
                        mt={0.8}
                        variant="body2"
                      >
                        id
                        {info?.cryptoTransactionId}
                      </Typography>
                    </center>
                  </Box> */}
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
                              <Stack direction="row" justifyContent="flex-end">
                                {/* <LazyImageComponent
                                style={{ width: 30 }}
                                src={info?.offer?.CryptoCurrency?.imgUri}
                              /> */}
                                <Typography
                                  color="secondary"
                                  fontWeight={400}
                                  fontSize={15}
                                  mt={0.8}
                                  variant="body2"
                                >
                                  {/* receuve */}
                                  {info?.offer?.CryptoCurrency?.abbreviation}
                                </Typography>
                              </Stack>
                              <Stack direction="row" justifyContent="flex-end">
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
                                    ~ {info?.amountInCrypto}
                                    {/* 5667 */}
                                  </Typography>
                                </Box>
                              </Stack>
                              {/* <Stack direction="row" justifyContent="flex-end">
                      <Typography
                        color="secondary"
                        fontWeight={400}
                        fontSize={12}
                        mt={0.8}
                        variant="body2"
                      >
                        date
                        {moment(info?.createdAt).format("Do MMMM YYYY")}
                      </Typography>
                    </Stack> */}
                              <Stack direction="row" justifyContent="flex-end">
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

                        {/* <Stack mt={4} direction="row" justifyContent="flex-end">
                <Button
                  onClick={handleCloseTwoFAPin}
                  variant="contained"
                  color="primary"
                >
                  <Typography
                    variant="caption"
                    p={0.6}
                    textTransform={"none"}
                    fontSize={14}
                    color="background.light"
                  >
                    Withdraw from Escrow
                  </Typography>
                </Button>
              </Stack> */}
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
          <List>
            <ListItem>
              <Box m={isMobile ? 0 : 3} width={"100%"}>
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
                        <Stack alignItems={"left"}>
                          <Typography
                            color="secondary"
                            fontWeight={400}
                            fontSize={15}
                            mt={0.8}
                            variant="body2"
                          >
                            {/* {info?.offer?.currency?.currencyCode} */}
                            code
                          </Typography>

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
                              {"776.00"}
                              {/* {parseFloat(
                                      info?.amountInFiat || 0
                                    ).toFixed(2)} */}
                            </Typography>
                          </Box>

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
                      justifyContent={"center"}
                      alignItems={"center"}
                      mt={4}
                    >
                      <LazyImageComponent src={ExchanageIcon} />
                    </Stack>
                  </Box>

                  <Box>
                    <Stack direction="row" mr={2} justifyContent="flex-end">
                      <LazyImageComponent
                        sx={{ marginRight: 4 }}
                        src={DownArrow}
                      />
                      <Typography mt={0.2} fontSize={14}>
                        To receive
                      </Typography>
                    </Stack>

                    <Box mr={1.5} mt={2}>
                      <Stack direction="row" justifyContent="flex-end">
                        {/* <LazyImageComponent
                                style={{ width: 30 }}
                                src={info?.offer?.CryptoCurrency?.imgUri}
                              /> */}
                        <Typography
                          color="secondary"
                          fontWeight={400}
                          fontSize={15}
                          mt={0.8}
                          variant="body2"
                        >
                          receuve
                          {/* {info?.offer?.CryptoCurrency?.abbreviation} */}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="flex-end">
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
                            {/* ~ {info?.amountInCrypto} */}
                            5667
                          </Typography>
                        </Box>
                      </Stack>
                      {/* <Stack direction="row" justifyContent="flex-end">
                      <Typography
                        color="secondary"
                        fontWeight={400}
                        fontSize={12}
                        mt={0.8}
                        variant="body2"
                      >
                        date
                        {moment(info?.createdAt).format("Do MMMM YYYY")}
                      </Typography>
                    </Stack> */}
                      <Stack direction="row" justifyContent="flex-end">
                        <Typography
                          color="primary"
                          fontWeight={600}
                          fontSize={16}
                          mt={2}
                          variant="body2"
                        >
                          paid
                          {/* {info?.status} */}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                </Stack>

                <Box mt={2} p={1.6} borderRadius={5} bgcolor={"#E8E8F3"}>
                  <Stack
                    mx={0.5}
                    direction="row"
                    justifyContent="space-between"
                    alignItems={"center"}
                  >
                    <Stack direction="row">
                      <Typography
                        mr={2}
                        variant="caption"
                        textTransform={"none"}
                        fontSize={14}
                        color="#202020"
                      >
                        @jacerodman
                      </Typography>
                      <LazyImageComponent src={Chat} />
                    </Stack>
                    <Typography
                      variant="caption"
                      textTransform={"none"}
                      fontSize={14}
                      color="#3063E9"
                    >
                      Confirm received
                    </Typography>
                    <Typography
                      variant="caption"
                      textTransform={"none"}
                      fontSize={14}
                      color="#202020"
                    >
                      $100.00
                    </Typography>
                  </Stack>
                </Box>

                <Box mt={2} p={1.6} borderRadius={5} bgcolor={"#E8E8F3"}>
                  <Stack
                    mx={0.5}
                    direction="row"
                    justifyContent="space-between"
                    alignItems={"center"}
                  >
                    <Stack direction="row">
                      <Typography
                        mr={2}
                        variant="caption"
                        textTransform={"none"}
                        fontSize={14}
                        color="#202020"
                      >
                        @tundeojigho
                      </Typography>
                      <LazyImageComponent src={Chat} />
                    </Stack>
                    <Stack direction="row">
                      <Typography
                        mr={1}
                        variant="caption"
                        textTransform={"none"}
                        fontSize={14}
                        color="#05A753"
                      >
                        Confirmed
                      </Typography>
                      <LazyImageComponent src={Confirmed} />
                    </Stack>
                    <Typography
                      variant="caption"
                      textTransform={"none"}
                      fontSize={14}
                      color="#202020"
                    >
                      $70.00
                    </Typography>
                  </Stack>
                </Box>

                <Stack mt={2} direction="row" justifyContent="space-between">
                  <Typography
                    variant="caption"
                    textTransform={"none"}
                    fontSize={14}
                    color="#202020"
                  >
                    Amount left in escrow
                  </Typography>

                  <Typography
                    variant="caption"
                    textTransform={"none"}
                    fontSize={14}
                    color="#3063E9"
                  >
                    $330.00
                  </Typography>
                </Stack>
                <Stack
                  mt={4}
                  direction="row"
                  justifyContent={isMobile ? " " : "flex-end"}
                >
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
                    <Button
                      onClick={escrowSubmit}
                      fullWidth={isMobile ? true : false}
                      variant="contained"
                      color="primary"
                    >
                      <Typography
                        variant="caption"
                        p={0.6}
                        textTransform={"none"}
                        fontSize={14}
                        color="background.light"
                      >
                        Withdraw from Escrow
                      </Typography>
                    </Button>
                  )}
                </Stack>
              </Box>
            </ListItem>
          </List>
        </>
      )}
    </React.Fragment>
  );
};

export default AvailableRewards;
