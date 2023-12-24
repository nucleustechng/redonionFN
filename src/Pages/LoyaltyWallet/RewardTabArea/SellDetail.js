import React, { useState, useEffect, useRef } from "react";
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
  Input,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import NGFlag from "../../../assets/NGFlag.svg";
import Back from "../../../assets/backArrow.svg";
import Chat from "../../../assets/chat.svg";
import Confirmed from "../../../assets/confirmed.svg";
import io from "socket.io-client";
import { LoadingButton } from "@mui/lab";

import Profile from "../../../assets/profile.svg";
import Send from "../../../assets/send.svg";

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
import timeFn from "../../../Utilities/date";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const SellDetail = (props) => {
  const [openRewardModal, setOpenRewardModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [secondStep, setSecondStep] = React.useState("");
  const [secondStepInfo, setSecondStepInfo] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [reason, setReason] = React.useState("");
  const [isloading, setIsLoading] = React.useState(false);
  const [nloading, setNLoading] = React.useState(false);
  const [transaz, setTransaz] = useState([]);

  const [stransaz, setSTransaz] = useState("");

  const [cryptoTransactionId, setcryptoTransactionId] = useState("");

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);

  const [openChat, setOpenChat] = useState(false);

  const [toId, setToId] = useState("");

  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const GET_CURRENCY_URL = "/transaction/confirm-receipt-of-payment";

  const GET_ESCROW_URL = "/transaction/withdraw-from-offer";

  const GET_BY_ID_URL = "/transaction/offer/";

  const GET_OFFER_URL = "/transaction/get-offers";

  // transaction/offer/2592e667-b3e3-4a8c-98d2-7dc7c905d162

  const chatClose = (data) => {};

  const [messageHistory, setMessageHistory] = useState([]);

  const [message, setMessage] = useState("");

  const [newMessage, setnewMessage] = useState("");

  const [room, setRoom] = useState("");

  const [chatSession, setChatSession] = useState("");

  const lastMessageRef = useRef(null);

  const socket = io("https://api.redonion.io", {
    extraHeaders: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const USER_CHAT_URL = "/chat/initiate-session";

  

  useEffect(() => {
    scrollToBottom();
    socket.on("received_message", (data) => {
      setMessageHistory((oldArray) => [...oldArray, data]);
    });

    setTransaz(props.selldetail);
    setSTransaz(props.stranz);
    setcryptoTransactionId(props.stranz?.cryptoTransactionId);

    axios
      .post(
        USER_CHAT_URL,
        JSON.stringify({
          toId: props?.stranz?.createdById,
          offerId: props?.stranz?.id,
        }),
        // formdata,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.data.chatSession);
        socket.on("connect", () => {
          console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        });
        setToId(res.data.data.chatSession?.toId);
        socket.emit("join_room", {
          //  from: "user?.u_id",
          toId: res.data.data.chatSession?.toId,
        });

        socket.on("joined_room", (e) => {
          console.log(e);
          setRoom(e);
        });

        socket.on("successfully_joined", (e) => {
          console.log(e);
          setRoom(e);
        });

        setChatSession(res.data.data.chatSession?.id);
        let data = res?.data?.data?.chatSession.chats;
        setMessageHistory(data.reverse());
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        } else {
          console.log(err?.response?.data.message);
        }
      })
      .finally(() => setLoading(false));
  }, [props, user]);

  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // console.log(toId);
      socket.emit("send_message", {
        //  from: user?.u_id,
        toId: toId,
        message: message,
        chatSessionId: chatSession,
      });
    }
    setMessage("");
  };

  const respond = (data) => {
    console.log(data);
    setNLoading(true);
    axios
      .post(
        GET_CURRENCY_URL,
        JSON.stringify({
          transactionId: data?.id,
          received: true,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.data.transaction.id);
        setSecondStep(res.data.data.transaction.id);
        setNLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Error processing request: " + err.message);

        setNLoading(false);
      });
  };

  const escrowSubmit = () => {
    console.log(stransaz);
    if (reason === "") return alert("Please fill all input");
    if (amount > stransaz?.amountInCrypto)
      return alert(
        "amount must be less than or equal to " + stransaz.amountInCrypto
      );

    setLoading(true);
    axios
      .post(
        GET_ESCROW_URL,
        JSON.stringify({
          amount: amount,
          offerId: stransaz?.id,
          reason: reason,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Error processing request: " + err.message);

        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Stack direction={openChat ? "row" : "column"}>
        <Box width={"100%"}>
          <>
            <Box mx={4}>
              <Typography
                color="background.dark"
                fontWeight={400}
                fontSize={14}
                mt={2}
                variant="body2"
              >
                Transaction ID:
                {cryptoTransactionId !== ""
                  ? " " + cryptoTransactionId.substr(0, 26) + "\u2026"
                  : ""}
              </Typography>
            </Box>

            <ListItem>
              <Box
                // borderWidth={1}
                // borderBottom={1}
                m={isMobile ? 2 : 3}
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
                            src={stransaz?.cryptoCurrency?.imgUri}
                          />
                          <Typography
                            color="secondary"
                            fontWeight={400}
                            fontSize={15}
                            mt={0.5}
                            variant="body2"
                          >
                            {stransaz?.cryptoCurrency?.abbreviation}
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
                            {stransaz?.amountInCrypto}
                          </Typography>

                          {/* <Typography
                        color="secondary"
                        fontWeight={600}
                        fontSize={16}
                        mt={2}
                        variant="body2"
                      >
                        Status
                      </Typography> */}
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
                          {stransaz?.currency?.currencyCode}
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
                            {(
                              stransaz?.amountInCrypto *
                              stransaz?.tokenPricePerUnit
                            ).toFixed(2)}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* <Stack direction="row" justifyContent="flex-end">
                    <Typography
                      color="primary"
                      fontWeight={600}
                      fontSize={16}
                      mt={2}
                      variant="body2"
                    >
                      paid
                      {stransaz?.status}
                    </Typography>
                  </Stack> */}
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </ListItem>
          </>

          {isloading ? (
            <center>
              <LoadingButton loading>Login</LoadingButton>
            </center>
          ) : (
            <>
              <>
                {transaz.length > 0 ? (
                  <>
                    <List>
                      {transaz.map((info, index) => (
                        <>
                          <ListItem>
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
                                          src={
                                            info?.offer?.cryptoCurrency?.imgUri
                                          }
                                        />
                                        <Typography
                                          color="secondary"
                                          fontWeight={400}
                                          fontSize={15}
                                          mt={0.5}
                                          variant="body2"
                                        >
                                          {
                                            info?.offer?.cryptoCurrency
                                              ?.abbreviation
                                          }
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
                                        {info?.offer?.currency?.currencyCode}
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
                                          {info?.amountInFiat.toFixed(2)}
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

                              <Box
                                mt={2}
                                p={1.6}
                                mb={2}
                                borderRadius={5}
                                bgcolor={"#E8E8F3"}
                              >
                                <Stack
                                  mx={0.5}
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems={"center"}
                                >
                                  <Stack direction="row">
                                    {/* <Typography
                                  mr={2}
                                  variant="caption"
                                  textTransform={"none"}
                                  fontSize={14}
                                  color="#202020"
                                >
                                  {info?.createdBy?.firstName + " "}
                                  {info?.createdBy?.lastName}
                                </Typography> */}
                                    <Box
                                      sx={{
                                        cursor: "pointer",
                                      }}
                                      onClick={() => setOpenChat(true)}
                                    >
                                      <LazyImageComponent src={Chat} />
                                    </Box>
                                  </Stack>
                                  {info?.sellerHasReceivedFiat ||
                                  secondStep === info?.id ? (
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
                                  ) : (
                                    <Box
                                      button
                                      onClick={() => respond(info)}
                                      sx={{ cursor: "pointer" }}
                                    >
                                      {nloading ? (
                                        <Box>
                                          <LoadingButton
                                            style={{
                                              height: 30,
                                              color: "#000",
                                              borderRadius: 10,
                                              fontSize: 12,
                                              textTransform: "none",
                                            }}
                                            nloading
                                          ></LoadingButton>
                                        </Box>
                                      ) : (
                                        <Typography
                                          variant="caption"
                                          textTransform={"none"}
                                          fontSize={14}
                                          color="#3063E9"
                                        >
                                          Confirm Receipt
                                        </Typography>
                                      )}
                                    </Box>
                                  )}

                                  <Typography
                                    variant="caption"
                                    textTransform={"none"}
                                    fontSize={14}
                                    color="#202020"
                                  >
                                    {parseFloat(info?.amountInFiat).toFixed(4)}
                                  </Typography>
                                </Stack>
                              </Box>
                            </Box>
                          </ListItem>
                        </>
                      ))}
                    </List>
                  </>
                ) : (
                  <Box height={200} p={4}>
                    <Box height={50}></Box>
                    <center>
                      <Typography
                        variant="caption"
                        textTransform={"none"}
                        fontSize={14}
                        color="background.dark"
                      >
                        You do not have any sell transactions details.
                      </Typography>
                    </center>
                  </Box>
                )}
              </>
              <Box mx={2}>
                <Stack mt={2} direction="row" justifyContent="space-between">
                  <Typography
                    variant="caption"
                    textTransform={"none"}
                    fontSize={14}
                    color="background.dark"
                  >
                    Total
                  </Typography>

                  <Typography
                    variant="caption"
                    textTransform={"none"}
                    fontSize={14}
                    color="background.dark"
                  >
                    {stransaz?.cryptoCurrency?.abbreviation}{" "}
                    {stransaz?.amountInCrypto}
                  </Typography>
                </Stack>
                {secondStepInfo ? (
                  <Box mt={4}>
                    <Typography
                      className={styles.nameFont}
                      variant="body2"
                      mb={1}
                    >
                      Amount
                    </Typography>
                    <Input
                      disableUnderline
                      className="inputField"
                      autoCapitalize="off"
                      type="text"
                      variant="outlined"
                      size="small"
                      placeholder={
                        "Amount between 0 and " + stransaz?.amountInCrypto
                      }
                      // value={userInfo?.firstName + " " + userInfo.lastName}
                      onChange={(e) => setAmount(e.target.value)}
                      fullWidth
                      color="secondary"
                    />
                    <Typography
                      className={styles.nameFont}
                      variant="body2"
                      mt={3}
                      mb={1}
                    >
                      Reason
                    </Typography>

                    <Input
                      disableUnderline
                      className="inputField"
                      type="text"
                      variant="outlined"
                      placeholder="Reason"
                      onChange={(e) => setReason(e.target.value)}
                      size="small"
                      fullWidth
                      color="secondary"
                    />

                    <Stack direction={"row"} mt={5}>
                      <Box mr={4}>
                        <Button
                          onClick={() => setSecondStepInfo(false)}
                          style={{
                            height: 60,
                            width: "120px",
                            borderRadius: 10,
                            fontSize: 20,
                            textTransform: "none",
                          }}
                          variant="outlined"
                          color="primary"
                        >
                          Close
                        </Button>
                      </Box>
                      {loading ? (
                        <LoadingButton loading variant="outlined">
                          Login
                        </LoadingButton>
                      ) : (
                        <>
                          <Button
                            fullWidth
                            onClick={() => escrowSubmit()}
                            style={{
                              height: 60,
                              borderRadius: 10,
                              fontSize: 20,
                              textTransform: "none",
                            }}
                            variant="contained"
                            color="primary"
                          >
                            Withdraw
                          </Button>
                        </>
                      )}
                    </Stack>
                  </Box>
                ) : (
                  <Stack
                    mt={4}
                    direction="row"
                    justifyContent={isMobile ? " " : "flex-end"}
                  >
                    <Button
                      onClick={() => setSecondStepInfo(true)}
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
                  </Stack>
                )}
              </Box>
            </>
          )}
        </Box>
        {openChat && (
          <>
            <Box
              className={
                !isMobile ? styles.modalStyleA : styles.modalStyleMobile
              }
            >
              <Box bgcolor={theme.palette.background.paper}>
                <Box py={4} px={4}>
                  <>
                    <Stack
                      direction="row"
                      alignItems={"center"}
                      justifyContent="center"
                      spacing={"8px"}
                      px={4}
                      py={1}
                      borderBottom={0.1}
                      borderColor={"#11111150"}
                    >
                      <Box
                        mt={1}
                        sx={{ cursor: "pointer" }}
                        onClick={() => setOpenChat(false)}
                      >
                        <LazyImageComponent src={Back} />
                      </Box>
                      <Typography
                        variant="caption"
                        fontSize={18}
                        fontWeight={500}
                        color="primary"
                      >
                        Buyer
                      </Typography>
                    </Stack>
                    <Box
                      style={{ overflowY: "scroll" }}
                      mb={1}
                      height={600}
                      fullWidth
                    >
                      {messageHistory.map((message, index) =>
                        message.toId !== toId ? (
                          <Stack
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"flex-end"}
                          >
                            <Box
                              // width={350}
                              p={1}
                              mb={2}
                              bgcolor={"#F6F0F8"}
                              borderRadius={3}
                            >
                              <Box>
                                <Typography
                                  color={"#000"}
                                  textAlign={"left"}
                                  // variant="caption"
                                  fontSize={14}
                                  fontWeight={400}
                                >
                                  Me
                                </Typography>
                              </Box>
                              <Typography
                                color={"#000"}
                                textAlign={"left"}
                                // variant="caption"
                                fontSize={14}
                                fontWeight={400}
                              >
                                {message.message}
                              </Typography>
                              <Box mt={1.5}>
                                <Typography
                                  color={"#000"}
                                  textAlign={"right"}
                                  // variant="caption"
                                  fontSize={14}
                                  fontWeight={400}
                                >
                                  {timeFn(message.createdAt)}
                                </Typography>
                              </Box>
                            </Box>
                          </Stack>
                        ) : (
                          <Box
                            // width={350}
                            // height={80}
                            // py={1.4}
                            // px={1.5}
                            p={1}
                            mb={2}
                            bgcolor={"#3063E9"}
                            borderRadius={3}
                          >
                            {/* <Box>
                              <Typography
                                color={"#fff"}
                                textAlign={"left"}
                                // variant="caption"
                                fontSize={14}
                                fontWeight={400}
                              >
                                @jacerodman
                              </Typography>
                            </Box> */}
                            <Typography
                              color={"#fff"}
                              textAlign={"left"}
                              // variant="caption"
                              fontSize={14}
                              fontWeight={400}
                            >
                              {message.message}
                            </Typography>
                            <Box mt={0.2}>
                              <Typography
                                color={"#fff"}
                                textAlign={"right"}
                                // variant="caption"
                                fontSize={12}
                                fontWeight={400}
                              >
                                {timeFn(message.createdAt)}
                              </Typography>
                            </Box>
                          </Box>
                        )
                      )}
                      <Box ref={lastMessageRef} />
                    </Box>

                    <Box
                      border={1}
                      borderColor={"#A4ACAF"}
                      borderRadius={1.5}
                      px={1.8}
                      py={1}
                    >
                      <form onSubmit={handleSendMessage}>
                        <Stack
                          direction="row"
                          alignItems={"center"}
                          justifyItems={"center"}
                        >
                          <Input
                            fullWidth
                            name="payInput"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write  "
                            disableUnderline
                          />
                          <Box
                            style={{ cursor: "pointer" }}
                            button
                            onClick={handleSendMessage}
                          >
                            <LazyImageComponent src={Send} />
                          </Box>
                        </Stack>
                      </form>
                    </Box>
                  </>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Stack>
    </React.Fragment>
  );
};

export default SellDetail;