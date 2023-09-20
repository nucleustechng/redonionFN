import React, { Suspense } from "react";

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
import Handburger from "../../assets/handburger.svg";
import Close from "../../assets/close.svg";

import bg from "../../assets/authBg.svg";

import MainLogoDark from "../../assets/mainLogo.svg";
import HandburgerDark from "../../assets/handburgerDark.svg";
import CloseDark from "../../assets/closeDark.svg";

// Components
import AccountSetupStep from "./AccountSetupStep/AccountSetupStep";
import {
  QontoConnector,
  QontoStepIcon,
} from "../../components/CustomStepper/CustomStepper";
import KYCStep from "./KYCStep/KYCStep";
import BankStep from "./BankStep/BankStep";
import ComponentLoader from "../../components/ProgressLoader/ComponentLoader";

// Lazy Image
const LazyImageComponent = React.lazy(() =>
  import("../../components/LazyImageComponent/LazyImageComponent")
);

// Steps array
const steps = [
  {
    label: "Account Setup",
  },
  {
    label: "KYC",
  },
  {
    label: "Bank Details",
  },
];

const AccountSetup = () => {
  // Stepper states
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const navigate = useNavigate();

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

  // Theme
  const theme = useTheme();
  console.log("theme", theme);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
     
        <Box
          bgcolor={theme.palette.background.default}
          className={styles.mainBox}
        >
          <Grid
            container
            columns={{ xs: 1, md: 12 }}
            spacing={{ xs: 3, md: 8 }}
          >
            <Grid item xs={12} md={1}>
              <Box className={styles.logoBox}>
                <Suspense
                  fallback={
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={40}
                      height={40}
                      sx={{
                        backgroundColor: `${
                          theme.palette.mode === "dark" ? "#111" : "#f5f5f5"
                        }`,
                      }}
                    />
                  }
                >
                  <LazyImageComponent
                    style={{ width: "50px", height: "50px" }}
                    src={MainVectorLogo}
                  />
                </Suspense>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className={styles.stepBox}>
                <Paper
                  className={styles.contentBox}
                  elevation={0}
                  sx={{ borderRadius: "10px" }}
                >
                  <Box
                    bgcolor={theme.palette.background.surface}
                    borderRadius="10px"
                  >
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
                                  onClick={
                                    activeStep !== 0 ? handleBack : undefined
                                  }
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
                            <Stack px={5} py={2} spacing={1}>
                              {activeStep === steps.length - 1 ? (
                                <>
                                  {theme.palette.mode === "dark" ? (
                                    <Button
                                      color="primary"
                                      variant="contained"
                                      onClick={() =>
                                        navigate(
                                          "/registration/two-factor-auth"
                                        )
                                      }
                                    >
                                      Finish
                                    </Button>
                                  ) : (
                                    <LightUIButtonPrimary
                                      color="primary"
                                      variant="contained"
                                      onClick={() =>
                                        navigate(
                                          "/registration/two-factor-auth"
                                        )
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
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                className={styles.illustrationBox}
                bgcolor={
                  theme.palette.mode === "dark"
                    ? "#2b2b2b"
                    : "rgba(255, 230, 0, 0.13)"
                }
              >
                <Suspense fallback={<ComponentLoader />}>
                  {activeStep === 0 && (
                    <LazyImageComponent
                      className={styles.accountStepImage}
                      src={AccountStepImageDark}
                    />
                  )}
                  {activeStep === 1 && (
                    <>
                      {theme.palette.mode === "dark" ? (
                        <LazyImageComponent
                          className={styles.kycStepImage}
                          src={KYCStepImageDark}
                        />
                      ) : (
                        <LazyImageComponent
                          className={styles.kycStepImage}
                          src={KYCStepImageLight}
                        />
                      )}
                    </>
                  )}
                  {activeStep === 2 && (
                    <>
                      {theme.palette.mode === "dark" ? (
                        <LazyImageComponent
                          className={styles.bankStepImage}
                          src={BankStepImageDark}
                        />
                      ) : (
                        <LazyImageComponent
                          className={styles.bankStepImage}
                          src={BankStepImageLight}
                        />
                      )}
                    </>
                  )}
                </Suspense>
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
