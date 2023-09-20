import React, { Suspense } from "react";
import { Box, Grid, Typography, Skeleton, useMediaQuery } from "@mui/material";

// Image
import DominosPizzaImage from "../../../assets/dominosPizza.svg";

// Styles
import styles from "./RewardTabArea.module.css";

// Custom Theme
import { useTheme } from "@mui/material/styles";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// Fake Available Rewards
const availableRewardData = [
  {
    id: "1",
    title: "Upto ₹200 off",
    from: "from Domino's Pizza",
    claimedDate: "6th Jan, 2022 5:53 PM",
  },
  {
    id: "2",
    title: "Upto ₹200 off",
    from: "from Domino's Pizza",
    claimedDate: "6th Jan, 2022 5:53 PM",
  },
  {
    id: "3",
    title: "Upto ₹200 off",
    from: "from Domino's Pizza",
    claimedDate: "6th Jan, 2022 5:53 PM",
  },
  {
    id: "4",
    title: "Upto ₹200 off",
    from: "from Domino's Pizza",
    claimedDate: "6th Jan, 2022 5:53 PM",
  },
  {
    id: "5",
    title: "Upto ₹200 off",
    from: "from Domino's Pizza",
    claimedDate: "6th Jan, 2022 5:53 PM",
  },
];
const MyRewards = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
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
              </Box>
              <Box
                bgcolor={theme.palette.background.paper}
                className={styles.availableRewardContentArea}
              >
                <Typography variant="h6">{rewardData.title}</Typography>
                <Typography variant="body2">{rewardData.from}</Typography>
                <Typography variant="body2" color="text.success" my={2.3}>
                  Claimed on 6th Jan,
                  <br />
                  2022 5:53 PM
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyRewards;
