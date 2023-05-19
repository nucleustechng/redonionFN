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
        <Typography align="center">
          Hey! It seems you have not configured firebase in your project. Please
          follow the{" "}
          <a
            href="https://www.thriftywalletuidocs.thriftysoft.tech/"
            target={"_blank"}
            rel="noreferrer"
            style={{
              textDecoration: "underline",
              fontWeight: "500",
            }}
          >
            documentation
          </a>{" "}
          to Configuration firebase
        </Typography>
      </Stack>
    </React.Fragment>
  );
};

export default Index;
