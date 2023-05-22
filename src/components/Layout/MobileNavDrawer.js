import { Drawer, IconButton, Stack, Typography, useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";

import { Box } from "@mui/system";

const MobileNavDrawer = ({
  drawerOpen,
  handleDrawerToggle,
  children,
  topBarContent,
  handleClickMenu,
}) => {
  const theme = useTheme();

  return (
    <Box>
      <Drawer
        variant="persistent"
        sx={{
          "& .MuiDrawer-paper": {
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
            boxSizing: "border-box",
            backgroundColor: `${
              theme.palette.mode === "dark" ? "#1b1b1b" : "#ffffff"
            }`,
            width: "100%",
            border: "none",
          },
        }}
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {topBarContent && (
          <Box my={2} px={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton onClick={handleDrawerToggle}>
                <ArrowBackIcon color="primary" />
              </IconButton>
              <Typography variant="body1" color="secondary">
                {topBarContent}
              </Typography>
              <IconButton onClick={handleClickMenu}>
                <SettingsIcon color="primary" />
              </IconButton>
            </Stack>
          </Box>
        )}
        {children}
      </Drawer>
    </Box>
  );
};

export default MobileNavDrawer;
