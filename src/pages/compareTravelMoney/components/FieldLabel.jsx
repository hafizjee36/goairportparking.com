import { Typography } from "@mui/material";

export default function FieldLabel({ children }) {
  return (
    <Typography
      variant="subtitle2"
      sx={{ mb: 0.75, color: "text.primary", fontWeight: 600 }}
    >
      {children}
    </Typography>
  );
}
