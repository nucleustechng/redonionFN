import { createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";

const CustomTheme = () => {
  // Add listener to update styles
  const darkOS = window.matchMedia("(prefers-color-scheme: dark)").matches;

  localStorage.setItem("colorMode", darkOS ? "dark" : "light");

  const colorModeTheme = localStorage.getItem("colorMode");

  console.log(colorModeTheme)
  const [mode, setMode] = useState(colorModeTheme ? colorModeTheme : "dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
              // palette values for light mode
              primary: {
                main: "#3063E9",
                // main: "#F96706",
              },
              secondary: {
                main: "#000",
                // main: "#009698",
              },
              secondaryDark: {
                main: "#000",
                // main: "#009698",
              },
              accent: {
                main: "#6C63FF",
              },
              orange: {
                main: "#FF5722",
              },
              btncolor: {
                main: "#E8E8F3",
              },
              error: {
                main: "#FF003D",
                dark: "#FF003F",
              },
              success: {
                main: "#8DD070",
                dark: "#58BD7D",
              },
              background: {
                default: "#fdfdfd",
                paper: "#fbfbfb",
                surface: "#ffffff",
                card: "#f8f8f8",
                primary: "#F9E006",
                light: "#fff",
                btncolor: "#E8E8F3"
              },
              text: {
                // primary: "#434547",
                primary: "#111111",
                secondary: "#434547",
                tertiary: "#F9E006",
                success: "#58BD7D",
                orange: "#FF9100",
              },
              common: {
                black: "#111111",
                white: "#ffffff",
              },
            }
            : {
              // palette values for dark mode
              primary: {
                main: "#3063E9",
              },
              secondary: {
                main: "#fff",
              },
              secondaryDark: {
                main: "#FFFFFF",
                // main: "#009698",
              },
              btncolor: {
                main: "#E8E8F3",
              },
              accent: {
                main: "#6C63FF",
              },
              orange: {
                main: "#FF5722",
              },
              error: {
                main: "#FF003D",
                dark: "#FF003F",
              },
              success: {
                main: "#8DD070",
                dark: "#58BD7D",
              },
              background: {
                default: "#111111",
                paper: "#252628",
                surface: "#2B2B2B",
                card: "#1B1B1B",
                primary: "#F9E006",
                light: "#fff",
                btncolor: "#E8E8F3"
              },
              text: {
                primary: "#ffffff",
                secondary: "#C4C4C4",
                tertiary: "#F9E006",
                success: "#58BD7D",
                orange: "#FF9100",
              },
              common: {
                black: "#111111",
                white: "#ffffff",
              },
            }),
        },
        typography: {
          fontFamily: "'Poppins', sans-serif",
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          fontWeightBold: 700,
        },
      }),
    [mode]
  );

  return {
    theme,
    colorMode,
    mode,
  };
};

export default CustomTheme;
