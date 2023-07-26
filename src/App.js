// React
import React, { createContext, Suspense, useState, useEffect } from "react";

import NoInternet from "./components/NoInternet";
// Material UI
import Box from "@mui/system/Box";
import CustomTheme from "./Theme/CustomTheme";
import { ThemeProvider } from "@mui/system";

// Helmet
import Helmet from "react-helmet";

// Router
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Styles
import "./App.css";

// Progress Loader
import ProgressLoader from "./components/ProgressLoader/ProgressLoader";

// Auth Provider
import AuthProvider from "./contexts/AuthProvider";
import { ModalSkeletons } from "./components/Skeletons/ComponentSkeletons";

// Custom Title and Description imports
import { appTitle, appDescription } from "./Utilities/Customs";

// Navigation Routes
import NavRoutes from "./NavigationRoutes";

/**********************************
          Lazy Pages
***********************************/

// Registration
const Registration = React.lazy(() =>
  import("./Pages/Registration/Registration")
);
const SignUpInterface = React.lazy(() =>
  import("./Pages/Registration/SignUpInterface/SignUpInterface")
);

const VerifyEmailPage = React.lazy(() =>
  import("./Pages/Registration/EmailVerify/EmailVerification")
);

const TwoFAEmailPage = React.lazy(() =>
  import("./Pages/Registration/EmailVerify/OTPVerification")
);
const TwoFAPage = React.lazy(() =>
  import("./Pages/Registration/TwoFAPage/TwoFAPage")
);
const TwoFAPin = React.lazy(() =>
  import("./Pages/Registration/TwoFAPage/TwoFAPin")
);

// Login
const Login = React.lazy(() => import("./Pages/Login/Login"));
const SignInInterface = React.lazy(() =>
  import("./Pages/Login/SignInInterface/SignInInterface")
);

const SignInInterfaceUser = React.lazy(() =>
  import("./Pages/Login/SignInInterface/SignInInterfaceUser")
);
const ForgotPass = React.lazy(() =>
  import("./Pages/Login/ForgotPass/ForgotPass")
);
const ResetPass = React.lazy(() => import("./Pages/Login/ResetPass/ResetPass"));

// Account Setup
const AccountSetup = React.lazy(() =>
  import("./Pages/AccountSetup/AccountSetup")
);

const OTPVerification = React.lazy(() =>
  import("./Pages/Login/OTPVerification/OTPVerification")
);

// Private Route
const PrivateRoute = React.lazy(() => import("./Private/PrivateRoute"));

// Wallets
const Wallets = React.lazy(() => import("./Pages/Wallets/Wallets"));
const Dashboard = React.lazy(() =>
  import("./Pages/BuyWallet/Dashboard")
);
const FiatWallet = React.lazy(() => import("./Pages/History/History"));
const LoyaltyWallet = React.lazy(() =>
  import("./Pages/LoyaltyWallet/OngoingTransaction")
);

// Top Up
const TopUpPage = React.lazy(() => import("./Pages/TopUpPage/DashboardPage"));

// Coin details
const CoinDetails = React.lazy(() => import("./Pages/CoinDetails/CoinDetails"));

// Profile Page
const ProfileInterface = React.lazy(() =>
  import("./Pages/ProfilePage/ProfileInteface")
);

const SupportHelp = React.lazy(() => import("./Pages/SupportPage/SupportHelp"));

// Static Page
const StaticPageInterface = React.lazy(() =>
  import("./Pages/StaticPages/StaticPageInterface")
);
const TermsAndCondition = React.lazy(() =>
  import("./Pages/StaticPages/TermsAndCondition")
);
const PrivacyPolicy = React.lazy(() =>
  import("./Pages/StaticPages/PrivacyPolicy")
);

const AML = React.lazy(() => import("./Pages/StaticPages/AML"));
const About = React.lazy(() => import("./Pages/StaticPages/About"));
const Contact = React.lazy(() => import("./Pages/SupportPage/ContactPage"));
const FAQ = React.lazy(() => import("./Pages/StaticPages/FAQ"));

// Onboarding
const OnboardingPage = React.lazy(() =>
  import("./Pages/Onboarding/OnboardingPage.js")
);

