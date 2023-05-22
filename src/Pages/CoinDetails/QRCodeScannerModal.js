import React from "react";
import {
  Divider,
  Zoom,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import QRImageScanner from "../../assets/qrImageScanner.svg";

// Styles
import styles from "./CoinDetailsStyle.module.css";

import Webcam from "react-webcam";

const QRCodeScannerModal = ({ open, handleClose, startCamera }) => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);
  // const navigate = useNavigate();

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
            ? styles.receivingQRCodeModalBody
            : styles.receivingQRCodeModalBodyMobile
        }
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
        <Divider />
        <Box
          className={
            !isMobile
              ? styles.receivingQRCodeModalContentBox
              : styles.receivingQRCodeModalContentBoxMobile
          }
        >
          {startCamera && (
            <Box sx={{ position: "relative" }}>
              {imgSrc ? (
                <img
                  className={
                    !isMobile ? styles.webCamImage : styles.webCamImageMobile
                  }
                  src={imgSrc}
                  alt={Math.random().toString()}
                />
              ) : (
                <Webcam
                  className={
                    !isMobile ? styles.webCamImage : styles.webCamImageMobile
                  }
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  imageSmoothing={true}
                  videoConstraints={{ facingMode: "environment" }}
                />
              )}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  style={{ display: "block", width: "100%", height: "100%" }}
                  src={QRImageScanner}
                  alt="Scanning"
                />
              </Box>
            </Box>
          )}
        </Box>
        <Stack direction="column" spacing={1} mt={2}>
          <Button
            startIcon={<QrCodeScannerIcon />}
            onClick={capture}
            color="primary"
            variant="contained"
            fullWidth
          >
            <Typography
              variant="caption"
              className={styles.receivingQRCodeModalButton}
              color="common.black"
              fontWeight={700}
            >
              Scan
            </Typography>
          </Button>
          {imgSrc && (
            <Button
              startIcon={<NoPhotographyIcon />}
              onClick={() => setImgSrc(null)}
              color="error"
              variant="contained"
              fullWidth
              disabled={imgSrc ? false : true}
            >
              <Typography
                variant="caption"
                className={styles.receivingQRCodeModalButton}
                color="common.black"
                fontWeight={700}
              >
                Delete
              </Typography>
            </Button>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default QRCodeScannerModal;
