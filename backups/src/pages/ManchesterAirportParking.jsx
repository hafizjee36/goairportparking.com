import { Box, useMediaQuery, useTheme } from "@mui/material";
import HeroSection from "../components/reusable/HeroSection";
import Seo from "../components/reusable/Seo";
import MANCHESTER_AIRPORT from "../assets/optimized/airport-parking.webp"; // You can replace this with Manchester-specific image
import Why from "../pages/airportParking/components/Why";
import ManchesterInfoSection from "../components/ManchesterInfoSection";
import ManchesterParkingOptions from "../components/ManchesterParkingOptions";
import ManchesterPricingSection from "../components/ManchesterPricingSection";
import ManchesterFAQSection from "../components/ManchesterFAQSection";
import ManchesterTerminalParkingSection from "../components/ManchesterTerminalParkingSection";
import WhyBookWithUsManchesterSection from "../components/WhyBookWithUsManchesterSection";

export default function ManchesterAirportParking() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* SEO Meta Tags */}
      <Seo 
        title="Manchester Airport Parking – Best Deals, Meet & Greet & Long Stay Options"
        description="Compare Manchester Airport parking options & prices: long stay, park & ride, meet & greet. Book secure, terminal-near parking with savings, flexibility & peace of mind."
        keywords={[
          "manchester airport parking",
          "manchester airport meet and greet",
          "meet & greet manchester airport",
          "manchester airport long stay parking",
          "manchester airport park and ride",
          "manchester airport parking prices",
          "manchester airport parking deals"
        ]}
        canonical={window.location.origin + "/manchester-airport-parking"}
      />
      
      <Box>
        <HeroSection 
          title="Manchester Airport Parking" 
          breadcrumb 
          image={MANCHESTER_AIRPORT} 
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
      
      {/* New Manchester Info Section */}
      <ManchesterInfoSection />
      
    
      
      <ManchesterParkingOptions />

      {/* Terminal Parking Section */}
     <ManchesterTerminalParkingSection/>

      {/* Why Book With Us Section */}
    <WhyBookWithUsManchesterSection/>
      
      {/* Manchester Pricing Section */}
      <ManchesterPricingSection />
      
      {/* Manchester FAQ Section */}
      <ManchesterFAQSection />
    </>
  );
}
