import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Alert, IconButton, Snackbar, useMediaQuery, Typography, Button } from "@mui/material";

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


  // Withdraw Authorization
  useEffect(() => {
   
  }, []);

  return (
    <Box mt={isMobile ? 0 : -8}>

      <Box mb={5} ml={3}>
        <Button
          // onClick={handleCloseTwoFAPin}
          variant="contained" color="primary">
          <Typography variant="caption" p={0.6} textTransform={"none"} fontSize={14} color="background.light">


            Create a sell offer

          </Typography>
        </Button>
      </Box>

      <Box mb={4} ml={3} >
        <Typography variant="caption" fontSize={25} fontWeight={500} color="secondary">
          History </Typography>

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
