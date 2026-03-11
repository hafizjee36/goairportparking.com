import { Typography } from "@mui/material";

export default function ErrorMessage({ error, show }) {
  if (!show || !error) return null;

  return (
    <Typography
      variant="caption"
      sx={{
        color: "#d32f2f",
        fontSize: "0.75rem",
        fontWeight: 400,
        mt: 0.5,
        ml: 0.5,
        display: "block",
        lineHeight: 1.2,
      }}
    >
      {error}
    </Typography>
  );
}
