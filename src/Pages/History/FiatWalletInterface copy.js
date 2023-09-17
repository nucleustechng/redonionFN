import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Alert, IconButton, Snackbar, useMediaQuery } from "@mui/material";

// Theme
import { useTheme } from "@mui/material/styles";

// Loader
import PaymentAuthorizationModal from "./PaymentAuthorizationModal/PaymentAuthorizationModal";
import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import {
  CardSkeleton,
  ComponentSkeleton,
  TableSkeleton,
} from "../../components/Skeletons/ComponentSkeletons";

// Lazy component
const TransactionDrawer = React.lazy(() =>
  import("../FiatWallet/TransactionDrawer/TransactionDrawer")
);
const TransactionDrawerMobile = React.lazy(() =>
  import("../FiatWallet/TransactionDrawer/TransactionDrawerMobile")
);
const DepositFunds = React.lazy(() =>
  import("../FiatWallet/DepositFunds/DepositFunds")
);
const WithdrawFunds = React.lazy(() =>
  import("../FiatWallet/WithdrawFunds/WithdrawFunds")
);
const CurrencyBalanceCard = React.lazy(() =>
  import("../FiatWallet/CurrencyBalanceCard/CurrencyBalanceCard")
);
const TransactionDetailsArea = React.lazy(() =>
  import("./TransactionDetailsArea/TransactionDetailsArea")
);
const TransactionDetailsAreaMobile = React.lazy(() =>
  import("./TransactionDetailsArea/TransactionDetailsAreaMobile")
);

