import React, { useState, useEffect } from "react";
import CustomCard from "../CustomCard/CustomCard";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  textFieldStyles,
  selectFieldStyles,
  errorTextFieldStyles,
} from "./OrderEntry.sx";
import axios from "axios";

interface OrderEntryProps {
  asset: "BTC" | "ETH";
}

const OrderEntry: React.FC<OrderEntryProps> = ({ asset }) => {
  const [type, setType] = useState("Limit buy");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [notional, setNotional] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");

  useEffect(() => {
    const fetchBestPrice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/orderbook/${asset}`
        );
        const { asks, bids } = response.data;

        if (type.includes("Market")) {
          const bestPrice = type.includes("buy")
            ? parseFloat(asks[0][0])
            : parseFloat(bids[0][0]);

          setPrice(bestPrice.toFixed(8));
          if (quantity) {
            setNotional((parseFloat(quantity) * bestPrice).toFixed(8));
          }
        }
      } catch (error) {
        console.error("Failed to fetch best price:", error);
      }
    };

    if (type.includes("Market")) {
      fetchBestPrice();
    }
  }, [type, asset, quantity]);

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const isQuantityValid = parseFloat(quantity) > 0;
  const isPriceValid = parseFloat(price) > 0;

  const isFormValid =
    (type.includes("Market") && isQuantityValid) ||
    (type.includes("Limit") && isPriceValid && isQuantityValid);

  useEffect(() => {
    if (type.includes("Limit")) {
      const calculatedNotional =
        isQuantityValid && isPriceValid
          ? (parseFloat(price) * parseFloat(quantity)).toFixed(8)
          : "";
      setNotional(calculatedNotional);
    }
  }, [type, price, quantity]);

  const submitTrade = async () => {
    if (!isFormValid) {
      setResponseMessage("Form is invalid. Please correct the fields.");
      return;
    }

    try {
      const trade = {
        asset,
        side: type.includes("buy") ? "BUY" : "SELL",
        type: type.includes("Limit") ? "LIMIT" : "MARKET",
        quantity: parseFloat(quantity),
        price: type.includes("Market") ? undefined : parseFloat(price),
        notional: parseFloat(notional),
      };

      const response = await fetch("http://localhost:3001/trade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trade),
      });

      if (response.ok) {
        setResponseMessage("Trade submitted successfully.");
      } else {
        const errorData = await response.json();
        setResponseMessage(`Error submitting trade: ${errorData.error}`);
      }
    } catch (error) {
      setResponseMessage("Network Error: Unable to submit trade.");
    }
  };

  return (
    <CustomCard title="Order Entry">
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, marginY: 3 }}
      >
        <FormControl fullWidth>
          <InputLabel id="type" sx={{ color: "#B0BEC5" }}>
            Type
          </InputLabel>
          <Select
            labelId="type"
            id="type"
            value={type}
            label="Type"
            onChange={handleChange}
            sx={selectFieldStyles}
          >
            <MenuItem value="Limit buy">Limit buy</MenuItem>
            <MenuItem value="Limit sell">Limit sell</MenuItem>
            <MenuItem value="Market buy">Market buy</MenuItem>
            <MenuItem value="Market sell">Market sell</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Price"
          id="price"
          type="number"
          value={price}
          disabled={type.includes("Market")}
          onChange={(e) => setPrice(e.target.value)}
          error={!isPriceValid && type.includes("Limit") && price !== ""}
          helperText={
            !isPriceValid && type.includes("Limit") && price !== ""
              ? "Price must be greater than 0 for Limit orders"
              : ""
          }
          sx={{
            ...textFieldStyles,
            mt: 2,
            "& .MuiInputBase-input.Mui-disabled": {
              backgroundColor: "#2E2E2E",
              "-webkit-text-fill-color": "#FFFFFF",
              opacity: 1,
            },
            "& .MuiInputLabel-root.Mui-disabled": {
              color: "rgba(255, 255, 255, 0.6)",
            },
          }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          label="Quantity"
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          error={!isQuantityValid && quantity !== ""}
          helperText={
            !isQuantityValid && quantity !== ""
              ? "Quantity must be greater than 0"
              : ""
          }
          sx={{
            ...errorTextFieldStyles(!isQuantityValid && quantity !== ""),
            mt: 2,
          }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          label="Notional"
          id="notional"
          type="number"
          value={notional}
          slotProps={{
            input: {
              readOnly: true,
            },
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{
            ...textFieldStyles,
            mt: 2,
            "& .MuiInputBase-input.Mui-disabled": {
              backgroundColor: "#2E2E2E",
              color: "rgba(255, 255, 255, 0.6)",
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={submitTrade}
          sx={{
            mt: 2,
            backgroundColor: !isFormValid
              ? "rgba(255, 255, 255, 0.1)"
              : "#FF00FF",
            color: !isFormValid ? "rgba(255, 255, 255, 0.5)" : "#FFFFFF",
            "&:hover": {
              backgroundColor: !isFormValid
                ? "rgba(255, 255, 255, 0.1)"
                : "#FF00FF",
            },
          }}
        >
          Submit
        </Button>
        {responseMessage && (
          <Alert
            severity={responseMessage.includes("Error") ? "error" : "success"}
            sx={{
              mt: 2,
              backgroundColor: responseMessage.includes("Error")
                ? "#160B0B"
                : "#1B2B1D",
              color: "#FFFFFF",
              fontWeight: 500,
            }}
            onClose={() => setResponseMessage("")}
          >
            {responseMessage}
          </Alert>
        )}
      </Box>
    </CustomCard>
  );
};

export default OrderEntry;
