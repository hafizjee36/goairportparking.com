import { Box, Container, Typography } from "@mui/material";
import ParkingCard from "./ParkingCard";
import parking1 from "../assets/ManchesterImages/parking-1.webp"; // You can replace these with Dublin-specific images
import parking2 from "../assets/ManchesterImages/parking-2.webp";
import parking3 from "../assets/ManchesterImages/parking-3.webp";
import parking4 from "../assets/ManchesterImages/parking-4.webp";
import parking5 from "../assets/ManchesterImages/parking-5.webp";
import backgroundImageParking from "../assets/ManchesterImages/bg-parking.webp";

export default function SouthamptonParkingOptions() {
  const parkingOptions1 = [
    {
      id: 1,
      title: "Meet & Greet",
      titleColor: "#F59E0B",
      description:
        "Drive to your cruise terminal, hand over your keys, and walk straight to check-in while your vehicle is parked securely. Ideal for families and travellers with luggage.",
         image: parking1,
    },
    {
      id: 2,
      title: "Cruise Terminal / Short Stay Parking ",
      titleColor: "#F59E0B",
      description:
        "Park close to the terminal for fast access. Convenient for short trips, pick-ups, or those wanting minimal walking distance.",
      image: parking2,
    },
  ];

  const parkingOptions2 = [
    {
      id: 3,
      title: "Long Stay Parking",
      titleColor: "#F59E0B",
      description:
        "Cost-effective for longer cruises. Slightly further away but supported by regular, free shuttle transfers.",
      image: parking3,
    },
    {
      id: 4,
      title: "Park & Ride",
      titleColor: "#F59E0B",
      description:
        "Budget-friendly and reliable. Leave your car at an off-site location and enjoy a quick shuttle to your cruise terminal.",
      image: parking4,
    },
  ];

  return (
    <Box
      className="parking-options"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 6, md: 8 },
        color: "white",
        minHeight: { xs: "100vh", md: "auto" },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${backgroundImageParking})`,
          backgroundSize: 'cover',
          backgroundPosition: { xs: 'center', md: 'bottom' },
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Title section - mobile mein top, desktop mein left side mein */}
        <Box
          className="title-container"
          sx={{
            mb: 4,
            position: 'relative',
            zIndex: 1,
            display: { xs: 'block', lg: 'none' } // mobile mein show, desktop mein hide
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
              Southampton {" "}
            </Typography>
            <Typography
              component="span"
              sx={{ color: "#FFFFFF", fontWeight: 700, fontSize: { xs: "20px", sm: "30px", md: "40px" } }}
            >
              Airport
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
           Select the service that best fits your journey and budget:
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
                  Southampton {" "}
                </Typography>
                <Typography
                  component="span"
                  sx={{ color: "#FFFFFF", fontWeight: 700, fontSize: { xs: "20px", sm: "30px", md: "40px" } }}
                >
                  Port
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
                Select the service that best fits your journey and budget:</Typography>
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
