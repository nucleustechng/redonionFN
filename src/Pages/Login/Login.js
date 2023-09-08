import React, { Suspense, useState } from "react";

import { Box } from "@mui/system";
import {
  Grid,
  Skeleton,
  useMediaQuery,
  Button,
  Typography,
  Stack,
} from "@mui/material";

// Custom Theme
import { useTheme } from "@mui/material/styles";

// React Router
import { Outlet, useLocation } from "react-router-dom";

// MainLogo
import MainLogo from "../../assets/mainLogoDark.svg";
import Handburger from "../../assets/handburger.svg";
import Close from "../../assets/close.svg";

import bg from "../../assets/authBg.svg";

import MainLogoDark from "../../assets/mainLogo.svg";
import HandburgerDark from "../../assets/handburgerDark.svg";
import CloseDark from "../../assets/closeDark.svg";

// Styles
import styles from "./Login.module.css";

// Component Loader
import ComponentLoader from "../../components/ProgressLoader/ComponentLoader";

// Lazy Load Image COmponent
const LazyImageComponent = React.lazy(() =>
  import("../../components/LazyImageComponent/LazyImageComponent")
);

const Login = () => {
  const theme = useTheme();
  const location = useLocation();

  const [dropdown, setDropdown] = useState(false);

  // For mobile devices only
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box bgcolor={theme.palette.background.default}>
      {/* For Bigger Devices */}
      <Box
        bgcolor={theme.palette.background.default}
        className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
        style={{
          backgroundImage: `url(${isMobile ? bg : bg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
        }}
      >
        <Stack
          pt={isMobile ? 0 : 3}
          pl={isMobile ? 1 : 15}
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
              <a href="/">
                <LazyImageComponent
                  className={styles.logo}
                  src={
                    theme.palette.mode === "dark" ? MainLogoDark : MainLogoDark
                  }
                />
              </a>
            </Suspense>
          </Box>
          {isMobile ? (
            <Box mt={2}>
              <Button onClick={() => setDropdown(!dropdown)}>
                <LazyImageComponent
                  className={styles.logo}
                  src={dropdown ? CloseDark : HandburgerDark}
                />
              </Button>
              {dropdown && (
                <Box
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    background: "#000",
                    padding: 30,
                    zIndex: 999,
                  }}
                >
                  <center>
                    {/* <Box >
                      <Button
                        color="secondary"

                      >
                        <Typography variant="caption" p={0.3} color="secondary">
                          <a

                            style={{ textDecoration: "none", color: "inherit", textTransform: "none", }}
                            href="/auth/sign-in"
                          >
                            Log in
                          </a>
                        </Typography>
                      </Button>
                    </Box> */}
                    <Box>
                      <Button fullWidth variant="contained" color="primary">
                        <Typography variant="caption" p={0.3} color="secondary">
                          <a
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              textTransform: "none",
                            }}
                            href="/registration/sign-up"
                          >
                            Create Account
                          </a>
                        </Typography>
                      </Button>
                    </Box>
                  </center>
                </Box>
              )}
            </Box>
          ) : (
            <Stack direction="row" justifyContent="space-between">
              {/* <Box mr={2}>
                <Button color="secondaryDark">
                  <Typography variant="caption" p={0.3} color="secondaryDark">
                    <a
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        textTransform: "none",
                        fontSize: 15,
                        fontWeight: 500,
                      }}
                      href="/auth/sign-in"
                    >
                      Log in
                    </a>
                  </Typography>
                </Button>
              </Box> */}
              <Box>
                <Button fullWidth variant="contained" color="primary">
                  <Typography
                    variant="caption"
                    p={0.3}
                    color="background.light"
                  >
                    <a
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        textTransform: "none",
                        fontSize: 15,
                        fontWeight: 500,
                      }}
                      href="/registration/sign-up"
                    >
                      Create Account
                    </a>
                  </Typography>
                </Button>
              </Box>
            </Stack>
          )}
        </Stack>

        <Grid columns={{ xs: 12, md: 12 }}>
          <Grid item xs={12} md={12}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>

      {/* For Mobile Devices */}
      {/* <Box bgcolor={theme.palette.background.paper}>
        {isMobile && <Outlet />}
      </Box> */}
    </Box>
  );
};

export default Login;
