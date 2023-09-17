import React, { Suspense, useEffect, useState } from "react";
import {
  useMediaQuery,
  Stack,
  InputAdornment,
  Input,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LoadingButton } from "@mui/lab";

// Styles
import styles from "./FundsAndTransferArea.module.css";

// Theme
import { useTheme } from "@mui/material/styles";
import axios from "../../../api/axios";

// Axios
// import axios from "../../../api/axios";

// Lazy tabpanel
const TableArea = React.lazy(() => import("../DataArea/TableArea"));
const TransactionArea = React.lazy(() => import("../DataArea/TransactionArea"));

const FundsAndTransferArea = (prop) => {
  const [isReadOnly, setIsReadOnly] = React.useState(true);
  const [tabValue, setTabValue] = React.useState(0);
  const [fromDateValue, setFromDateValue] = React.useState(null);
  const [toDateValue, setToDateValue] = React.useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const GET_TRANSACTION_ID_URL = "/user/update";

  const handleRegisterUser = () => {
    setLoading(true);

    axios
      .get(
        GET_TRANSACTION_ID_URL,
       
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {}, []);

  return (
    <Box pt={30} className={styles.headerArea}>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <Box>
          <Typography
            mb={2}
            fontSize={25}
            component="p"
            variant="button"
            color="secondary"
          >
            Enter Transaction ID
          </Typography>
        </Box>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <Box
          mt={-1}
          py={2}
          px={1}
          bgcolor={theme.palette.background.paper}
          width={"50%"}
        >
          <Input
            readOnly={isReadOnly}
            disableUnderline
            fullWidth
            className="inputField"
            size="small"
            placeholder="Search"
            // startAdornment={
            //   <InputAdornment position="start">
            //     <Box className={styles.searchBoxMobile}>
            //       <IconButton edge="start">
            //         <SearchIcon color="secondary" />
            //       </IconButton>
            //     </Box>
            //   </InputAdornment>
            // }
            onBlur={() => setIsReadOnly(true)}
            onFocus={() => setIsReadOnly(false)}
          />
        </Box>
        <Box mt={-1}>
          {loading ? (
            <LoadingButton fullWidth loading variant="outlined">
              Login
            </LoadingButton>
          ) : (
            <>
              <Button
                // onClick={onClickSuccess}
                fullWidth
                style={{
                  height: 50,
                  borderRadius: 10,
                  fontSize: 20,
                  textTransform: "none",
                }}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default FundsAndTransferArea;
