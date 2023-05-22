import React, { useState } from "react";
import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";

// Router
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./ResetPass.module.css";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";

const ResetPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      bgcolor="background.default"
      className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
    >
      <Box className={!isMobile ? styles.resetBox : styles.resetBoxMobile}>
        <Paper
          className={!isMobile ? styles.contentBox : styles.contentBoxMobile}
          elevation={0}
          sx={!isMobile ? { borderRadius: "10px" } : {}}
        >
          <Box
            bgcolor="background.paper"
            p={!isMobile ? 5 : 3}
            sx={!isMobile ? { borderRadius: "10px" } : {}}
          >
            <Typography
              className={!isMobile ? styles.titleBox : ""}
              variant="h3"
              color="primary"
              fontWeight={700}
            >
              Reset Password?
            </Typography>
            {!isMobile ? (
              <Typography className={styles.textUnderScore}></Typography>
            ) : (
              <Box width={"10%"}>
                <GrowwBar />
              </Box>
            )}
            <Box component="form" mt={!isMobile ? 4 : 8}>
              <Stack spacing={1} mb={2}>
                <Typography variant="body1">New Password</Typography>
                <Input
                  disableUnderline
                  className="inputField"
                  type={showPassword ? "text" : "password"}
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
                />
              </Stack>
              <Stack spacing={1} mb={2}>
                <Typography variant="body1">Confirm New Password</Typography>
                <Input
                  disableUnderline
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
                />
              </Stack>
              <Stack mb={4}>
                {theme.palette.mode === "dark" ? (
                  <Button
                    onClick={() => navigate("/")}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                ) : (
                  <LightUIButtonPrimary
                    onClick={() => navigate("/")}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </LightUIButtonPrimary>
                )}
              </Stack>
              <Stack justifyContent="flex-start" alignItems="flex-start">
                <Typography
                  variant="body2"
                  onClick={() => navigate("/auth/sign-in")}
                  sx={{ borderBottom: "1px solid #F9E006", cursor: "pointer" }}
                >
                  Go back to{" "}
                  <Typography variant="body2" component="span" color="primary">
                    Login
                  </Typography>
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ResetPass;
