import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import CustomCard from "../CustomCard/CustomCard";

interface Order {
  asset: string;
  type: string;
  price: number;
  quantity: number;
  notional: number;
}

const mockOrders: Order[] = Array.from({ length: 50 }, (_, index) => ({
  asset: index % 2 === 0 ? "BTC" : "ETH",
  type:
    index % 3 === 0
      ? "Limit buy"
      : index % 3 === 1
      ? "Limit sell"
      : "Market buy",
  price: 60924.8,
  quantity: 0.25,
  notional: 60924.8 * 0.25,
}));

const OrderHistory: React.FC = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const visibleOrders = mockOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <CustomCard title="Order History">
      <TableContainer>
        <Table sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
          <TableHead>
            <TableRow>
              {["Asset", "Type", "Price", "Quantity", "Notional"].map(
                (header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: "bold",
                      color: "#FFFFFF",
                      backgroundColor: "#2E2E2E",
                      textAlign: "center",
                      border: "none",
                    }}
                  >
                    {header.toUpperCase()}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleOrders.map((order, index) => (
              <TableRow key={index} sx={{ backgroundColor: "#1A1A1A" }}>
                <TableCell sx={{ textAlign: "center", border: "none" }}>
                  {order.asset}
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "none" }}>
                  {order.type}
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "none" }}>
                  {order.price.toFixed(8)}
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "none" }}>
                  {order.quantity.toFixed(8)}
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "none" }}>
                  {order.notional.toFixed(8)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(mockOrders.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </CustomCard>
  );
};

export default OrderHistory;
