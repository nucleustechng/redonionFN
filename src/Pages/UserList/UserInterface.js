import React, { Suspense, useEffect, useState } from "react";

// Material
import { Box } from "@mui/system";

// Component Loader
import ComponentLoader from "../../components/ProgressLoader/ComponentLoader";

import { useMediaQuery, useTheme, Typography } from "@mui/material";

// Router
import { useNavigate } from "react-router-dom";

// Axios
import axios from "../../api/axios";

const UserArea = React.lazy(() =>
  import("./UserArea/UserArea")
);

const UserInterface = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

 

  return (
    <Box>
      <Box px={3}>
        <Suspense fallback={<ComponentLoader />}>
          <UserArea />
        </Suspense>
      </Box>
    </Box>
  );
};

export default UserInterface;
