import React, { Suspense, useState } from "react";
import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";

// Styles
import styles from "./TwoFAPopUp.module.css";

// Logo
import MainVectorLogo from "../../../assets/mainLogo.svg";

// Theme
import { useTheme } from "@mui/material/styles";

// Router
import { useNavigate } from "react-router-dom";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";

// Lazy Image
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const TwoFAPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);
  const [userPin, setUserPin] = useState("");
  const [userPinConfirmed, setUserPinConfirmed] = useState("");

  const handleUserPinPressing = (e) => {
    if (!isNaN(e.target.value)) {
      setUserPin(e.target.value);
    } else {
      // Nothing
    }
  };

  const handleUserPinConfirmedPressing = (e) => {
    if (!isNaN(e.target.value)) {
      setUserPinConfirmed(e.target.value);
    } else {
      // Nothing
    }
  };

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box className={!isMobile ? styles.mainArea : ""}>
      {!isMobile && (
        <Box className={styles.logoBox}>
          <Suspense
            fallback={
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
                sx={{
                  backgroundColor: `${
                    theme.palette.mode === "dark" ? "#111" : "#f5f5f5"
                  }`,
                }}
              />
            }
          >
            <LazyImageComponent
              style={{ width: "50px", height: "50px" }}
              src={MainVectorLogo}
            />
          </Suspense>
        </Box>
      )}
      {!isMobile && (
        <Box className={styles.contentBox}>
          <Box
            bgcolor="background.paper"
            className={styles.modalStyle}
            width={500}
          >
            <Box bgcolor="background.paper" p={4} borderRadius="10px">
              <Typography
                className={styles.titleBox}
                color="primary"
                variant="h3"
                fontWeight={700}
              >
                2FA Setup
              </Typography>
              <Typography className={styles.textUnderScore}></Typography>
              <Box component="form" mt={3}>
                <Stack spacing={1} mb={2}>
                  <Typography
                    color={theme.palette.text.primary}
                    variant="body2"
                  >
                    Set Pin
                  </Typography>
                  <Input
                    autoComplete="off"
                    autoFocus
                    disableUnderline
                    className="inputField"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    size="small"
                    value={userPin}
                    color="secondary"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {!showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={handleUserPinPressing}
                  />
                </Stack>
                <Stack spacing={1} mb={2}>
                  <Typography
                    variant="body2"
                    color={theme.palette.text.primary}
                  >
                    Confirm Pin
                  </Typography>
                  <Input
                    autoComplete="off"
                    value={userPinConfirmed}
                    disableUnderline
                    name="pinConfirmed"
                    className="inputField"
                    type={showPasswordConfirmed ? "text" : "password"}
                    variant="outlined"
                    size="small"
                    color="secondary"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPasswordConfirmed(!showPasswordConfirmed)
                          }
                        >
                          {!showPasswordConfirmed ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={handleUserPinConfirmedPressing}
                  />
                </Stack>
                <Stack>
                  {theme.palette.mode === "dark" ? (
                    <Button
                      onClick={() => navigate("/login/otp-verification")}
                      variant="contained"
                      color="primary"
                    >
                      Proceed
                    </Button>
                  ) : (
                    <LightUIButtonPrimary
                      onClick={() => navigate("/login/otp-verification")}
                      variant="contained"
                      color="primary"
                    >
                      Proceed
                    </LightUIButtonPrimary>
                  )}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {isMobile && (
        <Box bgcolor="background.paper" className={styles.contentBoxMobile}>
          <Box className={styles.modalStyleMobile}>
            <Box bgcolor="background.paper" p={3}>
              <Typography color="primary" variant="h3" fontWeight={700}>
                2FA Setup
              </Typography>
              <Box width={"10%"}>
                <GrowwBar />
              </Box>
              <Box component="form" mt={8}>
                <Stack spacing={1} mb={2}>
                  <Typography
                    color={theme.palette.text.primary}
                    variant="body2"
                  >
                    Set Pin
                  </Typography>
                  <Input
                    autoFocus
                    value={userPin}
                    autoComplete="off"
                    disableUnderline
                    className="inputField"
                    type={showPassword ? "number" : "password"}
                    inputProps={{ inputMode: "numeric" }}
                    variant="outlined"
                    size="small"
                    color="secondary"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {!showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={handleUserPinPressing}
                  />
                </Stack>
                <Stack spacing={1} mb={2}>
                  <Typography
                    variant="body2"
                    color={theme.palette.text.primary}
                  >
                    Confirm Pin
                  </Typography>
                  <Input
                    value={userPinConfirmed}
                    disableUnderline
                    className="inputField"
                    type={showPasswordConfirmed ? "number" : "password"}
                    inputProps={{ inputMode: "numeric" }}
                    variant="outlined"
                    size="small"
                    color="secondary"
                    autoComplete="off"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPasswordConfirmed(!showPasswordConfirmed)
                          }
                        >
                          {!showPasswordConfirmed ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={handleUserPinConfirmedPressing}
                  />
                </Stack>
                <Stack>
                  {theme.palette.mode === "dark" ? (
                    <Button
                      onClick={() => navigate("/login/otp-verification")}
                      variant="contained"
                      color="primary"
                    >
                      Proceed
                    </Button>
                  ) : (
                    <LightUIButtonPrimary
                      onClick={() => navigate("/login/otp-verification")}
                      variant="contained"
                      color="primary"
                    >
                      Proceed
                    </LightUIButtonPrimary>
                  )}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TwoFAPage;
