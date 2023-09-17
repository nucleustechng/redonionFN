import React, { useEffect, useState } from "react";
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
  useMediaQuery,
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
import axios from "../../../../api/axios";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../../components/LazyImageComponent/LazyImageComponent")
);

const UserVeifyModal = ({ open, handleClose, user, chooseMessage, status }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  let msg = "close";

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [userInfo, setuserInfo] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const GET_KYC_URL = "kyc/view-selfie-image/";

  const GET_IDEN_URL = "/kyc/view-identity-document/";

  const GET_VERIFY_URL = "/kyc/verify-user-identity/";

  const GET_UNVERIFY_URL = "/kyc/unverify-user-identity/";

  useEffect(() => {
    const getSelfie = () => {
      // setLoading(true);

      axios
        .get(GET_KYC_URL + user?.id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          // setStatus(res.data.data.active);
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            navigate("/admin/sign-in");
          }
        })
        .finally(() => {
          // setLoading(false);
        });
    };

    const getDen = () => {
      // setLoading(true);

      axios
        .get(GET_IDEN_URL + user?.id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          // setStatus(res.data.data.active);
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            navigate("/admin/sign-in");
          }
        })
        .finally(() => {
          // setLoading(false);
        });
    };

    getDen();

    getSelfie();
  });

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
          {/* <center>
            <LazyImageComponent src={successClock} />
          </center>
          <Typography
            variant="h3"
            mt={!isMobile ? 4 : 8}
            className={!isMobile ? styles.titleBox : styles.titleBoxMobile}
            color="white"
            fontWeight={500}
          >
            Are you sure you want to {!status ? "unsuspend" : "suspend"}
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
                  Yes, {!status ? "unsuspend" : "suspend"}
                </Button>
              </>
            )}
          </Stack> */}
        </Box>
      </Box>
    </Modal>
  );
};

export default UserVeifyModal;
