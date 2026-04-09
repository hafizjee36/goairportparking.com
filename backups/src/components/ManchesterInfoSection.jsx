import { Box, Container, Typography } from "@mui/material";
import heroImage from "../assets/ManchesterImages/hero-image.webp";

export default function ManchesterInfoSection() {
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
              alt="Father and son enjoying their travel - Manchester Airport Parking"
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
            Travel can be stressful, but finding affordable, convenient, and reliable 
            parking should not be. At{" "}
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                color: "primary.main",
              }}
            >
              Go Airport Parking LTD Manchester Comparison
            </Typography>
            , we make it easy to compare both{" "}
            <Typography component="span" sx={{ fontWeight: 600 }}>
              on-site and off-site parking options
            </Typography>{" "}
            at Manchester Airport. From Meet & Greet services and long-stay lots to 
            Park & Ride facilities and terminal-adjacent car parks, we cover 
            every choice to suit your journey. Whether you're heading off for 
            a weekend break or an extended business trip, we help you secure 
            the best-value deal, save money, and book your space in advance. 
            With no hidden costs, guaranteed security, and all key details in one 
            place, your trip starts smoothly from the moment you arrive.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
