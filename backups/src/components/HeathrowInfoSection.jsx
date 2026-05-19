import { Box, Container, Typography } from "@mui/material";
import heroImage from "../assets/HeathrowImages/hero-image.webp";

export default function HeathrowInfoSection() {
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
        {/* Left side - Image with overlapping frames */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            order: { xs: 2, lg: 1 }, // Show image after text on mobile, before on desktop
          }}
        >
       
      
          
          {/* Main image container */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              borderRadius: 3,
              overflow: "hidden",
              maxWidth: { xs: "320px", sm: "400px", md: "450px" },
              width: "100%",
            }}
          >
            <Box
              component="img"
              src={heroImage}
              alt="Father and son enjoying their travel - Heathrow Airport Parking"
              sx={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </Box>
        </Box>

        {/* Right side - Text content */}
        <Box
          sx={{
            order: { xs: 1, lg: 2 }, // Show text before image on mobile, after on desktop
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.7,
              color: "text.primary",
              textAlign: { xs: "center", lg: "left" },
            }}
          >
           Flying from Heathrow Airport?
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                color: "primary.main",
              }}
            >
              CLOUDAINAIRE MANAGEMENT CONSULTANCY LLC Heathrow Comparison,
            </Typography>
            , booking secure and affordable parking is fast and easy. Whether you need the convenience of Meet & Greet, the flexibility of Park & Ride, or long-stay parking for extended trips, we compare the best deals from trusted providers. Both on-site and off-site options are available, with transparent pricing, regular shuttle transfers, and reliable security. By booking early, you guarantee your space and secure the lowest rates. No hidden fees, no last-minute stress — just smooth, straightforward parking that helps your journey get off to the best possible start.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
