import React, { Suspense, useState } from "react";
import { Box } from "@mui/system";
import { Grid, useMediaQuery, useTheme, Typography } from "@mui/material";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

// Styles
import styles from "./LoyaltyWalletInterface.module.css";

import MobileNavDrawerPermanent from "../../components/Layout/MobileNavDrawerPermanent";

// Component Loader
import {
  CardSkeleton,
  ComponentSkeleton,
} from "../../components/Skeletons/ComponentSkeletons";

// Lazy Component
const TopCardArea = React.lazy(() => import("./TopCardArea/TopCardArea"));
const TopCardAreaMobile = React.lazy(() =>
  import("./TopCardArea/TopCardAreaMobile")
);
const RewardPathArea = React.lazy(() =>
  import("./RewardPathArea/RewardPathArea")
);
const OngoingTransactionTabArea = React.lazy(() =>
  import("./RewardTabArea/OngoingTransactionTabArea")
);

const OngoingTransaction = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const { width, height } = useWindowSize();

  const handleConfetti = () => {
    setShowConfetti(true);
  };

  return (
    <React.Fragment>
      {!isMobile && (
        <Box
          mt={0}
          sx={{ overflowX: "hidden" }}
          px={!isMobile ? 2 : 1}
          className={styles.mainBox}
        >
          <Box mb={4}>
            <Typography
              variant="caption"
              fontSize={25}
              fontWeight={600}
              color="secondary"
            >
              Transactions{" "}
            </Typography>
          </Box>

          <Box className={styles.rewardInfoArea}>
            <Grid
              container height="100%"
              columns={{ xs: 1, sm: 1, md: 12 }}
              spacing={{ xs: 4, sm: 2, md: 12 }}
            >
              <Grid item xs={12} sm={12} md={12}>
                <Box className={styles.rewardTabArea}>
                  <Suspense fallback={<ComponentSkeleton />}>
                    <OngoingTransactionTabArea />
                  </Suspense>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
      {isMobile && (
        <MobileNavDrawerPermanent user={user}>
          <Box>
            <Suspense fallback={<ComponentSkeleton />}>
              <OngoingTransactionTabArea />
            </Suspense>
          </Box>
        </MobileNavDrawerPermanent>
      )}
    </React.Fragment>
  );
};

export default OngoingTransaction;
