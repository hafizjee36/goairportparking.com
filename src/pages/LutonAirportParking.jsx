import { Box, useMediaQuery, useTheme } from "@mui/material";
import HeroSection from "../components/reusable/HeroSection";
import Seo from "../components/reusable/Seo";
import Luton_AIRPORT from "../assets/optimized/airport-parking.webp"; // You can replace this with Heathrow-specific image
import Why from "../pages/airportParking/components/Why";
import LutonInfoSection from "../components/LutonInfoSection";
import LutonParkingOptions from "../components/LutonParkingOptions";
import LutonTerminalParkingSection from "../components/LutonTerminalParkingSection";
import WhyBookWithUsLutonSection from "../components/WhyBookWithUsBristolSection";
import LutonPricingSection from "../components/LutonPricingSection";
import LutonFAQSection from "../components/LutonFAQSection";





export default function LutonAirportParking() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            {/* SEO Meta Tags */}
        <Seo
  title="Luton Airport Parking – Compare Prices, Meet & Greet, Park & Ride & Long Stay Deals"
  description="Compare Luton Airport parking options: meet & greet, park & ride, long stay & short stay. Book secure parking with great savings and peace of mind. Reserve today."
  keywords={[
    "luton airport parking",
    "luton airport meet and greet",
    "luton airport long stay",
    "luton airport park and ride",
    "luton airport parking deals",
    "luton airport parking prices",
    "luton airport car park",
  ]}
  canonical={window.location.origin + "/luton-airport-parking"}
/>

            <Box>
                <HeroSection
                    title="Luton Airport Parking"
                    breadcrumb
                    image={Luton_AIRPORT}
                />

                {/* Booking Form - Same positioning as Home page */}
                {/* {!isSmallScreen && (
          <Box
            sx={{
              position: "absolute",
              bottom: { md: -110 },
              left: 0,
              right: 0,
              zIndex: 2,
              px: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: "1200px" }}>
              <BookingForm />
            </Box>
          </Box>
        )} */}
            </Box>

            {/* Mobile Booking Form */}
            {/* {isSmallScreen && (
        <Box sx={{ px: 2, mt: 4 }}>
          <BookingForm />
        </Box>
      )} */}

            {/* Content sections with proper top margin for booking form */}
            <Box sx={{ mt: { xs: 6, sm: 8, md: -10 } }}>
                <Why />
            </Box>

            {/* New Heathrow Info Section */}
            <LutonInfoSection/>



            <LutonParkingOptions />

            {/* Terminal Parking Section */}
            <LutonTerminalParkingSection/>

            {/* Why Book With Us Section */}
            <WhyBookWithUsLutonSection />

            {/* Heathrow Pricing Section */}
            <LutonPricingSection />

            {/* Heathrow FAQ Section */}
            <LutonFAQSection />
        </>
    );
}
