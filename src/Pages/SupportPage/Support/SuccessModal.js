import React, { useState } from "react";
import {
  Snackbar,
  Alert,
  Zoom,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  Button,
  Stack,
  InputAdornment,
  Input,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

// Styles
import styles from "./Support.module.css";


import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";

import successClock from "../../../assets/clockSuccess.svg";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const SuccessModal = ({ open, handleClose }) => {
 


  const navigate = useNavigate();


  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      keepMounted
      open={open}
      onClose={handleClose}
    >
      <Box
        bgcolor="background.paper"
        className={styles.changePasswordModalBody}
      >
    
                  <Box mt={3}>
                    <center>
                      <LazyImageComponent src={successClock} />
                    </center>
                    <Typography
                      variant="h3"
                      mt={!isMobile ? 4 : 8}
                      className={!isMobile ? styles.titleBox : styles.titleBoxMobile}
                      color="secondary"
                      fontWeight={500}
                    >
                     Submitted Successfully
                    </Typography>


                    <Typography
                      color="secondary"
                      variant="caption"
                      mt={!isMobile ? 2 : 8}
                      mb={2}
                      component="p"
                      fontSize={16}
                      textAlign={'center'}
                    >
                     Your inquiry has been submitted successfully, we would send you a feedback via your email shortly. 
                    </Typography>





                  </Box>
           


      </Box>
    </Modal>
  );
};

export default SuccessModal;
