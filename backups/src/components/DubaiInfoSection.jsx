import { Box, Container, Typography } from "@mui/material";
import heroImage from "../assets/ManchesterImages/hero-image.webp";

export default function DubaiInfoSection() {
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
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            order: { xs: 2, lg: 1 },
          }}
        >
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
              alt="Family traveling - Dubai Airport Parking"
              sx={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            order: { xs: 1, lg: 2 },
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
           Travelling through Dubai Airport? Finding secure, affordable parking is easy with {" "}
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                color: "primary.main",
              }}
            >
              CLOUDAINAIRE MANAGEMENT CONSULTANCY LLC Dubai Comparison
            </Typography>
          . Whether you're looking for the convenience of Meet & Greet, the savings of Park & Ride, or long-term parking for an extended trip, we help you compare the best deals from trusted providers. Choose from on-site and off-site options, all with clear pricing, reliable shuttle transfers, and top-rated security. Book early to save big and ensure your parking is sorted before you arrive. No hidden fees, no last-minute surprises — just simple, stress-free parking tailored to your needs. Your smooth journey begins before check-in. 
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
