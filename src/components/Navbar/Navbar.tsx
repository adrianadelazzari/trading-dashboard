import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import {
  Notifications,
  AccountCircle,
  LightMode,
  DarkMode,
} from "@mui/icons-material";

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(true);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        paddingX: 4,
        paddingY: 2,
        width: "100%",
        backgroundColor: "background.default",
      }}
    >
      <Toolbar sx={{ justifyContent: "end" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            color="inherit"
            sx={{
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <Notifications />
          </IconButton>
          <IconButton
            color="inherit"
            sx={{
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <AccountCircle />
          </IconButton>
          <IconButton color="inherit" onClick={toggleTheme}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
