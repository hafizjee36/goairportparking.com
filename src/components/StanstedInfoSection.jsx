import { Box, Container, Typography } from "@mui/material";
import heroImage from "../assets/LeedsImages/hero-image.webp";

export default function StanstedInfoSection() {
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
          Travelling through Stansted Airport? {" "}
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                color: "primary.main",
              }}
            >
             Go Airport Parking Stansted Comparison {" "} 
            </Typography>
           makes finding secure, affordable parking simple and quick. From the convenience of Meet & Greet to the value of Park & Ride or long-stay parking for extended trips, we compare the best options from trusted providers. Choose between on-site and off-site car parks, all with transparent pricing, reliable shuttle transfers, and strong security measures. By booking in advance, you can guarantee availability and enjoy the lowest rates. No hidden fees and no last-minute surprises — just smooth, stress-free parking that starts your trip the right way.
             </Typography>
        </Box>
      </Box>
    </Container>
  );
}
