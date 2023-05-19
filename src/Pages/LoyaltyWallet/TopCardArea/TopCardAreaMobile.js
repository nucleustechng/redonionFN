import React, { Suspense, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Chip,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
// Icon
import ProgressCheckIcon from "../../../assets/progressCheckIcon.svg";
import ProgressUnCheckIcon from "../../../assets/progressUnCheckIcon.svg";
import BronzeBadgeIcon from "../../../assets/bronzeBadgeIcon.svg";
import SilverBadgeIcon from "../../../assets/silverBadgeIcon.svg";
import GoldBadgeIcon from "../../../assets/goldBadgeIcon.svg";
import DiamonBadgeIcon from "../../../assets/diamondBadgeIcon.svg";

// Styles
import styles from "./TopCardArea.module.css";

// Theme
import { useTheme } from "@mui/material/styles";

// Custom linear progressbar
import { BorderLinearProgressMobile } from "../../../components/ProgressLoader/CustomProgress";
import MobileNavDrawer from "../../../components/Layout/MobileNavDrawer";

// Component Loader
import ComponentLoader from "../../../components/ProgressLoader/ComponentLoader";

// Lazy Image component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);
const RewardPathAreaMobile = React.lazy(() =>
  import("../RewardPathArea/RewardPathAreaMobile")
);

const TopCardAreaMobile = ({ handleConfetti }) => {
  const [progressValue, setProgressValue] = useState(0);
  const [showRewardPath, setShowRewardPath] = useState(false);

  const handleRewardPathNav = () => {
    setShowRewardPath(!showRewardPath);
  };

  const theme = useTheme();

  // Progressbar loading animation
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgressValue((prevProgress) =>
        prevProgress >= 55 ? progressValue : prevProgress + 5
      );
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [progressValue]);

  const handleBadgeButton = (badgeName) => {
    if (badgeName === "gold") {
      setProgressValue((prevProgress) =>
        prevProgress >= 55 ? 70 : prevProgress + 5
      );
      handleConfetti();
    } else if (badgeName === "diamond") {
      setProgressValue((prevProgress) => (prevProgress < 100 ? 100 : 0));
      handleConfetti();
    }
  };

  return (
    <Box className={styles.mainBoxMobile}>
      <Box
        className={styles.redeemBoxMobile}
        bgcolor={theme.palette.background.paper}
      >
        <Box className={styles.redeemCardMobile}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant="body2" color="common.black">
                Available Points
              </Typography>
              <Typography variant="h3" color="#2B2B2B" fontWeight={700}>
                1040
              </Typography>
            </Box>
            <Box>
              <Chip label="Gold" className={styles.chipStyle} />
            </Box>
          </Stack>
          <Box mt={4}>
            <Button
              disableElevation
              className={styles.chipButton}
              onClick={() => {}}
              variant="contained"
              fullWidth
            >
              Redeem Points
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor={theme.palette.background.card}
        className={styles.badgeAreaMobile}
      >
        <Stack direction="column">
          <Typography variant="caption" color="secondary">
            52 more points for Gold badge
          </Typography>
          <Typography variant="caption" color="secondary">
            <Typography variant="caption" component="span" color="primary">
              10,040
            </Typography>{" "}
            Points Earned till now
          </Typography>
        </Stack>
        <Stack mt={1} direction="row" justifyContent="flex-end">
          <Button
            onClick={handleRewardPathNav}
            variant="outlined"
            color="primary"
          >
            <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
              Upcoming rewards
            </Typography>
          </Button>
        </Stack>
        <Box className={styles.badgeProgressArea}>
          <Box className={styles.badgeBoxMobile}>
            <Stack direction="row" justifyContent="space-between">
              <Box
                bgcolor={theme.palette.background.default}
                className={styles.badgeMobile}
              >
                <Suspense
                  fallback={
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={10}
                      height={10}
                      sx={{
                        backgroundColor: `${
                          theme.palette.mode === "dark" ? "#111" : "#f5f5f5"
                        }`,
                      }}
                    />
                  }
                >
                  <LazyImageComponent
                    className={styles.badgeIcon}
                    src={BronzeBadgeIcon}
                  />
                </Suspense>
              </Box>
              <Box
                bgcolor={theme.palette.background.default}
                className={styles.badgeMobile}
              >
                <Suspense
                  fallback={
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={10}
                      height={10}
                      sx={{
                        backgroundColor: `${
                          theme.palette.mode === "dark" ? "#111" : "#f5f5f5"
                        }`,
                      }}
                    />
                  }
                >
                  <LazyImageComponent
                    className={styles.badgeIcon}
                    src={SilverBadgeIcon}
                  />
                </Suspense>
              </Box>
              <Box
                onClick={() => handleBadgeButton("gold")}
                bgcolor={theme.palette.background.default}
                className={styles.badgeMobile}
              >
                <Suspense
                  fallback={
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={10}
                      height={10}
                      sx={{
                        backgroundColor: `${
                          theme.palette.mode === "dark" ? "#111" : "#f5f5f5"
                        }`,
                      }}
                    />
                  }
                >
                  <LazyImageComponent
                    className={styles.badgeIcon}
                    src={GoldBadgeIcon}
                  />
                </Suspense>
              </Box>
              <Box
                onClick={() => handleBadgeButton("diamond")}
                bgcolor={theme.palette.background.default}
                className={styles.badgeMobile}
              >
                <Suspense
                  fallback={
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={10}
                      height={10}
                      sx={{
                        backgroundColor: `${
                          theme.palette.mode === "dark" ? "#111" : "#f5f5f5"
                        }`,
                      }}
                    />
                  }
                >
                  <LazyImageComponent
                    className={styles.badgeIcon}
                    src={DiamonBadgeIcon}
                  />
                </Suspense>
              </Box>
            </Stack>
          </Box>
          <Box className={styles.progressBarMobile}>
            <BorderLinearProgressMobile
              variant="determinate"
              sx={{ width: "100%" }}
              value={progressValue}
            />
            <Box className={styles.checkBoxMobile}>
              <Stack direction="row" justifyContent="space-between">
                {progressValue >= 0 ? (
                  <IconButton>
                    <LazyImageComponent
                      className={styles.checkIconsMobile}
                      src={ProgressCheckIcon}
                    />
                  </IconButton>
                ) : (
                  <IconButton>
                    <LazyImageComponent
                      className={styles.checkIconsMobile}
                      src={ProgressUnCheckIcon}
                    />
                  </IconButton>
                )}
                {progressValue >= 50 ? (
                  <IconButton>
                    <LazyImageComponent
                      className={styles.checkIconsMobile}
                      src={ProgressCheckIcon}
                    />
                  </IconButton>
                ) : (
                  <IconButton>
                    <LazyImageComponent
                      className={styles.checkIconsMobile}
                      src={ProgressUnCheckIcon}
                    />
                  </IconButton>
                )}
                {progressValue >= 70 ? (
                  <IconButton onClick={() => handleBadgeButton("gold")}>
                    <LazyImageComponent
                      className={styles.checkIconsMobile}
                      src={ProgressCheckIcon}
                    />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleBadgeButton("gold")}>
                    <LazyImageComponent
                      className={styles.checkIconsMobile}
                      src={ProgressUnCheckIcon}
                    />
                  </IconButton>
                )}
                {progressValue === 100 ? (
                  <IconButton onClick={() => handleBadgeButton("diamond")}>
                    <LazyImageComponent
                      className={styles.checkIconsMobile}
                      src={ProgressCheckIcon}
                    />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleBadgeButton("diamond")}>
                    <LazyImageComponent
                      className={styles.checkIconsMobile}
                      src={ProgressUnCheckIcon}
                    />
                  </IconButton>
                )}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
      <MobileNavDrawer
        drawerOpen={showRewardPath}
        handleDrawerToggle={handleRewardPathNav}
      >
        <Suspense fallback={<ComponentLoader />}>
          <RewardPathAreaMobile handleCloseNav={handleRewardPathNav} />
        </Suspense>
      </MobileNavDrawer>
    </Box>
  );
};

export default TopCardAreaMobile;
