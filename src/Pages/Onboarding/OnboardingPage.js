import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  MobileStepper,
  Button,
  Typography,
  Stack,
  Skeleton,
  createTheme,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import FastForwardIcon from "@mui/icons-material/FastForward";

// Styles
import styles from "./OnboardingPage.module.css";
import StepComponent from "./StepComponent";


// Logo
import MainOnboardingLogo from "../../assets/onboardingLogo.svg";
import LogoDark from "../../assets/mainLogoDark.svg";

// BG
import BgColorTop from "../../assets/bgTop.svg";
import BgColorTopMObile from "../../assets/bgTopMobile.svg";
import Buy from "../../assets/buy.svg";
import BuyMobile from "../../assets/buyMobile.svg";
import Handburger from "../../assets/handburger.svg";
import Close from "../../assets/close.svg";

import Image1 from "../../assets/landingImage1.svg";
import ImageMobile1 from "../../assets/landingImageMobile1.svg";
import ExchangeDemo from "../../assets/exchange-demo.png";
import Image3 from "../../assets/landingImage3.svg";
import ImageMobile3 from "../../assets/landingImageMobile3.svg";
import HalfPhone from "../../assets/halfiphone.png";
import Phone from "../../assets/phone.png";
import Image6 from "../../assets/landingImage6.svg";
import Image7 from "../../assets/landingImage7.svg";
import ImageNum1 from "../../assets/landingImageN1.svg";
import ImageNum2 from "../../assets/landingImageN2.svg";
import ImageNum3 from "../../assets/landingImageN3.svg";
import Image100 from "../../assets/landingImage100.svg";
import ImageB from "../../assets/landingImageB.svg";
import ImageSearch from "../../assets/landingImageSearch.svg";

import Twitter from "../../assets/twitter.svg";
import Facebook from "../../assets/facebook.svg";
import Instagram from "../../assets/instagram.svg";

import ImagePlayStore from "../../assets/landingImagePlayStore.svg";
import ImageAppleStore from "../../assets/landingImageAppStore.svg";

// Lazy Image
const LazyImageComponent = React.lazy(() =>
  import("../../components/LazyImageComponent/LazyImageComponent")
);


