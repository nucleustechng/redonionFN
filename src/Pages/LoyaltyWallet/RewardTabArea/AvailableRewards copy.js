import React, { Suspense } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  Skeleton,
  Chip,
  Snackbar,
  Alert,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Image
import DominosPizzaImage from "../../../assets/dominosPizza.svg";

// Styles
import styles from "./RewardTabArea.module.css";

// Custom Theme
import { useTheme } from "@mui/material/styles";

import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import Close from "@mui/icons-material/Close";
// Skeleton
import { ModalSkeletons } from "../../../components/Skeletons/ComponentSkeletons";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// Modal
const ClaimRewardModal = React.lazy(() =>
  import("../ClaimRewardModal/ClaimRewardModal")
);

// Fake Available Rewards
const availableRewardData = [
  {
    id: "1",
    title: "Upto ₹200 off",
    from: "from Domino's Pizza",
    points: "70",
    status: "unlocked",
  },
  {
    id: "2",
    title: "Upto ₹200 off",
    from: "from Domino's Pizza",
    points: "70",
    status: "unlocked",
  },
  {
    id: "3",
    title: "Upto ₹200 off",
    from: "from Domino's Pizza",
    points: "70",
    status: "unlocked",
  },
  {
    id: "4",
    title: "Upto ₹200 off",
    from: "from Domino's Pizza",
    points: "70",
    status: "unlocked",
  },
  {
    id: "5",
    title: "Upto ₹200 off",
    from: "from Domino's Pizza",
    points: "70",
    status: "locked",
  },
];
const AvailableRewards = () => {
  const [openRewardModal, setOpenRewardModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Modal Handler
  const handleOpenRewardModal = () => {
    setOpenRewardModal(true);
  };

  const handleCloseRewardModal = () => {
    setOpenRewardModal(false);
  };

  // Snackbar Handler
  const handleOpenSnackBar = () => {
    setOpenRewardModal(false);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <React.Fragment>
      <Suspense fallback={<ModalSkeletons />}>
        <ClaimRewardModal
          open={openRewardModal}
          handleClose={handleCloseRewardModal}
          handleOpenSnackBar={handleOpenSnackBar}
        />
      </Suspense>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          action={
            <IconButton onClick={handleCloseSnackbar} sx={{ mt: -0.5 }}>
              <Close sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          }
          icon={<CheckCircleOutline sx={{ fontSize: "1.5rem" }} />}
          sx={{ fontSize: "1rem" }}
          onClose={handleCloseSnackbar}
          severity="success"
        >
          Reward Successfully Claimed!
        </Alert>
      </Snackbar>
      <Box
        px={isTablet ? 3 : ""}
        mt={isTablet ? 2 : ""}
        className={styles.availableReward}
      >
        <Grid
          container
          columns={{ md: 12, xl: 12, sm: 1 }}
          rowGap={{ md: 2, xl: 2, sm: 3 }}
          spacing={{ md: 2, xl: 2, sm: 3 }}
        >
          {availableRewardData.map((rewardData) => (
            <Grid key={rewardData.id} item md={6} xl={4} sm={12}>
              <Box className={styles.availableRewardCard}>
                <Box
                  bgcolor={theme.palette.common.white}
                  className={styles.availableRewardImageArea}
                >
                  <Suspense
                    fallback={
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={"100%"}
                        sx={{
                          background: `${
                            theme.palette.mode === "dark" ? "#111" : "#fff"
                          }`,
                        }}
                      />
                    }
                  >
                    <LazyImageComponent
                      className={
                        rewardData.status === "locked" ? styles.lockedImage : {}
                      }
                      src={DominosPizzaImage}
                    />
                  </Suspense>
                  {rewardData.status === "locked" && (
                    <Box className={styles.lockKey}>
                      <LockOutlinedIcon className={styles.lockKeyIcon} />
                    </Box>
                  )}
                </Box>
                <Box
                  bgcolor={theme.palette.background.paper}
                  className={styles.availableRewardContentArea}
                >
                  <Typography variant="h6">{rewardData.title}</Typography>
                  <Typography variant="body2">{rewardData.from}</Typography>
                  <Stack direction="row" justifyContent="flex-end" mt={1}>
                    {rewardData.status === "locked" ? (
                      <Chip
                        label={`${rewardData.points} Points`}
                        className={styles.chipStyleLocked}
                      />
                    ) : (
                      <Chip
                        label={`${rewardData.points} Points`}
                        className={styles.chipStyle}
                      />
                    )}
                  </Stack>
                  <Stack justifyContent="flex-end" alignItems="flex-end">
                    {rewardData.status === "locked" ? (
                      <Button
                        disabled
                        variant="text"
                        color="secondary"
                        className={styles.availableRewardButton}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Claim Reward
                        </Typography>
                      </Button>
                    ) : (
                      <Button
                        onClick={handleOpenRewardModal}
                        variant="text"
                        color="success"
                        className={styles.availableRewardButton}
                      >
                        <Typography variant="body2" color="text.success">
                          Claim Reward
                        </Typography>
                      </Button>
                    )}
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default AvailableRewards;
