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

import { LoadingButton } from "@mui/lab";

// Styles
import styles from "./ResetPass.module.css";

import useAuth from "../../../hooks/useAuth";


import Back from "../../../assets/backArrow.svg";
import FrontArrow from "../../../assets/frontArrow.svg";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const ResetPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formError, setFormError] = useState("");

  // Hooks
  const { changePassword, authError, isLoading } = useAuth();

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;


  const handle = (e) => {
    e.preventDefault();

    if (token === "") { 
      setFormError("Please enter token!");
    }  else if (password === "") {
      setFormError("Please enter a password");
    } else if (password.length < 8) {
      setFormError("Password must be longer than or equal to 8 characters");
    } else if (!passwordRegex.test(password)) {
      setFormError("Password must contain atleast one uppercase letter, one lowercase letter, a number and a special character!");
    } else if (password !== confirmPassword) {
      setFormError("Password is not matching!");
    } else {
      setFormError("");
      changePassword(token, confirmPassword, navigate);
    }
  };

  return (
    <Box
      className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
    >
      <Box
        className={!isMobile ? styles.resetBox : styles.resetBoxMobile}
      >
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
            <Button
              style={{ textDecoration: "none", color: "inherit", textTransform: "none", marginLeft: "-20px", marginTop: "0", marginBottom: "25px" }}

              color="secondary">
              <a
                href="/auth/sign-in"
              >
                <LazyImageComponent src={Back} />
              </a>

            </Button>

            <Typography
              className={!isMobile ? styles.titleBox : styles.titleBox}
              variant="h3"
              color="secondary"
              fontWeight={500}
            >
              Reset Password?
            </Typography>

            <Box component="form" onSubmit={handle} mt={!isMobile ? 4 : 8}>
              <Stack spacing={1} mb={2}>
                <Typography
                  fontSize={20}
                  color={theme.palette.text.primary}
                  variant="body2"
                >
                  Token
                </Typography>
                <Input
                  autoComplete="off"
                  autoFocus
                  disableUnderline
                  className="inputField"
                  type="text"
                  inputProps={{ maxLength: 6 }}
                  variant="outlined"
                  size="small"
                  value={token}
                  color="secondary"
                 
                  onChange={(e) => setToken(e.target.value)}
                  
                />
              </Stack>
              <Stack spacing={1} mb={2}>
                <Typography fontSize={20} variant="body1">New Password</Typography>
                <Input
                  disableUnderline
                  className="inputField"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                <Typography fontSize={20} variant="body1">Confirm New Password</Typography>
                <Input
                  disableUnderline
                  className="inputField"
                  type={showPasswordConfirmed ? "text" : "password"}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              <Typography
                sx={{
                  textTransform: "capitalize",
                  display: "inline-block",
                }}
                my={1}
                textAlign={"center"}
                fontSize={20}
                variant="small"
                color="error"
              >
                {formError}
              </Typography>
              {authError && (
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    display: "inline-block",
                  }}
                  my={1}
                  variant="small"
                  color="error"
                  textAlign={"center"}
                  fontSize={20}
                >
                  {authError}
                </Typography>
              )}
              <Stack mt={3} mb={4}>
                {isLoading ? (
                  <LoadingButton loading variant="outlined">
                    Login
                  </LoadingButton>
                ) : (
                  <>
                    <Button
                      type="submit"
                      style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }}
                      variant="contained"
                      color="primary"
                    >
                      Submit <LazyImageComponent src={FrontArrow} />
                    </Button>
                  </>
                )}

              </Stack>
              <Stack justifyContent="flex-start" alignItems="flex-start">
                <Typography
                  variant="body2"
                  color={theme.palette.text.primary}
                  onClick={() => navigate("/auth/sign-in")}
                  sx={{ cursor: "pointer" }}
                  fontSize={20}
                >
                  Go back to{" "}
                  <Typography variant="body2" fontSize={20} component="span" color="primary">
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
