import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import AssetTabs from "./components/AssetTabs/AssetTabs";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        paddingTop: "64px",
        marginBottom: 6,
      }}
    >
      <Navbar />
      <AssetTabs />
    </Box>
  );
}

export default App;
