import { Box, Container, Typography } from "@mui/material";

export default function BirminghamPricingSection() {
  const pricingData = [
    {
      service: "Meet & Greet (terminal drop)",
      price: "£45–£95 per day",
      details: "Drop-off at terminal / 1–2 mins"
    },
    {
      service: "Terminal / Short Stay",
      price: "£25–£55 half day, £60–£85 full day",
      details: "0-5 minute walk"
    },
    {
      service: "Long Stay",
      price: "£40–£70 per 7 days",
      details: "Shuttle every 10–15 mins"
    },
    {
      service: "Park & Ride / Economy",
      price: "£35–£65 per 7 days",
      details: "Shuttle bus or coach to terminal"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box
        sx={{
          textAlign: "center",
          mb: 0,
        }}
      >
        {/* Main Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "28px", sm: "36px", md: "48px" },
            mb: 2,
            lineHeight: 1.2,
            color: "#000000",
          }}
        >
          Birmingham Airport Product Pricing
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.6,
            color: "#000",
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Prices are indicative and vary based on season, booking date, and duration
        </Typography>
      </Box>

      {/* Pricing Table */}
      <Box
        sx={{
          border: "7px solid #FFBC2F",
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "#FFF9E1",
          width: "100%",
          marginTop: 4,
        }}
      >
        {/* Table Content */}
        <Box>
          {pricingData.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1.6fr 2fr 1.5fr" },
                borderBottom: index < pricingData.length - 1 ? "1px dashed #CACACA" : "none",
                alignItems: "stretch",
                minHeight: "80px",
              }}
            >
              {/* Service Name */}
              <Box
                sx={{
                  borderRight: { xs: "none", sm: "1px dashed #CACACA" },
                  p: { xs: 3, sm: 4 },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    color: "#000000",
                    lineHeight: 1.4,
                  }}
                >
                  {item.service}
                </Typography>
              </Box>

              {/* Price */}
              <Box
                sx={{
                  borderRight: { xs: "none", sm: "1px dashed #CACACA" },
                  p: { xs: 3, sm: 4 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "flex-start", sm: "center" },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    color: "#000000",
                    lineHeight: 1.4,
                  }}
                >
                  {item.price}
                </Typography>
              </Box>

              {/* Details */}
              <Box
                sx={{
                  p: { xs: 3, sm: 4 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "flex-start", sm: "flex-end" },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    color: "#000000",
                    lineHeight: 1.4,
                  }}
                >
                  {item.details}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom Notice */}
        <Box
          sx={{
            bgcolor: "#FFBC2F",
            p: { xs: 2, sm: 3 },
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1.1rem", md: "1.2rem" },
              color: "#000000",
              lineHeight: 1.4,
            }}
          >
         
           Advance bookings typically offer the best rates and availability.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
