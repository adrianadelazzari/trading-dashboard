import React from "react";
import { Paper, Typography, Box, PaperProps, Divider } from "@mui/material";

interface CustomCardProps extends PaperProps {
  title: string;
  children: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  children,
  ...paperProps
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        backgroundColor: "background.paper",
        borderRadius: "12px",
        minWidth: "100%",
      }}
      {...paperProps}
    >
      <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
        {title}
      </Typography>

      <Divider sx={{ borderColor: "divider", mb: 2 }} />

      <Box>{children}</Box>
    </Paper>
  );
};

export default CustomCard;
