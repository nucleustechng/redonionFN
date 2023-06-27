import React, { Suspense, useEffect, useState } from "react";

// Material
import { Box } from "@mui/system";

// Component Loader
import ComponentLoader from "../../components/ProgressLoader/ComponentLoader";

import { useMediaQuery, useTheme } from "@mui/material";

// Router
import { useNavigate } from "react-router-dom";

// Axios
import axios from "../../api/axios";


// Lazy Image component
const CryptoWalletTopCards = React.lazy(() =>
  import("../CryptoWallet/CryptoWalletTopCards/CryptoWalletTopCards")
);
const CryptoWalletTopCardsMobile = React.lazy(() =>
  import("./CryptoWalletTopCards/CryptoWalletTopCardsMobile")
);
const FundsAndTransferArea = React.lazy(() =>
  import("../CryptoWallet/FundsAndTransferArea/FundsAndTransferArea")
);
const FundsAndTransferAreaMobile = React.lazy(() =>
  import("../CryptoWallet/FundsAndTransferArea/FundsAndTransferAreaMobile")
);

const CryptoWalletInterface = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const [info, setInfo] = useState("");

  const [countryData, setCountryData] = useState([]);

  const [curencyData, setCurencyData] = useState([]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const sendData = (data) => {
    setInfo(data);
  }

  const COUNTRIES_URL = "/user/get-countries";

  const CURENCY_URL = "/user/get-currencies?countryId=";


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
  }, [user, navigate]);

  return (
    <Box >
      <Box px={3}>
        <Suspense fallback={<ComponentLoader />}>
          <CryptoWalletTopCards sendData={sendData} country={countryData} currency={curencyData} />
          
        </Suspense>
      </Box>
      <Box px={3}>
        <Suspense fallback={<ComponentLoader />}>
          <FundsAndTransferArea info={info} country={countryData} currency={curencyData} />
         
        </Suspense>
      </Box>
    </Box>
  );
};

export default CryptoWalletInterface;
