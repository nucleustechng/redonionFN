import React, { Suspense, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Chip,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
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
import { BorderLinearProgress } from "../../../components/ProgressLoader/CustomProgress";

// Lazy Image component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const TopCardArea = ({ handleConfetti }) => {
  const [progressValue, setProgressValue] = useState(0);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

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
    <Box className={styles.mainBox}>
      <Stack direction={!isTablet ? "row" : "column"} spacing={3}>
        <Box sx={!isTablet ? { width: "450px" } : { width: "500px" }}>
          <Box
            className={styles.redeemBox}
            bgcolor={theme.palette.background.card}
          >
            <Box className={styles.redeemCard}>
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
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            bgcolor={theme.palette.background.paper}
            className={styles.badgeArea}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="secondary">
                52 more points for Gold badge
              </Typography>
              <Typography variant="body2" color="secondary">
                <Typography component="span" color="primary">
                  10,040
                </Typography>{" "}
                Points Earned till now
              </Typography>
            </Stack>
            <Box className={styles.badgeProgressArea}>
              <Box className={styles.badgeBox}>
                <Stack direction="row" justifyContent="space-between">
                  <Box
                    bgcolor={theme.palette.background.card}
                    className={styles.badge}
                  >
                    <Suspense
                      fallback={
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={10}
                          height={10}
                        />
                      }
                    >
                      <LazyImageComponent src={BronzeBadgeIcon} />
                    </Suspense>
                  </Box>
                  <Box
                    bgcolor={theme.palette.background.card}
                    className={styles.badge}
                  >
                    <Suspense
                      fallback={
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={10}
                          height={10}
                        />
                      }
                    >
                      <LazyImageComponent src={SilverBadgeIcon} />
                    </Suspense>
                  </Box>
                  <Box
                    onClick={() => handleBadgeButton("gold")}
                    sx={{ cursor: "pointer" }}
                    bgcolor={theme.palette.background.card}
                    className={styles.badge}
                  >
                    <Suspense
                      fallback={
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={10}
                          height={10}
                        />
                      }
                    >
                      <LazyImageComponent src={GoldBadgeIcon} />
                    </Suspense>
                  </Box>
                  <Box
                    onClick={() => handleBadgeButton("diamond")}
                    sx={{ cursor: "pointer" }}
                    bgcolor={theme.palette.background.card}
                    className={styles.badge}
                  >
                    <Suspense
                      fallback={
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={10}
                          height={10}
                        />
                      }
                    >
                      <LazyImageComponent src={DiamonBadgeIcon} />
                    </Suspense>
                  </Box>
                </Stack>
              </Box>
              <Box className={styles.progressBar}>
                <BorderLinearProgress
                  variant="determinate"
                  sx={{ flexGrow: 1 }}
                  value={progressValue}
                />
                <Box className={styles.checkBox}>
                  <Stack
                    sx={{ mx: "-1rem", mt: "-3px" }}
                    direction="row"
                    justifyContent="space-between"
                  >
                    {progressValue >= 0 ? (
                      <IconButton>
                        <LazyImageComponent src={ProgressCheckIcon} />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <LazyImageComponent src={ProgressUnCheckIcon} />
                      </IconButton>
                    )}
                    {progressValue >= 50 ? (
                      <IconButton>
                        <LazyImageComponent src={ProgressCheckIcon} />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <LazyImageComponent src={ProgressUnCheckIcon} />
                      </IconButton>
                    )}
                    {progressValue >= 70 ? (
                      <IconButton onClick={() => handleBadgeButton("gold")}>
                        <LazyImageComponent src={ProgressCheckIcon} />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleBadgeButton("gold")}>
                        <LazyImageComponent src={ProgressUnCheckIcon} />
                      </IconButton>
                    )}
                    {progressValue === 100 ? (
                      <IconButton onClick={() => handleBadgeButton("diamond")}>
                        <LazyImageComponent src={ProgressCheckIcon} />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleBadgeButton("diamond")}>
                        <LazyImageComponent src={ProgressUnCheckIcon} />
                      </IconButton>
                    )}
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default TopCardArea;
