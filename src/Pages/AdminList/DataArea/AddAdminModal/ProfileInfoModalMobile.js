import React from "react";
import {
  Button,
  Stack,
  Tooltip,
  Typography,
  Zoom,
  styled,
  Input,
} from "@mui/material";
import { Box } from "@mui/system";
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

const ProfileInfoModalMobile = ({
  profileInformation,
  handleProfileInformationChange,
  handleEdit,
  userAvatar,
  handleImageUpload,
  setUserAvatar,
}) => {
  const theme = useTheme();
  return (
    <Box
      px={2}
      height={"100%"}
      bgcolor="background.paper"
      className={styles.profileInfoModalBodyMobile}
    >
      <Box>
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
                  <AddPhotoAlternateIcon sx={{ fontSize: "2rem" }} />
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
              theme.palette.mode === "dark" ? "text.secondary" : "common.black"
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
              theme.palette.mode === "dark" ? "text.secondary" : "common.black"
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
              theme.palette.mode === "dark" ? "text.secondary" : "common.black"
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
  );
};

export default ProfileInfoModalMobile;
