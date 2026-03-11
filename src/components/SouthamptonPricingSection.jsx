import { Box, Container, Typography } from "@mui/material";

export default function SouthamptonPricingSection() {
  const pricingData = [
    {
      service: "Meet & Greet",
      price: "£45–£85 per day",
      details: "Terminal drop-off / 1–3 min walk"
    },
    {
      service: "Short Stay / Terminal",
      price: "£25–£55 per day",
      details: "0-5 minute walk"
    },
    {
      service: "Long Stay",
      price: "£60–£95 per week",
      details: "5–10 min shuttle transfer"
    },
    {
      service: "Park & Ride (Off-Site)",
      price: "£40–£70 per week",
      details: "Direct shuttle service to terminal"
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
          Southampton Port Product Pricing
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
          Book early to secure your space and lowest prices.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
