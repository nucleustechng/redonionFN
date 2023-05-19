import { Drawer, useTheme } from "@mui/material";
import { Box } from "@mui/system";

const TransactionDrawerMobile = ({
  drawerOpen,
  handleDrawerToggle,
  children,
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
            mt: 0,
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
        {children}
      </Drawer>
    </Box>
  );
};

export default TransactionDrawerMobile;
