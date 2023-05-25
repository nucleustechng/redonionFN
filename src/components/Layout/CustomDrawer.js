import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  Skeleton,
  Toolbar,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Logos
import MainLogo from "../../assets/mainLogoDark.svg";


import MainLogoDark from "../../assets/mainLogo.svg";

import ArrowDown from "../../assets/downArrow.svg";
import LocationIcon from "../../assets/location.svg";
import TransactionIcon from "../../assets/transaction.svg";

import helpIcon from "../../assets/help.svg";
import LogoutIcon from "../../assets/logout.svg";



// Router
import { useLocation, useNavigate } from "react-router-dom";

// Layout routes
import LayoutRoutes from "../Routes/LayoutRoutes";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../LazyImageComponent/LazyImageComponent")
);

const CustomDrawer = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const navigateAndCloseDrawer = (path) => {
    navigate(path);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  return (
    <div >
      <Box height={"100%"}>
        <Box sx={{ mt: 4, ml: 8 }} >
          <React.Suspense
            fallback={
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
                sx={{
                  backgroundColor: `${theme.palette.mode === "dark" ? "#111" : "#f5f5f5"
                    }`,
                }}
              />
            }
          >
            <LazyImageComponent
              style={{ width: "65%", display: "block", marginLeft: -40 }}
              src={theme.palette.mode === "dark" ? MainLogoDark : MainLogo}

            />
          </React.Suspense>
        </Box>

        <Box ml={1} mt={4} mb={2} >

          <Stack
            direction="row"
            pr={3}
            justifyContent="space-between" >
            <Typography
              fontWeight={400}
              ml={3}
              // py={3}
              color="secondary"
              variant="body2"
            >
              Matthew Alex
            </Typography>
            <LazyImageComponent
              style={{ width: 13, marginTop: 10 }}
              src={ArrowDown}
            />
          </Stack>



          <Stack
            pl={3}
            direction="row">
            <LazyImageComponent
              style={{ width: 13 }}
              src={LocationIcon}

            />
            <Typography
              fontWeight={400}
              ml={1}
              fontSize={12}
              // py={3}
              color="secondary"
              variant="body2"
            >
              Nigeria
            </Typography>

          </Stack>


        </Box>

        <List >

          <ListItem
            sx={{ mb: 1 }}
            // onClick={() => navigateAndCloseDrawer("/account")}
            button
          >

            <Stack direction="row" ml={3}
              py={3}>

              <LazyImageComponent
                style={{ width: 20 }}
                src={TransactionIcon}

              />
              <Typography
                fontWeight={400}
                ml={1}
                fontSize={16}
                color="primary"
                variant="body2"
              >
                Transactions
              </Typography>
            </Stack>

          </ListItem>
        </List>
        <Toolbar />
        <Toolbar />
        <List >
          {LayoutRoutes.map((routes) => (
            <Box bgcolor={location.pathname === `/dashboard${routes.path}` ? "#3063E9" : ""}
              style={{ borderTopLeftRadius: 25, borderBottomLeftRadius: 25, marginLeft: location.pathname === `/dashboard/${routes.path}` ? 15 : 0 }}
              key={routes.id}>
              <ListItem

                onClick={() => navigateAndCloseDrawer(`/dashboard${routes.path}`)}
                button
              >
                {/* <Typography>{ location.pathname}</Typography> */}

                <Stack

                  direction="row" ml={2}
                  py={1.2}

                >

                  <LazyImageComponent
                    style={{ width: 20 }}
                    src={location.pathname !== `/dashboard${routes.path}` ? routes.icon : routes.iconLight}

                  />
                  <Typography
                    fontWeight={400}
                    ml={1}
                    // py={1.2}
                    fontSize={16}
                    color={location.pathname !== `/dashboard${routes.path}` ? "primary" : "background.light"}
                    variant="body2"
                  >
                    {routes.name}
                  </Typography>
                </Stack>


              </ListItem>
            </Box>
          ))}

        </List>

        <Toolbar />
        <Toolbar />
        <Toolbar />
        <Toolbar />
        <List >
          <ListItem

            // onClick={() => navigateAndCloseDrawer(`/wallets${routes.path}`)}
            button
          >


            <Stack

              direction="row" ml={2}
              py={1.2}

            >

              <LazyImageComponent
                style={{ width: 20 }}
                src={helpIcon}

              />
              <Typography
                fontWeight={400}
                ml={1}
                // py={1.2}
                fontSize={16}
                color={"primary"}
                variant="body2"
              >
                Help center
              </Typography>
            </Stack>


          </ListItem>

          <ListItem

            // onClick={() => navigateAndCloseDrawer(`/wallets${routes.path}`)}
            button
          >


            <Stack

              direction="row" ml={2}
              py={1.2}

            >

              <LazyImageComponent
                style={{ width: 20 }}
                src={LogoutIcon}

              />
              <Typography
                fontWeight={400}
                ml={1}
                fontSize={16}
                color={"primary"}
                variant="body2"
              >
                Log out
              </Typography>
            </Stack>


          </ListItem>

        </List>

      </Box>
    </div>
  );
};

export default CustomDrawer;