const OnboardingPage = () => {
  const mode = "dark";
  const [activeStep, setActiveStep] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [dropdown, setDropdown] = useState(false);

  const [user, setUser] = useState("");

  const handleSkip = () => {
    setActiveStep(4);
  };


  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const AndriodUrl = "https://play.google.com/store/apps/details?id=io.redonion.mobile"
  const AppleUrl = "#"

  useEffect(() => {
    var userInfo = JSON.parse(localStorage.getItem('user'));
    setUser(userInfo?.user);
    
  }, [])


  return (
    <ThemeProvider theme={theme}>
      <Box
        p={2}
        className={styles.mainBox}
        bgcolor={"#000"}
        style={{
          backgroundImage: `url(${isMobile ? BgColorTopMObile : BgColorTop})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
          height: '100%',

        }}
      >
        <Stack
          mb={8}
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
              <LazyImageComponent
                className={styles.logo}
                src={MainOnboardingLogo}
              />
            </Suspense>
          </Box>
          {isMobile ? (
            <Box>
              <Button
                onClick={() =>
                  setDropdown(!dropdown)
                }
              >
                <LazyImageComponent
                  className={styles.logo}
                  src={dropdown ? Close : Handburger}

                />
              </Button>
              {dropdown &&
                <Box style={{ position: 'absolute', left: 0, right: 0, background: '#000', padding: 30 }}>
                  <center>
                    <Box >
                      <Button
                        color="secondary"

                      >
                        <Typography variant="caption" fontSize={14} p={0.3} color="background.light">
                          <a

                            style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}
                            href={user ?  "/user/sign-in" : "/auth/sign-in"}
                          >
                            Log in
                          </a>
                        </Typography>
                      </Button>
                    </Box>
                    <Box>
                      <Button fullWidth variant="contained" color="primary">
                        <Typography variant="caption" fontSize={14} p={0.3} color="background.light">
                          <a
                            style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}
                            href={user ? "/user/sign-in" :  "/registration/sign-up"}
                          >

                            Create Account

                          </a>
                        </Typography>
                      </Button>
                    </Box>
                  </center>
                </Box>
              }
            </Box>
          ) : (
            <Stack direction="row"
              justifyContent="space-between">
              <Box mr={2}>
                <Button
                  color="secondary"

                >
                  <Typography variant="caption" p={0.3} color="background.light">
                    <a

                      style={{ textDecoration: "none", color: "inherit", textTransform: "none", fontSize: 15, fontWeight: 500 }}
                        href={user ? "/user/sign-in" :  "/auth/sign-in"}
                    >
                      Log in
                    </a>
                  </Typography>
                </Button>
              </Box>
              <Box>
                <Button fullWidth variant="contained" color="primary">
                  <Typography variant="caption" p={0.3} color="background.light">
                    <a
                      style={{ textDecoration: "none", color: "inherit", textTransform: "none", fontSize: 15, fontWeight: 500 }}
                        href={user ? "/user/sign-in" :  "/registration/sign-up"}
                    >

                      Create Account

                    </a>
                  </Typography>
                </Button>
              </Box>

            </Stack>
          )}


        </Stack>
        <Stack
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={8}
        >
          <LazyImageComponent

            src={isMobile ? BuyMobile : Buy}
          />

          <Box mt={isMobile ? 4 : 13}>
            <Button variant="contained" color="primary">
              <Typography variant="caption" p={isMobile ? 1 : 1} fontSize={isMobile ? 16 : 18} color="background.light">
                <a
                  style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}
                  href="/registration/sign-up"
                >

                  Get started for free

                </a>
              </Typography>
            </Button>


          </Box>
        </Stack>
        {!isMobile ? (
          <Box className={styles.marl} >
            <Box mt={'27%'}>
              <Typography variant="caption" fontSize={40} fontWeight={600} color="background.light">
                P2P crypto transactions.
              </Typography>


            </Box>
            <Box ml={-10} mt={-6}>
              <Suspense
                fallback={<Skeleton variant="circular" />}
              >
                <LazyImageComponent
                  className={styles.transa}
                  src={Image1}

                />
              </Suspense>
            </Box>
            <Box mt={-6}>
              <Typography variant="caption" fontSize={20} fontWeight={600} color="background.light">
                Sign up now to find your best P2P match for free!
              </Typography>
            </Box>
            <Box mt={4}>
              <Button variant="contained" color="primary">
                <Typography variant="caption" p={1} pl={4} pr={4} fontSize={18} color="background.light">
                  <a
                    style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}
                    href={user ? "/user/sign-in" : "/registration/sign-up"}
                  >

                    Get started

                  </a>
                </Typography>
              </Button>


            </Box>
            <Box mt={5}>
              <Stack
                direction="row" justifyContent="space-between"
              >
                <Box>
                  <Box mt={15}>
                    <Typography variant="caption" fontSize={40} fontWeight={600} color="background.light">
                      Seamless value exchange.
                    </Typography>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="caption" fontSize={20} fontWeight={500} color="background.light">
                      Choose who you exchange your cash with in simple steps.
                    </Typography>
                  </Box>
                  <Stack direction="row" mt={4}>
                    <Box mt={1} mr={3}>
                      <LazyImageComponent
                        src={ImageNum1}
                      />
                    </Box>
                    <Box mr={3}>
                      <LazyImageComponent
                        src={Image100}
                      />
                    </Box>
                    <Box mt={1}>
                      <Typography variant="caption" fontSize={18} fontWeight={400} color="background.light">
                        Enter the amount you have
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" mt={4}>
                    <Box mt={1} mr={3}>
                      <LazyImageComponent
                        src={ImageNum2}
                      />
                    </Box>
                    <Box mr={3}>
                      <LazyImageComponent
                        src={ImageB}
                      />
                    </Box>
                    <Box mt={1}>
                      <Typography variant="caption" fontSize={18} fontWeight={400} color="background.light">
                        Select the crypto currency you want
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" mt={4}>
                    <Box mt={1} mr={3}>
                      <LazyImageComponent
                        src={ImageNum3}
                      />
                    </Box>
                    <Box mt={-1} mr={3}>
                      <LazyImageComponent
                        src={ImageSearch}
                      />
                    </Box>
                    <Box mt={1}>
                      <Typography variant="caption" fontSize={18} fontWeight={400} color="background.light">
                        ...and click search!
                      </Typography>
                    </Box>
                  </Stack>

                  <Box mt={4}>
                    <Button variant="contained" color="primary">
                      <Typography variant="caption" p={1} pl={4} pr={4} fontSize={18} color="background.light">
                        <a
                          style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}
                          href={user ? "/user/sign-in" : "/registration/sign-up"}
                        >

                          Get started

                        </a>
                      </Typography>
                    </Button>


                  </Box>

                </Box>
                <Box width={"50%"} >
                  <Suspense
                    fallback={<Skeleton variant="rectangular" />}
                  >
                    <LazyImageComponent
                      src={Phone}
                      className={styles.transa40}
                    />
                  </Suspense>
                </Box>
              </Stack>
            </Box>

            <Box mt={15}>
              <Box>
                <Typography variant="caption" fontSize={40} fontWeight={600} color="background.light">
                  Set your own rates.
                </Typography>
              </Box>

              <Box mt={0}>
                <Typography variant="caption" fontSize={16} fontWeight={500} color="background.light">
                  Make an offer for what you want at your own exchange rate.
                </Typography>
              </Box>

              <Box ml={-10} mt={-5}>
                <LazyImageComponent
                  className={styles.transa}
                  src={Image3}
                />
              </Box>
            </Box>

            <Box mt={10}>
              <Box>
                <Typography variant="caption" fontSize={36} fontWeight={600} color="background.light">
                  The Marketplace for the modern professional.
                </Typography>
              </Box>


              <Box mr={"18%"} mt={4} bgcolor={"#EEEEEE"} borderRadius={10}>
                <center>
                  <Suspense
                    fallback={<Skeleton variant="circular" />}
                  >
                    <LazyImageComponent
                      className={styles.transa40}
                      src={HalfPhone}
                    />
                  </Suspense>
                </center>
                <Box mt={-10} ml={4} >
                  <Typography variant="caption" fontSize={30} fontWeight={600} color="#202020">
                    Transaction monitoring
                  </Typography>
                </Box>

                <Box ml={4} pb={5}>
                  <Typography variant="caption" fontSize={24} fontWeight={400} color="#202020">
                    Monitor your transactions as you recieve your money.
                  </Typography>
                  <br />
                </Box>




              </Box>

              <Box mt={6} >
                <Button variant="contained" color="primary">
                  <Typography variant="caption" p={1} pl={4} pr={4} fontSize={18} color="background.light">
                    <a
                      style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}
                      href={user ? "/user/sign-in" : "/registration/sign-up"}
                    >

                      Get started

                    </a>
                  </Typography>
                </Button>


              </Box>

            </Box>


            <Box mt={15}>
              <Box>
                <Typography variant="caption" fontSize={40} fontWeight={600} color="background.light">
                  Exchange on the go. Anytime, anywhere.
                </Typography>
              </Box>


              <Stack mt={5} direction="row" >

                <Box width={"60%"}>
                  <Suspense
                    fallback={<Skeleton variant="circular" />}
                  >
                    <LazyImageComponent
                      className={styles.transa}
                      src={ExchangeDemo}

                    />
                  </Suspense>
                </Box>

                <Box ml={8}>
                  <center>
                    <Box>
                      <LazyImageComponent

                        src={Image6}
                      />
                    </Box>

                    <Box mt={3}>

                      <Typography variant="caption" fontSize={24} fontWeight={400} color="background.light">
                        Scan to download
                      </Typography>

                    </Box>

                    <Box mt={-1}>

                      <Typography variant="caption" fontSize={36} fontWeight={600} color="background.light">
                        iOS & Android
                      </Typography>

                    </Box>

                    <Stack mt={3} direction="row" >

                      <Box>
                        <LazyImageComponent
                          src={ImageAppleStore}
                        />
                      </Box>

                      <Box ml={1.4}>
                        <LazyImageComponent
                          src={ImagePlayStore}
                        />
                      </Box>

                    </Stack>



                  </center>
                </Box>

              </Stack>


            </Box>

            <Stack mt={8} direction="row" >

              <Box >
                <LazyImageComponent
                  src={Image7}
                // className={styles.transa40}
                />
              </Box>

              <Box ml={"5%"} mt={6}>

                <Box>
                  <Typography variant="caption" fontSize={40} fontWeight={600} color="background.light">
                    All trades are held in escrow pending <br />value exchange.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" fontSize={24} fontWeight={400} color="background.light">
                    At Red Onion, we are very concerned with user protection <br />
                    and the safety of your transactions
                  </Typography>
                </Box>

                <Box mt={6} >
                  <Button variant="contained" color="primary">
                    <Typography variant="caption" p={1} pl={4} pr={4} fontSize={18} color="background.light">
                      <a
                        style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}
                        href={user ? "/user/sign-in" : "/registration/sign-up"}
                      >

                        Get started with Red Onion
                      </a>
                    </Typography>
                  </Button>


                </Box>

              </Box>

            </Stack>

          </Box>
        ) : (
          <Box>
            <Box  >
              <center>
                <Box mt={'95%'}>
                  <Typography variant="caption" fontSize={24} fontWeight={600} color="background.light">
                    P2P crypto transactions.
                  </Typography>


                </Box>

                <Box ml={0} mt={-4}>
                  <Suspense
                    fallback={<Skeleton variant="circular" />}
                  >
                    <LazyImageComponent
                      className={styles.transa100}
                      src={isMobile ? ImageMobile1 : Image1}

                    />
                  </Suspense>
                </Box>

                <Box mt={-4}>
                  <Typography variant="caption" fontSize={16} fontWeight={400} color="background.light">
                    Sign up now to find your best P2P match for free!
                  </Typography>
                </Box>

                <Box mt={4}>
                  <Button variant="contained" color="primary">
                    <Typography variant="caption" p={1} pl={4} pr={4} fontSize={16} color="background.light">
                      <a
                        style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}
                          href={user ? "/user/sign-in" : "/registration/sign-up"}
                      >

                        Get started

                      </a>
                    </Typography>
                  </Button>


                </Box>

                <Box mt={6}>

                  <Box>
                    <Box mt={3}>
                      <Typography variant="caption" fontSize={24} fontWeight={600} color="background.light">
                        Seamless value exchange.
                      </Typography>
                    </Box>
                    <Box pl={4} pr={4}>
                      <Typography variant="caption" fontSize={16} fontWeight={400} color="background.light">
                        Choose who you exchange your cash with in simple steps.
                      </Typography>
                    </Box>
                    <Stack mt={2}>
                      <Box mt={1} mr={3}>
                        <LazyImageComponent
                          src={ImageNum1}
                        />
                      </Box>
                      <Box mt={2} mr={3}>
                        <LazyImageComponent
                          src={Image100}
                        />
                      </Box>
                      <Box >
                        <Typography variant="caption" fontSize={16} fontWeight={400} color="background.light">
                          Enter the amount you have
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack mt={4}>
                      <Box mt={1} mr={3}>
                        <LazyImageComponent
                          src={ImageNum2}
                        />
                      </Box>
                      <Box mt={2} mr={3}>
                        <LazyImageComponent
                          src={ImageB}
                        />
                      </Box>
                      <Box mt={1}>
                        <Typography variant="caption" fontSize={16} fontWeight={400} color="background.light">
                          Select the crypto currency you want
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack mt={4}>
                      <Box mt={1} mr={3}>
                        <LazyImageComponent
                          src={ImageNum3}
                        />
                      </Box>
                      <Box mt={2} mr={3}>
                        <LazyImageComponent
                          src={ImageSearch}
                        />
                      </Box>
                      <Box mt={1}>
                        <Typography variant="caption" fontSize={16} fontWeight={400} color="background.light">
                          ...and click search!
                        </Typography>
                      </Box>
                    </Stack>

                    <Box mt={4.5}>
                      <Button variant="contained" color="primary">
                        <Typography variant="caption" p={1} pl={4} pr={4} fontSize={16} color="background.light">
                          <a
                            style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}
                              href={user ? "/user/sign-in" : "/registration/sign-up"}
                          >

                            Get started

                          </a>
                        </Typography>
                      </Button>


                    </Box>

                  </Box>

                </Box>


                <Box mt={8}>
                  <Box>
                    <Typography variant="caption" fontSize={24} fontWeight={600} color="background.light">
                      Set your own rates.
                    </Typography>
                  </Box>

                  <Box mt={0}>
                    <Typography variant="caption" fontSize={16} fontWeight={400} color="background.light">
                      Make an offer for what you want at your own exchange rate.
                    </Typography>
                  </Box>

                  <Box ml={0} mt={-8}>
                    <LazyImageComponent
                      className={styles.transa100}
                      src={isMobile ? ImageMobile3 : Image3}
                    />
                  </Box>
                </Box>

                <Box mt={10}>
                  <Box>
                    <Typography variant="caption" fontSize={24} fontWeight={600} color="background.light">
                      The Marketplace for the
                    </Typography>

                  </Box>
                  <Box mt={-1}>
                    <Typography variant="caption" fontSize={24} fontWeight={600} color="background.light">
                      modern professional.
                    </Typography>

                  </Box>


                  <Box mt={4} bgcolor={"#EEEEEE"} borderRadius={10}>
                    <center>
                      <Suspense
                        fallback={<Skeleton variant="circular" />}
                      >
                        <LazyImageComponent
                          className={styles.transa100}
                          src={HalfPhone}
                        />
                      </Suspense>
                    </center>
                    <Box mt={-10}  >
                      <Typography variant="caption" fontSize={24} fontWeight={500} color="#202020">
                        Transaction monitoring
                      </Typography>
                    </Box>

                    <Box pr={3} pl={3} pb={5}>
                      <Typography variant="caption" fontSize={16} fontWeight={400} color="#202020">
                        Monitor your transactions as you recieve your money.
                      </Typography>
                      <br />
                    </Box>




                  </Box>

                  <Box mt={4} >
                    <Button variant="contained" color="primary">
                      <Typography variant="caption" p={1} pl={4} pr={4} fontSize={16} color="background.light">
                        <a
                          style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}
                            href={user ? "/user/sign-in" : "/registration/sign-up"}
                        >

                          Get started

                        </a>
                      </Typography>
                    </Button>


                  </Box>

                </Box>


                <Box mt={10}>
                  <Box>
                    <Typography variant="caption" fontSize={24} lineHeight={1.3} fontWeight={600} color="background.light">
                      Exchange on the go. Anytime, anywhere.
                    </Typography>
                  </Box>


                  <Stack mt={5}>

                    <Box >
                      <Suspense
                        fallback={<Skeleton variant="circular" />}
                      >
                        <LazyImageComponent
                          className={styles.transa100}
                          src={ExchangeDemo}

                        />
                      </Suspense>
                    </Box>

                    <Box mt={1}>
                      <center>
                        <Box>
                          <LazyImageComponent

                            src={Image6}
                          />
                        </Box>

                        <Box mt={3}>

                          <Typography variant="caption" fontSize={16} fontWeight={400} color="background.light">
                            Scan to download
                          </Typography>

                        </Box>

                        <Box mt={-1}>

                          <Typography variant="caption" fontSize={24} fontWeight={600} color="background.light">
                            iOS & Android
                          </Typography>

                        </Box>

                        <Stack mt={3} direction="row" alignItems="center" justifyContent="center" >

                          <Box>
                            <LazyImageComponent
                              src={ImageAppleStore}
                            />
                          </Box>

                          <Box ml={1.4}>
                            <LazyImageComponent
                              src={ImagePlayStore}
                            />
                          </Box>

                        </Stack>



                      </center>
                    </Box>

                  </Stack>


                </Box>

                <Stack mt={10} >

                  <Box >
                    <LazyImageComponent
                      src={Image7}
                      className={styles.transa40}
                    />
                  </Box>

                  <Box mt={2}>

                    <Box pr={2} pl={2}>
                      <Typography variant="caption" fontSize={22} lineHeight={1.4} fontWeight={600} color="background.light">
                        All trades are held in escrow pending value exchange.
                      </Typography>
                    </Box>

                    <Box mt={2}>
                      <Typography variant="caption" fontSize={16} fontWeight={400} color="background.light">
                        At Red Onion, we are very concerned with user protection
                        and the safety of your transactions
                      </Typography>
                    </Box>

                    <Box mt={6}  >
                      <Button variant="contained" color="primary">
                        <Typography variant="caption" p={1} pl={4} pr={4} fontSize={16} color="background.light">
                          <a
                            style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}
                              href={user ? "/user/sign-in" : "/registration/sign-up"}
                          >

                            Get started with Red Onion
                          </a>
                        </Typography>
                      </Button>


                    </Box>

                  </Box>

                </Stack>
              </center>
            </Box>

          </Box>
        )}
      </Box>
      {/* Footer */}
      {!isMobile ? (
        <Box mt={-15} bgcolor={"#F6F0F8"} pl={18} pr={18} pt={6} pb={3}>

          <Stack direction="row" justifyContent="space-between">
            <Box width={"50%"}>
              <Stack direction="row" alignItems="left" justifyContent="space-between">

                <Box>
                  <Box>
                    <Typography variant="caption" fontSize={18} fontWeight={500} color="#3063E9">
                      About us
                    </Typography>
                  </Box>
                  <Box mt={1}>
                    <a href="redonion/terms-and-condition" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        Terms of service

                      </Typography>
                    </a>
                  </Box>

                  <Box>
                    <a href="redonion/privacy-policy" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        Privacy policy

                      </Typography>
                    </a>
                  </Box>
                  <Box>
                    <a href="redonion/aml" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        AML

                      </Typography>
                    </a>
                  </Box>

                  <Box >
                    <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        Announcements

                      </Typography>
                    </a>
                  </Box>

                     {/* <Box mt={1}>
                    <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        Fees

                      </Typography>
                    </a>
                  </Box> */}

                </Box> 

                <Box >
                  <Box>
                    <Typography variant="caption" fontSize={18} fontWeight={500} color="#3063E9">
                      Support
                    </Typography>
                  </Box>
                  <Box mt={1}>
                    <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        support@redonion.io

                      </Typography>
                    </a>
                  </Box>

                  <Box>
                    <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        +234 0000 000 000

                      </Typography>
                    </a>
                  </Box>

                  <Box >
                    <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        Twitter support

                      </Typography>
                    </a>
                  </Box>

                  <Box mt={1}>
                    <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        Call lines are open <br />
                        08:00 to 17:00 WAT, <br />
                        Mondays - Fridays

                      </Typography>
                    </a>
                  </Box>

                </Box>

                <Box>
                  <Box>
                    <Typography variant="caption" fontSize={18} fontWeight={500} color="#3063E9">
                      Community
                    </Typography>
                  </Box>
                  <Stack direction="row" justifyContent="space-evenly" mt={1}>
                    <Box>
                      <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                        <LazyImageComponent src={Instagram} />
                      </a>
                    </Box>

                    <Box>
                      <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                        <LazyImageComponent src={Twitter} />
                      </a>
                    </Box>

                    <Box>
                      <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                        <LazyImageComponent src={Facebook} />
                      </a>
                    </Box>
                  </Stack>

                </Box>

              </Stack>
            </Box>

            <Box >
              <Stack mt={3} direction="row" >

                <Box>
                  <LazyImageComponent
                    src={ImageAppleStore}
                  />
                </Box>

                <Box ml={1.4}>
                  <LazyImageComponent
                    src={ImagePlayStore}
                  />
                </Box>

              </Stack>
            </Box>
          </Stack>
          <br />
          <Box  >
            <Suspense
              fallback={<Skeleton variant="circular" height={30} width={110} />}
            >
              <LazyImageComponent
                className={styles.logo}
                src={MainOnboardingLogo}
              />
            </Suspense>
          </Box>

        </Box>
      ) : (
        <Box mt={-35} bgcolor={"#F6F0F8"} pl={6} pr={2} pt={6} pb={3}>

          <Stack >
            <Box >
              <Stack alignItems="left" >

                <Box>
                  <Box>
                    <Typography variant="caption" fontSize={18} fontWeight={500} color="#3063E9">
                      About us
                    </Typography>
                  </Box>
                  <Box mt={1}>
                      <a href="redonion/terms-and-condition" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        Terms of service

                      </Typography>
                    </a>
                  </Box>

                  <Box>
                      <a href="redonion/privacy-policy" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        Privacy policy

                      </Typography>
                    </a>
                  </Box>

                  <Box >
                      <a href="redonion/aml" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        Announcements

                      </Typography>
                    </a>
                  </Box>

                  <Box mt={1}>
                    <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        Fees

                      </Typography>
                    </a>
                  </Box>

                </Box>

                <Box mt={4}>
                  <Box>
                    <Typography variant="caption" fontSize={18} fontWeight={500} color="#3063E9">
                      Support
                    </Typography>
                  </Box>
                  <Box mt={1}>
                    <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        support@redonion.io

                      </Typography>
                    </a>
                  </Box>

                  <Box>
                    <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        +234 0000 000 000

                      </Typography>
                    </a>
                  </Box>

                  <Box >
                    <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        Twitter support

                      </Typography>
                    </a>
                  </Box>

                  <Box mt={1}>
                    <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                      <Typography variant="caption" fontSize={18} fontWeight={300} color="#202020">

                        Call lines are open <br />
                        08:00 to 17:00 WAT, <br />
                        Mondays - Fridays

                      </Typography>
                    </a>
                  </Box>

                </Box>

                <Box mt={4}>
                  <Box>
                    <Typography variant="caption" fontSize={18} fontWeight={500} color="#3063E9">
                      Community
                    </Typography>
                  </Box>
                  <Stack direction="row" mt={1}>
                    <Box mr={2}>
                      <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                        <LazyImageComponent src={Instagram} />
                      </a>
                    </Box>

                    <Box mr={2}>
                      <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                        <LazyImageComponent src={Twitter} />
                      </a>
                    </Box>

                    <Box>
                      <a href="https://" style={{ textDecoration: "none", color: "inherit", textTransform: "none" }}>
                        <LazyImageComponent src={Facebook} />
                      </a>
                    </Box>
                  </Stack>

                </Box>

              </Stack>
            </Box>

            <Box >
              <Stack mt={3}  >

                <Box>
                  <LazyImageComponent
                    src={ImageAppleStore}
                    className={styles.transa40}
                  />
                </Box>

                <Box mt={1}>
                  <LazyImageComponent
                    src={ImagePlayStore}
                    className={styles.transa40}
                  />
                </Box>

              </Stack>
            </Box>
          </Stack>
          <br /><br />
          <Box  >
            <Suspense
              fallback={<Skeleton variant="circular" height={30} width={110} />}
            >
              <LazyImageComponent
                className={styles.logo}
                  src={MainOnboardingLogo}
              />
            </Suspense>
          </Box>
          <br />

        </Box>
      )}
    </ThemeProvider>
  );
};

export default OnboardingPage;
