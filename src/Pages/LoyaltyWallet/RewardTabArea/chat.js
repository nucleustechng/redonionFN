import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState,useRef, useMemo } from "react";
import { Alert, Box, Button, Input, Slide, Snackbar, Stack, SwipeableDrawer, useMediaQuery } from "@mui/material";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Send from "../../../assets/send.svg";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Back from "../../../assets/backArrow.svg";
import io from "socket.io-client";
import ListItemButton from '@mui/material/ListItemButton';
import { styled, useTheme } from '@mui/material/styles';
import NewRateModal from "./NewRateModal";
import ViewRateModal from "./ViewRateModal";
import timeFn from "../../../Utilities/date";

const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);


const useStyles = {
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  },
  hoverListItem: {
    '&:hover': {
      backgroundColor: '#3063E9',
      color: '#ffffff',
    },
  },
  activeListItem: {
    backgroundColor: '#3063E9',
    color: '#ffffff',
  },
};


const ChatHistory =() => {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = React.useState(false);
  const [thirdStep, setThirdStep] = React.useState(2);
  const [chats, setChats] = useState("");

  const [chat, setChat] = useState("");
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openChat, setOpenChat] = useState(false);

  const [toId, setToId] = useState("");

  const [sellerId, setSellerId] = useState("");
  const [createdById, setCreatedById] = useState("");


  const [messageHistory, setMessageHistory] = useState([]);

  const [message, setMessage] = useState("");
  
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [showSnackbar, setShowSnackbar] = useState(false);

  const [failedText, setFailedText] = useState("");

  const [room, setRoom] = useState("");

  const [openNewRateModal, setOpenNewRateModal] = useState(false);

  const [openViewRateModal, setOpenViewRateModal] = useState(false);

  const[pricePerUnit , setPricePerUnit] = useState("");

  const [name, setName] = useState("");

  const [newRate, setNewRate] = useState("");

  const [tokenAmount, setTokenAmount] = useState("");


  const [chatSession, setChatSession] = useState("");


  const [isOnline, setIsOnline] = useState(navigator.onLine);


  const lastMessageRef = useRef(null);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleOpenNewRateModal = () => {
    setOpenNewRateModal(!openNewRateModal);
  };

  const handleOpenViewRateModal = () => {
    setOpenViewRateModal(!openViewRateModal);
  };

  const socket = useMemo(() => {
    return io("https://api.redonion.io", {
      extraHeaders: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }, [user.token]);


  const GET_ALLCHAT_URL = "/chat/get-all-users-in-chat-history";
  const GET_ONECHAT_URL = "/chat/get-chat-history";

  useEffect(() => {
    // Update network status
     const handleStatusChange = () => {
       setIsOnline(navigator.onLine);
     };
 
     // Listen to the online status
     window.addEventListener("online", handleStatusChange);
 
     // Listen to the offline status
     window.addEventListener("offline", handleStatusChange);
 
     // Specify how to clean up after this effect for performance improvment
     return () => {
       window.removeEventListener("online", handleStatusChange);
       window.removeEventListener("offline", handleStatusChange);
     };
   }, [isOnline]);


  useEffect(() => {
    console.log('User Token:', user.token);
    setIsLoading(true);
    axios
      .get(
        GET_ALLCHAT_URL,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.chatSessions)
        if(res.data.success === false){
          setShowSnackbar(true)
          setFailedText(res.data.msg)
        }
        setIsLoading(false);
        setChats(res.data.data.chatSessions.reverse());
      })
      .catch((err) => {
        console.log("did not work", err)
        
        if (err?.response?.status === 401) {
          navigate("/dashboard/transactions");
        }
      })
      .finally(() => {});
      return () => {
        socket.close();
      };
  }, [user, navigate, socket]);


  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.connected); 
    });

    socket.on("joined_room", (e) => {
      console.log(e);
      setRoom(e);
    });

    socket.on("received_message", (data) => {
      console.log(data);
      setMessageHistory((oldArray) => [...oldArray, data]);
      scrollToBottom();
    });

    return () => {
      socket.close();
      socket.off("joined_room");
      socket.off("received_message");
    };

  }, [socket])

 

  const handleOpenChat = (chat, index) => {
    console.log("ids", chat.chattingWith)
    setName(chat.chattingWith.firstName)
    setChat(chat);
    const skip = 0; 
    const take = 10;
    setOpenChat(true);
    const chatSessionId = chat.chatSession.id;
    setChatSession(chatSessionId)
    setSelectedIndex(index);

    axios 
    .get(`${GET_ONECHAT_URL}?skip=${skip}&take=${take}&chatSessionId=${chatSessionId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      console.log("this is one chat", res.data.data.chatSession)
      setIsLoading(false);
      setChat(res.data.data.messages);
      setPricePerUnit(res.data.data.chatSession.offer.tokenPricePerUnit)
      setTokenAmount(res.data.data.chatSession.proposedAmount)
      setNewRate(res.data.data.chatSession.proposedTokenPricePerUnit)
      setSellerId(res.data.data.chatSession.toId);
      setCreatedById(user.user.id)
      setMessageHistory(res.data.data.messages.reverse())
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        navigate("/user/sign-in");
      }
    })
    
    setToId(chat.chattingWith.id);
    

    scrollToBottom();
    socket.emit("join_room", {
      toId: toId,
    });

    return () => {
      socket.close();
    };

  }



  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("send_message", {
        toId: toId,
        message: message,
        chatSessionId: chatSession,
      });
      scrollToBottom();
    }
    setMessage("");
    return () => {
      socket.close();
    };

  };
 


  return (
    <React.Fragment>
      {isloading ? (
        <center>
          <LoadingButton loading>Login</LoadingButton>
        </center>
      ) : (
        <>
        {!isMobile && !isTablet ?
        <>
          <Grid alignItems="center" justifyContent="space-between" pt={2} gap={3} display="flex"  xs={12} >
            <Grid alignItems="center"  gap={3} display="flex" md={3}   >
              <Box
                mt={1}
                sx={{ cursor: "pointer" }}
                onClick={() => setOpenChat(false)}
              >
                <LazyImageComponent src={Back} />
              </Box>
              <Typography fontSize="22px" color="primary" className="header-message">Buyer</Typography>
            </Grid>
          </Grid>
          {thirdStep === 2 && (
            <Grid  display="flex" alignItems="start" > 
              <Grid  xs={8} md={6} >
                {chats.length > 0 ? (
                  <>
                    <Grid item  width="100%" xs={12} style={{padding: '10px'}}>     
                      {chats.slice(0, 8).map((chat, index) => (
                          <Box  className={useStyles.borderRight500}>
                            <List>
                              <ListItemButton  
                                key={index} 
                                selected={selectedIndex === index}
                                onClick={() => handleOpenChat(chat, index)} 
                                sx={{
                                  '&:hover': {
                                    backgroundColor: '#3063E9',
                                    color: '#ffffff',
                                  },
                                  '&.Mui-selected': {
                                    backgroundColor: '#3063E9',
                                    color: '#ffffff',
                                  },
                                }} 
                              >
                                <ListItemIcon >
                                  <Typography 
                                    backgroundColor="#C0C0C0"  color="#3063E9" borderRadius='50%'  px="5px" py="6px"
                                  >
                                    {`${chat.chattingWith.firstName.charAt(0)} ${chat.chattingWith.lastName.charAt(0)}`}
                                  </Typography>
                                </ListItemIcon>
                                <ListItemText primary={`${chat.chattingWith.firstName} ${chat.chattingWith.lastName}`}></ListItemText>
                                {/* <ListItemText 
                                 align="right"
                                >
                                  <Typography 
                                  >
                                    online
                                  </Typography>
                                </ListItemText> */}
                              </ListItemButton>
                            </List>
                            <Divider />
                              
                          </Box>
                      ))}
                    </Grid>
                  </> 
                ): (
                  <Box></Box>
                )}
              </Grid>
              {openChat ? 
                <Grid  xs={4} md={8} >
                  <Box bgcolor={theme.palette.background.paper}>
                    <Box 
                      display="flex" 
                      justifyContent="space-between" 
                      alignItems={{xs:"start", md:"start", lg:"center"}}
                      gap={1}
                      backgroundColor="rgba(0, 0, 0, 0.1)"
                      sx={{
                        backdropFilter: "blur(20px)",
                      }}
                      px={4} py={3}
                    >
                      <Box 
                        display="flex" 
                        flexDirection={{ md:"column", lg:"row"}}
                        justifyContent="space-between" alignItems={{ md:"start", lg:"center"}}
                        color={theme.palette.mode === 'dark' ? '#ffff' : 'black'}
                      >
                        <Typography
                          fontSize={{ md:"14px", lg:"16px"}}
                          pr={1} pb={{ md:"5px", lg:"0"}}
                          fontWeight={500}
                        >
                          Current rate 
                        </Typography>
                        <Box
                          display="flex" 
                          flexDirection={{ md:"row", lg:"row"}}
                          justifyContent="space-between" alignItems={{ md:"center", lg:"center"}}
                        >
                          <Typography
                            fontSize="14px"
                            pr={1}
                            fontWeight={400}
                          >
                            1 BNB =  
                          </Typography>
                          <Typography
                            fontSize="12px"
                            fontWeight={400}
                          >
                            NGN  {pricePerUnit}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        {createdById === sellerId ? 
                          <Typography
                            color="#3063E9"
                            fontSize={{xs:"12px", md:"14px", lg:"16px"}}
                            fontWeight={500}
                            button
                            sx={{ cursor: "pointer" }}
                            onClick={() => setOpenNewRateModal(true)}
                          >
                            Set new term
                          </Typography> 
                          :
                          <Typography
                            color="#3063E9"
                            fontSize={{xs:"12px", md:"14px", lg:"16px"}}
                            fontWeight={500}
                            button
                            sx={{ cursor: "pointer" }}
                            onClick={() => setOpenViewRateModal(true)}
                          >
                            Review New Terms
                          </Typography> 
                        }
                      </Box>
                    </Box>
                    <Box pb={2} px={4}>
                      <>
                        <Box
                          style={{ overflowY: "scroll" }}
                          mb={1}
                          height="50vh"
                          fullWidth
                        >
                          {messageHistory.map((message, index) =>
                            message.id !== toId ? (
                              <Stack
                                direction={"column"}
                                justifyContent={"center"}
                                alignItems={"flex-end"}
                              >
                                <Box
                                  maxWidth={350}
                                  py="3px" px="8px"
                                  mr={2}
                                  mb={2}
                                  bgcolor={"#F6F0F8"}
                                  borderRadius={3} 
                                >
                                  <Box>
                                    <Typography
                                      color={"#000"}
                                      textAlign={"left"}
                                      // variant="caption"
                                      fontSize={12}
                                      fontWeight={300}
                                    >
                                      Me
                                    </Typography>
                                  </Box>
                                  <Typography
                                    color={"#000"}
                                    textAlign={"left"}
                                    // variant="caption"
                                    pr={3}
                                    fontSize={14}
                                    fontWeight={400}
                                  >
                                    {message.message}
                                  </Typography>
                                  <Box mt="1px">
                                    <Typography
                                      color={"#000"}
                                      textAlign={"right"}
                                      // variant="caption"
                                      fontSize={11}
                                      fontWeight={300}
                                    >
                                      {timeFn(message.createdAt)}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Stack>
                            ) : (
                              <Box
                                width={350}
                                py="3px" px="8px"
                                ml={2}
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
                                  pl={3}
                                  fontWeight={400}
                                >
                                  {message.message}
                                </Typography>
                                <Box mt="1px">
                                  <Typography
                                    color={"#fff"}
                                    textAlign={"right"}
                                    // variant="caption"
                                    fontSize={10}
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
                                placeholder="Write a message "
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
                </Grid>
                :
                <Grid xs={12}></Grid>
              }
            </Grid>
          )}
        </>
        :
        <Box >
          <React.Fragment >
            {openChat ? 
              <Grid xs={12}  >
                <Grid alignItems="center"  gap={3} display="flex" mt={1} 
                  onClick={() => setOpenChat(false)}   >
                  <Box
                    mt={1}
                    sx={{ cursor: "pointer" }}
                  >
                    <LazyImageComponent src={Back} />
                  </Box>
                  <Typography fontSize="18px" color="primary" className="header-message">{name}</Typography>
                </Grid>
                <Box bgcolor={theme.palette.background.paper} mx={1} pb={4}>
                  <Box 
                    display="flex" 
                    justifyContent="space-between" 
                    alignItems="start"
                    alignContent="start"
                    gap="2px"
                    backgroundColor="rgba(0, 0, 0, 0.1)"
                    sx={{
                      backdropFilter: "blur(20px)",
                    }}
                    px={2} py={1}
                  >
                    <Box 
                      display="flex" 
                      flexDirection={{xs:"column", sm:"column"}}
                      justifyContent="space-between" alignItems={{xs:"start", sm:"start"}}
                      color={theme.palette.mode === 'dark' ? '#ffff' : 'black'}
                    >
                      <Typography
                        fontSize={{xs:"14px", md:"14px", lg:"16px"}}
                        pr={1} pb={{xs:"5px", md:"0", lg:"0"}}
                        fontWeight={500}
                      >
                        Current rate 
                      </Typography>
                      <Box
                        display="flex" 
                        flexDirection="row"
                        justifyContent="space-between" alignItems="center"
                      >
                        <Typography
                          fontSize="14px"
                          pr={1}
                          fontWeight={400}
                        >
                          1 BNB =  
                        </Typography>
                        <Typography
                          fontSize="12px"
                          fontWeight={400}
                        >
                          NGN  {pricePerUnit}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      {createdById === sellerId ? 
                        <Typography
                          color="#3063E9"
                          fontSize={{xs:"14px", md:"16px"}}
                          fontWeight={500}
                          button
                          sx={{ cursor: "pointer" }}
                          onClick={() => setOpenNewRateModal(true)}
                        >
                          Set new term
                        </Typography> 
                        :
                        <Typography
                          color="#3063E9"
                          fontSize={{xs:"14px", md:"16px"}}
                          fontWeight={500}
                          button
                          sx={{ cursor: "pointer" }}
                          onClick={() => setOpenViewRateModal(true)}
                        >
                           Review New Terms
                        </Typography> 
                      }
                    </Box>
                  </Box>
                  <Box
                    style={{ overflowY: "scroll" }}
                    mb={1}
                    height="50vh"
                    fullWidth
                  >
                    {messageHistory.map((message, index) =>
                      message.id !== toId ? (
                        <Stack
                          key={index}
                          direction={"column"}
                          justifyContent={"center"}
                          alignItems={"flex-end"}
                        >
                          <Box
                            maxWidth={300}
                            py="2px" px={2}
                            mb={2} mr="2px"
                            bgcolor={"#F6F0F8"}
                            borderRadius={3}
                          >
                            <Box>
                              <Typography
                                color={"#000"}
                                textAlign={"left"}
                                // variant="caption"
                                fontSize={10}
                                fontWeight={300}
                              >
                                Me
                              </Typography>
                            </Box>
                            <Typography
                              color={"#000"}
                              textAlign={"left"}
                              pr={2}
                              // variant="caption"
                              fontSize={14}
                              fontWeight={400}
                            >
                              {message.message}
                            </Typography>
                            <Box mt="1px">
                              <Typography
                                color={"#000"}
                                textAlign={"right"}
                                // variant="caption"
                                fontSize={10}
                                fontWeight={300}
                              >
                                {timeFn(message.createdAt)}
                              </Typography>
                            </Box>
                          </Box>
                        </Stack>
                      ) : (
                        <Box
                          maxWidth={220}
                          pb="2px" pt={1} px={2}
                          mb={2} ml="2px"
                          bgcolor={"#3063E9"}
                          borderRadius={3}
                        >
                          <Typography
                            color={"#fff"}
                            textAlign={"left"}
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
                    px="8px"
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
                          name="input"
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Write a message "
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
                </Box>
              </Grid>
              :
              <Grid xs={12} >
                {chats.length > 0 ? (
                  <Grid item  style={{padding: '10px'}}>     
                      {chats.map((chat, index) => (
                          <Box  
                            fullWidth
                          >
                            <List key={index}>
                              <ListItemButton  
                                key={index} 
                                selected={selectedIndex === index}
                                onClick={() => handleOpenChat(chat, index)} 
                                sx={{
                                  '&:hover': {
                                    backgroundColor: '#3063E9',
                                    color: '#ffffff',
                                  },
                                  '&.Mui-selected': {
                                    backgroundColor: '#3063E9',
                                    color: '#ffffff',
                                  },
                                }} 
                              >
                                <ListItemIcon >
                                  <Typography 
                                    backgroundColor="#C0C0C0"  color="#3063E9" borderRadius='50%'  px="4px" py="6px"
                                  >
                                    {`${chat.chattingWith.firstName.charAt(0)} ${chat.chattingWith.lastName.charAt(0)}`}
                                  </Typography>
                                </ListItemIcon>
                                <ListItemText primary={`${chat.chattingWith.firstName} ${chat.chattingWith.lastName}`}></ListItemText>
                              </ListItemButton>
                            </List>
                          </Box>
                      ))}
                  </Grid>
                ): 
                (
                  <Box></Box>
                )}
              </Grid>
            }             
          </React.Fragment>
        </Box>  
        }
        </>
      )}

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Slide} 
        open={showSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
        >
          {failedText}
        </Alert>
      </Snackbar>

      <NewRateModal
        open={openNewRateModal}
        handleClose={handleOpenNewRateModal}
        chatSession={chatSession}
      />

      <ViewRateModal
        open={openViewRateModal}
        handleClose={handleOpenViewRateModal}
        newRate={newRate}
        pricePerUnit={pricePerUnit}
        tokenAmount={tokenAmount}
        chatSessionId={chatSession}
      />
    </React.Fragment>
  );
};

export default ChatHistory;

