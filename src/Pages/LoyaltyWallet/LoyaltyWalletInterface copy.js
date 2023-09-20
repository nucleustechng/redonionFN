import React, { Suspense, useState } from "react";
import { Box } from "@mui/system";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
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
      sx={{ overflowX: "hidden" }}
      px={!isMobile ? 3 : 0}
      className={styles.mainBox}
    >
      {showConfetti && (
        <Confetti
          opacity={0.8}
          gravity={0.1}
          onConfettiComplete={() => setShowConfetti(false)}
          tweenDuration={100}
          numberOfPieces={250}
          recycle={false}
          width={width - 50}
          height={height}
        />
      )}
      <Box className={styles.topCardArea}>
        <Suspense fallback={<CardSkeleton />}>
          {!isMobile ? (
            <TopCardArea handleConfetti={handleConfetti} />
          ) : (
            <TopCardAreaMobile handleConfetti={handleConfetti} />
          )}
        </Suspense>
      </Box>
      {!isMobile && (
        <Box className={styles.rewardInfoArea}>
          <Grid
            container
            columns={{ xs: 1, sm: 1, md: 12 }}
            spacing={{ xs: 4, sm: 2, md: 4 }}
          >
            <Grid item xs={12} sm={12} md={4}>
              <Box className={styles.rewardPathArea}>
                <Suspense fallback={<ComponentSkeleton />}>
                  <RewardPathArea />
                </Suspense>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Box className={styles.rewardTabArea}>
                <Suspense fallback={<ComponentSkeleton />}>
                  <RewardTabArea />
                </Suspense>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      {isMobile && (
        <Box>
          {" "}
          <Box className={styles.rewardTabArea}>
            <Suspense fallback={<ComponentSkeleton />}>
              <RewardTabArea />
            </Suspense>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LoyaltyWalletInterface;
