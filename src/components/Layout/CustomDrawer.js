import React, { useEffect, useState, Suspense } from "react";
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
import MainLogo from "../../assets/adminLogo.svg";

// Axios
import axios from "../../api/axios";

import { ModalSkeletons } from "../Skeletons/ComponentSkeletons";


import MainLogoDark from "../../assets/adminLogo.svg";

import ArrowDown from "../../assets/downArrow.svg";
import LocationIcon from "../../assets/location.svg";
import LocationIconWhite from "../../assets/locationwhite.svg";

import TransactionIcon from "../../assets/transactionSearch.svg";
import TransactionIconWhite from "../../assets/transactionSearchWhite.svg";

import helpIcon from "../../assets/help.svg";
import helpIconW from "../../assets/helpWhite.svg";
import LogoutIcon from "../../assets/logout.svg";



// Router
import { useLocation, useNavigate } from "react-router-dom";

// Layout routes
import LayoutRoutes from "../Routes/LayoutRoutes";

const LogOutModal = React.lazy(() => import("../../Pages/SupportPage/Support/LogOutModal"));

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../LazyImageComponent/LazyImageComponent")
);

const CustomDrawer = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const [openSuccessModal, setOpenSuccessModal] = useState(false);


  const navigateAndCloseDrawer = (path) => {
    navigate(path);
    if (isMobile) {
      handleDrawerToggle();
    }
  };
  const handleOpenSuccessModal = () => {
    setOpenSuccessModal(!openSuccessModal);
  };




  return (
    <div>
      <Box height={"100%"}>
        <Box sx={{ mt: 4, ml: 8 }}>
          <React.Suspense
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
              style={{ width: "100%", display: "block", marginLeft: -40 }}
              src={theme.palette.mode === "dark" ? MainLogoDark : MainLogo}
            />
          </React.Suspense>
        </Box>

        <Box
          ml={1}
          p={1}
          mt={4}
          mb={2}
          bgcolor={location.pathname === `/account` ? "#3063E9" : ""}
          style={{
            borderRadius: 15,
            marginLeft: location.pathname === `/account` ? 15 : 0,
            marginRight: location.pathname === `/account` ? 15 : 0,
          }}
          sx={{ cursor: "pointer" }}
          onClick={() => navigateAndCloseDrawer("/account")}
          button
        >
          <Stack direction="row" pr={3} justifyContent="space-between">
            <Typography
              fontWeight={400}
              ml={3}
              // py={3}
              color={
                location.pathname !== `/account`
                  ? "secondary"
                  : "background.light"
              }
              variant="body2"
            >
              {user?.user?.firstName} {user?.user?.lastName}
            </Typography>
            <LazyImageComponent
              style={{ width: 13, marginTop: 10 }}
              src={ArrowDown}
            />
          </Stack>

          <Stack pl={3} direction="row">
            <LazyImageComponent
              style={{ width: 13 }}
              src={
                location.pathname === `/account`
                  ? LocationIconWhite
                  : LocationIcon
              }
            />
            <Typography
              fontWeight={400}
              ml={1}
              fontSize={12}
              // py={3}
              color={
                location.pathname !== `/account`
                  ? "secondary"
                  : "background.light"
              }
              variant="body2"
            >
              {user?.country?.name}
            </Typography>
          </Stack>
        </Box>

        <Box ml={-2}>
          <List>
            <ListItem sx={{ mb: 1 }}>
              <Box
                ml={1}
                p={1}
                mt={4}
                mb={2}
                width={"100%"}
                mr={-2}
                bgcolor={
                  location.pathname === `/dashboard/transaction`
                    ? "#3063E9"
                    : ""
                }
                style={{
                  borderRadius: 15,
                  paddingLeft:
                    location.pathname === `/dashboard/transaction` ? 6 : 20,
                  marginLeft:
                    location.pathname === `/dashboard/transaction` ? 20 : 0,
                  marginRight:
                    location.pathname === `/dashboard/transaction` ? 20 : 0,
                }}
                sx={{ cursor: "pointer" }}
                onClick={() => navigateAndCloseDrawer("/dashboard/transaction")}
                button
              >
                <Stack direction="row" ml={1} py={1.2}>
                  <LazyImageComponent
                    style={{ width: 20 }}
                    src={
                      location.pathname === `/dashboard/transaction`
                        ? TransactionIconWhite
                        : TransactionIcon
                    }
                  />
                  <Typography
                    fontWeight={400}
                    ml={1}
                    fontSize={16}
                    color={
                      location.pathname !== `/dashboard/transaction`
                        ? "#000"
                        : "background.light"
                    }
                    variant="body2"
                  >
                    Find Transactions
                  </Typography>
                </Stack>
              </Box>
            </ListItem>
          </List>
        </Box>
        <Toolbar />

        <List>
          {LayoutRoutes.map((routes) => (
            <Box
              bgcolor={
                location.pathname === `/dashboard${routes.path}`
                  ? "#3063E9"
                  : ""
              }
              style={{
                borderRadius: 15,
                paddingLeft: 10,
                marginLeft:
                  location.pathname === `/dashboard/${routes.path}` ? 0 : 20,
                marginRight:
                  location.pathname === `/dashboard/${routes.path}` ? 0 : 20,
              }}
              key={routes.id}
            >
              <ListItem
                onClick={() =>
                  navigateAndCloseDrawer(`/dashboard${routes.path}`)
                }
                button
              >
                {/* <Typography>{ location.pathname}</Typography> */}

                <Stack direction="row" ml={-1} py={1.2}>
                  <LazyImageComponent
                    style={{ width: 20 }}
                    src={
                      location.pathname !== `/dashboard${routes.path}`
                        ? routes.icon
                        : routes.iconLight
                    }
                  />
                  <Typography
                    fontWeight={400}
                    ml={1}
                    // py={1.2}
                    fontSize={16}
                    color={
                      location.pathname !== `/dashboard${routes.path}`
                        ? "#000"
                        : "background.light"
                    }
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

        <List>
          {/* <ListItem sx={{ mb: 1 }}>
            <Box
              ml={1}
              p={1}
              mt={4}
              mb={0}
              width={"100%"}
              mr={-2}
              bgcolor={location.pathname === `/support/help` ? "#3063E9" : ""}
              style={{
                borderRadius: 15,
                paddingLeft: location.pathname === `/support/help` ? 6 : 20,
                marginLeft: location.pathname === `/support/help` ? 20 : 0,
              }}
              sx={{ cursor: "pointer" }}
              onClick={() => navigateAndCloseDrawer("/support/help")}
              button
            >
              <Stack direction="row" ml={1} py={1.2}>
                <LazyImageComponent
                  style={{ width: 20 }}
                  src={
                    location.pathname === `/support/help` ? helpIconW : helpIcon
                  }
                />
                <Typography
                  fontWeight={400}
                  ml={1}
                  fontSize={16}
                  color={
                    location.pathname !== `/support/help`
                      ? "primary"
                      : "background.light"
                  }
                  variant="body2"
                >
                  Help center
                </Typography>
              </Stack>
            </Box>
          </ListItem> */}

          <ListItem onClick={() => setOpenSuccessModal(true)} button>
            <Box
              ml={1}
              pt={1}
              mt={0}
              mb={2}
              width={"100%"}
              mr={-2}
              // bgcolor={location.pathname === `/support/help` ? "#3063E9" : ""}
              style={{
                borderRadius: 15,
                paddingLeft: 20,
                marginLeft: 0,
                marginRight: 0,
              }}
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenSuccessModal(true)}
              button
            >
              <Stack direction="row" ml={1} py={0}>
                <LazyImageComponent style={{ width: 20 }} src={LogoutIcon} />
                <Typography
                  fontWeight={400}
                  ml={1}
                  fontSize={16}
                  color={"#000"}
                  variant="body2"
                >
                  Log out
                </Typography>
              </Stack>
            </Box>
          </ListItem>

          {/* <ListItem


          >
            <Box ml={1} p={1} mt={4} mb={2} width={"100%"} mr={-2}
              bgcolor={location.pathname === `/support/help` ? "#3063E9" : ""}
              style={{ borderTopLeftRadius: 25, borderBottomLeftRadius: 25, marginLeft: location.pathname === `/support/help` ? 15 : 0 }}
              sx={{ cursor: 'pointer' }}
              onClick={() => navigateAndCloseDrawer("/support/help")}
              button>

              <Stack

                direction="row" ml={2}
                py={1.2}

              >

                <LazyImageComponent
                  style={{ width: 20 }}
                  src={location.pathname === `/support/help` ? helpIconW : helpIcon}

                />
                <Typography
                  fontWeight={400}
                  ml={1}
                  // py={1.2}
                  fontSize={16}
                  color={location.pathname !== `/support/help` ? "primary" : "background.light"}

                  variant="body2"
                >
                  Help center
                </Typography>
              </Stack>
            </Box>

          </ListItem> */}

          {/* <ListItem

            onClick={() => setOpenSuccessModal(true)}
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


          </ListItem> */}
        </List>
      </Box>

      <Suspense fallback={<ModalSkeletons />}>
        <LogOutModal
          open={openSuccessModal}
          handleClose={handleOpenSuccessModal}
        />
      </Suspense>
    </div>
  );
};

export default CustomDrawer;
