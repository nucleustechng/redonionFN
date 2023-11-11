import React, { useState } from "react";
import {
  Alert,
  Button,
  Divider,
  IconButton,
  Input,
  Modal,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

// Styles
import styles from "../RewardTabArea/RewardTabArea.module.css";
import { Rating } from "react-simple-star-rating";
import axios from "../../../api/axios";
import { LoadingButton } from "@mui/lab";
import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import LazyImageComponent from "../../../components/LazyImageComponent/LazyImageComponent";

import StarIcon from "../../../assets/starReview.svg";

const ReviewModal = ({ open, handleClose, info, handleOpenSnackBar }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [msgShow, setMsgShow] = useState("");

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);

  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);

    // other logic
  };

  const CREATE_REVIEW_URL = "/transaction/rate-and-review";

  const getFees = () => {
    if (review === "") return;
    setLoading(true);

    axios
      .post(
        CREATE_REVIEW_URL,
        JSON.stringify({
          transactionId: info?.id,
          rating: rating,
          review: review,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setMsgShow(res.data.msg);
        handleClose();
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);
console.log(info)

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSendSuccessfullSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSendSnackbar}
      >
        <Alert
          action={
            <IconButton onClick={handleCloseSendSnackbar} sx={{ mt: -0.5 }}>
              <Close sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          }
          icon={<CheckCircleOutline sx={{ fontSize: "1.5rem" }} />}
          sx={{ fontSize: "1rem" }}
          onClose={handleCloseSendSnackbar}
          severity={msgShow === "" ? "success" : "error"}
        >
          {msgShow}
        </Alert>
      </Snackbar>
      <Modal
        disableAutoFocus
        disableEnforceFocus
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <Box
          bgcolor="background.paper"
          className={
            !isMobile
              ? styles.claimRewardModalBody
              : styles.claimRewardModalBodyMobile
          }
        >
          <Box className={styles.modalTopBar}>
            <Typography variant={!isMobile ? "h6" : "subtitle1"} component="h2">
              Rate and Review Seller
            </Typography>
            <IconButton color="secondary" onClick={handleClose}>
              <Tooltip
                placement="right"
                TransitionComponent={Zoom}
                title="Close"
              >
                <CloseIcon fontSize="medium" />
              </Tooltip>
            </IconButton>
          </Box>

          <Box
            className={
              !isMobile
                ? styles.claimRewardModalContentBox
                : styles.claimRewardModalContentBoxMobile
            }
          >
            <Stack
              direction="row"
              mb={2}
              alignItems="center"
              justifyContent={"center"}
            >
              <Typography
                mb={2}
                textAlign="center"
                lineHeight={2}
                color="secondary"
                variant={!isMobile ? "body2" : "caption"}
              >
                Rate your Experience with the seller
              </Typography>
            </Stack>
            <Stack
              direction="row"
              mb={2}
              alignItems="center"
              justifyContent={"center"}
            >
              {/* {!info?.review?.rating ? (
                <>
                  <LazyImageComponent src={StarIcon} />
                  <Typography
                    mb={2}
                    ml={1}
                    textAlign="center"
                    fontSize={16}
                    lineHeight={2}
                    color="secondary"
                    variant={!isMobile ? "body2" : "caption"}
                  >
                    {info?.review?.rating}
                  </Typography>
                </>
              ) : ( */}
              <Rating
                initialValue={info?.review?.rating}
                onClick={handleRating}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                /* Available Props */
              />
              {/* )} */}
            </Stack>
            <Stack
              direction="row"
              mb={2}
              alignItems="center"
              justifyContent={"center"}
            >
              <Typography
                mb={3}
                textAlign="center"
                lineHeight={2}
                color="secondary"
                variant={!isMobile ? "body2" : "caption"}
              >
                Write a review of the seller
              </Typography>
            </Stack>
            <Input
              multiline
              rows={9}
              sx={{ p: 1, width: "100%", mb: 2 }}
              disableUnderline
              className="inputField"
              type="text"
              placeholder="Review"
              variant="outlined"
              size="small"
              value={info?.review?.comment }
              color="secondary"
              name="desc"
              onChange={(e) => setReview(e.target.value)}
            />
          </Box>

          <Stack direction="row" mx={2} alignItems="center" spacing={1}>
            <Button
              className={
                !isMobile
                  ? styles.rewardClaimModalButton
                  : styles.rewardClaimModalButtonMobile
              }
              onClick={handleClose}
              style={{
                backgroundColor: "#E8E8F3",
                color: "#3063E9",
                width: info?.review?.rating ? "100%" : "250px",
              }}
              variant="contained"
            >
              <Typography fontWeight={500}>Cancel</Typography>
            </Button>
            <div>
              {!info?.review?.rating && (
                <>
                  {loading ? (
                    <LoadingButton fullWidth loading variant="outlined">
                      Login
                    </LoadingButton>
                  ) : (
                    <>
                      <Button
                        className={
                          !isMobile
                            ? styles.rewardClaimModalButton
                            : styles.rewardClaimModalButtonMobile
                        }
                        style={{
                          width: "250px",
                        }}
                        onClick={() => getFees()}
                        color="primary"
                        variant="contained"
                        fullWidth
                      >
                        <Typography fontWeight={500}>Submit</Typography>
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ReviewModal;
