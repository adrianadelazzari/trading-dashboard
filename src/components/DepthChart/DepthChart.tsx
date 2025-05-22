import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomCard from "../CustomCard/CustomCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Box } from "@mui/material";

interface DepthChartProps {
  asset: "BTC" | "ETH";
}

interface DepthData {
  price: number;
  cumulativeQuantity: number;
}

const DepthChart: React.FC<DepthChartProps> = ({ asset }) => {
  const [askDepth, setAskDepth] = useState<DepthData[]>([]);
  const [bidDepth, setBidDepth] = useState<DepthData[]>([]);
  const [midMarketPrice, setMidMarketPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/orderbook/${asset}`
        );
        const { asks, bids } = response.data as {
          asks: [string, string][];
          bids: [string, string][];
        };

        const calculatedAsks: DepthData[] = asks.map(([price], index) => ({
          price: parseFloat(price),
          cumulativeQuantity: asks
            .slice(0, index + 1)
            .reduce(
              (acc: number, curr: [string, string]) =>
                acc + parseFloat(curr[1]),
              0
            ),
        }));

        const calculatedBids: DepthData[] = bids.map(([price], index) => ({
          price: parseFloat(price),
          cumulativeQuantity: bids
            .slice(0, index + 1)
            .reduce(
              (acc: number, curr: [string, string]) =>
                acc + parseFloat(curr[1]),
              0
            ),
        }));

        setAskDepth(calculatedAsks);
        setBidDepth(calculatedBids);

        const bestAsk = parseFloat(asks[0][0]);
        const bestBid = parseFloat(bids[0][0]);
        setMidMarketPrice((bestAsk + bestBid) / 2);
      } catch (error) {
        console.error("Failed to fetch order book data:", error);
      }
    };

    fetchOrderBook();
  }, [asset]);

  return (
    <CustomCard title="Depth Chart">
      <Box sx={{ marginBottom: 3 }}>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart>
            <defs>
              <linearGradient id="askGradient" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E53935" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#E53935" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="bidGradient" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4CAF50" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#4CAF50" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#2E2E2E" />
            <XAxis
              dataKey="price"
              type="number"
              domain={["auto", "auto"]}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <YAxis dataKey="cumulativeQuantity" />

            <Area
              type="step"
              dataKey="cumulativeQuantity"
              data={bidDepth}
              fill="url(#bidGradient)"
              stroke="#4CAF50"
              isAnimationActive={false}
            />
            <Area
              type="step"
              dataKey="cumulativeQuantity"
              data={askDepth}
              fill="url(#askGradient)"
              stroke="#E53935"
              isAnimationActive={false}
            />
            {midMarketPrice && (
              <ReferenceLine
                x={midMarketPrice}
                stroke="#FFFFFF"
                strokeDasharray="4 4"
                label={{
                  value: `Mid Market Price: $${midMarketPrice.toFixed(2)}`,
                  position: "insideTop",
                  fill: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </CustomCard>
  );
};

export default DepthChart;
