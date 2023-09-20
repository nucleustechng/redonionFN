import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// Theme
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "./StaticPagesStyles.module.css";

// Axios
import axios from "axios";

// Main Logo
import MainLogo from "../../assets/mainLogo.svg";

// Skeletons
import { StaticPageSkeleton } from "../../components/Skeletons/ComponentSkeletons";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../components/LazyImageComponent/LazyImageComponent")
);

const FAQ = () => {
  const [loader, setLoader] = useState(true);
  const [accordionData, setAccordionData] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Handler for the accordions
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setLoader(true);
    axios
      .get("/FAQData.json")
      .then((res) => setAccordionData(res.data))
      .catch((err) => console.log(err.message))
      .finally(() => setLoader(false));
  }, []);

  return (
    <React.Fragment>
      {loader ? (
        <StaticPageSkeleton />
      ) : (
        <Box className={styles.faqPageArea}>
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
            <Typography variant="h6" color="primary" mb={3}>
              FAQ
            </Typography>
          ) : null}
          <Box className={styles.accordionContentBox}>
            {accordionData.map(({ id, accordionTitle, accordionBody }) => (
              <Accordion
                elevation={0}
                sx={{
                  background: `${
                    theme.palette.mode === "dark"
                      ? "#1B1B1B"
                      : "rgba(234, 234, 234, 0.3)"
                  }`,
                }}
                className={styles.accordionStyles}
                key={id}
                expanded={expanded === id}
                onChange={handleChange(id)}
              >
                <AccordionSummary
                  expandIcon={
                    expanded === id ? (
                      <Box
                        className={
                          !isMobile
                            ? styles.expandIconBox
                            : styles.expandIconBoxMobile
                        }
                        bgcolor={
                          theme.palette.mode === "dark"
                            ? "#2c2c2c"
                            : "rgba(196, 196, 196, 0.6)"
                        }
                      >
                        <RemoveIcon />
                      </Box>
                    ) : (
                      <Box
                        bgcolor={
                          theme.palette.mode === "dark"
                            ? "#2c2c2c"
                            : "rgba(196, 196, 196, 0.6)"
                        }
                        className={
                          !isMobile
                            ? styles.expandIconBox
                            : styles.expandIconBoxMobile
                        }
                      >
                        <AddIcon />
                      </Box>
                    )
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    className={styles.accordionTitle}
                    variant={!isMobile ? "subtitle2" : "caption"}
                  >
                    {!isMobile ? (
                      <>{accordionTitle}</>
                    ) : (
                      <>{accordionTitle.slice(0, 50)}</>
                    )}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={styles.accordionBody} variant="body2">
                    {accordionBody}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default FAQ;
