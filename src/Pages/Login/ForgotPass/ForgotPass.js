import React, { useState } from "react";
import {
  Button,
  Input,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";

import { LoadingButton } from "@mui/lab";
// Router
import { useNavigate } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";

// Styles
import styles from "./ForgotPass.module.css";

import Back from "../../../assets/backArrow.svg";
import FrontArrow from "../../../assets/frontArrow.svg";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const ForgotPass = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [userEmail, setUserEmail] = useState("");

  const [formError, setFormError] = useState("");

  // Hooks
  const { forgotPass, authError, isLoading } = useAuth();

  const handle = (e) => {
    e.preventDefault();
    if (userEmail === "") {
      setFormError("Please enter an email");
    } else {
      setFormError("");
      forgotPass(
        userEmail,
        navigate
      );
    }
  }



  return (
    <Box
      bgcolor="Background.default"
      className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
    >
      <Box
        className={!isMobile ? styles.contentBox : ""}
      >

        <Box

          bgcolor="background.paper"
          p={!isMobile ? 5 : 3}
          borderRadius="10px"
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
            Forgot Password?
          </Typography>

          <Box component="form" onSubmit={handle} mt={!isMobile ? 4 : 8}>

            <Stack spacing={1} mb={2}>
              <Typography variant="body1" color={theme.palette.text.primary} fontSize={20}>Email</Typography>
              <Input
                disableUnderline
                className="inputField"
                type="email"
                variant="outlined"
                size="small"
                color="secondary"
                onChange={(e) => setUserEmail(e.target.value)}
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
                    // onClick={() => navigate("/auth/reset-pass")}
                    variant="contained"
                    color="primary"
                  >
                    Send reset link <LazyImageComponent src={FrontArrow} />
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
        {/* </Paper> */}
      </Box>
    </Box>
  );
};

export default ForgotPass;
