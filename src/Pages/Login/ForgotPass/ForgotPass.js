import React from "react";
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
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";
// Router
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./ForgotPass.module.css";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";

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

  return (
    <Box
      bgcolor="Background.default"
      className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
    >
      <Box
        className={!isMobile ? styles.contentBox : ""}
      >
        {/* <Paper
        
          elevation={0}
          sx={!isMobile ? { borderRadius: "10px" } : {}}
        > */}
        <Box

          bgcolor="background.paper"
          p={!isMobile ? 5 : 3}
          borderRadius="10px"
        >
          <Button
            style={{ textDecoration: "none", color: "inherit", textTransform: "none", marginLeft: "-20px", marginTop: "0", marginBottom: "25px" }}

            color="secondary">
            <a

              // style={{ textDecoration: "none", color: "inherit", textTransform: "none", marginLeft: "-40px", marginTop: "0", marginBottom: "25px" }}
              href="/"
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
          {/* {!isMobile ? (
              <Typography className={styles.textUnderScore}></Typography>
            ) : (
              <Box width={"10%"}>
                <GrowwBar />
              </Box>
            )} */}
          <Box component="form" mt={!isMobile ? 4 : 8}>

            <Stack spacing={1} mb={2}>
              <Typography variant="body1" color={theme.palette.text.primary} fontSize={20}>Email</Typography>
              <Input
                disableUnderline
                className="inputField"
                type="email"
                variant="outlined"
                size="small"
                color="secondary"
              />
            </Stack>
            <Stack mb={4}>
              <Button
                style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }}
                onClick={() => navigate("/auth/reset-pass")}
                variant="contained"
                color="primary"
              >
                Send reset link <LazyImageComponent src={FrontArrow} />
              </Button>

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
