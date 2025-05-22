import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomCard from "../CustomCard/CustomCard";
import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Button,
} from "@mui/material";

interface OrderEntry {
  price: number;
  quantity: number;
}

interface OrderBookData {
  asks: OrderEntry[];
  bids: OrderEntry[];
}

const OrderBook: React.FC<{ asset: "BTC" | "ETH" }> = ({ asset }) => {
  const [orderBookData, setOrderBookData] = useState<OrderBookData | null>(
    null
  );
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/orderbook/${asset}`
        );
        const { asks, bids } = response.data;

        const sortedAsks = [...asks].sort(
          (a, b) => parseFloat(b[0]) - parseFloat(a[0])
        );

        const sortedBids = [...bids].sort(
          (a, b) => parseFloat(a[0]) - parseFloat(b[0])
        );

        setOrderBookData({
          asks: sortedAsks.map(([price, quantity]) => ({
            price: parseFloat(price),
            quantity: parseFloat(quantity),
          })),
          bids: sortedBids.map(([price, quantity]) => ({
            price: parseFloat(price),
            quantity: parseFloat(quantity),
          })),
        });
      } catch (error) {
        console.error("Failed to fetch order book data:", error);
      }
    };

    fetchOrderBook();
  }, [asset]);

  const visibleAsks = showAll
    ? orderBookData?.asks
    : orderBookData?.asks.slice(-7);
  const visibleBids = showAll
    ? orderBookData?.bids
    : orderBookData?.bids.slice(0, 7);

  return (
    <CustomCard title="Order Book">
      <Box sx={{ display: "flex", paddingX: 6, paddingBottom: 2 }}>
        <Table
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0px 4px",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  border: "none",
                  textTransform: "uppercase",
                }}
              >
                Price
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  border: "none",
                  textTransform: "uppercase",
                }}
              >
                Quantity
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  border: "none",
                  textTransform: "uppercase",
                }}
              >
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleAsks?.map((ask, index) => (
              <TableRow key={`ask-${index}`}>
                <TableCell
                  sx={{
                    color: "#E53935",
                    backgroundColor: "#282828",
                    border: "none",
                    textAlign: "right",
                  }}
                >
                  {ask.price.toFixed(8)}
                </TableCell>
                <TableCell sx={{ border: "none", textAlign: "right" }}>
                  {ask.quantity.toFixed(8)}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#E53935",
                    backgroundColor: "rgba(229, 57, 53, 0.2)",
                    textAlign: "right",
                    border: "none",
                  }}
                >
                  {(ask.price * ask.quantity).toFixed(8)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} sx={{ border: "none", paddingX: 0 }}>
                <Divider />
              </TableCell>
            </TableRow>
            {visibleBids?.map((bid, index) => (
              <TableRow key={`bid-${index}`}>
                <TableCell
                  sx={{
                    color: "#4CAF50",
                    backgroundColor: "#282828",
                    border: "none",
                    textAlign: "right",
                  }}
                >
                  {bid.price.toFixed(8)}
                </TableCell>
                <TableCell sx={{ border: "none", textAlign: "right" }}>
                  {bid.quantity.toFixed(8)}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#4CAF50",
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    textAlign: "right",
                    border: "none",
                  }}
                >
                  {(bid.price * bid.quantity).toFixed(8)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          onClick={() => setShowAll(!showAll)}
          variant="text"
          color="primary"
        >
          {showAll ? "Show Less" : "Show All"}
        </Button>
      </Box>
    </CustomCard>
  );
};

export default OrderBook;
