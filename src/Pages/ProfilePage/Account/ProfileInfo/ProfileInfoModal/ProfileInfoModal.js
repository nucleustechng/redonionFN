import React from "react";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
  Zoom,
  styled,
  Input,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

// Styles
import styles from "../../Account.module.css";

// Custom Theme
import { useTheme } from "@mui/material/styles";
import { LightUIButtonPrimary } from "../../../../../Utilities/LightUIButtons";

// Custom input style
const ImageInput = styled("input")({
  display: "none",
});

const ProfileInfoModal = ({
  open,
  handleClose,
  profileInformation,
  handleProfileInformationChange,
  handleEdit,
  userAvatar,
  handleImageUpload,
  setUserAvatar,
}) => {
  const theme = useTheme();
  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      keepMounted
      open={open}
      onClose={handleClose}
    >
      <Box bgcolor="background.paper" className={styles.profileInfoModalBody}>
        <Box className={styles.modalTopBar}>
          <Box>
            <Typography
              variant="h5"
              component="h2"
              fontWeight={600}
              color="primary"
              letterSpacing={1}
            >
              Edit Personal Info
            </Typography>
            <Typography className={styles.textUnderScore}></Typography>
          </Box>
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
        <Divider />
        <Box className={styles.profileInfoModalContentBox}>
          {/* Photo */}
          <Box className={styles.imageUploadBox}>
            {!userAvatar ? (
              <Box>
                <Box
                  sx={{
                    border: `${
                      theme.palette.mode === "dark"
                        ? "2px dashed #f5f5f5"
                        : "2px dashed #c4c4c4"
                    }`,
                  }}
                  className={styles.imageBox}
                >
                  <Typography
                    sx={{
                      color: `${
                        theme.palette.mode === "dark" ? "#f5f5f5" : "#c4c4c4"
                      }`,
                    }}
                  >
                    <AddPhotoAlternateIcon sx={{ fontSize: "2.5rem" }} />
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box className={styles.uploadedImageBox}>
                <img src={userAvatar} alt="User Name" />
              </Box>
            )}
            <Box>
              <Typography variant="body2" mb={2}>
                Upload your picture
              </Typography>
              <Box>
                {!userAvatar ? (
                  <label htmlFor="icon-button-file-upload">
                    <ImageInput
                      accept="image/*"
                      id="icon-button-file-upload"
                      type="file"
                      onChange={handleImageUpload}
                    />
                    <Tooltip
                      placement="right"
                      title="Upload Photo"
                      TransitionComponent={Zoom}
                    >
                      <Button
                        variant="outlined"
                        aria-label="upload picture"
                        component="span"
                      >
                        Upload
                      </Button>
                    </Tooltip>
                  </label>
                ) : (
                  <Tooltip
                    placement="right"
                    title="Remove Photo"
                    TransitionComponent={Zoom}
                  >
                    <Button
                      onClick={() => setUserAvatar(null)}
                      variant="outlined"
                    >
                      Remove
                    </Button>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Box>
          {/* Name */}
          <Stack spacing={1} mb={2}>
            <Typography
              variant="body2"
              color={
                theme.palette.mode === "dark"
                  ? "text.secondary"
                  : "common.black"
              }
            >
              Name
            </Typography>
            <Input
              disableUnderline
              className="inputField"
              value={
                profileInformation.userName ? profileInformation.userName : ""
              }
              name="userName"
              onChange={handleProfileInformationChange}
              variant="filled"
              size="small"
              color="secondary"
            />
          </Stack>
          {/* Email */}
          <Stack spacing={1} mb={2}>
            <Typography
              variant="body2"
              color={
                theme.palette.mode === "dark"
                  ? "text.secondary"
                  : "common.black"
              }
            >
              Email
            </Typography>
            <Input
              disableUnderline
              className="inputField"
              value={
                profileInformation.userEmail ? profileInformation.userEmail : ""
              }
              name="userEmail"
              type="email"
              onChange={handleProfileInformationChange}
              variant="filled"
              size="small"
              color="secondary"
            />
          </Stack>
          {/* Phone */}
          <Stack spacing={1} mb={2}>
            <Typography
              variant="body2"
              color={
                theme.palette.mode === "dark"
                  ? "text.secondary"
                  : "common.black"
              }
            >
              Phone
            </Typography>
            <Input
              disableUnderline
              className="inputField"
              value={
                profileInformation.userPhone ? profileInformation.userPhone : ""
              }
              name="userPhone"
              onChange={handleProfileInformationChange}
              variant="filled"
              size="small"
              color="secondary"
              type="number"
            />
          </Stack>
        </Box>
        {theme.palette.mode === "dark" ? (
          <Button
            onClick={handleEdit}
            color="primary"
            variant="contained"
            fullWidth
          >
            Save
          </Button>
        ) : (
          <LightUIButtonPrimary onClick={handleEdit} color="primary" fullWidth>
            Save
          </LightUIButtonPrimary>
        )}
      </Box>
    </Modal>
  );
};

export default ProfileInfoModal;
