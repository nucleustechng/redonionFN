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

// Theme
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "./StaticPagesStyles.module.css";

// Skeletons
import { StaticPageSkeleton } from "../../components/Skeletons/ComponentSkeletons";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../components/LazyImageComponent/LazyImageComponent")
);

const TermsAndCondition = () => {
  const [loader, setLoader] = useState(true);
  const [termsData, setTermsData] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setLoader(true);
    axios
      .get("/TermsAndConditionData.json")
      .then((res) => setTermsData(res.data))
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
            Terms & Conditions
          </Typography>
          <Typography fontWeight={300} variant="caption">
            Last Updated: 18-06-2019
          </Typography>
          <Divider sx={{ mt: 2, mb: 1 }} />
          <Box className={styles.termsAndConditionContentBox}>
            {termsData.map((td) => (
              <Stack mt={3} direction="column" spacing={2} key={td.id}>
                <Typography variant="subtitle1" color="secondary">
                  {td.title}
                </Typography>
                <Typography
                  fontWeight={300}
                  textAlign="justify"
                  variant="body2"
                  color="secondary"
                >
                  {td.paragraphOne}
                </Typography>
                <Typography
                  fontWeight={300}
                  textAlign="justify"
                  variant="body2"
                  color="secondary"
                >
                  {td?.paragraphTwo}
                </Typography>
                <Typography
                  fontWeight={300}
                  textAlign="justify"
                  variant="body2"
                  color="secondary"
                >
                  {td?.paragraphThree}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default TermsAndCondition;
