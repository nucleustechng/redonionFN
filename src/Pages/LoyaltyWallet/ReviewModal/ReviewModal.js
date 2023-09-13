import React, { useState } from "react";
import {
  Button,
  Divider,
  IconButton,
  Input,
  Modal,
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

const ReviewModal = ({ open, handleClose, handleOpenSnackBar }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

   const [rating, setRating] = useState(0);

   // Catch Rating value
   const handleRating = (rate) => {
     setRating(rate);

     // other logic
   };
   // Optinal callback functions
   const onPointerEnter = () => console.log("Enter");
   const onPointerLeave = () => console.log("Leave");
   const onPointerMove = (value, index) => 
     console.log(value, index);


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
              title="Close Modal"
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
            <Rating
              onClick={handleRating}
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onPointerMove={onPointerMove}
              /* Available Props */
            />
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
            color="secondary"
            name="desc"
            // onChange={(e) => setDesc(e.target.value)}
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
              width: "250px",
            }}
            variant="contained"
          >
            <Typography fontWeight={500}>Cancel</Typography>
          </Button>

          <Button
            className={
              !isMobile
                ? styles.rewardClaimModalButton
                : styles.rewardClaimModalButtonMobile
            }
            onClick={handleOpenSnackBar}
            color="primary"
            variant="contained"
            fullWidth
          >
            <Typography fontWeight={500}>Submit</Typography>
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
