import React, { Suspense } from "react";

// Theme
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "./CryptoWalletTopCards.module.css";

// Material
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";

// Card Images
import TotalFundValueImage from "../../../assets/totalFundValueImage.svg";
import BuyCryptoCardImage from "../../../assets/buyCryptoCurrencyCardImg.svg";
import TotalFundValueImageLight from "../../../assets/totalFundValueImageLight.svg";
import BuyCryptoCardImageLight from "../../../assets/buyCryptoCurrencyCardImgLight.svg";

// Component Loader
import ComponentLoader from "../../../components/ProgressLoader/ComponentLoader";

// Router
import { useNavigate } from "react-router-dom";

// Lazy Image component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const CryptoWalletTopCardsMobile = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box className={styles.cryptoWalletMainBoxMobile} mt={1}>
      <Box
        bgcolor={theme.palette.background.paper}
        className={styles.totalFundCard}
      >
        <Box className={styles.totalFundContentBox}>
          <Typography color="secondary" variant="caption">
            Total fund value
          </Typography>
          <Typography variant="h4" className={styles.cardTitleMobile}>
            $73,275
          </Typography>
        </Box>
        <Box className={styles.cardImageAreaMobile}>
          <Suspense fallback={<ComponentLoader />}>
            {theme.palette.mode === "dark" ? (
              <LazyImageComponent
                className={styles.cardImageMobile}
                src={TotalFundValueImage}
              />
            ) : (
              <LazyImageComponent
                className={styles.cardImageMobile}
                src={TotalFundValueImageLight}
              />
            )}
          </Suspense>
        </Box>
      </Box>
      <Box
        bgcolor={theme.palette.background.paper}
        className={styles.buyBoxMobile}
      >
        <Box>
          <Typography color="secondary" variant="caption">
            Buy Cryptocurrency from FIAT
          </Typography>
          {theme.palette.mode === "dark" ? (
            <Button
              sx={{ mt: 2 }}
              onClick={() => navigate("/dashboard/top-up")}
              variant="outlined"
              color="primary"
              fullWidth
            >
              <Typography
                className={styles.buttonTextMobile}
                color="primary"
                variant="caption"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Buy Crypto
              </Typography>
            </Button>
          ) : (
            <LightUIButtonPrimary
              sx={{ mt: 2 }}
              onClick={() => navigate("/dashboard/top-up")}
              variant="text"
              color="primary"
              fullWidth
            >
              <Typography
                className={styles.buttonTextMobile}
                color="#ffffff"
                variant="caption"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Buy Crypto
              </Typography>
            </LightUIButtonPrimary>
          )}
        </Box>
        <Box className={styles.cardImageAreaMobile}>
          <Suspense fallback={<ComponentLoader />}>
            {theme.palette.mode === "dark" ? (
              <LazyImageComponent
                className={styles.cardImageMobile}
                src={BuyCryptoCardImage}
              />
            ) : (
              <LazyImageComponent
                className={styles.cardImageMobile}
                src={BuyCryptoCardImageLight}
              />
            )}
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default CryptoWalletTopCardsMobile;
