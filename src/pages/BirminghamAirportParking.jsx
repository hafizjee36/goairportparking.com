import { Box, useMediaQuery, useTheme } from "@mui/material";
import HeroSection from "../components/reusable/HeroSection";
import Seo from "../components/reusable/Seo";
import BookingForm from "../components/bookingForm/BookingForm";
import BIRMINGHAM_AIRPORT from "../assets/optimized/airport-parking.webp"; // You can replace this with Birmingham-specific image
import Why from "../pages/airportParking/components/Why";
import BirminghamInfoSection from "../components/BirminghamInfoSection";
import BirminghamParkingOptions from "../components/BirminghamParkingOptions";
import TerminalParkingSection from "../components/BirminghamTerminalParkingSection";
import WhyBookWithUsSection from "../components/WhyBookWithUsBirminghamSection";
import BirminghamPricingSection from "../components/BirminghamPricingSection";
import BirminghamFAQSection from "../components/BirminghamFAQSection";

export default function BirminghamAirportParking() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* SEO Meta Tags */}
      <Seo 
        title="Birmingham Airport Parking – Best Deals, Meet & Greet & Long Stay Options"
        description="Compare Birmingham Airport parking options & prices: meet & greet, park & ride, long stay. Book secure, affordable airport parking near terminals. Save money & travel stress-free."
        keywords={[
          "birmingham airport parking",
          "birmingham airport meet and greet",
          "meet & greet birmingham airport",
          "birmingham airport long stay parking",
          "birmingham airport park and ride",
          "birmingham airport parking deals",
          "birmingham airport parking prices"
        ]}
        canonical={window.location.origin + "/birmingham-airport-parking"}
      />
      
      <Box>
        <HeroSection 
          title="Birmingham Airport Parking" 
          breadcrumb 
          image={BIRMINGHAM_AIRPORT} 
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
      
      {/* New Birmingham Info Section */}
      <BirminghamInfoSection />
      
    
      
      <BirminghamParkingOptions />

      {/* Terminal Parking Section */}
      <TerminalParkingSection />

      {/* Why Book With Us Section */}
      <WhyBookWithUsSection />
      
      {/* Birmingham Pricing Section */}
      <BirminghamPricingSection />
      
      {/* Birmingham FAQ Section */}
      <BirminghamFAQSection />
    </>
  );
}
