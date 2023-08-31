import React, { Suspense, useEffect } from "react";

import { Box } from "@mui/system";
import {
  Button,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { LightUIButtonPrimary } from "../../Utilities/LightUIButtons";

import { useTheme } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

// Styles
import styles from "./AccountSetup.module.css";

import useAuth from "../../hooks/useAuth";

// Logo
import MainVectorLogo from "../../assets/mainLogo.svg";


// MainLogo
import MainLogo from "../../assets/mainLogoDark.svg";


import bg from "../../assets/authBg.svg";

import MainLogoDark from "../../assets/mainLogo.svg";

import Back from "../../assets/backArrow.svg";
import FrontArrow from "../../assets/arrowFront.svg";


// Components
import AccountSetupStep from "./AccountSetupStep/AccountSetupStep";
import {
  QontoConnector,
  QontoStepIcon,
} from "../../components/CustomStepper/CustomStepper";
import KYCStep from "./KYCStep/KYCStep";
import BankStep from "./BankStep/IDUpload";
import PhotoStep from "./PhotoSetupStep/PhotoStep";
import ComponentLoader from "../../components/ProgressLoader/ComponentLoader";

// Lazy Image
const LazyImageComponent = React.lazy(() =>
  import("../../components/LazyImageComponent/LazyImageComponent")
);

// Steps array
const steps = [
  {
    label: "Take a Selfie",
  },
  {
    label: "",
  },
  {
    label: "Upload ID Documentation",
  },
  // {
  //   label: "",
  // },
  // {
  //   label: "Set your Bank Details",
  // },
];

const AccountSetup = () => {
  // Stepper states

  
  const navigate = useNavigate();

  const baseAPIURL = "https://api.redonion.io/api/v2";

    const getWebToken = async (baseAPIURL) => {
      const fetchConfig = {};

      fetchConfig.cache = "no-cache";
      fetchConfig.mode = "cors";
      fetchConfig.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      fetchConfig.method = "POST";

      const URL = `${baseAPIURL}/token/`;
      try {
        const response = await fetch(URL, fetchConfig);

        if (response.status === 200 || response.statusCode === 200) {
          const json = await response.json();

          if (json.error) {
            throw new Error(json.error);
          }

          return json;
        }
      } catch (e) {
        console.log(`API: ${e.name}, ${e.message}`);
        throw e;
      }
    };

  // <script src="https://cdn.smileidentity.com/inline/v1/js/script.min.js"></script>;

  // const configureSmileIdentityWebIntegration = (token) => {
  //   SmileIdentity({
  //     token,
  //     product: "biometric_kyc",
  //     // callback_url: `${your - API - server - URL}/callback`,
  //     environment: "sandbox",
  //     partner_details: {
  //       // partner_id: `${your - smile - identity - partner - id}`,
  //       // name: `${your - app - name}`,
  //       // logo_url: `${your - app - logo - url}`,
  //       // policy_url: `${your - data - privacy - policy - url}`,
  //       theme_color: "#000",
  //     },
  //     onSuccess: () => {},
  //     onClose: () => {},
  //     onError: () => {},
  //   });
  // };

   

  

  useEffect(() => {
   const script = document.createElement("script");

   script.src = "https://cdn.smileidentity.com/inline/v1/js/script.min.js";
   script.async = true;

   document.body.appendChild(script);

   return () => {
     document.body.removeChild(script);
   };

    // const { token } =  getWebToken(baseAPIURL);
		// configureSmileIdentityWebIntegration(token);
  }, [baseAPIURL]);





  // Theme
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>

      <Box
        bgcolor={theme.palette.background.default}
        className={styles.mainBox}
        style={{
          backgroundImage: `url(${isMobile ? bg : bg})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',


        }}
      >
        <Stack
          pt={isMobile ? 1.5 : 3}
          pb={isMobile ? 1.5 : 3}
          pl={isMobile ? 2 : 15}
          pr={isMobile ? 1 : 20}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={styles.topBox}
        >
          <Box>
            <Suspense
              fallback={<Skeleton variant="circular" height={30} width={110} />}
            >
              <LazyImageComponent
                className={styles.logo}
                src={theme.palette.mode === "dark" ? MainLogoDark : MainLogoDark}
              
              />
            </Suspense>
          </Box>



        </Stack>
       <Box>

       </Box>
      </Box>

     
    </React.Fragment>
  );
};

export default AccountSetup;
