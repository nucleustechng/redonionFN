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
  Input,
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

const SellDetail = (props) => {
  const [openRewardModal, setOpenRewardModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [secondStep, setSecondStep] = React.useState(false);
  const [secondStepInfo, setSecondStepInfo] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [reason, setReason] = React.useState("");
  const [isloading, setIsLoading] = React.useState(false);
  const [transaz, setTransaz] = useState([]);

  const [stransaz, setSTransaz] = useState("");

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const GET_CURRENCY_URL = "/transaction/confirm-receipt-of-payment";

  const GET_ESCROW_URL = "/transaction/withdraw-from-offer";

  const GET_BY_ID_URL = "/transaction/offer/";

  const GET_OFFER_URL = "/transaction/get-offers";

  // transaction/offer/2592e667-b3e3-4a8c-98d2-7dc7c905d162

  const respond = (data) => {
    console.log(data);
    setIsLoading(true);
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
        console.log(res);
        setSecondStep(res.data.success);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Error processing request: " + err.message);

        setIsLoading(false);
      });
  };

  const escrowSubmit = () => {
     if (reason === "" )
       return alert("Please fill all input");
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

  useEffect(() => {
    console.log(props.stranz);
    setTransaz(props.selldetail);
    setSTransaz(props.stranz);
    //  setIsLoading(true);
  }, [user, props]);

  return (
    <React.Fragment>
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
                                    <Box>
                                      <Typography
                                        fontSize={18}
                                        fontWeight={600}
                                        mt={0.4}
                                        color="secondary"
                                        variant="body2"
                                      >
                                        {info?.amountInCrypto}
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
                                ></Stack>
                                <Stack
                                  direction="row"
                                  justifyContent="flex-end"
                                >
                                  <Box>
                                    <Typography
                                      fontSize={18}
                                      fontWeight={600}
                                      mt={0.4}
                                      color="secondary"
                                      variant="body2"
                                    >
                                      {info?.amountInCrypto *
                                        info?.tokenPricePerUnit}
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
                                    {info?.status}
                                  </Typography>
                                </Stack>
                              </Box>
                            </Box>
                          </Stack>

                          <Box
                            mt={2}
                            p={1.6}
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
                                <Typography
                                  mr={2}
                                  variant="caption"
                                  textTransform={"none"}
                                  fontSize={14}
                                  color="#202020"
                                >
                                  {info?.createdBy?.firstName + " "}
                                  {info?.createdBy?.lastName}
                                </Typography>
                                <LazyImageComponent src={Chat} />
                              </Stack>
                              {secondStep ? (
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
                                  {isloading ? (
                                    <Box>
                                      <LoadingButton
                                        style={{
                                          height: 30,
                                          color: "black",
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
                                    <Typography
                                      variant="caption"
                                      textTransform={"none"}
                                      fontSize={14}
                                      color="#3063E9"
                                    >
                                      Confirm Received
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
                                {info?.amountInCrypto * info?.tokenPricePerUnit}
                              </Typography>
                            </Stack>
                          </Box>
                        </Box>
                      </ListItem>
                    </>
                  ))}
                </List>

                <Box>
                  {/* <Stack mt={2} direction="row" justifyContent="space-between">
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
                  </Stack> */}
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
                    You do not have any sell transactions details.
                  </Typography>
                </center>
              </Box>
            )}
          </>
        </>
      )}
    </React.Fragment>
  );
};

export default SellDetail;
