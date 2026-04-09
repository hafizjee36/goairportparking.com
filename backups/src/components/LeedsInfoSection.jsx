import { Box, Container, Typography } from "@mui/material";
import heroImage from "../assets/LeedsImages/hero-image.webp";

export default function LeedsInfoSection() {
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
              alt="Father and son enjoying their travel - Leeds Bradford Airport Parking"
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
           Flying from Leeds Bradford Airport? {" "}
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                color: "primary.main",
              }}
            >
             With Go Airport Parking LTD Leeds Bradford Comparison,
            </Typography>
           arranging secure and affordable parking has never been easier. Whether you’re looking for the speed of Meet & Greet, the value of Park & Ride, or long-stay options for extended trips, we compare the best deals from trusted providers. Choose between on-site and off-site parking, all with reliable transfers, transparent pricing, and top-rated security features. Book early to lock in the best rates and guarantee your space before you travel. No hidden costs, no stress — just smooth, straightforward parking that ensures your journey starts the right way.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
