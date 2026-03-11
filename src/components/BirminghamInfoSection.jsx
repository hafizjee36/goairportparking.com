import { Box, Container, Typography } from "@mui/material";
import heroImage from "../assets/BirminghamImages/hero-image.webp";

export default function BirminghamInfoSection() {
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
              alt="Father and son enjoying their travel - Birmingham Airport Parking"
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
            Finding the right parking at Birmingham Airport shouldn't add stress to your journey. At{" "}
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                color: "primary.main",
              }}
            >
              Go Airport Parking LTD Birmingham Comparison
            </Typography>
            , we make it easy to compare prices, services, and locations of both official and off-site providers. Whether you prefer the ease of Meet & Greet, the value of Park & Ride, or the convenience of Terminal and Long Stay car parks, we’ve got you covered. Perfect for quick weekend trips or long-haul getaways, our platform helps you find secure, cost-effective parking in just a few clicks. With full transparency, no hidden charges, and peace of mind built-in, your smooth journey starts from the moment you park.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
