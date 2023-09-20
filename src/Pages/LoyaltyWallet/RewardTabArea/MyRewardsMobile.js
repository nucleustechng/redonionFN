import React, { Suspense } from "react";
import { Box, Typography, Skeleton, Stack } from "@mui/material";

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
const MyRewardsMobile = () => {
  const theme = useTheme();
  return (
    <Box className={styles.availableRewardMobile}>
      {availableRewardData.map((rewardData) => (
        <Box key={rewardData.id} className={styles.availableRewardCardMobile}>
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
            className={styles.availableRewardContentAreaMobile}
          >
            <Typography variant="body2">{rewardData.title}</Typography>
            <Stack direction="column">
              <Typography fontSize={"10px"} variant="caption">
                {rewardData.from}
              </Typography>
              <Typography
                mt={1}
                fontSize={"10px"}
                variant="caption"
                color="text.success"
              >
                Claimed on 6th Jan
              </Typography>
              <Typography
                fontSize={"10px"}
                variant="caption"
                color="text.success"
              >
                2022 5:53 PM
              </Typography>
            </Stack>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MyRewardsMobile;
