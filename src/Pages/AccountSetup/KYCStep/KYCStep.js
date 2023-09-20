import React, { useState } from "react";
import {
  Grid,
  IconButton,
  Input,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";

import styles from "./KYCStep.module.css";

// Theme
import { useTheme } from "@mui/material/styles";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";

// Custom input style
const ImageInput = styled("input")({
  display: "none",
});

const KYCStep = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleImageUploadFront = (e) => {
    setFrontImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleImageUploadBack = (e) => {
    setBackImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Box p={!isMobile ? 5 : 3} bgcolor="background.paper">
      <Typography
        variant={!isMobile ? "h4" : "h3"}
        color="primary"
        fontWeight={700}
      >
        Complete your KYC
      </Typography>
      {!isMobile ? (
        <Typography mt={1} className={styles.textUnderScore}></Typography>
      ) : (
        <Box mt={1} width={"10%"}>
          <GrowwBar />
        </Box>
      )}
      <Box mt={!isMobile ? 4 : 8}>
        <Typography variant="body2" mb={1}>
          Full Name
        </Typography>
        <Input
          disableUnderline
          className="inputField"
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          color="secondary"
        />
        <Typography variant="body2" mt={3} mb={1}>
          Address
        </Typography>
        <Input
          disableUnderline
          className="inputField"
          type="text"
          multiline
          rows={4}
          sx={{ p: 1 }}
          variant="outlined"
          size="small"
          fullWidth
          color="secondary"
        />
        <Typography variant="body2" mt={3} mb={1}>
          Aadhar Card Number
        </Typography>
        <Input
          disableUnderline
          className="inputField"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          color="secondary"
        />
        <Box className={styles.imageBox} mt={5}>
          <Grid
            sx={{
              border: `${
                theme.palette.mode === "dark"
                  ? "3px dashed #f5f5f5"
                  : "3px dashed #c4c4c4"
              }`,
              borderRadius: "10px",
            }}
            item
            xs={6}
            md={6}
          >
            {!frontImage ? (
              <Box className={styles.imageUploadBox}>
                <label htmlFor="icon-button-file-upload">
                  <Box>
                    <ImageInput
                      accept="image/*"
                      id="icon-button-file-upload"
                      type="file"
                      onChange={handleImageUploadFront}
                    />
                    <Stack justifyContent="center">
                      <IconButton
                        variant="outlined"
                        aria-label="upload picture"
                        component="span"
                      >
                        <AddPhotoAlternateIcon sx={{ fontSize: "2.5rem" }} />
                      </IconButton>
                    </Stack>
                    <Typography variant="caption">Upload front side</Typography>
                  </Box>
                </label>
              </Box>
            ) : (
              <Box className={styles.uploadedImage}>
                <img src={frontImage} alt="Front side" />
                <Box className={styles.cancelButton}>
                  <IconButton onClick={() => setFrontImage(null)} color="error">
                    <CancelIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Grid>
          <Grid
            sx={{
              border: `${
                theme.palette.mode === "dark"
                  ? "3px dashed #f5f5f5"
                  : "3px dashed #c4c4c4"
              }`,
              borderRadius: "10px",
            }}
            item
            xs={6}
            md={6}
          >
            {!backImage ? (
              <Box className={styles.imageUploadBox}>
                <label htmlFor="icon-button-file-upload">
                  <ImageInput
                    accept="image/*"
                    id="icon-button-file-upload"
                    type="file"
                    onChange={handleImageUploadBack}
                  />
                  <Stack justifyContent="center">
                    <IconButton
                      variant="outlined"
                      aria-label="upload picture"
                      component="span"
                    >
                      <AddPhotoAlternateIcon sx={{ fontSize: "2.5rem" }} />
                    </IconButton>
                  </Stack>
                  <Typography variant="caption">Upload back side</Typography>
                </label>
              </Box>
            ) : (
              <Box className={styles.uploadedImage}>
                <img src={backImage} alt="Back side" />
                <Box className={styles.cancelButton}>
                  <IconButton onClick={() => setBackImage(null)} color="error">
                    <CancelIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default KYCStep;
