import { Box, useMediaQuery, useTheme } from "@mui/material";
import HeroSection from "../components/reusable/HeroSection";
import Seo from "../components/reusable/Seo";
import STANSTED_AIRPORT from "../assets/optimized/airport-parking.webp"; // You can replace this with Heathrow-specific image
import Why from "../pages/airportParking/components/Why";
import StanstedInfoSection from "../components/StanstedInfoSection";
import StanstedParkingOptions from "../components/StanstedParkingOptions";
import StanstedTerminalParkingSection from "../components/StanstedTerminalParkingSection";
import WhyBookWithUsStanstedSection from "../components/WhyBookWithUsStanstedSection";
import StanstedPricingSection from "../components/StanstedPricingSection";
import StanstedFAQSection from "../components/StanstedFAQSection";



export default function StanstedAirportParking() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            {/* SEO Meta Tags */}
            <Seo
                title="Stansted Airport Parking – Compare Prices, Meet & Greet, Park & Ride & Long Stay Deals"
                description="Compare Stansted Airport parking options: meet & greet, park & ride, long stay & short stay. Book secure airport parking with clear pricing and big savings. Reserve your spot today."
                keywords={[
                    "stansted airport parking, stansted airport meet and greet, stansted airport long stay, stansted airport park and ride, stansted airport parking deals, stansted airport parking prices, stansted car parks"
                ]}
                canonical={window.location.origin + "/stansted-airport-parking"}
            />

            <Box>
                <HeroSection
                    title="Stansted Airport Parking"
                    breadcrumb
                    image={STANSTED_AIRPORT}
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
            <StanstedInfoSection/>



            <StanstedParkingOptions />

            {/* Terminal Parking Section */}
            <StanstedTerminalParkingSection/>

            {/* Why Book With Us Section */}
            <WhyBookWithUsStanstedSection />

            {/* Heathrow Pricing Section */}
            <StanstedPricingSection />

            {/* Heathrow FAQ Section */}
            <StanstedFAQSection />
        </>
    );
}
