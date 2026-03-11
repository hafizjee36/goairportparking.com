import { Box, Container, Typography } from "@mui/material";
import terminalImg from "../assets/HeathrowImages/terminal-img.webp";
import terminalIcon from "../assets/HeathrowImages/terminal-icon.webp";

export default function HeathrowTerminalParkingSection() {
  const features = [
    {
      icon: terminalIcon,
      title: "Short Stay car parks located beside Terminals 2, 3, 4, and 5",
    },
    {
      icon: terminalIcon,
      title: "Just a few minutes’ walk to check-in",
    },
      {
      icon: terminalIcon,
      title: "Perfect for short trips, business travel, or when carrying luggage",
    },
    {
      icon: terminalIcon,
      title: "Slightly higher cost, but unbeatable for convenience and time-saving",
    }
  ];

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
        {/* Left side - Image */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            order: { xs: 2, lg: 1 }, // Show image after content on mobile
          }}
        >
          <Box
            component="img"
            src={terminalImg}
            alt="Terminal Parking - Family with luggage at Heathrow airport"
            sx={{
              width: "445px",
              height: "448px",
              maxWidth: { xs: "100%", sm: "450px", md: "500px" },
              borderRadius: 3,
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Right side - Content */}
        <Box
          sx={{
            order: { xs: 1, lg: 2 }, // Show content before image on mobile
            pl: { lg: 4 },
          }}
        >
          {/* Title */}
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
            Terminal{" "}
            <Typography
              component="span"
              sx={{
                color: "#000000",
                fontWeight: 700,
                fontSize: { xs: "28px", sm: "36px", md: "48px" },
              }}
            >
              Parking
            </Typography>
          </Typography>

          {/* Subtitle */}
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
        For maximum convenience, terminal parking puts you closest to your flight:
          </Typography>

          {/* Features List */}
          <Box sx={{display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr  1fr" }, }}>
            {features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 3,
                  marginTop:"30px"
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    minWidth: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 0.5,
                  }}
                >
                  <Box
                    component="img"
                    src={feature.icon}
                    alt="Terminal parking feature"
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "normal",
                      fontSize: { xs: "14px", md: "16px" },
                      lineHeight: 1.4,
                      color: "#000",
                      mb: 0.5,
                      borderBottom: "2px dashed #252654",
                      pb: 1,
                      display: "inline-block",
                    }}
                  >
                    {feature.title}
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
