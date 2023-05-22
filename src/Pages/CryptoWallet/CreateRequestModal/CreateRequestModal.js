import React, { Suspense, useState } from "react";
import { Divider, Modal, Stack, Typography, useMediaQuery, Input, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "./CreateRequestModal.module.css";
import { ReactPinField } from "react-pin-field";
import CloseIcon from "@mui/icons-material/Close";

import { LoadingButton } from "@mui/lab";

import useAuth from "../../../hooks/useAuth";

import BuyRequest from "../../../assets/buyRequest.svg";
import SellRequest from "../../../assets/sellRequest.svg";

import BitCoinIcon from "../../../assets/bitCoinIcon.svg";
import ExchanageIcon from "../../../assets/exchangeBlue.svg";
import FrontArrow from "../../../assets/frontArrow.svg";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const CreateRequestModal = ({ open, onClose }) => {
  const { user, logOut } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { logInUser, authError, isLoading } = useAuth();

  const [payTextField, setPayTextField] = useState("");

  // Generate user name out of the email
  const userName = "alex";
  // user?.email.split("@").slice(0, 1).toString();

  return (
    <Modal
      disableAutoFocus
      disableEscapeKeyDown
      keepMounted
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
    >
      <Box className={!isMobile ? styles.modalStyle : styles.modalStyleMobile}>
        <Box
          bgcolor={theme.palette.background.paper}
          className={styles.modalContentBox}
        >
          <Box p={4} borderRadius="10px">


            <Stack direction="row" justifyContent="space-between" spacing={"5px"}>
              <Typography variant="caption" fontSize={16} fontWeight={500} color="primary">
                Request offer
              </Typography>
              <Typography
                // variant="body2"
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={onClose}
              >
                <CloseIcon />
              </Typography>
            </Stack>
            <Box mt={2} bgcolor={"#E8E8F3"} fullWidth p={2} borderRadius={2}>
              <Stack direction="row" justifyContent="space-between" >
                <Stack direction="row" spacing={"5px"}>
                  <LazyImageComponent src={SellRequest} />
                  <Box>
                    <Typography variant="caption" fontSize={14} fontWeight={400} color="#838383">
                      Sell
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={"5px"}>
                  <LazyImageComponent src={BuyRequest} />
                  <Box>
                    <Typography variant="caption" fontSize={14} fontWeight={400} color="#838383">
                      Buy
                    </Typography>
                  </Box>
                </Stack>

              </Stack>


              <Box pl={4} pr={4} mt={2} >
                <Stack direction="row" justifyContent="space-between" >
                  <Box>
                    <Stack direction="row" spacing={"5px"}>
                      <LazyImageComponent src={BitCoinIcon} />
                      <Box ml={2} pt={0.3}>
                        <Typography variant="caption" fontSize={16} fontWeight={600} color="#111">
                          USD
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>


                  <Stack direction="row" alignItems={"center"} spacing={"5px"}>
                    <Box>
                      <LazyImageComponent src={ExchanageIcon} />
                    </Box>
                  </Stack>


                  <Box>
                    <Stack direction="row" spacing={"5px"}>
                      <LazyImageComponent src={BitCoinIcon} />
                      <Box ml={2} pt={0.3}>
                        <Typography variant="caption" fontSize={16} fontWeight={600} color="#111">
                          NGN
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                </Stack>



              </Box>

              <Box mt={1} >
                <Stack direction="row" justifyContent="space-between" >
                  <Box>

                    <Typography variant="caption" fontSize={18} fontWeight={400} color="#111">
                      $230.00
                    </Typography>

                  </Box>

                  <Box>

                    <Typography variant="caption" fontSize={18} fontWeight={400} color="#111">
                      $230.00
                    </Typography>

                  </Box>


                </Stack>



              </Box>

              <Divider color="#3063E9" />

              <Box mt={1} >
                <Stack direction="row" justifyContent="space-between" >
                  <Box>

                    <Typography variant="caption" fontSize={14} fontWeight={400} color="#838383">
                      Official rate:
                    </Typography>

                  </Box>

                  <Box>

                    <Typography variant="caption" fontSize={14} fontWeight={600} color="#111">
                      $1 = ₦433.72
                    </Typography>

                  </Box>


                </Stack>



              </Box>
            </Box>
            <Box
              mt={3}
            >
              <Typography variant="body2" fontSize={16} fontWeight={300} color="secondary" mb={2}>
                Input the amount you would like to buy
              </Typography>
              <Box>
                <Stack direction="row" >
                  <Typography variant="caption" fontSize={16} textAlign={"left"} fontWeight={500} color="secondary" mb={1}>
                    Sell
                  </Typography>
                </Stack>


                <Box borderRadius={2} height={50} bgcolor={"#E8E8F3"}>
                  <Stack direction="row" justifyItems={"center"} >
                    <Box p={1.5}>
                      <Stack direction="row" spacing={"5px"}>
                        <LazyImageComponent src={BuyRequest} />
                        <Box>
                          <Typography variant="caption" fontSize={14} fontWeight={400} color="#838383">
                            Buy
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    <Input
                      fullWidth
                      // sx={{ width: isMobile ? 120 : 400}}
                      name="payInput"
                      value={payTextField}
                      type="number"
                      onChange={(e) => setPayTextField(e.target.value)}
                      placeholder="0.0"
                      disableUnderline
                      className={
                        theme.palette.mode === "dark"
                          ? "inputField"
                          : styles.inputFieldLight
                      }
                    />
                  </Stack>
                </Box>
              </Box>

              <Box mt={3}>
                <Stack direction="row" >
                  <Typography variant="caption" fontSize={16} textAlign={"left"} fontWeight={500} color="secondary" mb={1}>
                    Buy
                  </Typography>
                </Stack>


                <Box borderRadius={2} height={50} bgcolor={"#E8E8F3"}>
                  <Stack direction="row" justifyItems={"center"} >
                    <Box p={1.5}>
                      <Stack direction="row" spacing={"5px"}>
                        <LazyImageComponent src={BuyRequest} />
                        <Box>
                          <Typography variant="caption" fontSize={14} fontWeight={400} color="#838383">
                            Buy
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    <Input
                      fullWidth
                      // sx={{ width: isMobile ? 120 : 400}}
                      name="payInput"
                      value={payTextField}
                      type="number"
                      onChange={(e) => setPayTextField(e.target.value)}
                      placeholder="0.0"
                      disableUnderline
                      className={
                        theme.palette.mode === "dark"
                          ? "inputField"
                          : styles.inputFieldLight
                      }
                    />
                  </Stack>
                </Box>
              </Box>



            </Box>


            <Box mt={4} bgcolor={"#E8E8F3"} fullWidth p={2} borderRadius={2}>
              <Stack direction="row" justifyContent="space-between" >

                <Box>

                  <Typography variant="caption" fontSize={14} fontWeight={400} color="#838383">
                    Account name:
                  </Typography>

                </Box>

                <Box>

                  <Typography variant="caption" fontSize={14} fontWeight={400} color="#111">
                    John Joe
                  </Typography>

                </Box>
              </Stack>

              <Stack direction="row" justifyContent="space-between" >

                <Box>

                  <Typography variant="caption" fontSize={14} fontWeight={400} color="#838383">
                    Account number:
                  </Typography>

                </Box>

                <Box>

                  <Typography variant="caption" fontSize={14} fontWeight={400} color="primary">
                    123456789
                  </Typography>

                </Box>
              </Stack>

              <Stack direction="row" justifyContent="space-between" >

                <Box>

                  <Typography variant="caption" fontSize={14} fontWeight={400} color="#838383">
                    Bank:
                  </Typography>

                </Box>

                <Box>

                  <Typography variant="caption" fontSize={14} fontWeight={400} color="#111">
                    First Bank of Nigeria
                  </Typography>

                </Box>
              </Stack>

            </Box>

            <Stack direction="row" mt={3} justifyContent="space-between" >

              {isLoading ? (
                <LoadingButton loading variant="outlined">
                  Login
                </LoadingButton>
              ) : (
                <>
                  <Button type="submit" fullWidth style={{ height: 50, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="primary">
                    Continue  <LazyImageComponent src={FrontArrow} />
                  </Button>

                </>
              )}

             <Box ml={2}>
                <Button type="submit" style={{ height: 50, width: 150, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="btncolor">
                  <Typography variant="caption" fontSize={18} fontWeight={400} color="primary">
                    Close
                  </Typography> 
                </Button>
             </Box>
            </Stack>


          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateRequestModal;
