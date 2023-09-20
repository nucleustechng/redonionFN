import React, { Suspense } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Chip,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";

// Avatar
import ProfileAvatar from "../../../assets/profileAvatar.svg";

// Theme
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "./RewardPathArea.module.css";

// Component Loader
import ComponentLoader from "../../../components/ProgressLoader/ComponentLoader";

// Lazy Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);
const TimeLineArea = React.lazy(() => import("../TimeLineArea/TimeLineArea"));

const RewardPathAreaMobile = ({ handleCloseNav }) => {
  const theme = useTheme();
  return (
    <Box className={styles.mainBoxMobile}>
      <Box>
        <Box my={2} px={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton onClick={handleCloseNav}>
              <ArrowBackIcon color="primary" />
            </IconButton>
            <Typography variant="body1" color="secondary">
              Upcoming Rewards
            </Typography>
            <IconButton>
              <MenuIcon color="primary" />
            </IconButton>
          </Stack>
        </Box>
      </Box>
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
      <Box px={2}>
        <Typography mt={2} variant="subtitle1" color="secondary">
          Upcoming rewards on your path
        </Typography>
        <Box mt={7}>
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
            <LazyImageComponent className={styles.avatar} src={ProfileAvatar} />
          </Suspense>
        </Box>
      </Box>
      <Box px={2} className={styles.timelineAreaMobile}>
        <Suspense fallback={<ComponentLoader />}>
          <TimeLineArea />
        </Suspense>
      </Box>
    </Box>
  );
};

export default RewardPathAreaMobile;
