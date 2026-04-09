import { Box, Container, Typography } from "@mui/material";
import bookImg from "../assets/LeedsImages/book-img.webp";
import compareImg from "../assets/LeedsImages/compare-img.webp";
import securityIcon from "../assets/LeedsImages/security-icon.webp";
import transparencyImg from "../assets/LeedsImages/transparency-img.webp";
import reviewsImg from "../assets/LeedsImages/reviews-img.webp";
import prebookImg from "../assets/LeedsImages/prebook-img.webp";

export default function WhyBookWithUsSouthamptonSection() {
  const features = [
    {
      icon: compareImg,
      title: "Compare & Save",
      description: "Instantly see the best cruise parking prices"
    },
    {
      icon: securityIcon,
      title: "Secure & Reliable",
      description: "Only trusted, accredited providers included"
    },
    {
      icon: transparencyImg,
      title: "Transparency Pricing",
      description: "Clear costs, transfer details, and cancellation terms"
    },
    {
      icon: reviewsImg,
      title: "Trusted Reviews",
      description: "Genuine customer ratings to help you choose"
    },
    {
      icon: prebookImg,
      title: "Book Early for Best Rates ",
      description: "Guarantee your space and save more"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.8fr 1fr" },
          gap: { xs: 4, md: 6, lg: 8 },
          alignItems: "center",
        }}
      >
        {/* Left side - Content */}
        <Box
          sx={{
            order: { xs: 1, lg: 1 },
          }}
        >
          {/* Main Title */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "28px", sm: "36px", md: "48px" },
              mb: 4,
              lineHeight: 1.2,
              color: "#000000",
            }}
          >
            Why Book With Us
          </Typography>

          {/* Features Grid - 2 columns */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: { xs: 3, md: 4 },
            }}
          >
            {features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  p: 3,
                  border: "2px solid #FFBC2F",
                  borderRadius: 2,
                  bgcolor: "#FFFFFF",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#FFBC2F",
                    boxShadow: "0 4px 20px rgba(255, 188, 47, 0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    minWidth: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={feature.icon}
                    alt={feature.title}
                    sx={{
                      width: 48,
                      height: 48,
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {/* Content Container */}
                <Box sx={{ flex: 1 }}>
                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.1rem", md: "18px" },
                      mb: 1,
                      color: "#252654",
                      lineHeight: 1.3,
                    }}
                  >
                   {feature.title.split('&').map((part, index, array) => (
                      <span key={index}>
                        {part}
                        {index < array.length - 1 && (
                          <span style={{ color: '#FFBC2F' }}>&</span>
                        )}
                      </span>
                    ))}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "13px", md: "14px" },
                      lineHeight: 1.5,
                      color: "#000",
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right side - Image */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            order: { xs: 2, lg: 2 },
          }}
        >
          <Box
            component="img"
            src={bookImg}
            alt="Family booking leeds bradford airport parking - Why book with us"
            sx={{
              width: "100%",
              height: "584px",
              maxWidth: { xs: "100%", sm: "400px", md: "450px" },
              borderRadius: 3,
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}
