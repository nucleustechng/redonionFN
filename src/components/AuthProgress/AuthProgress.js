import React from "react";
import { Modal, useTheme, useMediaQuery, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";

// Styles
import styles from "./AuthProgress.module.css";

const AuthProgress = ({ open, onClose }) => {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 20
      );
      setBuffer(progress + 10);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [progress]);

  return (
    <Modal
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      disableAutoFocus
      disableEscapeKeyDown
      keepMounted
    >
      <Box
        bgcolor={theme.palette.background.default}
        className={!isMobile ? styles.modalStyleWeb : styles.modalStyleMobile}
      >
        <Box width={"100%"}>
          <LinearProgress
            variant="buffer"
            value={progress}
            valueBuffer={buffer}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthProgress;
