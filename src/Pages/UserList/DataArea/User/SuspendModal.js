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

// Logout authentication
import useAuth from "../../../../hooks/useAuth";
// Styles
import styles from "./Support.module.css";


import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";

import successClock from "../../../../assets/logout.svg";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../../components/LazyImageComponent/LazyImageComponent")
);

const SuspendModal = ({ open, handleClose, user, chooseMessage, status }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  let msg = "close";

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
        // bgcolor="background.paper"
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
            color="white"
            fontWeight={500}
          >
            Are you sure you want to {!status ? "reactive" : "suspend"}
          </Typography>
          <Typography
            variant="h3"
            mt={1}
            className={!isMobile ? styles.titleBox : styles.titleBoxMobile}
            color="white"
            fontWeight={500}
          >
            {user.firstName} {user.lastName} {user.middleName}?
          </Typography>
          <Stack mt={4}>
            {loading ? (
              <LoadingButton loading variant="outlined">
                Login
              </LoadingButton>
            ) : (
              <>
                <Button
                  onClick={() => chooseMessage(msg)}
                  style={{
                    height: 60,
                    borderRadius: 10,
                    fontSize: 18,
                    textTransform: "none",
                  }}
                  variant="contained"
                  color="primary"
                >
                  Yes, {!status ? "Reactive" : "Suspend"}
                </Button>
              </>
            )}
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default SuspendModal;
