import { Box, useMediaQuery, useTheme } from "@mui/material";
import HeroSection from "../components/reusable/HeroSection";
import Seo from "../components/reusable/Seo";
import DUBLIN_AIRPORT from "../assets/optimized/airport-parking.webp"; // You can replace this with Dublin-specific image
import Why from "../pages/airportParking/components/Why";
import DublinInfoSection from "../components/DublinInfoSection";
import DublinParkingOptions from "../components/DublinParkingOptions";
import DublinPricingSection from "../components/DublinPricingSection";
import DublinFAQSection from "../components/DublinFAQSection";
import DublinTerminalParkingSection from "../components/DublinTerminalParkingSection";
import WhyBookWithUsDublinSection from "../components/WhyBookWithUsDublinSection";

export default function DublinAirportParking() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* SEO Meta Tags */}
      <Seo 
        title="Dublin Airport Parking – Compare Prices, Meet & Greet, Park & Fly & Long Stay Deals"
        description="Compare Dublin Airport parking options: meet & greet, park & ride, long stay & short stay. Book secure airport parking with top savings and peace of mind. Reserve now."
        keywords={[
          "dublin airport parking",
          "dublin airport meet and greet",
          "dublin airport long stay",
          "dublin airport park and fly",
          "park and ride dublin airport",
          "dublin airport parking deals",
          "dublin airport parking prices"
        ]}
        canonical={window.location.origin + "/dublin-airport-parking"}
      />
      
      <Box>
        <HeroSection 
          title="Dublin Airport Parking" 
          breadcrumb 
          image={DUBLIN_AIRPORT} 
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
      
      {/* New Dublin Info Section */}
      <DublinInfoSection />
      
    
      
      <DublinParkingOptions />

      {/* Terminal Parking Section */}
   <DublinTerminalParkingSection/>

      {/* Why Book With Us Section */}
     <WhyBookWithUsDublinSection/>
      
      {/* Dublin Pricing Section */}
      <DublinPricingSection />
      
      {/* Dublin FAQ Section */}
      <DublinFAQSection />
    </>
  );
}
