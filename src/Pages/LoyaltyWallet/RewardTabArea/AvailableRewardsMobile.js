import React, { Suspense } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Skeleton,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Image
import DominosPizzaImage from "../../../assets/dominosPizza.svg";

// Styles
import styles from "./RewardTabArea.module.css";

// Custom Theme
import { useTheme } from "@mui/material/styles";

// Component Loader
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
const AvailableRewardsMobile = () => {
  const [openRewardModal, setOpenRewardModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const theme = useTheme();
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
      <Suspense fallback={<ModalSkeletons width={"90vw"} height={300} />}>
        <ClaimRewardModal
          open={openRewardModal}
          handleClose={handleCloseRewardModal}
          handleOpenSnackBar={handleOpenSnackBar}
        />
      </Suspense>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%", mt: 1 }}
        >
          Reward Successfully Claimed!
        </Alert>
      </Snackbar>
      <Box className={styles.availableRewardMobile}>
        {availableRewardData.map((rewardData) => (
          <Box key={rewardData.id}>
            <Box className={styles.availableRewardCardMobile}>
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
                    <LockOutlinedIcon className={styles.lockKeyIconMobile} />
                  </Box>
                )}
              </Box>
              <Box
                bgcolor={theme.palette.background.paper}
                className={styles.availableRewardContentAreaMobile}
              >
                <Grid container columns={{ xs: 12 }}>
                  <Grid item xs={6}>
                    <Box>
                      <Typography variant="body2">
                        {rewardData.title}
                      </Typography>
                      <Typography fontSize={"8px"} variant="caption">
                        {rewardData.from}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Stack
                        direction="column"
                        mt={4}
                        justifyContent="flex-end"
                      >
                        {rewardData.status === "locked" ? (
                          <Typography
                            sx={{
                              fontSize: "10px",
                              padding: "5px",
                              borderRadius: "5px",
                              background: "#777777",
                              ml: 4,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            color="secondary"
                          >
                            {rewardData.points} Points
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              fontSize: "10px",
                              padding: "5px",
                              borderRadius: "5px",
                              background: "#f8931a",
                              ml: 4,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {rewardData.points} Points
                          </Typography>
                        )}
                        {rewardData.status === "locked" ? (
                          <Button
                            sx={{ ml: 1.5 }}
                            disabled
                            variant="text"
                            color="secondary"
                            className={styles.availableRewardButton}
                            fullWidth
                          >
                            <Typography
                              fontSize={"10px"}
                              variant="caption"
                              color="text.secondary"
                            >
                              Claim Reward
                            </Typography>
                          </Button>
                        ) : (
                          <Button
                            sx={{ ml: 1.5 }}
                            onClick={handleOpenRewardModal}
                            variant="text"
                            color="success"
                            className={styles.availableRewardButton}
                            fullWidth
                          >
                            <Typography
                              fontSize={"10px"}
                              variant="caption"
                              color="text.success"
                            >
                              Claim Reward
                            </Typography>
                          </Button>
                        )}
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </React.Fragment>
  );
};

export default AvailableRewardsMobile;
