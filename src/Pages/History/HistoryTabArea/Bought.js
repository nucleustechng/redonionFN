import React, { useState, useEffect, Suspense } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  Paper,
  List,
  IconButton,
} from "@mui/material";
import moment from "moment";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Review from "../../../assets/review.svg";
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
import { ModalSkeletons } from "../../../components/Skeletons/ComponentSkeletons";
import ReviewModal from "../../LoyaltyWallet/ReviewModal/ReviewModal";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const MyRewards = (props) => {
  const [openRewardModal, setOpenRewardModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [isloading, setLoading] = React.useState(false);
  const [tranz, setTransaz] = useState([]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [id, setID] = useState("");


  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const GET_CURRENCY_URL = "/transaction/my-transactions";

  const onTrigger = (event) => {
    // Call the parent callback function
    props.parentCallback(event);
  };

  const handleOpenRewardModal = (id) => {
    setID(id)
    setOpenRewardModal(true);
  };

  const handleCloseRewardModal = () => {
    setOpenRewardModal(false);
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
        // console.log(res.data.data)
        setTransaz(res.data.data.transactions);
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
      <Suspense fallback={<ModalSkeletons width={"90vw"} height={300} />}>
        <ReviewModal
          open={openRewardModal}
          info={id}
          handleClose={handleCloseRewardModal}
          handleOpenSnackBar={handleOpenRewardModal}
        />
      </Suspense>

      {isloading ? (
        <center>
          <LoadingButton loading>Login</LoadingButton>
        </center>
      ) : (
        <>
          {tranz.length > 0 ? (
            <List>
              {tranz.map((info) => (
                <>
                  <ListItem
                    onClick={() => onTrigger(info)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Box m={6} width={"100%"}>
                      <Stack
                        direction={"row"}
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
                                justifyContent={"center"}
                                alignItems={"left"}
                              >
                                {/* <Typography
                                  color="secondary"
                                  fontWeight={400}
                                  fontSize={16}
                                  mt={0.8}
                                  ml={1}
                                  variant="body2"
                                >
                                  {info?.offer?.currency?.currencyCode}
                                </Typography> */}

                                <Stack
                                  direction="row"
                                  justifyItems={"center"}
                                  alignItems={"center"}
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
                                    {info?.offer?.currency?.currencyCode}
                                  </Typography>
                                </Stack>

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
                                    ~{" "}
                                    {parseFloat(
                                      info?.amountInFiat || 0
                                    ).toFixed(2)}
                                  </Typography>
                                </Box>

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
                          </Stack>
                        </Box>

                        <Box>
                          {/* <Stack direction="row" justifyContent={"center"} alignItems={"center"} mt={4} >
                            <LazyImageComponent  src={ExchanageIcon} />

                          </Stack> */}
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
                              To receive
                            </Typography>
                          </Stack>

                          <Box mr={1.5} mt={2}>
                            {/* <Stack direction="row" justifyContent="flex-end">
                              <Typography
                                color="secondary"
                                fontWeight={400}
                                fontSize={16}
                                mt={0.8}
                                ml={1}
                                variant="body2"
                              >
                                {info?.offer?.CryptoCurrency}
                              </Typography>
                              <LazyImageComponent
                                style={{ 
                                  marginRight: 4,
                                    width: 25,
                                    height: 25,
                                 }}
                                src={info?.offer?.CryptoCurrency?.imgUri}
                              />
                              <Typography
                                color="secondary"
                                fontWeight={400}
                                fontSize={14}
                                mt={0.8}
                                ml={1}
                                variant="body2"
                              >
                                {info?.offer?.CryptoCurrency?.abbreviation}
                              </Typography>
                            </Stack> */}

                            <Stack direction="row" justifyContent="flex-end">
                                <LazyImageComponent
                                  style={{
                                    marginRight: 4,
                                    width: 25,
                                    height: 25,
                                  }}
                                  src={info?.offer?.cryptoCurrency?.imgUri}
                                />
                                <Typography
                                  color="secondary"
                                  fontWeight={400}
                                  fontSize={15}
                                  mt={0.2}
                                  variant="body2"
                                >
                                  {info?.offer?.cryptoCurrency?.abbreviation}
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
                                  fontSize={20}
                                  mt={0.4}
                                  color="secondary"
                                  variant="body2"
                                >
                                  ~ {info?.amountInCrypto}
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
                            <Stack direction="row" justifyContent={"end"}>
                          
                              <IconButton
                                // sx={{ cursor: "pointer" }}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleOpenRewardModal(info);
                                }}
                                sx={{ mt: 0.5 }}
                              >
                                <LazyImageComponent src={Review} />
                              </IconButton>
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
                  You do not have any buy history.
                </Typography>
              </center>
            </Box>
          )}
        </>
      )}
    </React.Fragment>
  ); 
};

export default MyRewards;
