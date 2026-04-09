import { Box, Container, Typography } from "@mui/material";

export default function PricingSection({ airportConfig, sectionData }) {
  const airportName = airportConfig.name;
  const { subtitle, data = [], notice } = sectionData?.pricing || {};

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box sx={{ textAlign: "center", mb: 0 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2.3rem", sm: "3rem", md: "4rem" },
            mb: 2,
            lineHeight: 1.2,
            color: "#000000",
          }}
        >
          {airportName} Airport Product Pricing
        </Typography>

        {subtitle && (
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
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Pricing Table */}
      <Box sx={{ mt: 4 }}>
        <Box
          sx={{
            border: "7px solid #FFBC2F",
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "#FFF9E1",
            width: "100%",
          }}
        >
          {data.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1.6fr 2fr 1.5fr" },
                borderBottom: index < data.length - 1 ? "1px dashed #CACACA" : "none",
                alignItems: "stretch",
                minHeight: "80px",
              }}
            >
              <Box sx={{ borderRight: { xs: "none", sm: "1px dashed #CACACA" }, p: { xs: 3, sm: 4 }, display: "flex", alignItems: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: 600, fontSize: { xs: "1rem", md: "1.1rem" }, color: "#000000", lineHeight: 1.4 }}>
                  {item.service}
                </Typography>
              </Box>
              <Box sx={{ borderRight: { xs: "none", sm: "1px dashed #CACACA" }, p: { xs: 3, sm: 4 }, display: "flex", alignItems: "center", justifyContent: { xs: "flex-start", sm: "center" } }}>
                <Typography variant="body1" sx={{ fontWeight: 600, fontSize: { xs: "0.95rem", md: "1rem" }, color: "#000000", lineHeight: 1.4 }}>
                  {item.price}
                </Typography>
              </Box>
              <Box sx={{ p: { xs: 3, sm: 4 }, display: "flex", alignItems: "center", justifyContent: { xs: "flex-start", sm: "flex-end" } }}>
                <Typography variant="body1" sx={{ fontWeight: 500, fontSize: { xs: "0.95rem", md: "1rem" }, color: "#000000", lineHeight: 1.4 }}>
                  {item.details}
                </Typography>
              </Box>
            </Box>
          ))}
          {notice && (
            <Box sx={{ bgcolor: "#FFBC2F", p: { xs: 2, sm: 3 }, textAlign: "center" }}>
              <Typography variant="body1" sx={{ fontWeight: 600, fontSize: { xs: "1.1rem", md: "1.2rem" }, color: "#000000", lineHeight: 1.4 }}>
                {notice}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