// InstallationModal
const InstallationModal = React.lazy(() =>
  import("./components/InstallationModal/InstallationModal")
);

// Color Context
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener("online", handleStatusChange);

    // Listen to the offline status
    window.addEventListener("offline", handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);

  // Installation
  const [openInstallationModal, setOpenInstallationModal] = useState(false);

  // Title and Description
  const title = appTitle();
  const description = appDescription();

  // Installation Modal
  const handleOpenIstallationModal = () => {
    setOpenInstallationModal(true);
  };

  const handleCloseInstallationModal = () => {
    setOpenInstallationModal(false);
  };

  const { theme, colorMode } = CustomTheme();

  const colorModeTheme = localStorage.getItem("colorMode");
  if (!colorModeTheme) {
    // if (theme.palette.mode === "dark") {
    //   localStorage.setItem("colorMode", "dark");
    // } else {
    localStorage.setItem("colorMode", "light");
    // }
  } else if (colorModeTheme) {
    // if (theme.palette.mode === "dark") {
    //   localStorage.setItem("colorMode", "dark");
    // } else {
    localStorage.setItem("colorMode", "light");
    // }
  }

  return (
    <div>
      {isOnline ? (
        <AuthProvider>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <Helmet
                bodyAttributes={
                  theme.palette.mode === "dark"
                    ? { style: "background-color: #252628" }
                    : { style: "background-color: #fbfbfb" }
                }
                title={title ? title : "Red Onion"}
                description={description ? description : "Red Onion"}
                link={[
                  {
                    rel: "icon",
                    type: "image/png",
                    href: "../src/assets/mainLogo.svg",
                    sizes: "16x16",
                  },
                ]}
              />
              <Box bgcolor={theme.palette.background.default} className="App">
                <div className="container">
                  {/* <Suspense  fallback={<ModalSkeletons  />}>
                    <InstallationModal
                      open={openInstallationModal}
                      handleOpen={handleOpenIstallationModal}
                      onClose={handleCloseInstallationModal}
                    />
                  </Suspense> */}
                  <BrowserRouter>
                    <Routes>
                      <Route
                        path="/"
                        element={<Navigate replace to="/landing-page" />}
                      />
                      <Route
                        path={NavRoutes.OnboardingPage.path}
                        element={
                          <Suspense fallback={<ProgressLoader />}>
                            <OnboardingPage />
                          </Suspense>
                        }
                      />
                      {/* Registration Page */}
                      <Route
                        path={NavRoutes.Registration.path}
                        element={
                          <Suspense fallback={<ProgressLoader />}>
                            <Registration />
                          </Suspense>
                        }
                      >
                        {/* Sign Up Page */}
                        <Route
                          path={NavRoutes.SignUp.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <SignUpInterface />
                            </Suspense>
                          }
                        />

                        {/* Sign Up Page */}
                        <Route
                          path={NavRoutes.VerifyEmail.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <VerifyEmailPage />
                            </Suspense>
                          }
                        />
                        {/* 2fa email Page */}

                        {/* TwoFa Page */}
                        <Route
                          path={NavRoutes.TwoFactorAuth.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <TwoFAPage />
                            </Suspense>
                          }
                        />
                        {/* TwoFa Pin */}
                        <Route
                          path={NavRoutes.TwoFactorPin.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <TwoFAPin />
                            </Suspense>
                          }
                        />
                        {/* Login Page */}
                      </Route>
                      {/* Sign In User Page */}
                      <Route
                        path={NavRoutes.SignInUser.path}
                        element={
                          <Suspense fallback={<ProgressLoader />}>
                            <SignInInterfaceUser />
                          </Suspense>
                        }
                      />
                      {/* 2fa  Page */}
                      <Route
                        path={NavRoutes.TwoFAEmail.path}
                        element={
                          <Suspense fallback={<ProgressLoader />}>
                            <TwoFAEmailPage />
                          </Suspense>
                        }
                      />
                      <Route
                        path={NavRoutes.Login.path}
                        element={
                          <Suspense fallback={<ProgressLoader />}>
                            <Login />
                          </Suspense>
                        }
                      >
                        {/* Sign In Page */}
                        <Route
                          path={NavRoutes.SignIn.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <SignInInterface />
                            </Suspense>
                          }
                        />

                        {/* Forgot Pass Page */}
                        <Route
                          path={NavRoutes.ForgotPass.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <ForgotPass />
                            </Suspense>
                          }
                        />
                        {/* Reset Pass Page */}
                        <Route
                          path={NavRoutes.ResetPass.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <ResetPass />
                            </Suspense>
                          }
                        />
                        {/* OTP Verification Page */}
                        <Route
                          path={NavRoutes.OtpVerification.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <OTPVerification />
                            </Suspense>
                          }
                        />
                      </Route>
                      {/* Account Setup Page */}
                      <Route
                        path={NavRoutes.AccountSetup.path}
                        element={
                          <Suspense fallback={<ProgressLoader />}>
                            <PrivateRoute>
                              <AccountSetup />
                            </PrivateRoute>
                          </Suspense>
                        }
                      />
                      {/* Wallets */}
                      <Route
                        path={NavRoutes.Wallets.path}
                        element={
                          <Suspense fallback={<ProgressLoader />}>
                            <PrivateRoute>
                              <Wallets />
                            </PrivateRoute>
                          </Suspense>
                        }
                      >
                        <Route
                          path="/dashboard/:coinName"
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <PrivateRoute>
                                <CoinDetails />
                              </PrivateRoute>
                            </Suspense>
                          }
                        />
                        Crypto Wallet
                        <Route
                          path={NavRoutes.Dashboard.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <Dashboard />
                            </Suspense>
                          }
                        />
                        {/* Top Up */}
                        <Route
                          path={NavRoutes.TopUp.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <TopUpPage />
                            </Suspense>
                          }
                        />
                        {/* Fiat Wallet */}
                        <Route
                          path={NavRoutes.FiatWallet.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <FiatWallet />
                            </Suspense>
                          }
                        />
                        {/* Loyalty Wallet */}
                        <Route
                          path={NavRoutes.LoyaltyWallet.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <LoyaltyWallet />
                            </Suspense>
                          }
                        />
                      </Route>
                      <Route
                        path={NavRoutes.Account.path}
                        element={
                          <Suspense fallback={<ProgressLoader />}>
                            <PrivateRoute>
                              <ProfileInterface />
                            </PrivateRoute>
                          </Suspense>
                        }
                      ></Route>
                      <Route
                        path={NavRoutes.SupportHelp.path}
                        element={
                          <Suspense fallback={<ProgressLoader />}>
                            <PrivateRoute>
                              <SupportHelp />
                            </PrivateRoute>
                          </Suspense>
                        }
                      ></Route>
                      {/* Static Pages */}
                      <Route
                        path={NavRoutes.ThriftyWallet.path}
                        element={
                          <Suspense fallback={<ProgressLoader />}>
                            <StaticPageInterface />
                          </Suspense>
                        }
                      >
                        {/* Terms and Condition */}
                        <Route
                          path={NavRoutes.TermsAndConditions.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <TermsAndCondition />
                            </Suspense>
                          }
                        />
                        {/* Terms and Condition */}
                        <Route
                          path={NavRoutes.PrivacyPolicy.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <PrivacyPolicy />
                            </Suspense>
                          }
                        />
                        {/* AML */}
                        <Route
                          path={NavRoutes.AML.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <AML />
                            </Suspense>
                          }
                        />
                        {/* About */}
                        <Route
                          path={NavRoutes.AboutPage.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <About />
                            </Suspense>
                          }
                        />
                        {/* Contact */}
                        <Route
                          path={NavRoutes.ContactPage.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <Contact />
                            </Suspense>
                          }
                        />
                        {/* FAQ */}
                        <Route
                          path={NavRoutes.FAQ.path}
                          element={
                            <Suspense fallback={<ProgressLoader />}>
                              <FAQ />
                            </Suspense>
                          }
                        />
                      </Route>
                    </Routes>
                  </BrowserRouter>
                </div>
              </Box>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </AuthProvider>
      ) : (
        <NoInternet />
      )}
    </div>
  );
}

export default App;
