import { Box, Container, Typography } from "@mui/material";
import ParkingCard from "../ParkingCard";
import parking1 from "../../assets/AirportsImages/parking-1.webp";
import parking2 from "../../assets/AirportsImages/parking-2.webp";
import parking3 from "../../assets/AirportsImages/parking-3.webp";
import parking4 from "../../assets/AirportsImages/parking-4.webp";
import parking5 from "../../assets/AirportsImages/parking-5.webp";
import backgroundImage from "../../assets/AirportsImages/bg-parking.webp";
import { parkingOptions } from "../../assets/data.js";

export default function ParkingOptionsSection({ airportConfig, sectionData }) {
  const airportName = airportConfig.name;
  const data = sectionData?.parkingOptions || {};

  const parkingTitle = airportConfig.parkingOptionsTitle;
  const parkingDescription = airportConfig.parkingOptionsDescription;

  // Fallback to global parkingOptions filtered
  const globalOptions = parkingOptions.filter((p) => p.airportCode === airportConfig.code);

  const parkingOptions1 = [
      {
        id: 1,
        title: airportConfig.parkingCard1?.title,
        titleColor: "#F59E0B",
        description: airportConfig.parkingCard1?.description,
        image: parking1,
      },
      {
        id: 2,
        title: airportConfig.parkingCard2?.title,
        titleColor: "#F59E0B",
        description: airportConfig.parkingCard2?.description,
        image: parking2,
      },
    ];

    const parkingOptions2 = [
      {
        id: 3,
        title: airportConfig.parkingCard3?.title,
        titleColor: "#F59E0B",
        description: airportConfig.parkingCard3?.description,
        image: parking3,
      },
      {
        id: 4,
        title: airportConfig.parkingCard4?.title,
        titleColor: "#F59E0B",
        description: airportConfig.parkingCard4?.description,
        image: parking4,
      },
    ];

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 6, md: 8 },
        color: "white",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: { xs: "center", md: "bottom" },
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Mobile Title */}
        <Box sx={{ mb: 4, display: { xs: "block", lg: "none" } }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.5rem", md: "4rem" },
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            {parkingTitle}
          </Typography>

          <Typography sx={{ fontSize: "1.1rem", opacity: 0.9 }}>
            {parkingDescription}
          </Typography>
        </Box>

        <Box
          className="flex"
          sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 4 }}
        >
          {/* Left Side */}
          <Box className="side-1" sx={{ flex: 1, order: { xs: 2, lg: 1 } }}>
            {/* Title container - desktop mein show, mobile mein hide */}
            <Box
              className="title-container"
              sx={{
                mb: 4,
                position: "relative",
                zIndex: 1,
                display: { xs: "none", lg: "block" },
              }}
            >
              <Typography
                className="title"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "20px", sm: "30px", md: "40px" },
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                {parkingTitle}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "0.95rem", md: "1.1rem" },
                  opacity: 0.9,
                  maxWidth: 600,
                  lineHeight: 1.6,
                }}
              >
                {parkingDescription}
              </Typography>
            </Box>

            <Box
              className="cards flex"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 3,
              }}
            >
              {parkingOptions2.map((option) => (
                <Box
                  className="card-1"
                  key={option.id}
                  sx={{
                    flex: 1,
                    height: 340,
                    display: "flex",
                  }}
                >
                  <ParkingCard
                    number={option.id}
                    title={option.title}
                    titleColor={option.titleColor}
                    description={option.description}
                    image={option.image}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right Side */}
          <Box className="side-1" sx={{ flex: 1, order: { xs: 1, lg: 2 } }}>
            <Box
              className="cards flex"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 3,
              }}
            >
              {parkingOptions1.map((option) => (
                <Box
                  className="card-1"
                  key={option.id}
                  sx={{
                    flex: 1,
                    height: 340,
                    display: "flex",
                  }}
                >
                  <ParkingCard
                    number={option.id}
                    title={option.title}
                    titleColor={option.titleColor}
                    description={option.description}
                    image={option.image}
                  />
                </Box>
              ))}
            </Box>

            <Box
              component="img"
              src={parking5}
              alt="Parking Overview"
              sx={{
                display: { xs: "none", lg: "block" },
                width: "100%",
                borderRadius: 3,
                objectFit: "fit",
                height: "200px",
                mt: 2,
              }}
            />
          </Box>
        </Box>

        <Box
          component="img"
          src={parking5}
          alt="Parking Overview"
          sx={{
            display: { xs: "block", lg: "none" },
            width: "100%",
            borderRadius: 3,
            objectFit: "cover",
            height: "200px",
            mt: 4,
          }}
        />
      </Container>
    </Box>
  );
}