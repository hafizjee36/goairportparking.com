import { Box, useMediaQuery, useTheme } from "@mui/material";
import HeroSection from "../components/reusable/HeroSection";
import Seo from "../components/reusable/Seo";
import STANSTED_AIRPORT from "../assets/optimized/airport-parking.webp"; // You can replace this with Heathrow-specific image
import Why from "./airportParking/components/Why";
import SouthamptonInfoSection from "../components/SouthamptonInfoSection";
import SouthamptonParkingOptions from "../components/SouthamptonParkingOptions";
import SouthamptonTerminalParkingSection from "../components/SouthamptonTerminalParkingSection";
import WhyBookWithUsSouthamptonSection from "../components/WhyBookWithUsSouthamptonSection";
import SouthamptonPricingSection from "../components/SouthamptonPricingSection";
import SouthamptonFAQSection from "../components/SouthamptonFAQSection";



export default function SouthamptonPortParking() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            {/* SEO Meta Tags */}
            <Seo
                title="Southampton Port Parking – Compare Cruise Parking, Meet & Greet, Park & Ride & Long Stay Deals"
                description="Compare Southampton Port parking options: cruise parking, meet & greet, park & ride, on-site & long-stay. Book secure port parking with clear pricing and great savings. Reserve your space today."
                keywords={[
                    "southampton port parking, southampton cruise parking, southampton port meet and greet, southampton port long stay, southampton port park and ride, southampton port parking deals, southampton port parking prices, southampton cruise terminal parking"
                ]}
                canonical={window.location.origin + "/southampton-port-parking"}
            />

            <Box>
                <HeroSection
                    title="Southampton Port Parking"
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
            <SouthamptonInfoSection/>



            <SouthamptonParkingOptions />

            {/* Terminal Parking Section */}
            <SouthamptonTerminalParkingSection/>

            {/* Why Book With Us Section */}
            <WhyBookWithUsSouthamptonSection />

            {/* Heathrow Pricing Section */}
            <SouthamptonPricingSection />

            {/* Heathrow FAQ Section */}
            <SouthamptonFAQSection />
        </>
    );
}
