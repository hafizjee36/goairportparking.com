import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function Stars({ rating = 0, reviews }) {
  const full = Math.floor(rating);
  const stars = Array.from({ length: 5 }, (_, i) => i < full);
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
      {stars.map((on, i) => (
        <StarIcon
          key={i}
          sx={{ fontSize: 18, color: on ? "#f59e0b" : "#e5e7eb" }}
        />
      ))}
      {reviews != null ? (
        <Typography variant="subtitle2">{`(${reviews})`}</Typography>
      ) : null}
    </Box>
  );
}
