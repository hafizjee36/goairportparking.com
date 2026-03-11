import { Box, useMediaQuery, useTheme } from "@mui/material";
import HeroSection from "../components/reusable/HeroSection";
import Seo from "../components/reusable/Seo";
import Bristol_AIRPORT from "../assets/optimized/airport-parking.webp"; // You can replace this with Heathrow-specific image
import Why from "../pages/airportParking/components/Why";
import BristolInfoSection from "../components/BristolInfoSection";
import BristolParkingOptions from "../components/BristolParkingOptions";
import BristolTerminalParkingSection from "../components/BristolTerminalParkingSection";
import WhyBookWithUsBristolSection from "../components/WhyBookWithUsBristolSection";
import BristolPricingSection from "../components/BristolPricingSection";
import BristolFAQSection from "../components/BristolFAQSection";




export default function BristolAirportParking() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            {/* SEO Meta Tags */}
            <Seo
                title="Bristol Airport Parking – Compare Prices, Meet & Greet, Park & Ride & Long Stay Deals"
                description="Compare Bristol Airport parking options: meet & greet, park & ride, long stay & short stay. Book secure parking with trusted providers, clear pricing, and great savings. Reserve online now."
                keywords={[
                    "bristol airport parking, bristol airport meet and greet, bristol airport long stay, bristol airport park and ride, bristol airport parking deals, bristol airport parking prices, bristol car parks"
                ]}
                canonical={window.location.origin + "/bristol-airport-parking"}
            />

            <Box>
                <HeroSection
                    title="Bristol Airport Parking"
                    breadcrumb
                    image={Bristol_AIRPORT}
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
            <BristolInfoSection/>



            <BristolParkingOptions />

            {/* Terminal Parking Section */}
            <BristolTerminalParkingSection/>

            {/* Why Book With Us Section */}
            <WhyBookWithUsBristolSection />

            {/* Heathrow Pricing Section */}
            <BristolPricingSection />

            {/* Heathrow FAQ Section */}
            <BristolFAQSection />
        </>
    );
}
