import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export default function ComingSoon() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        px: 2,
      }}
    >
      <Stack spacing={1.5} alignItems="center">
        <AccessTimeOutlinedIcon
          sx={{ fontSize: 100, color: "text.secondary" }}
        />
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Coming Soon
        </Typography>
      </Stack>
    </Box>
  );
}