const FiatWalletInterface = () => {
  // Drawer
  const [depositDrawerOpen, setDepositDrawerOpen] = useState(false);
  const [withdrawDrawerOpen, setWithdrawDrawerOpen] = useState(false);

  // Authorization
  const [showAuthorization, setShowAuthorization] = useState(false);
  const [showPaymentAuthorization, setShowPaymentAuthorization] =
    useState(false);

  //Snackbar
  const [showAuthorizeSnackbar, setShowAuthorizeSnackbar] = useState(false);
  const [showPaymentSnackbar, setShowPaymentSnackbar] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Drawers
  const handleDepositDrawer = () => {
    setWithdrawDrawerOpen(false);
    setDepositDrawerOpen(!depositDrawerOpen);
  };

  const handleWithdrawDrawer = () => {
    setDepositDrawerOpen(false);
    setWithdrawDrawerOpen(!withdrawDrawerOpen);
  };

  // Authorization Handler for deposit
  const handleAuthorizePayment = () => {
    setShowAuthorization(true);
    setDepositDrawerOpen(false);
    const showTheSnackBar = setTimeout(() => {
      setShowAuthorizeSnackbar(true);
    }, 2500);

    return () => clearInterval(showTheSnackBar);
  };

  const handleCloseAuthorization = () => {
    setShowAuthorization(false);
  };

  // Authorize Snackbar
  const handleAuthorizationSnackbarClose = () => {
    setShowAuthorizeSnackbar(false);
  };

  // Authorization handler for withdraw
  const handleAuthorizeWithdraw = () => {
    setShowPaymentAuthorization(true);
    setWithdrawDrawerOpen(false);
    const showTheSnackBar = setTimeout(() => {
      setShowPaymentSnackbar(true);
    }, 2500);

    return () => clearInterval(showTheSnackBar);
  };

  const handleClosePaymentAuthorization = () => {
    setShowPaymentAuthorization(false);
  };

  // Withdraw snackbar
  const handleWithdrawSnackbarClose = () => {
    setShowPaymentSnackbar(false);
  };

  // Deposit Authorization
  useEffect(() => {
    if (showAuthorization) {
      const closeTheAuthorization = setTimeout(() => {
        setShowAuthorization(false);
      }, 2000);

      return () => clearInterval(closeTheAuthorization);
    }
  }, [showAuthorization]);

  // Withdraw Authorization
  useEffect(() => {
    if (showPaymentAuthorization) {
      const closeTheAuthorization = setTimeout(() => {
        setShowPaymentAuthorization(false);
      }, 2000);

      return () => clearInterval(closeTheAuthorization);
    }
  }, [showPaymentAuthorization]);

  return (
    <Box>
      {/* Authorization */}
      <PaymentAuthorizationModal
        open={showAuthorization}
        handleClose={handleCloseAuthorization}
        message={"Authorizing"}
      />
      {/* Place Withdrawal */}
      <PaymentAuthorizationModal
        open={showPaymentAuthorization}
        handleClose={handleClosePaymentAuthorization}
        message={"Requesting"}
      />
      {/* Authorize Payment Success Snackbar */}
      <Snackbar
        anchorOrigin={
          !isMobile
            ? { vertical: "top", horizontal: "right" }
            : { vertical: "bottom", horizontal: "center" }
        }
        open={showAuthorizeSnackbar}
        autoHideDuration={6000}
        onClose={handleAuthorizationSnackbarClose}
      >
        <Alert
          action={
            <IconButton
              onClick={handleAuthorizationSnackbarClose}
              sx={{ mt: -0.5 }}
            >
              <Close sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          }
          icon={<CheckCircleOutline sx={{ fontSize: "1.5rem" }} />}
          sx={!isMobile ? { fontSize: "1rem" } : { width: "100%" }}
          onClose={handleAuthorizationSnackbarClose}
          severity="success"
        >
          Authorization Successfull!
        </Alert>
      </Snackbar>
      {/* Authorize Withdraw Payment Success Snackbar */}
      <Snackbar
        anchorOrigin={
          !isMobile
            ? { vertical: "top", horizontal: "right" }
            : { vertical: "bottom", horizontal: "center" }
        }
        open={showPaymentSnackbar}
        autoHideDuration={6000}
        onClose={handleWithdrawSnackbarClose}
      >
        <Alert
          action={
            <IconButton onClick={handleWithdrawSnackbarClose} sx={{ mt: -0.5 }}>
              <Close sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          }
          icon={<CheckCircleOutline sx={{ fontSize: "1.5rem" }} />}
          sx={!isMobile ? { fontSize: "1rem" } : { width: "100%" }}
          onClose={handleWithdrawSnackbarClose}
          severity="success"
        >
          Withdraw Successfull!
        </Alert>
      </Snackbar>

      {/* Currency Card */}
      <Box px={3}>
        <Suspense fallback={<CardSkeleton />}>
          <CurrencyBalanceCard
            deposit={handleDepositDrawer}
            withdraw={handleWithdrawDrawer}
          />
        </Suspense>
      </Box>
      {/* Transaction Area */}
      <Box px={3} mt={5}>
        <Suspense fallback={<TableSkeleton />}>
          {!isMobile ? (
            <TransactionDetailsArea />
          ) : (
            <TransactionDetailsAreaMobile />
          )}
        </Suspense>
      </Box>
      {/* Deposit Drawer */}
      {/* <Box>
        <Suspense fallback={<ComponentSkeleton />}>
          {!isMobile ? (
            <TransactionDrawer
              drawerOpen={depositDrawerOpen}
              handleDrawerToggle={handleDepositDrawer}
            >
              <Suspense fallback={<ComponentSkeleton />}>
                <DepositFunds
                  handleAuthorizePayment={handleAuthorizePayment}
                  close={handleDepositDrawer}
                />
              </Suspense>
            </TransactionDrawer>
          ) : (
            <TransactionDrawerMobile
              drawerOpen={depositDrawerOpen}
              handleDrawerToggle={handleDepositDrawer}
            >
              <Suspense fallback={<ComponentSkeleton />}>
                <DepositFunds
                  handleAuthorizePayment={handleAuthorizePayment}
                  close={handleDepositDrawer}
                />
              </Suspense>
            </TransactionDrawerMobile>
          )}
        </Suspense>
      </Box> */}
      {/* Withdraw Drawer */}
      {/* <Box>
        <Suspense fallback={<ComponentSkeleton />}>
          {!isMobile ? (
            <TransactionDrawer
              drawerOpen={withdrawDrawerOpen}
              handleDrawerToggle={handleWithdrawDrawer}
            >
              <Suspense fallback={<ComponentSkeleton />}>
                <WithdrawFunds
                  handleWithdrawPayment={handleAuthorizeWithdraw}
                  close={handleWithdrawDrawer}
                />
              </Suspense>
            </TransactionDrawer>
          ) : (
            <TransactionDrawerMobile
              drawerOpen={withdrawDrawerOpen}
              handleDrawerToggle={handleWithdrawDrawer}
            >
              <Suspense fallback={<ComponentSkeleton />}>
                <WithdrawFunds
                  handleWithdrawPayment={handleAuthorizeWithdraw}
                  close={handleWithdrawDrawer}
                />
              </Suspense>
            </TransactionDrawerMobile>
          )}
        </Suspense>
      </Box> */}
    </Box>
  );
};

export default FiatWalletInterface;
