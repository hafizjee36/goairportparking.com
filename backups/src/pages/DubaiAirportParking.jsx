import { Box, useMediaQuery, useTheme } from "@mui/material";
import HeroSection from "../components/reusable/HeroSection";
import Seo from "../components/reusable/Seo";
import Dubai_AIRPORT from "../assets/optimized/airport-parking.webp"; // You can replace this with Dubai-specific image
import Why from "../pages/airportParking/components/Why";
import DubaiInfoSection from "../components/DubaiInfoSection";
import DubaiParkingOptions from "../components/DubaiParkingOptions";
import DubaiPricingSection from "../components/DubaiPricingSection";
import DubaiFAQSection from "../components/DubaiFAQSection";
import DubaiTerminalParkingSection from "../components/DubaiTerminalParkingSection";
import WhyBookWithUsDubaiSection from "../components/WhyBookWithUsDubaiSection";

export default function DubaiAirportParking() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* SEO Meta Tags */}
      <Seo 
        title="Dubai Airport Parking – Compare Prices, Meet & Greet, Park & Fly & Long Stay Deals"
        description="Compare Dubai Airport parking options: meet & greet, park & ride, long stay & short stay. Book secure airport parking with top savings and peace of mind. Reserve now."
        keywords={[
          "dubai airport parking",
          "dubai airport meet and greet",
          "dubai airport long stay",
          "dubai airport park and fly",
          "park and ride dubai airport",
          "dubai airport parking deals",
          "dubai airport parking prices"
        ]}
        canonical={window.location.origin + "/dubai-airport-parking"}
      />
      
      <Box>
        <HeroSection 
          title="Dubai Airport Parking" 
          breadcrumb 
          image={Dubai_AIRPORT} 
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
      
      {/* New Dubai Info Section */}
      <DubaiInfoSection />
      
    
      
      <DubaiParkingOptions />

      {/* Terminal Parking Section */}
   <DubaiTerminalParkingSection/>

      {/* Why Book With Us Section */}
     <WhyBookWithUsDubaiSection/>
      
      {/* Dubai Pricing Section */}
      <DubaiPricingSection />
      
      {/* Dubai FAQ Section */}
      <DubaiFAQSection />
    </>
  );
}
