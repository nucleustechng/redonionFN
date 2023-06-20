import React, { Suspense, useState } from "react";
import { Box } from "@mui/system";
import { Grid, useMediaQuery, useTheme, Typography } from "@mui/material";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

// Styles
import styles from "./LoyaltyWalletInterface.module.css";

// Component Loader
import {
  CardSkeleton,
  ComponentSkeleton,
} from "../../components/Skeletons/ComponentSkeletons";

// Lazy Component
const TopCardArea = React.lazy(() =>
  import("../LoyaltyWallet/TopCardArea/TopCardArea")
);
const TopCardAreaMobile = React.lazy(() =>
  import("../LoyaltyWallet/TopCardArea/TopCardAreaMobile")
);
const RewardPathArea = React.lazy(() =>
  import("../LoyaltyWallet/RewardPathArea/RewardPathArea")
);
const RewardTabArea = React.lazy(() =>
  import("../LoyaltyWallet/RewardTabArea/RewardTabArea")
);

const LoyaltyWalletInterface = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { width, height } = useWindowSize();

  const handleConfetti = () => {
    setShowConfetti(true);
  };

  return (
    <Box
      mt={0}
      sx={{ overflowX: "hidden" }}
      px={!isMobile ? 5 : 1}
      className={styles.mainBox}
    >

      <Box mb={4} >
        <Typography variant="caption" fontSize={25} fontWeight={400} color="secondary">
          Ongoing transactions </Typography>

      </Box>
     
      {!isMobile && (
        <Box className={styles.rewardInfoArea}>
          <Grid
            container
            columns={{ xs: 1, sm: 1, md: 12 }}
            spacing={{ xs: 4, sm: 2, md: 12 }}
          >
           
            <Grid item xs={12} sm={12} md={12}>
              <Box className={styles.rewardTabArea}>
                <Suspense fallback={<ComponentSkeleton />}>
                  <RewardTabArea />
                </Suspense>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      {/* {isMobile && (
        <Box>
          {" "}
          <Box className={styles.rewardTabArea}>
            <Suspense fallback={<ComponentSkeleton />}>
              <RewardTabArea />
            </Suspense>
          </Box>
        </Box>
      )} */}
    </Box>
  );
};

export default LoyaltyWalletInterface;
