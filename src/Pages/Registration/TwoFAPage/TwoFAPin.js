import React, { useEffect, useRef } from "react";

// Material
import { Typography, Stack, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

// Custom Theme
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "./TwoFAPin.module.css";

// Lazy Image Component
import LazyImageComponent from "../../../components/LazyImageComponent/LazyImageComponent";

// Logo
import MainVectorLogo from "../../../assets/mainLogo.svg";

// Navigating
import { useNavigate } from "react-router-dom";

//
import { ReactPinField } from "react-pin-field";

const TwoFAPin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const ref = useRef(null);

  useEffect(() => {
    ref.current.inputs[0].focus();
  }, []);

  return (
    <React.Fragment>
      {!isMobile && (
        <Box
          className={
            theme.palette.mode === "dark"
              ? styles.mainArea
              : styles.mainAreaLight
          }
        >
          <Box className={styles.contentBox}>
            <Box>
              <Box
                bgcolor={theme.palette.background.paper}
                className={styles.modalStyle}
                width={500}
              >
                <Box p={4} borderRadius="10px">
                  <LazyImageComponent
                    src={MainVectorLogo}
                    style={{ width: "60px", height: "60px" }}
                  />
                  <Typography color="secondary" variant="h6" mt={3} mb={2}>
                    Hi, John Doe
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={"5px"}
                  >
                    <Typography variant="body2" color="secondary">
                      john@doe.com
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ cursor: "pointer" }}
                    >
                      logout
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      my: 3,
                    }}
                  >
                    <ReactPinField
                      ref={ref}
                      onComplete={() => navigate("/dashboard/exchange")}
                      className={
                        theme.palette.mode === "dark"
                          ? styles.pinFieldDark
                          : styles.pinFieldLight
                      }
                      type="password"
                      validate="0123456789"
                      inputMode="numeric"
                      autoComplete="off"
                    />
                  </Box>
                  <Typography variant="body2" color="secondary" mb={2}>
                    Please enter your PIN
                  </Typography>
                  <Typography
                    variant="caption"
                    color="primary"
                    sx={{ cursor: "pointer" }}
                  >
                    Forgot PIN?
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {isMobile && (
        <Box>
          <Box className={styles.contentBoxMobile}>
            <Box>
              <Box
                bgcolor={theme.palette.background.paper}
                className={styles.modalStyleMobile}
              >
                <Box p={3}>
                  <LazyImageComponent
                    src={MainVectorLogo}
                    style={{ width: "40px", height: "40px" }}
                  />
                  <Typography color="secondary" variant="h6" mt={3} mb={2}>
                    Hi, John Doe
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={"5px"}
                  >
                    <Typography variant="body2" color="secondary">
                      john@doe.com
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ cursor: "pointer" }}
                    >
                      logout
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      my: 3,
                    }}
                  >
                    <ReactPinField
                      onComplete={() => navigate("/dashboard/exchange")}
                      className={
                        theme.palette.mode === "dark"
                          ? styles.pinFieldDark
                          : styles.pinFieldLight
                      }
                      autoFocus
                      type="password"
                      validate="0123456789"
                      inputMode="numeric"
                      autoComplete="off"
                    />
                  </Box>
                  <Typography variant="body2" color="secondary" mb={2}>
                    Please enter your PIN
                  </Typography>
                  <Typography
                    variant="caption"
                    color="primary"
                    sx={{ cursor: "pointer" }}
                  >
                    Forgot PIN?
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default TwoFAPin;
