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

// Illustrations
import AccountStepImageDark from "../../assets/authenticationImages/accountSetupStep.svg";
import KYCStepImageDark from "../../assets/authenticationImages/kycStep.svg";
import KYCStepImageLight from "../../assets/authenticationImages/kycStepLight.svg";
import BankStepImageDark from "../../assets/authenticationImages/BankStepDark.svg";
import BankStepImageLight from "../../assets/authenticationImages/BankStepLight.svg";

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
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

 

  const navigate = useNavigate();

  

  useEffect(() => {


  }, []);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    console.log(newSkipped)
  };



  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const sendData = (data) => {

    setActiveStep(data);
    // console.log(prevActiveStep);
  }

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
        <Grid
          container

          columns={{ xs: 12, md: 12 }}

        >

          <Grid item xs={12} md={12}   >

            <Box className={styles.stepBox}   >
              <Paper
                className={!isMobile ? styles.contentBox : ""}
                elevation={2}
                sx={{ borderRadius: "10px" }}

              >

                {(activeStep === 0 || activeStep === 2 || activeStep === 4) && (
                  <Box
                    bgcolor={theme.palette.background.surface}

                    p={!isMobile ? 5 : 3}

                  >
                    {(activeStep === 0) && (
                      <Box
                        pl={0} mb={3} pt={0} bgcolor={theme.palette.background.surface}>
                       <Button
                          style={{ textDecoration: "none", color: "inherit", textTransform: "none", marginLeft: "-20px", marginTop: "0", marginBottom: "25px" }}

                          color="secondary">
                          <a

                            href="/dashboard/exchange"
                          >
                            <LazyImageComponent src={Back} />
                          </a>

                        </Button>

                        <Box 
                        style={{ float: "right"}}
                        >
                          <Button
                            onClick={()=> navigate("/dashboard/exchange")}
                            style={{ textDecoration: "none", color: "inherit", textTransform: "none", marginLeft: "-20px", marginTop: "0", marginBottom: "25px" }}

                            color="secondary">
                            <Typography
                              variant="h3"
                              color="secondaryDark"
                              fontWeight={500}
                              fontSize={20}
                            >
                             Skip
                            </Typography>

                          </Button>

                        </Box>

                      </Box>
                    )}

                    <Box>

                      <Typography
                        className={styles.titleBox}
                        variant="h3"
                        color="secondaryDark"
                        fontWeight={500}

                      >
                        Welcome to Red Onion! Let's get your profile set up
                      </Typography>
                      <Box pt={3} mt={2}>
                        <Stepper
                          // alternativeLabel
                          // activeStep={activeStep}
                          orientation="vertical"
                        // connector={<QontoConnector />}
                        >




                          {steps.map((step, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepSkipped(index)) {
                              stepProps.completed = false;
                            }

                            return (
                              <>
                                {step.label !== "" && (
                                  <Box
                                    button
                                    onClick={activeStep === index ? handleNext : null}
                                    key={step.label}
                                    {...stepProps}
                                    p={2}
                                    mb={3.5}
                                    sx={{ borderRadius: "10px", cursor: activeStep === index ? "pointer" : "" }}
                                    bgcolor={
                                      activeStep === index
                                        ? "#3063E9"
                                        : "#E8E8F3"
                                    }
                                    
                                  >
                                    <Stack
                                      direction="row"
                                      justifyContent="space-between"
                                    >
                                      <Box>
                                        <Stack
                                          direction="row"
                                          justifyContent="start"
                                        >
                                          <Box
                                            width={50}
                                            height={50}
                                            borderRadius={"50%"}
                                            bgcolor={"#fff"}
                                          >
                                            <Typography
                                              variant="caption"
                                              color="#3063E9"
                                              fontWeight={500}
                                              fontSize={24}
                                              display={"flex"}
                                              justifyContent={"center"}
                                              pt={0.8}
                                            >
                                              {index === 2
                                                ? index
                                                : index === 4
                                                ? 3
                                                : index + 1}
                                            </Typography>
                                          </Box>

                                          <Typography
                                            variant="caption"
                                            color={
                                              activeStep === index
                                                ? "background.light"
                                                : "#202020"
                                            }
                                            fontWeight={500}
                                            fontSize={18}
                                            display={"flex"}
                                            alignItems={"center"}
                                            ml={2}
                                          >
                                            {step.label}
                                          </Typography>
                                        </Stack>
                                      </Box>
                                      {activeStep === index && (
                                        <LazyImageComponent src={FrontArrow} />
                                      )}
                                    </Stack>
                                  </Box>
                                )}
                              </>
                            );
                          })}
                        </Stepper>
                      </Box>

                    </Box>
                  </Box>
                )}
                {/* {activeStep === 1 && (
                  <Box>
                    <Suspense fallback={<ComponentLoader />}>
                      <PhotoStep sendData={sendData} />
                   
                    </Suspense>
                  </Box>
                )}

                {activeStep === 3 && (
                  <Box>
                    <Suspense fallback={<ComponentLoader />}>
                      <BankStep sendData={sendData} />
                    </Suspense>
                  </Box>
                )}

                {activeStep === 5 && (
                  <Box>
                    <Suspense fallback={<ComponentLoader />}>
                      <AccountSetupStep />
                    </Suspense>
                  </Box>
                )} */}
              </Paper>
            </Box>


          </Grid>




        </Grid>
      </Box>

      {/* {isMobile && (
        <Box className={styles.stepBoxMobile}>
          <Paper className={styles.contentBoxMobile} elevation={0}>
            <Box bgcolor={theme.palette.background.surface}>
              <Box>
                <Box pt={3}>
                  <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    connector={<QontoConnector />}
                  >
                    {steps.map((step, index) => {
                      const stepProps = {};
                      const labelProps = {};
                      if (isStepSkipped(index)) {
                        stepProps.completed = false;
                      }
                      return (
                        <Step key={step.label} {...stepProps}>
                          <StepLabel
                            onClick={activeStep !== 0 ? handleBack : undefined}
                            StepIconComponent={QontoStepIcon}
                            {...labelProps}
                          >
                            <Typography variant="caption">
                              {step.label}
                            </Typography>
                          </StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </Box>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography textAlign="center" sx={{ mt: 5, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        pt: 2,
                      }}
                    >
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                    mt={2}
                  >
                    {activeStep === 0 && (
                      <Box>
                        <Suspense fallback={<ComponentLoader />}>
                          <AccountSetupStep />
                        </Suspense>
                      </Box>
                    )}
                    {activeStep === 1 && (
                      <Box>
                        <Suspense fallback={<ComponentLoader />}>
                          <KYCStep />
                        </Suspense>
                      </Box>
                    )}
                    {activeStep === 2 && (
                      <Box>
                        <Suspense fallback={<ComponentLoader />}>
                          <BankStep />
                        </Suspense>
                      </Box>
                    )}
                    <Box
                      borderRadius={"10px"}
                      bgcolor={theme.palette.background.paper}
                    >
                      <Stack px={3} py={2} spacing={1}>
                        {activeStep === steps.length - 1 ? (
                          <>
                            {theme.palette.mode === "dark" ? (
                              <Button
                                color="primary"
                                variant="contained"
                                onClick={() =>
                                  navigate("/registration/two-factor-auth")
                                }
                              >
                                Finish
                              </Button>
                            ) : (
                              <LightUIButtonPrimary
                                color="primary"
                                variant="contained"
                                onClick={() =>
                                  navigate("/registration/two-factor-auth")
                                }
                              >
                                Finish
                              </LightUIButtonPrimary>
                            )}
                          </>
                        ) : (
                          <>
                            {theme.palette.mode === "dark" ? (
                              <Button
                                color="primary"
                                variant="contained"
                                onClick={handleNext}
                              >
                                Proceed
                              </Button>
                            ) : (
                              <LightUIButtonPrimary
                                color="primary"
                                variant="contained"
                                onClick={handleNext}
                              >
                                Proceed
                              </LightUIButtonPrimary>
                            )}
                          </>
                        )}

                        <Button
                          color="primary"
                          variant="text"
                          onClick={handleSkip}
                          sx={{ mr: 1 }}
                        >
                          Skip
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        </Box>
      )} */}
    </React.Fragment>
  );
};

export default AccountSetup;
