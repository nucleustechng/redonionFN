import { Stack, Typography } from "@mui/material";
import React from "react";


const Index = () => {


  return (
    <React.Fragment>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
          width: "100%",
        }}
      >
        <Typography fontSize={50} lineHeight={1} fontWeight={600}  align="center">
          Welcome to Redonion.com
         
        </Typography>
        
        <Typography fontSize={30} fontWeight={500} color="error" align="center">
            You Are Offline

        </Typography>
        
      </Stack>
    </React.Fragment>
  );
};

export default Index;
