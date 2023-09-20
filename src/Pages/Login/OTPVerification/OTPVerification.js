import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";
import { useTheme } from "@mui/material/styles";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";
import { ReactPinField } from "react-pin-field";

// styles
import styles from "./OTPVerification.module.css";
import { useNavigate } from "react-router-dom";


import Back from "../../../assets/backArrow.svg";
import FrontArrow from "../../../assets/frontArrow.svg";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);


const OTPVerification = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const ref = useRef(null);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    ref.current?.inputs[0].focus();
  }, []);
  // styles.mainBoxMobile
  return (
    <Box
      bgcolor={isMobile ? theme.palette.background.paper : null}
      className={!isMobile ? styles.mainBox : ""}
    >
      <Box className={!isMobile ? styles.contentBox : styles.contentBoxMobile}>
        <Box
          bgcolor={theme.palette.background.paper}
          className={
            !isMobile ? styles.verificationBox : styles.verificationBoxMobile
          }
        >
          <Button
            style={{ textDecoration: "none", color: "inherit", textTransform: "none", marginLeft: "-20px", marginTop: "0", marginBottom: "25px" }}

            color="secondary">
            <a
            href="/"
            >
              <LazyImageComponent src={Back} />
            </a>

          </Button>
          <Typography
            variant="h3"
            className={!isMobile ? styles.titleBox : ""}
            color="secondary"
            fontWeight={500}
          >
            OTP Verification
          </Typography>
          {/* {!isMobile ? (
            <Typography className={styles.textUnderScore}></Typography>
          ) : (
            <Box width={"10%"}>
              <GrowwBar />
            </Box>
          )} */}

          <Typography
            color="secondary"
            variant="caption"
            mt={!isMobile ? 4 : 8}
            mb={2}
            component="p"
            fontSize={18}
            textAlign={'center'}
          >
            Input the verification code sent to <br />{user?.user.email}
          </Typography>
          <Box mt={3} mb={4} style={{ display: 'flex', justifyContent: 'center' }} >
            <ReactPinField
              ref={ref}
              className={
                theme.palette.mode === "dark"
                  ? styles.pinFieldDark
                  : styles.pinFieldLight
              }
              onComplete={() => { }}
              length={6}
              type="password"
              validate="0123456789"
              inputMode="numeric"
              autoComplete="nope"
            />
          </Box>

          <Stack direction="row" justifyContent="space-between"
            alignItems="center" mb={4} spacing={0.2}>
            <Typography
              color="secondary"
              variant="caption"
              component="span"
              fontSize={18}
            // sx={{ textDecoration: "underline" }}
            >
              01:59
            </Typography>
            <Typography
              // sx={{ textDecoration: "underline" }}
              color="primary"
              variant="caption"
              component="span"
              fontSize={18}
            >
              Resend OTP
            </Typography>
          </Stack>
          <Button
            style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }}
            onClick={() => navigate("/dashboard/exchange")}
            color="primary"
            variant="contained"
            fullWidth
          >
            Verify Account{'  '} <LazyImageComponent src={FrontArrow} />
          </Button>

        </Box>
      </Box>
    </Box>
  );
};

export default OTPVerification;
