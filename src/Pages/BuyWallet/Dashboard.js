import React, { Suspense, useEffect, useState } from "react";

// Material
import { Box } from "@mui/system";

// Component Loader
import ComponentLoader from "../../components/ProgressLoader/ComponentLoader";

import {
  useMediaQuery,
  useTheme,
  Button,
  Skeleton,
  Stack,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

// Router
import { useNavigate } from "react-router-dom";

// Card Images
import FaitBuy from "../../assets/fiatBuy.svg";
import FaitBuyActive from "../../assets/fiatBuyActive.svg";
import Crpyto from "../../assets/crytoBuy.svg";
import CrpytoActive from "../../assets/crytoBuyActive.svg";

import Notification from "../../assets/notification.svg";

// Axios
import axios from "../../api/axios";

import CreateRequestModal from "./CreateRequestModal/CreateRequestModal";

import CreateNotifcationModal from "./CreateRequestModal/CreateNotifcationModal";

// Lazy Image component
const BuyWalletTopCards = React.lazy(() => import("./BuyTopCards/BuyCard"));

const CryptoWalletTopCards = React.lazy(() => import("./BuyTopCards/CryptoCard"));


const CryptoWalletTopCardsMobile = React.lazy(() =>
  import("./BuyTopCards/CryptoWalletTopCardsMobile")
);
const FundsAndTransferArea = React.lazy(() =>
  import("./FundsAndTransferArea/FundsAndTransferArea")
);
const FundsAndTransferAreaMobile = React.lazy(() =>
  import("./FundsAndTransferArea/FundsAndTransferAreaMobile")
);

const CreateBuyRequestModal = React.lazy(() =>
  import("./CreateBuyRequestModal/CreateBuyRequestModal")
);

// Lazy Image component
const LazyImageComponent = React.lazy(() =>
  import("../../components/LazyImageComponent/LazyImageComponent")
);

const CryptoWalletInterface = () => {
  const theme = useTheme();
   const isTablet = useMediaQuery(theme.breakpoints.down("md"));
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [info, setInfo] = useState("");

  const [data, setData] = useState("");

  const [showPin, setShowPin] = useState(false);

   const [showSell, setShowSell] = useState(false);

  const [countryData, setCountryData] = useState([]);

  const [curencyData, setCurencyData] = useState([]);

  const [showKey, setShowKey] = useState(1);

  const [unread, setUnread] = useState(0);

  const [addi, setAdd] = useState(0);

  const [showNotification, setShowNotification] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Fake Provider Mapping
  const providerInfo = [
    {
      id: "1",
      name: "Fiat",
      img: FaitBuy,
      imgactive: FaitBuyActive,
    },
    {
      id: "2",
      name: "Crpyto",
      img: CrpytoActive,
      imgactive: Crpyto,
    },
  ];

  const handleSell = () => {
    setShowSell(!showSell);
  };

  const handleNotification = () => {
    setShowNotification(!showNotification);
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
    console.log("argument from Child: ", num);
  };

  const handleFiat = (key) => {
    console.log(key);
    setShowKey(key);
  };

  const COUNTRIES_URL = "/user/get-countries";

  const CURENCY_URL = "/user/get-currencies?countryId=";

  const GET_UNREAD_URL = "/user/notification/unread";

  // Fetching Data
  useEffect(() => {
    axios
      .get(COUNTRIES_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        let data = res.data.data.countries;
        Object.keys(data).map((keys) => {
          if (user.user.countryId === data[keys].id) {
            return setCountryData(data[keys]);
          }
          return 0;
        });
      });

    axios
      .get(CURENCY_URL + user?.user?.countryId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        let data = res.data.data.currencies[0];
        console.log(data);
        setCurencyData(data);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        }
      });

    axios
      .get(GET_UNREAD_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setUnread(res.data.data.unread);
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
    <Box>
      {showPin ? (
        <CreateBuyRequestModal
          dataSingle={data}
          datao={data}
          open={showPin}
          onClose={handleCloseTwoFAPin}
        />
      ) : (
        <>
          <CreateRequestModal
            open={showSell}
            country={countryData}
            currency={curencyData}
            onClose={handleSell}
          />
          <CreateNotifcationModal
            open={showNotification}
            onClose={handleNotification}
          />

          <Box mx={4} mb={2}>
            <Stack direction="row" mt={-6} justifyContent="space-between">
              <Button
                onClick={handleSell}
                width={200}
                style={{
                  height: 50,
                  borderRadius: 10,
                  fontSize: 16,
                  textTransform: "none",
                }}
                variant="contained"
                color="primary"
              >
                Create A Sell Offer
              </Button>

              <Box
                p={3}
                Button
                onClick={handleNotification}
                sx={{ cursor: "pointer" }}
              >
                <Box
                  position={"absolute"}
                  borderRadius={"50%"}
                  top={isMobile ? 105 : 50}
                  width={25}
                  height={25}
                  bgcolor={"#ff0000"}
                >
                  <center>
                    <Typography
                      variant="caption"
                      fontSize={11}
                      fontWeight={500}
                      color="secondary"
                    >
                      {unread > 100 ? "99+" : unread}
                    </Typography>
                  </center>
                </Box>
                <LazyImageComponent src={Notification} />
              </Box>
            </Stack>
          </Box>

          <Box mx={4} mb={isTablet ? -2 : 1}>
            <Typography
              variant="caption"
              fontSize={30}
              fontWeight={500}
              color="secondary"
            >
              Buy{" "}
            </Typography>
          </Box>

          <RadioGroup>
            <Stack
              direction={isTablet ? "column" : "row"}
              mx={4}
              spacing={isTablet ? 0 : 3}
              my={2}
              mb={isTablet ? 10 : 15}
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
                  // label={<LazyImageComponent src={img} />}
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
                  // label={<LazyImageComponent src={img} />}
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
                    sendData={sendData}
                    country={countryData}
                    currency={curencyData}
                  />
                </Suspense>
              </Box>
              <Box px={3}>
                <Suspense fallback={<ComponentLoader />}>
                  <FundsAndTransferArea
                    handleBuyModal={handleBuyModal}
                    info={info}
                    country={countryData}
                    currency={curencyData}
                  />
                </Suspense>
              </Box>
            </>
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
        </>
      )}
    </Box>
  );
};

export default CryptoWalletInterface;
