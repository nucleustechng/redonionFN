import React, { Suspense } from "react";
import { Box } from "@mui/system";
import { Skeleton, Stack, Typography } from "@mui/material";

// Avatar
import ProfileAvatar from "../../../assets/profileAvatar.svg";

// Styles
import styles from "./RewardPathArea.module.css";

// Component Loader
import { ComponentSkeleton } from "../../../components/Skeletons/ComponentSkeletons";

// Lazy Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);
const TimeLineArea = React.lazy(() => import("../TimeLineArea/TimeLineArea"));

const RewardPathArea = () => {
  return (
    <Box className={styles.mainBox}>
      <Typography variant="subtitle1" color="secondary">
        Upcoming rewards on your path
      </Typography>
      <Box mt={7}>
        <Suspense
          fallback={
            <Skeleton
              animation="wave"
              variant="circular"
              width={60}
              height={60}
            />
          }
        >
          <LazyImageComponent className={styles.avatar} src={ProfileAvatar} />
        </Suspense>
      </Box>
      <Box className={styles.timelineArea}>
        <Suspense fallback={<ComponentSkeleton />}>
          <TimeLineArea />
        </Suspense>
      </Box>
      <Stack justifyContent="center" mt={3}>
        <Typography variant="body2">More Reward Coming Soon!</Typography>
      </Stack>
    </Box>
  );
};

export default RewardPathArea;
