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
  Slide,
  Stack,
  InputAdornment,
  Input,
  useMediaQuery
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

// Logout authentication
import useAuth from "../../../hooks/useAuth";

// Styles
import styles from "./Support.module.css";


import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";

import { CopyToClipboard } from "react-copy-to-clipboard";


import people from "../../../assets/share.png";
import link from "../../../assets/link.svg";
import sms from "../../../assets/sms.svg";
import useTheme from "@mui/system/useTheme";




// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);


const ReferalModal = ({ open, handleClose }) => {

  const theme = useTheme();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.only('xs')]: {
      width: 350, 
    },
    [theme.breakpoints.only('sm')]: {
      width: 380, 
    },
    [theme.breakpoints.only('md')]: {
      width: 400, 
    },
    [theme.breakpoints.only('lg')]: {
      width: 450, 
    },
    [theme.breakpoints.only('xl')]: {
      width: 450, 
    },
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 22,
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const navigate = useNavigate();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <>
      <Modal
        disableAutoFocus
        disableEnforceFocus
        keepMounted
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
      <Box
        p={2}
        pb={4}
        bgcolor="background.paper"
        sx={style}
      >
        <Box mb={3} display="flex" alignItems="center" justifyContent="space-between" alignContent="center">
          <Typography 
            fontSize="16px" 
            fontWeight={500}  
            variant="h6" component="p"
            sx={{
              color: theme.palette.mode === "light" ? "#3063E9" : "inherit",
            }}
          >
            Refer and earn
          </Typography>
          <IconButton color="secondary" onClick={handleClose}>
            <Tooltip
              placement="right"
              TransitionComponent={Zoom}
              title="Close"
            >
              <CloseIcon 
                fontSize="medium" 
                sx={{
                  color: theme.palette.mode === "light" ? "#3063E9" : "inherit",
                }}
              />
            </Tooltip>
          </IconButton>
        </Box>
        <center >
          
          <Typography fontSize="26px" fontWeight={400} variant="h6" component="h2">
            Red Onion
          </Typography>
          <Typography fontSize="16px" fontWeight={400}  variant="h6" component="p">
            redonion.io
          </Typography>
          <Box mt={4} mb={4}>
            <LazyImageComponent src={people}  />
          </Box>
          <Box>
            <CopyToClipboard
              onCopy={() => setShowSnackbar(true)}
              text="copied"
            >
              <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                <LazyImageComponent src={link}  />
                <Typography
                  sx={{
                    '&:hover': {
                      textDecoration: 'underline',
                      cursor: "pointer",
                    },
                    color: theme.palette.mode === "light" ? "#3063E9" : "inherit",
                  }} 
                  fontSize="14px" fontWeight={500} variant="h6" 
                  component="h2"
                >
                  Copy link
                </Typography>
              </Box>
            </CopyToClipboard>
            
            <Box display="flex" mt={4} alignItems="center" justifyContent="center" gap={1}>
              <LazyImageComponent src={sms}  />
              <Typography 
                fontSize="14px" 
                fontWeight={500} 
                variant="h6" component="h2"
                sx={{
                  color: theme.palette.mode === "light" ? "#3063E9" : "inherit",
                }}
              >
                Share through email
              </Typography>
            </Box>
          </Box>
          
        </center>
        <Snackbar
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
          TransitionComponent={Slide} 
          open={showSnackbar}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
          >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
          >
            link Copied!
          </Alert>
        </Snackbar>
      </Box>
      
      </Modal>
      
    </>
  );
};

export default ReferalModal;
