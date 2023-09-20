import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import React from "react";

import styles from "./LoaderStyle.module.css";

const ProgressLoader = () => {
  const theme = useTheme();

  return (
    <Box
      bgcolor={theme.palette.background.default}
      className={styles.loader}
      height={"100vh"}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default ProgressLoader;
