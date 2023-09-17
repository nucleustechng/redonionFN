import React, { Suspense, useEffect } from "react";
import {
  Tab,
  Tabs,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  Stack,
  Button,
  Input,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

// Styles
import styles from "./UserArea.module.css";

// Theme
import { useTheme } from "@mui/material/styles";

// Tabpanel component
import TabPanel from "../../../components/TabPanel/TabPanel";
import { DatePickerTextField } from "../../../components/DatePickerTextField/DatePickerTextField";

// Skeleton
import { TableSkeleton } from "../../../components/Skeletons/ComponentSkeletons";

// Lazy tabpanel
const TableArea = React.lazy(() => import("../DataArea/TableArea"));
const TransactionArea = React.lazy(() => import("../DataArea/TransactionArea"));

const UserArea = (prop) => {
  const [isReadOnly, setIsReadOnly] = React.useState(true);
  const [tabValue, setTabValue] = React.useState(0);
  const [fromDateValue, setFromDateValue] = React.useState(null);
  const [toDateValue, setToDateValue] = React.useState(null);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    
  }, []);

  return (
    <Box className={styles.headerArea}>
      <Box>

        <TabPanel value={tabValue} index={0}>
          <Box mt={3}>
            <Suspense fallback={<TableSkeleton />}>
              <TableArea
                
              />
            </Suspense>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default UserArea;