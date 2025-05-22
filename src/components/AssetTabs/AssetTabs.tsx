import React, { useState } from "react";
import { Tabs, Tab, Box, Toolbar } from "@mui/material";
import OrderBook from "../OrderBook/OrderBook";
import DepthChart from "../DepthChart/DepthChart";
import OrderEntry from "../OrderEntry/OrderEntry";
import OrderHistory from "../OrderHistory/OrderHistory";

export default function AssetTabs() {
  const [selectedAsset, setSelectedAsset] = useState<"BTC" | "ETH">("BTC");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedAsset(newValue === 0 ? "BTC" : "ETH");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Toolbar sx={{ justifyContent: "start", mt: 6, marginX: 5 }}>
        <Tabs
          value={selectedAsset === "BTC" ? 0 : 1}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="primary"
        >
          <Tab label="BTC" />
          <Tab label="ETH" />
        </Tabs>
      </Toolbar>
      <Box
        sx={{
          marginX: 8,
          mt: 5,
          display: "flex",
          gap: 3,
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ flex: 2 }}>
          <OrderBook asset={selectedAsset} />
        </Box>
        <Box sx={{ flex: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Box sx={{ flex: 2, minHeight: "400px" }}>
              <DepthChart asset={selectedAsset} />
            </Box>
            <Box sx={{ flex: 1, minHeight: "400px" }}>
              <OrderEntry asset={selectedAsset} />
            </Box>
          </Box>
          <Box sx={{ minHeight: "300px" }}>
            <OrderHistory />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
