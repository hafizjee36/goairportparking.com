import { Box, Container, Typography } from "@mui/material";
import ParkingCard from "../ParkingCard";
import parking1 from "../../assets/AirportsImages/parking-1.webp"; // You can replace these with Dublin-specific images
import parking2 from "../../assets/AirportsImages/parking-2.webp";
import parking3 from "../../assets/AirportsImages/parking-3.webp";
import parking4 from "../../assets/AirportsImages/parking-4.webp";
import parking5 from "../../assets/AirportsImages/parking-5.webp";
import backgroundImage from "../../assets/AirportsImages/bg-parking.webp";
import { parkingOptions } from "../../assets/data.js"; // Generic fallback

export default function ParkingOptionsSection({ airportConfig, sectionData }) {
  const airportName = airportConfig.name;
  const data = sectionData?.parkingOptions || {};

  // Fallback to global parkingOptions filtered
  const globalOptions = parkingOptions.filter(p => p.airportCode === airportConfig.code);

  const parkingOptions1 = [
      {
        id: 1,
        title: "Meet & Greet",
        titleColor: "#F59E0B",
        description:
          "Drive to your terminal, hand over your keys, and walk to departures while your car is parked securely for you. Perfect for business trips or families.",
           image: parking1,
      },
      {
        id: 2,
        title: "Terminal / Short Stay Parking ",
        titleColor: "#F59E0B",
        description:
          "Located right next to the terminal. Ideal for short trips, pick-ups, or drop-offs.",
        image: parking2,
      },
    ];
  
    const parkingOptions2 = [
      {
        id: 3,
        title: "Long Stay Parking",
        titleColor: "#F59E0B",
        description:
          "Great value for extended travel. Safe and secure car parks with free shuttle transfers to your terminal.",
        image: parking3,
      },
      {
        id: 4,
        title: "Park & Ride",
        titleColor: "#F59E0B",
        description:
          "Budget-friendly and reliable. Park off-site and take a quick shuttle transfer direct to the terminal.",
        image: parking4,
      },
    ];

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 6, md: 8 },
        color: "white",
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: { xs: 'center', md: 'bottom' },
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Mobile Title */}
        <Box sx={{ mb: 4, display: { xs: 'block', lg: 'none' } }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.5rem", md: "4rem" },
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Parking Options at{" "}
            <Typography component="span" sx={{ color: "#F59E0B", fontWeight: 700, fontSize: { xs: "2.5rem", md: "4rem" } }}>
              {airportName}
            </Typography>{" "}
            Airport
          </Typography>
          <Typography sx={{ fontSize: "1.1rem", opacity: 0.9 }}>
            We offer a full range of parking types to suit all travel needs and budgets:
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
                position: 'relative',
                zIndex: 1,
                display: { xs: 'none', lg: 'block' } // mobile mein hide, desktop mein show
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
                Parking Options at{" "}
                <Typography
                    component="span"
                    sx={{ color: "#F59E0B", fontWeight: 700, fontSize: { xs: "20px", sm: "30px", md: "40px" } }}
                >
                    {airportName} {" "}
                </Typography>
                <Typography
                    component="span"
                    sx={{ color: "#FFFFFF", fontWeight: 700, fontSize: { xs: "20px", sm: "30px", md: "40px" } }}
                >
                    {airportName =='Southampton' ? 'Port':'Airport'}
                </Typography>
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
                Choose from a wide range of parking services tailored to your needs:</Typography>
            </Box>

            {/* Cards Row - Equal Width + Equal Height */}
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
                    height: 340, // 🔑 Equal fixed height
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
            {/* Cards Row - Equal Width + Equal Height */}
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
                    height: 340, // 🔑 Equal fixed height
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

            {/* Large Image - desktop mein right side mein */}
            <Box
                component="img"
                src={parking5}
                alt="Parking Overview"
                sx={{
                display: { xs: 'none', lg: 'block' }, // mobile mein hide, desktop mein show
                width: "100%",
                borderRadius: 3,
                objectFit: "fit",
                height: "200px",
                mt: 2,
                }}
            />
            </Box>
        </Box>

        {/* Large Image - mobile mein last */}
        <Box
            component="img"
            src={parking5}
            alt="Parking Overview"
            sx={{
            display: { xs: 'block', lg: 'none' }, // mobile mein show, desktop mein hide
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
