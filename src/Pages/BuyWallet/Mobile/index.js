import React, { Suspense, useState } from "react";
import { Box } from "@mui/system";
import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";

// Custom Theme
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "./index.module.css";

import CreateRequestModal from "../CreateRequestModal/CreateRequestModal";

// Component Loader
import ComponentLoader from "../../../components/ProgressLoader/ComponentLoader";

import FaitBuy from "../../../assets/fiatBuyMobile.svg";
import FaitBuyActive from "../../../assets/fiatBuyMobileActive.svg";
import Crpyto from "../../../assets/crytoBuyMobile.svg";
import CrpytoActive from "../../../assets/crytoBuyMobileActive.svg";

const BuyWalletTopCards = React.lazy(() => import("../BuyTopCards/BuyCard"));

const CryptoWalletTopCards = React.lazy(() =>
  import("../BuyTopCards/CryptoCard")
);

// Lazy Image
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const TradeMobile = () => {
  const [showKey, setShowKey] = useState(1);

  const [showsell, setShowSell] = useState(0);

  const [info, setInfo] = useState("");

  const [countryData, setCountryData] = useState([]);

  const [curencyData, setCurencyData] = useState([]);

  const handleFiat = (key) => {
    console.log(key);
    setShowKey(key);
  };

  const sendData = (data) => {
    setInfo(data);
  };

  const theme = useTheme();
  return (
    <Box
      p={2}
      bgcolor={
        theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff"
      }
    >
      <Grid item xs={12}>
        <Box borderRadius={5} bgcolor={showsell === 1 ? "#3063E9" : "#EEEEEE"}>
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
              // onClose={handleSell}
            />
          </Box>
        )}

        {showsell === 0 && (
          <Box>
            <RadioGroup>
              <Stack direction={"row"} mx={0.4} spacing={3} my={2} mb={15}>
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
              <Box px={3}>
                <Suspense fallback={<ComponentLoader />}>
                  <BuyWalletTopCards
                    sendData={sendData}
                    country={countryData}
                    currency={curencyData}
                  />
                </Suspense>
              </Box>
            ) : (
              <>
                <Box px={3}>
                  <Suspense fallback={<ComponentLoader />}>
                    <CryptoWalletTopCards
                      sendData={sendData}
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
    </Box>
  );
};

export default TradeMobile;
