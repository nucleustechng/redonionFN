import React, { Suspense, useState, useEffect } from "react";
import {
  Divider,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  Input,
  Button,
  Radio,
  Tooltip,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  Skeleton,
  Zoom,
  IconButton,
  Snackbar,
  Paper,
  List,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

import Close from "@mui/icons-material/Close";

import { CopyToClipboard } from "react-copy-to-clipboard";

// Styles
import styles from "./CreateRequestModal.module.css";

import { LoadingButton } from "@mui/lab";

import useAuth from "../../../hooks/useAuth";

// Axios
import axios from "../../../api/axios";

// Router
import { useNavigate } from "react-router-dom";

import Back from "../../../assets/backArrow.svg";

import moment from "moment";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);



const CreateNotifcationModal = ({ open, onClose, country, currency }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [notifiData, setNotifiData] = useState([]);

  const [loading, setLoading] = useState(false);

  const GET_NOTI_URL = "/user/notification/load";

  const GET_NOTI_READ_URL = "/user/notification/read";

  var user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (open) {
      axios
        .get(GET_NOTI_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          
          setNotifiData(res.data.data.notifications);
        })
        .catch((err) => {
          // console.log(err?.response?.status);
          if (err?.response?.status === 401) {
            navigate("/user/sign-in");
          }
        })
        .finally(() => {});
      if (notifiData.length > 0) {
        axios
          .post(
            GET_NOTI_READ_URL,
            JSON.stringify({
              notificationIds: [notifiData[notifiData.length - 1].id],
            }),
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          )
          .then((res) => {
            // console.log(res.data.data);
          })
          .catch((err) => {
            // console.log(err?.response?.status);
            if (err?.response?.status === 401) {
              navigate("/user/sign-in");
            }
          })
          .finally(() => {});
      }
    }
  }, [user, GET_NOTI_URL, navigate, setNotifiData, notifiData, open]);

  return (
    <Modal
      disableAutoFocus
      disableEscapeKeyDown
      keepMounted
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
    >
      <Box className={!isMobile ? styles.modalStyle : styles.modalStyleMobile}>
        <Box
          bgcolor={theme.palette.background.paper}
          className={styles.modalContentBox}
        >
          <Box p={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={"5px"}
            >
              <Typography
                variant="caption"
                fontSize={16}
                fontWeight={500}
                color="primary"
              >
                Notification
              </Typography>

              <Typography
                // variant="body2"
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={onClose}
              >
                <CloseIcon />
              </Typography>
            </Stack>
          </Box>
          <Paper style={{ maxHeight: 700, overflow: "auto" }}>
            {notifiData.length > 0 ? (
              <List
              // height={600}
              // width={"100%"}
              // itemSize={500}
              // itemCount={notifiData.length}
              // overscanCount={500}
              // itemData={notifiData}
              >
                {notifiData.map((info) => (
                  <ListItem>
                    <Box m={1} width={"100%"}>
                      <Box mb={2}>
                        <Stack direction="row">
                          <Typography mt={0.2} fontSize={14}>
                            {info.message}
                          </Typography>
                        </Stack>

                        <Box>
                          <Stack
                            direction="row"
                            justifyContent={"right"}
                            alignItems={"right"}
                          >
                            <Typography
                              color="secondary"
                              fontWeight={400}
                              fontSize={12}
                              mt={0.8}
                              variant="body2"
                            >
                              {moment(info?.timestamp).format("Do MMMM YYYY")}
                            </Typography>
                          </Stack>
                        </Box>
                      </Box>

                      <Divider />
                    </Box>
                  </ListItem>
                ))}
              </List>
            ) : (
              <>
                <Stack
                  mb={2}
                  direction="row"
                  alignItems={"center"}
                  justifyContent="center"
                >
                  <Box mb={3}>
                    <Typography
                      variant="caption"
                      textTransform={"none"}
                      fontSize={16}
                      // color="background.light"
                    >
                      No Notification...
                    </Typography>
                  </Box>
                </Stack>
              </>
            )}
          </Paper>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateNotifcationModal;
