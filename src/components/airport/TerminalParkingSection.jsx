import { Box, Container, Typography } from "@mui/material";
import Image from "../../assets/AirportsImages/terminal-img.webp";
import Icon from "../../assets/AirportsImages/terminal-icon.webp";

export default function TerminalParkingSection({ airportConfig, sectionData }) {
  const { subtitle, features = [] } = sectionData?.terminalParking || {};

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1.5fr" },
          gap: { xs: 4, md: 6, lg: 8 },
          alignItems: "start",
        }}
      >
        {/* Image */}
        <Box sx={{ position: "relative", display: "flex", justifyContent: "center", order: { xs: 2, lg: 1 } }}>
          <Box
            component="img"
            src={Image}
            alt="Terminal Parking"
            sx={{
              width: "445px",
              height: "448px",
              maxWidth: { xs: "100%", sm: "450px", md: "500px" },
              borderRadius: 3,
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ order: { xs: 1, lg: 2 }, pl: { lg: 4 } }}>
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
            Terminal{" "}
            <Typography component="span" sx={{ color: "#F59E0B", fontWeight: 700, fontSize: { xs: "2.3rem", sm: "3rem", md: "4rem" } }}>
              Parking
            </Typography>
          </Typography>

          {subtitle && (
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.6,
                color: "#000",
                mb: 4,
                maxWidth: 600,
              }}
            >
              {subtitle}
            </Typography>
          )}

          {/* Features */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
            {features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 3,
                  mt: 2,
                }}
              >
                <Box sx={{ minWidth: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center", mt: 0.5 }}>
                  <Box
                    component="img"
                    src={Icon}
                    alt="Feature icon"
                    sx={{ width: 60, height: 60, objectFit: "contain" }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      lineHeight: 1.4,
                      color: "#000",
                      borderBottom: "2px dashed #252654",
                      pb: 1,
                      display: "inline-block",
                    }}
                  >
                    {feature}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

