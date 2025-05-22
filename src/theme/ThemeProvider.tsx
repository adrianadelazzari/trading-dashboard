import React from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#A020F0",
      main: "#FF00FF",
      dark: "#6A0DAD",
    },
    secondary: {
      light: "#42A5F5",
      main: "#2196F3",
      dark: "#1E88E5",
    },
    success: {
      main: "#4CAF50",
    },
    error: {
      main: "#E53935",
    },
    background: {
      default: "#100C08",
      paper: "#1B1C21",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0BEC5",
    },
    divider: "#3A3A3A",
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.5rem", fontWeight: 600 },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem", color: "#B0BEC5" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: "#1B1C21",
          minHeight: 48,
        },
        indicator: {
          backgroundColor: "#FF00FF",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          "&.Mui-selected": {
            color: "#FF00FF",
          },
          textTransform: "uppercase",
          fontWeight: 600,
          minWidth: 100,
        },
      },
    },
  },
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
