import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  MenuItem,
  Divider,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  useTheme,
  Grid,
  Tooltip,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import tableDetailsIcon from "../../../assets/tableDetailsIcon.svg";

import ComponentLoader from "../../../components/ProgressLoader/ComponentLoader";

import { Link, useNavigate } from "react-router-dom";

// Axios
import axios from "../../../api/axios";

// Styles
import styles from "./TransactionDetailsArea.module.css";

import { LoadingButton } from "@mui/lab";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/StyledTable/StyledTable";
import { DatePickerTextField } from "../../../components/DatePickerTextField/DatePickerTextField";
import { ModalSkeletons } from "../../../components/Skeletons/ComponentSkeletons";
import moment from "moment";

const AddAdminModal = React.lazy(() => import("./AddAdminModal/AddAdminModal"));

const ComplaintArea = React.lazy(() => import("./ComplaintArea"));

// Table Header
const tableHeader = [
  {
    name: "EMAIL",
  },
  {
    name: "SUPPORT TYPE ",
  },
];

const TableArea = () => {
  const [showModal, setShowModal] = useState(false);
  const [fromDateValue, setFromDateValue] = React.useState("01/01/2023");
  const [toDateValue, setToDateValue] = React.useState("06/30/2023");
  const [complaintData, setComplaintData] = useState([]);

  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const navigate = useNavigate();

  const countryData = [
    {
      id: "1",
      name: "All",
      // icon: BitCoinIcon,
    },
  ];

  // Pages
  const [tablePage, setTablePage] = React.useState(0);
  const rowsPerPage = 10;

  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState(false);

  const theme = useTheme();

  // Table Handler
  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  // Modal Handler
  const handleOpenTableDetailsModal = (user) => {
    setUserData(user);
    setShowModal(true);
  };

  const handleCloseTableDetailsModal = () => {
    setShowModal(false);
  };

  const ADMIN_MESSAGE_URL = "/chat/get-messages";

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user"));
    setLoading(true);

    axios
      .get(
        ADMIN_MESSAGE_URL,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setComplaintData(res.data.data.messages);
        console.log(res.data.data.messages);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 401) {
          navigate("/admin/sign-in");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate, ADMIN_MESSAGE_URL, fromDateValue, toDateValue]);

  const handleOpenSuccessModal = () => {
    setOpenSuccessModal(!openSuccessModal);
  };

  return (
    <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
      {/* <Suspense>
        <AddAdminModal
          open={openSuccessModal}
          handleOpenSuccessModal={handleOpenSuccessModal}
        />
      </Suspense> */}
      <Grid item xs={12} sm={12} md={showModal ? 7.5 : 12}>
        <Box className={styles.mainBoxMobile}>
          <Box>
            <Box>
              <Box mb={0}>
                <Typography
                  variant="h3"
                  className={styles.titleBox}
                  color="secondary"
                  fontWeight={600}
                >
                  Complaints
                </Typography>
              </Box>
              <Stack
                direction="row"
                // spacing={1}
                alignItems="center"
                justifyContent="flex-end"
              ></Stack>
            </Box>
            <Divider sx={{ mt: 3 }} />
          </Box>
          <Box className={styles.tableBoxMobile}>
            {loading ? (
              <Box>
                <LoadingButton
                  fullWidth
                  style={{
                    height: 120,
                    borderRadius: 10,
                    fontSize: 20,
                    textTransform: "none",
                  }}
                  loading
                >
                  Sign Up
                </LoadingButton>
              </Box>
            ) : (
              <Box className={styles.tableAreaMobile} mt={3}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {tableHeader.map((th) => (
                          <StyledTableCell key={th.name}>
                            <Typography
                              fontSize={18}
                              fontWeight={800}
                              variant="caption"
                            >
                              {th.name}
                            </Typography>
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {complaintData.map((td) => (
                        <>
                          <StyledTableRow
                            Buttton
                            onClick={() => handleOpenTableDetailsModal(td)}
                            sx={{
                              cursor: "pointer",
                            }}
                            key={td.id}
                          >
                            <StyledTableCell scope="row">
                              <Typography
                                fontSize={18}
                                // fontWeight={700}
                                variant="caption"
                              >
                                {td.fromEmail}
                              </Typography>
                            </StyledTableCell>

                            <StyledTableCell align="left">
                              <Tooltip title={td.supportType}>
                                <Typography
                                  fontSize={18}
                                  // fontWeight={700}
                                  variant="caption"
                                >
                                  {td.supportType}
                                </Typography>
                              </Tooltip>
                            </StyledTableCell>
                          </StyledTableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[]}
                  component="div"
                  count={complaintData.length}
                  rowsPerPage={rowsPerPage}
                  page={tablePage}
                  onPageChange={handleChangePage}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
      {showModal && (
        <Grid item xs={12} sm={12} md={4.5}>
          <Box bgcolor={"#E8E8F3"} height={"100%"} borderRadius={5} p={3}>
            <Suspense fallback={<ComponentLoader />}>
              <ComplaintArea data={userData} />
            </Suspense>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default TableArea;
