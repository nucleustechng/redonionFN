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

// Styles
import styles from "./StaticPagesStyles.module.css";

// Custom Theme
import { useTheme } from "@mui/material/styles";

// Main Logo
import MainLogo from "../../assets/mainLogo.svg";

// Skeleton
import { StaticPageSkeleton } from "../../components/Skeletons/ComponentSkeletons";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../components/LazyImageComponent/LazyImageComponent")
);

const About = () => {
  const [loader, setLoader] = useState(true);
  const [aboutData, setAboutData] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setLoader(true);
    axios
      .get("/AboutPageData.json")
      .then((res) => setAboutData(res.data))
      .catch((err) => console.log(err.message))
      .finally(() => setLoader(false));
  }, []);

  return (
    <React.Fragment>
      {loader ? (
        <StaticPageSkeleton />
      ) : (
        <Box className={styles.aboutPageArea}>
          {!isMobile ? (
            <Box className={styles.iconBox}>
              <Suspense
                fallback={
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                }
              >
                <LazyImageComponent src={MainLogo} />
              </Suspense>
            </Box>
          ) : null}
          {!isMobile ? (
            <Typography variant="h6" color="primary">
              Thrifty Wallet
            </Typography>
          ) : null}
          <Divider sx={{ mt: 2, mb: 1 }} />
          <Box className={styles.aboutPageContentBox}>
            {!isMobile && <Typography variant="subtitle1">About</Typography>}
            {aboutData.map((ad) => (
              <Typography
                fontWeight={300}
                key={ad.id}
                variant="body2"
                component="p"
                my={2}
              >
                {ad.paragraph}
              </Typography>
            ))}
          </Box>
          <Box mt={5}>
            <Typography variant="subtitle1">Contact</Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={3}
              mt={3}
              pb={isMobile ? 5 : 0}
            >
              <Box bgcolor="#111" className={styles.contactImageBox}>
                <Suspense
                  fallback={
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={40}
                      height={40}
                    />
                  }
                >
                  <LazyImageComponent src={MainLogo} />
                </Suspense>
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  Thrifty Software Private Limited
                </Typography>
                <Typography variant="body2">Amethi</Typography>
                <Typography variant="body2">+91-88581500XX</Typography>
                <Typography variant="body2">admin@thriftysoft.tech</Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default About;
