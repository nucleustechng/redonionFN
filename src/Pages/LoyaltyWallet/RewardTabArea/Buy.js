import React, { useState, useEffect, Suspense } from "react";
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
import { LoadingButton } from "@mui/lab";
import ListItem from "@mui/material/ListItem";
import Review from "../../../assets/review.svg";
import NGFlag from "../../../assets/NGFlag.svg";
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
import { ModalSkeletons } from "../../../components/Skeletons/ComponentSkeletons";
import ReviewModal from "../ReviewModal/ReviewModal";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const MyRewards = () => {
  const [openRewardModal, setOpenRewardModal] = React.useState(false);
  const [isloading, setIsLoading] = React.useState(false);

  const [tranz, setTransaz] = useState([]);

  const [id, setID] = useState("");

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const GET_CURRENCY_URL = "/transaction/my-transactions";

    const handleOpenRewardModal = (id) => {
      setID(id)
      console.log(23)
      setOpenRewardModal(true);
    };

    const handleCloseRewardModal = () => {
      setOpenRewardModal(false);
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
        console.log(res);
        setIsLoading(false);
        setTransaz(res.data.data.transactions);
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
      <Suspense fallback={<ModalSkeletons width={"90vw"} height={300} />}>
        <ReviewModal
          open={openRewardModal}
          id={id}
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
                  {(info?.status === "PENDING" ||
                    info.status === "REPORTED" ||
                    info.status === "EXPIRED") && (
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
                                <Stack alignItems={"left"}>
                                  <Typography
                                    color="secondary"
                                    fontWeight={600}
                                    fontSize={18}
                                    mt={0.8}
                                    variant="body2"
                                  >
                                    {info?.amountInFiat.toFixed(2)}
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
                                    {info?.amountInCrypto.toFixed(4)}
                                  </Typography>
                                </Box>
                              </Stack>

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

                        <Stack direction="row" justifyContent={"end"}>
                          
                          <IconButton
                            // sx={{ cursor: "pointer" }}
                            onClick={()=>handleOpenRewardModal(info?.id)}
                            sx={{ mt: -0.5 }}
                          >
                            <LazyImageComponent src={Review} />
                          </IconButton>
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
                  You do not have any pending buy transactions.
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
    </React.Fragment>
  );
};

export default MyRewards;
