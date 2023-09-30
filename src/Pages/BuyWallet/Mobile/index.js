import React, { Suspense, useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";

// Custom Theme
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "./index.module.css";
import Back from "../../../assets/backArrow.svg";
import CreateRequestModal from "../CreateRequestModal/CreateRequestModal";

// Component Loader
import ComponentLoader from "../../../components/ProgressLoader/ComponentLoader";

import FaitBuy from "../../../assets/fiatBuyMobile.svg";
import FaitBuyActive from "../../../assets/fiatBuyMobileActive.svg";
import Crpyto from "../../../assets/crytoBuyMobile.svg";
import CrpytoActive from "../../../assets/crytoBuyMobileActive.svg";
import FundsAndTransferArea from "../FundsAndTransferArea/FundsAndTransferArea";

const BuyWalletTopCards = React.lazy(() => import("../BuyTopCards/BuyCard"));

const CryptoWalletTopCards = React.lazy(() =>
  import("../BuyTopCards/CryptoCard")
);

const CreateBuyRequestModal = React.lazy(() =>
  import("../CreateBuyRequestModal/CreateBuyRequestModal")
);

// Lazy Image
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const TradeMobile = (props) => {
  const [showKey, setShowKey] = useState(1);

  const [showsell, setShowSell] = useState(0);

  const theme = useTheme();

  const [info, setInfo] = useState("");

  const [data, setData] = useState("");

  const [showPin, setShowPin] = useState(false);

  const [countryData, setCountryData] = useState([]);

  const [curencyData, setCurencyData] = useState([]);

  const [coinNamesData, setCoinNamesData] = useState([]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFiat = (key) => {
    setShowKey(key);
  };

  const sendData = (data) => {
    setInfo(data);
  };

  const handleCloseTwoFAPin = () => {
    setShowPin(!showPin);
  };

  const handleBuyModal = (num) => {
    setData(num);
    setShowPin(!showPin);
  };
console.log(user);
  useEffect(() => {
    console.log(props);
    setCurencyData(props.currency);
    setCountryData(props.country);
    setCoinNamesData(props.coinNamesData);
  }, [props]);

  return (
    <Box
      p={3}
      bgcolor={
        theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff"
      }
    >
      {showPin ? (
        <CreateBuyRequestModal
          dataSingle={data}
          datao={data}
          open={showPin}
          onClose={handleCloseTwoFAPin}
        />
      ) : (
        <>
          {info === "" ? (
            <Grid item xs={12}>
              <Box
                borderRadius={5}
                bgcolor={showsell === 1 ? "#3063E9" : "#EEEEEE"}
              >
                <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Box
                    button
                    sx={{ cursor: "pointer" }}
                    onClick={() => setShowSell(0)}
                    bgcolor={showsell === 1 ? "#EEEEEE" : "#3063E9"}
                    width={"100%"}
                    borderRadius={5}
                    px={2.5}
                    py={2.5}
                    textAlign={"center"}
                  >
                    <Typography
                      fontWeight={500}
                      fontSize={18}
                      color={showsell === 1 ? "#3063E9" : "#fff"}
                      variant="body2"
                    >
                      Buy
                    </Typography>
                  </Box>

                  <Box
                    button
                    sx={{ cursor: "pointer" }}
                    onClick={() => setShowSell(1)}
                    bgcolor={showsell === 1 ? "#3063E9" : "#EEEEEE"}
                    width={"100%"}
                    borderRadius={5}
                    px={2.5}
                    py={2.5}
                    textAlign={"center"}
                  >
                    <Typography
                      fontWeight={500}
                      fontSize={18}
                      color={showsell === 1 ? "#fff" : "#3063E9"}
                      variant="body2"
                    >
                      Sell
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              {showsell === 1 && (
                <Box>
                  <CreateRequestModal
                    open={true}
                    country={countryData}
                    currency={curencyData}
                    coin={coinNamesData}
                    // onClose={handleSell}
                  />
                </Box>
              )}

              {showsell === 0 && (
                <Box>
                  <RadioGroup>
                    <Stack
                      direction={"row"}
                      mx={0.4}
                      spacing={3}
                      my={2}
                      mb={15}
                    >
                      <Box
                        onClick={() => handleFiat(1)}
                        button
                        sx={{ cursor: "pointer" }}
                        width={"100%"}
                        key={1}
                      >
                        <FormControlLabel
                          value={"fiat"}
                          control={<Radio style={{ display: "none" }} />}
                        />
                        <LazyImageComponent
                          style={{ width: "100%" }}
                          src={showKey === 1 ? FaitBuyActive : FaitBuy}
                        />
                      </Box>

                      <Box
                        onClick={() => handleFiat(2)}
                        button
                        sx={{ cursor: "pointer" }}
                        width={"100%"}
                        key={2}
                      >
                        <FormControlLabel
                          value={"crypto"}
                          control={<Radio style={{ display: "none" }} />}
                        />
                        <LazyImageComponent
                          style={{ width: "100%" }}
                          src={showKey === 1 ? Crpyto : CrpytoActive}
                        />
                      </Box>
                    </Stack>
                  </RadioGroup>

                  {showKey === 1 ? (
                    <>
                      <Box px={3}>
                        <Suspense fallback={<ComponentLoader />}>
                          <BuyWalletTopCards
                            coinNamesData={coinNamesData}
                            sendData={sendData}
                            country={countryData}
                            currency={curencyData}
                          />
                        </Suspense>
                      </Box>
                      {!isMobile && (
                        <Box px={0}>
                          <Suspense fallback={<ComponentLoader />}>
                            <FundsAndTransferArea
                              handleBuyModal={handleBuyModal}
                              info={info}
                              country={countryData}
                              currency={curencyData}
                            />
                          </Suspense>
                        </Box>
                      )}
                    </>
                  ) : (
                    <>
                      <Box px={3}>
                        <Suspense fallback={<ComponentLoader />}>
                          <CryptoWalletTopCards
                            coinNamesData={coinNamesData}
                            sendData={info}
                            country={countryData}
                            currency={curencyData}
                          />
                        </Suspense>
                      </Box>
                    </>
                  )}
                </Box>
              )}
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Box>
                <Stack direction={"row"}>
                  <IconButton onClick={() => setInfo("")}>
                    <LazyImageComponent src={Back} />
                  </IconButton>
                  <Box
                    ml={7}
                    height={40}
                    borderRadius={3}
                    p={1}
                    bgcolor={"#eeeeee"}
                  >
                    <Typography
                      fontWeight={500}
                      color={"#000"}
                      mt={0.3}
                      fontSize={14}
                      variant="body2"
                    >
                      {info?.coinAbb} {info?.amount} -{" "}
                      {user?.currency?.currencyCode}
                    </Typography>
                  </Box>
                </Stack>

                <Box px={0}>
                  <Suspense fallback={<ComponentLoader />}>
                    <FundsAndTransferArea
                      handleBuyModal={handleBuyModal}
                      info={info}
                      country={countryData}
                      currency={curencyData}
                    />
                  </Suspense>
                </Box>
              </Box>
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default TradeMobile;
