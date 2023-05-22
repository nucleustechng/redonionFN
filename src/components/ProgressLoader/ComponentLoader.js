import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import styles from "./LoaderStyle.module.css";

const ComponentLoader = () => {
  return (
    <Box className={styles.loader} height={"100%"}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default ComponentLoader;
