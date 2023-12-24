import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Divider,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  Input,
  Button,
  Snackbar,
  IconButton,
  Alert,
  FormControl,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";

import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
// Styles
import styles from "./CreateBuyRequestModal.module.css";
import { ReactPinField } from "react-pin-field";
import CloseIcon from "@mui/icons-material/Close";
import io from "socket.io-client";
import { LoadingButton } from "@mui/lab";
import moment from "moment";

import { useLocation, useNavigate } from "react-router-dom";

// Axios
import axios from "../../../api/axios";

import Send from "../../../assets/send.svg";
import SellRequest from "../../../assets/sellRequest.svg";

import Back from "../../../assets/backArrow.svg";
import ExchanageIcon from "../../../assets/exchangeBlue.svg";
import FrontArrow from "../../../assets/frontArrow.svg";
import Profile from "../../../assets/profile.svg";
import timeFn from "../../../Utilities/date";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const ChatModal = ({ open, onClose, dataSingle, datao, props }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);

  const [payTextField, setPayTextField] = useState("");

  const [payAddress, setPayAddress] = useState("");

  const [msg, setMsg] = useState("");

  const [firstModalA, setFirstModalA] = useState(0);

  // Send Snackbar
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);

  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };

  const [messageHistory, setMessageHistory] = useState([]);

  const [message, setMessage] = useState("");

  const [newMessage, setnewMessage] = useState("");

  const [room, setRoom] = useState("");
  const [toId, setToId] = useState("");


  const [chatSession, setChatSession] = useState("");

  const lastMessageRef = useRef(null);

  var user = JSON.parse(localStorage.getItem("user"));

  const USER_CHAT_URL = "/chat/initiate-session";

 
  const socket = io("https://api.redonion.io", {
    extraHeaders: {
      Authorization: `Bearer ${user.token}`,
    },
  });


  useEffect(() => {
    setMessageHistory([]);
  }, [open]);


  useEffect(() => {
    // console.log(dataSingle)
    axios
    .post(
      USER_CHAT_URL,
      JSON.stringify({
        toId: dataSingle.createdById,
        offerId: dataSingle.id,
      }),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
    .then((res) => {
      socket.on("connect", () => {
        console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      });
      setToId(res.data.data.chatSession?.toId);
      socket.emit("join_room", {
        toId: res.data.data.chatSession?.toId,
      });

      socket.on("joined_room", (e) => {
        console.log(e);
        setRoom(e);
      });

      socket.on("received_message", (data) => {
        console.log("received_message");
        setMessageHistory((oldArray) => [...oldArray, data]);
      });

      setChatSession(res.data.data.chatSession?.id);
      let data = res?.data?.data?.chatSession.chats;
      // setMessageHistory(data);
      
    })
    .catch((err) => {
      console.log(err?.response?.data.message);
    })
    .finally(() => {
      setLoading(false);
      socket.close();
    });
  }, [socket, dataSingle, user])


    const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
        socket.emit("send_message", {
        toId: toId,
        message: message,
        chatSessionId: chatSession,
      });

      const updatedMessage = {
        from: user?.user.id,
        message: message,
      };
      setMessageHistory((oldArray) => [...oldArray, updatedMessage]);
      setMessage("");
    }
  };

  const USER_SUBMIT_URL = "/transaction/respond-to-offer";

  const handleSubmit = () => {
    setLoading(true);

    console.log(dataSingle?.id);

    axios
      .post(
        USER_SUBMIT_URL,
        JSON.stringify({
          amountInCrypto: parseFloat(payTextField),
          buyerWalletAddress: payAddress,
          offerId: dataSingle?.id,
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
        console.log(res.data.msg);
        if (res.data.data === null) {
          setMsg(res.data.msg);
          setShowSendSuccessfullSnackbar(true);
        } else {
          setFirstModalA(2);
        }
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        } else {
          console.log(err?.response?.data.message);
          setMsg(err?.response?.data.message);
          setShowSendSuccessfullSnackbar(true);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      disableAutoFocus
      disableEscapeKeyDown
      keepMounted
      open={open}
      onClose={(_, reason) => {
        // if (reason !== "backdropClick") {
        onClose();
        // }
      }}
    >
      <Box className={!isMobile ? styles.modalStyle : styles.modalStyleMobile}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={showSendSuccessfullSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSendSnackbar}
        >
          <Alert
            action={
              <IconButton onClick={handleCloseSendSnackbar} sx={{ mt: -0.5 }}>
                <Close sx={{ fontSize: "1.5rem" }} />
              </IconButton>
            }
            icon={<CheckCircleOutline sx={{ fontSize: "1.5rem" }} />}
            sx={{ fontSize: "1rem" }}
            onClose={handleCloseSendSnackbar}
            severity="error"
          >
            {msg}
          </Alert>
        </Snackbar>
        <Box
          bgcolor={theme.palette.background.paper}
          className={styles.modalContentBox}
        >
          <Box py={4} px={4}>
            <>
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
                spacing={"8px"}
                px={4}
                py={1}
                borderBottom={0.1}
                borderColor={"#11111150"}
              >
                <Box>
                  <Stack
                    direction="row"
                    alignItems={"start"}
                    justifyContent="start"
                    // spacing={"8px"}
                    ml={-4}
                    // py={1}
                  >
                    <Box
                      mt={1}
                      mr={2}
                      sx={{ cursor: "pointer" }}
                      onClick={onClose}
                    >
                      <LazyImageComponent src={Back} />
                    </Box>
                    <Typography
                      variant="caption"
                      fontSize={18}
                      fontWeight={500}
                      mt={1}
                      color="primary"
                    >
                      Seller
                    </Typography>
                  </Stack>
                </Box>
                <Typography
                  variant="caption"
                  fontSize={14}
                  fontWeight={300}
                  color="primary"
                >
                  Negotiate Rate
                </Typography>
              </Stack>
              <Box mt={2} height={600} fullWidth>
                {messageHistory.map((message, index) => (
                  <React.Fragment key={index}>
                    {message.toId !== toId ? (
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-end"
                      >
                        <Box
                          width={350}
                          py={1.4}
                          px={1.5}
                          my={2}
                          bgcolor="#F6F0F8"
                          borderRadius={3} key={index}
                        >
                          <Box>
                            <Typography
                              color="#000"
                              textAlign="left"
                              fontSize={14}
                              fontWeight={400}
                            >
                              Me
                            </Typography>
                          </Box>
                          <Typography
                            color="#000"
                            textAlign="left"
                            fontSize={14}
                            fontWeight={400}
                          >
                            {message.message}
                          </Typography>
                          <Box mt={1.5}>
                            <Typography
                              color="#000"
                              textAlign="right"
                              fontSize={14}
                              fontWeight={400}
                            >
                              {timeFn(message.created_on)} 
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    ) : (
                      <Stack direction="column" justifyContent="center" alignItems="flex-start">
                        <Box
                          width={350}
                          py={1.4}
                          px={1.5} key={index}
                          bgcolor="#3063E9"
                          borderRadius={3}
                        >
                          <Box>
                            {/* <Typography
                              color="#fff"
                              textAlign="left"
                              fontSize={14}
                              fontWeight={400}
                            >
                              @jacerodman
                            </Typography> */}
                          </Box>
                          <Typography
                            color="#fff"
                            textAlign="left"
                            fontSize={14}
                            fontWeight={400}
                          >
                            {message.message}
                          </Typography>
                          <Box mt={1.5}>
                            <Typography
                              color="#fff"
                              textAlign="right"
                              fontSize={14}
                              fontWeight={400}
                            >
                              {moment(message.created_on).format("HH:mm")}
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    )}
                  </React.Fragment>
                ))}
              </Box>
              <Box
                border={1}
                borderColor={"#A4ACAF"}
                borderRadius={1.5}
                px={1.8} fullWidth
                py={1}
              >
                <form onSubmit={handleSendMessage}>
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Input
                      fullWidth
                      value={message}
                      type="text"
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write a message"
                      disableUnderline
                    />
                    <button type="submit" onClick={handleSendMessage}>
                      <LazyImageComponent src={Send} />
                    </button>
                  </Stack>
                </form>
              </Box>
            </>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChatModal;
