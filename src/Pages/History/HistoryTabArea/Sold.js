import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  Paper,
  List,
} from "@mui/material";
import moment from "moment";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";

// Image

import BitCoinIcon from "../../../assets/bitCoinIcon.svg";
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
import { LoadingButton } from "@mui/lab";

// Lazy Image Component
const LazyImageComponent = React.lazy((props) =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const AvailableRewards = (props) => {
  const [openRewardModal, setOpenRewardModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [tranz, setTransaz] = useState([]);
  const [isloading, setLoading] = React.useState(false);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const GET_CURRENCY_URL = "/transaction/my-offers";

  const onTrigger = (event) => {
    // Call the parent callback function
    props.parentCallback(event);
  };

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
        //  console.log(res.data.data.offers);
        setTransaz(res.data.data.offers);
      })
      .catch((err) => {
        setLoading(false);
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
        <Box style={{ maxHeight: "100%", overflow: "auto" }}>
          {tranz.length > 0 ? (
            <List>
              {" "}
              {tranz.map((info) => (
                <>
                  <ListItem
                    sx={{ cursor: "pointer" }}
                    onClick={() => onTrigger(info)}
                  >
                    <Box m={6} width={"100%"}>
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
                                  fontWeight={400}
                                  fontSize={12}
                                  mt={0.8}
                                  variant="body2"
                                >
                                  {moment(info?.createdAt).format(
                                    "Do MMMM YYYY"
                                  )}
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
                          {/* <Stack mt={2} ml={-1} direction="row">
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
                                    
                              <Stack
                                justifyContent={"center"}
                                alignItems={"left"}
                              >
                                <Typography
                                  color="secondary"
                                  fontWeight={400}
                                  fontSize={16}
                                  mt={0.8}
                                  ml={1}
                                  variant="body2"
                                >
                                  {info?.offer?.currency?.currencyCode}
                                </Typography>
                                </Stack>

                                <Stack alignItems={"left"}>
                                <Box
                                  sx={{
                                    borderBottom: 1,
                                    borderBottomStyle: "dashed",
                                  }}
                                >
                                  <Typography
                                    fontSize={20}
                                    mt={0.4}
                                    color="secondary"
                                    variant="body2"
                                  >
                                      {(info?.amountInCrypto).toFixed(6)}
                                  
                                  </Typography>
                                </Box>
                                </Stack>

                                <Typography
                                  color="secondary"
                                  fontWeight={400}
                                  fontSize={12}
                                  mt={0.8}
                                  variant="body2"
                                >
                                  {moment(info?.createdAt).format(
                                    "Do MMMM YYYY"
                                  )}
                                </Typography>

                                <Typography
                                  color="secondary"
                                  fontWeight={600}
                                  fontSize={18}
                                  mt={2}
                                  variant="body2"
                                >
                                  Status
                                </Typography>
                              </Stack>
                            </Box>
                          </Stack> */}
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
                          <Box ml={0}>
                            <center>
                              <Typography
                                color="secondary"
                                fontWeight={400}
                                fontSize={14}
                                mt={0.8}
                                variant="body2"
                              >
                                {moment(info?.createdAt).format("h:mm a")}
                              </Typography>

                              <Typography
                                color="secondary"
                                ml={-1}
                                fontWeight={400}
                                fontSize={16}
                                mt={0.8}
                                variant="body2"
                              >
                                {info?.cryptoTransactionId}
                              </Typography>
                            </center>
                          </Box>
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
                              Received
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
                                      mt={0.5}
                                      variant="body2"
                                    >
                                      {info?.currency?.currencyCode}
                                    </Typography>
                                  </Stack>
                          
                            <Stack direction="row" justifyContent="flex-end">
                              <Box
                                sx={{
                                  borderBottom: 1,
                                  borderBottomStyle: "dashed",
                                }}
                              >
                                <Typography
                                fontWeight={600}
                                  fontSize={18}
                                  mt={2}
                                  color="secondary"
                                  variant="body2"
                                >
                                  {/* {(info?.amountInCrypto).toFixed(6)} */}
                                  {(info?.amountInCrypto*info?.tokenPricePerUnit).toFixed(2)}
                                </Typography>
                              </Box>
                            </Stack>
                            <Stack direction="row" justifyContent="flex-end">
                              <Typography
                                color="secondary"
                                fontWeight={400}
                                fontSize={12}
                                mt={0.8}
                                variant="body2"
                              >
                                {moment(info?.createdAt).format("Do MMMM YYYY")}
                              </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="flex-end">
                              <Typography
                                color="primary"
                                fontWeight={400}
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

                      {/* <Stack mt={4} direction="row" justifyContent="flex-end">
          <Button
            // onClick={handleCloseTwoFAPin}
            variant="contained" color="primary">
            <Typography variant="caption" p={0.6} textTransform={"none"} fontSize={14} color="background.light">


              Withdraw from Escrow

            </Typography>
          </Button>
        </Stack> */}
                    </Box>
                  </ListItem>
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
                  You do not have any sell history.
                </Typography>
              </center>
            </Box>
          )}
        </Box>
      )}
    </React.Fragment>
  );
};

export default AvailableRewards;
