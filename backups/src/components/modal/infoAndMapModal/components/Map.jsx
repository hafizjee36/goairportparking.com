import { Box, Typography } from "@mui/material";

export default function Map() {
  // You can swap this query for an address or different coords
  const mapQuery = "51.4700,-0.4543"; // Heathrow (lat,lng) or "Heathrow Airport"

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
        Map
      </Typography>

      <Box
        sx={{
          height: 300,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden", // clips the iframe to rounded corners
        }}
      >
        <iframe
          title="Location Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            mapQuery
          )}&z=12&output=embed`}
        />
      </Box>
    </>
  );
}
