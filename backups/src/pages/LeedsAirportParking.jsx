import { Box, useMediaQuery, useTheme } from "@mui/material";
import HeroSection from "../components/reusable/HeroSection";
import Seo from "../components/reusable/Seo";
import LEEDS_AIRPORT from "../assets/optimized/airport-parking.webp"; // You can replace this with Heathrow-specific image
import Why from "../pages/airportParking/components/Why";
import LeedsInfoSection from "../components/LeedsInfoSection";
import LeedsParkingOptions from "../components/LeedsParkingOptions";
import LeedsTerminalParkingSection from "../components/LeedsTerminalParkingSection";
import WhyBookWithUsLeedsSection from "../components/WhyBookWithUsLeedsSection";
import LeedsPricingSection from "../components/LeedsPricingSection";
import LeedsFAQSection from "../components/LeedsFAQSection";


export default function LeedsAirportParking() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            {/* SEO Meta Tags */}
            <Seo
                title="Leeds Bradford Airport Parking – Compare Prices, Meet & Greet, Park & Ride & Long Stay Deals"
                description="Compare Leeds Bradford Airport parking options: meet & greet, park & ride, long stay & short stay. Book secure airport parking with transparent pricing and big savings. Reserve today."
                keywords={[
                    "leeds bradford airport parking, leeds bradford meet and greet, leeds bradford airport long stay, leeds bradford park and ride, leeds bradford parking deals, leeds bradford airport parking prices, lba car parks"
                ]}
                canonical={window.location.origin + "/leeds-airport-parking"}
            />

            <Box>
                <HeroSection
                    title="Leeds Bradford Airport Parking"
                    breadcrumb
                    image={LEEDS_AIRPORT}
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
            <LeedsInfoSection/>



            <LeedsParkingOptions />

            {/* Terminal Parking Section */}
            <LeedsTerminalParkingSection />

            {/* Why Book With Us Section */}
            <WhyBookWithUsLeedsSection />

            {/* Heathrow Pricing Section */}
            <LeedsPricingSection />

            {/* Heathrow FAQ Section */}
            <LeedsFAQSection />
        </>
    );
}
