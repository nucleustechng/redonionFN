import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Divider,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
// Axios
import axios from "axios";

// Main Logo
import MainLogo from "../../assets/mainLogo.svg";

// Skeletons
import { StaticPageSkeleton } from "../../components/Skeletons/ComponentSkeletons";

// Theme
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "./StaticPagesStyles.module.css";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../components/LazyImageComponent/LazyImageComponent")
);

const PrivacyPolicy = () => {
  const [loader, setLoader] = useState(true);
  const [privacyData, setPrivacyData] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setLoader(true);
    axios
      .get("/PrivacyPolicyData.json")
      .then((res) => setPrivacyData(res.data))
      .catch((err) => console.log(err.message))
      .finally(() => setLoader(false));
  }, []);

  return (
    <React.Fragment>
      {loader ? (
        <StaticPageSkeleton />
      ) : (
        <Box className={styles.termsAndConditionArea}>
          {!isMobile ? (
            <Box className={styles.iconBox}>
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
                <LazyImageComponent src={MainLogo} />
              </Suspense>
            </Box>
          ) : null}
          <Typography variant="h6" color="primary">
            Privacy Policy
          </Typography>
          <Typography fontWeight={300} variant="caption">
            Last Updated: 24 May, 2021
          </Typography>
          <Divider sx={{ mt: 2, mb: 1 }} />
          <Box className={styles.termsAndConditionContentBox}>
            {privacyData.map((ppd) => (
              <Stack mt={3} direction="column" spacing={2} key={ppd.id}>
                <Typography variant="subtitle1" color="secondary">
                  {ppd.title}
                </Typography>
                <Typography
                  fontWeight={300}
                  textAlign="justify"
                  variant="body2"
                  color="secondary"
                >
                  {ppd?.paragraphs?.paraOne}
                </Typography>
                <Typography
                  fontWeight={300}
                  textAlign="justify"
                  variant="body2"
                  color="secondary"
                >
                  {ppd?.paragraphs?.paraTwo}
                </Typography>
                <Typography
                  fontWeight={300}
                  textAlign="justify"
                  variant="body2"
                  color="secondary"
                >
                  {ppd?.paragraphs?.paraThree}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default PrivacyPolicy;
