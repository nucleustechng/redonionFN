import React, { Suspense } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";

// Styles
import styles from "./OnboardingPage.module.css";

// Component Loader
import ComponentLoader from "../../components/ProgressLoader/ComponentLoader";

// Lazy Image
const LazyImageComponent = React.lazy(() =>
  import("../../components/LazyImageComponent/LazyImageComponent")
);
const StepComponent = ({ image, title, content }) => {
  const theme = useTheme();

  return (
    <Box width={"100%"} bgcolor={theme.palette.background.paper}>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Box className={styles.stepImageBox}>
          <Suspense fallback={<ComponentLoader />}>
            <LazyImageComponent src={image} className={styles.stepImage} />
          </Suspense>
        </Box>
        <Box>
          <Typography
            mt={4}
            mb={3}
            variant="h4"
            fontWeight={700}
            className={styles.stepTitle}
          >
            {title}
          </Typography>
          <Box className={styles.contentBox}>
            <Typography
              component="p"
              variant="subtitle1"
              color="secondary"
              textAlign="center"
            >
              {content}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default StepComponent;
