import React, { useState } from "react";
import {
  Divider,
  Zoom,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  Button,
  useTheme,
  Stack,
  useMediaQuery
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

// Logout authentication
import useAuth from "../../../../hooks/useAuth";

// Styles
import styles from "../Account.module.css";

import { LoadingButton } from "@mui/lab";

// Axios
import axios from "../../../../api/axios";

// Authentication
import { useNavigate } from "react-router-dom";
import { LightUIButtonPrimary } from "../../../../Utilities/LightUIButtons";

const DeleteAccountModal = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const { logOut } = useAuth();

  const DELETE_ACCOUNT_URL = "/user/add-bank-account";




  const deleteAccount = () => {

   
    setLoading(true);

    axios.delete(
      DELETE_ACCOUNT_URL,
     
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      console.log(res.data);
      logOut();
      navigate("/registration/sign-up")
    }).catch((err) => {
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
      } else {

      }
    })
      .finally(() => setLoading(false));



  };

  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      keepMounted
      open={open}
      onClose={handleClose}
    >
      <Box bgcolor="background.paper" 
      className={!isMobile ? styles.deleteAccountModalBody : ""}
      >
        <Box className={styles.modalTopBar}>
         
          <IconButton color="secondary" onClick={handleClose}>
            <Tooltip
              placement="right"
              TransitionComponent={Zoom}
              title="Close Modal"
            >
              <CloseIcon fontSize="medium" />
            </Tooltip>
          </IconButton>
        </Box>
        <center>
          <Typography variant="h6" component="h2">
            Delete Account
          </Typography>
        </center>
       
        <Box className={styles.deleteAccountModalContentBox}>
          <Typography
            mb={3}
            textAlign="center"
            lineHeight={2}
            color="secondary"
            variant="body2"
          >
            Are you sure you want to delete your account? Once deleted, it can't
            be recovered again.
          </Typography>
        </Box>
        <Stack mt={1} >
          {loading ? (
            <LoadingButton loading variant="outlined">
              Login
            </LoadingButton>
          ) : (
            <>
              <Button
                onClick={
                    deleteAccount
                }
                style={{ height: 60, borderRadius: 10, fontSize: 18, textTransform: 'none' }} variant="contained" color="primary">
                  Yes, delete my account
              </Button>

            </>
          )}
        </Stack>
        
      </Box>
    </Modal>
  );
};

export default DeleteAccountModal;
