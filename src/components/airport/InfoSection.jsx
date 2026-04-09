import { Box, Container, Typography } from "@mui/material";
import heroImage from "../../assets/AirportsImages/hero-image.webp";

export default function InfoSection({ airportConfig, sectionData }) {
  const airportName = airportConfig.name;
  const { text } = sectionData?.info || {};
  
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1.2fr" },
          gap: { xs: 4, md: 6, lg: 8 },
          alignItems: "center",
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            order: { xs: 2, lg: 1 },
          }}
        >
          <Box
            component="img"
            src={heroImage}
            alt={`${airportName} Airport Parking`}
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 3,
              overflow: "hidden",
              maxWidth: { xs: "320px", sm: "400px", md: "450px" },
            }}
          />
        </Box>

        {/* Text */}
        <Box sx={{ order: { xs: 1, lg: 2 } }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.7,
              color: "text.primary",
              textAlign: { xs: "center", lg: "left" },
            }}
          >
            {text || `Find the best parking options at ${airportName} Airport.`}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
