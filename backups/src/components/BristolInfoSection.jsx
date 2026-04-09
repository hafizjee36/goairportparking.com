import { Box, Container, Typography } from "@mui/material";
import heroImage from "../assets/LeedsImages/hero-image.webp";

export default function BristolInfoSection() {
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
              alt="Father and son enjoying their travel - Bristol Airport Parking"
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
          Flying from Bristol Airport? {" "}
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                color: "primary.main",
              }}
            >
           With  Go Airport Parking Bristol Comparison  {" "}
            </Typography>
           arranging secure and affordable parking is quick and easy. Whether you prefer the convenience of Meet & Greet, the value of Park & Ride, or long-stay options for extended travel, we bring you the best deals from trusted providers. Choose from both on-site and off-site parking, all with clear pricing, reliable shuttle services, and strong security standards. By booking ahead of time, you’ll lock in the lowest rates and guarantee your space. No hidden charges, no stress — just smooth, straightforward parking that helps your journey start right.
             </Typography>
        </Box>
      </Box>
    </Container>
  );
}
