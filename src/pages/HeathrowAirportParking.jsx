import { Box, useMediaQuery, useTheme } from "@mui/material";
import HeroSection from "../components/reusable/HeroSection";
import Seo from "../components/reusable/Seo";
import HEATHROW_AIRPORT from "../assets/optimized/airport-parking.webp"; // You can replace this with Heathrow-specific image
import Why from "../pages/airportParking/components/Why";
import HeathrowInfoSection from "../components/HeathrowInfoSection";
import HeathrowParkingOptions from "../components/HeathrowParkingOptions";
import HeathrowPricingSection from "../components/HeathrowPricingSection";
import HeathrowFAQSection from "../components/HeathrowFAQSection";
import HeathrowTerminalParkingSection from "../components/HeathrowTerminalParkingSection";
import WhyBookWithUsHeathrowSection from "../components/WhyBookWithUsHeathrowSection";

export default function HeathrowAirportParking() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* SEO Meta Tags */}
      <Seo 
        title="Heathrow Airport Parking – Compare Prices, Meet & Greet, Park & Ride & Long Stay Deals"
        description="Compare Heathrow Airport parking options: meet & greet, park & ride, long stay & short stay. Book secure, affordable airport parking with trusted providers and great savings. Reserve today."
        keywords={[
          "heathrow airport parking",
          "heathrow airport meet and greet",
          "heathrow airport long stay",
          "heathrow airport short stay",
          "heathrow airport park and ride",
          "heathrow airport parking deals",
          "heathrow airport parking prices"
        ]}
        canonical={window.location.origin + "/heathrow-airport-parking"}
      />
      
      <Box>
        <HeroSection 
          title="Heathrow Airport Parking" 
          breadcrumb 
          image={HEATHROW_AIRPORT} 
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
      <HeathrowInfoSection />
      
    
      
      <HeathrowParkingOptions />

      {/* Terminal Parking Section */}
     <HeathrowTerminalParkingSection/>

      {/* Why Book With Us Section */}
    <WhyBookWithUsHeathrowSection/>
      
      {/* Heathrow Pricing Section */}
      <HeathrowPricingSection />
      
      {/* Heathrow FAQ Section */}
      <HeathrowFAQSection />
    </>
  );
}
