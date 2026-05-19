import { Box, Container, Typography } from "@mui/material";
import heroImage from "../assets/ManchesterImages/hero-image.webp"; // You can replace this with Dublin-specific image

export default function DublinInfoSection() {
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
              alt="Father and son enjoying their travel - Dublin Airport Parking"
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
           Travelling through Dublin Airport? Finding secure, affordable parking is easy with {" "}
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                color: "primary.main",
              }}
            >
              CLOUDAINAIRE MANAGEMENT CONSULTANCY LLC Dublin Comparison
            </Typography>
          . Whether you’re looking for the convenience of Meet & Greet, the savings of Park & Ride, or long-term parking for an extended trip, we help you compare the best deals from trusted providers. Choose from on-site and off-site options, all with clear pricing, reliable shuttle transfers, and top-rated security. Book early to save big and ensure your parking is sorted before you arrive. No hidden fees, no last-minute surprises — just simple, stress-free parking tailored to your needs. Your smooth journey begins before check-in. 
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
