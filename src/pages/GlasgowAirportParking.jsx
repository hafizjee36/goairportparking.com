import { Box, useMediaQuery, useTheme } from "@mui/material";
import HeroSection from "../components/reusable/HeroSection";
import Seo from "../components/reusable/Seo";
import AIRPORT_IMAGE from "../assets/optimized/airport-parking.webp";
import Why from "../pages/airportParking/components/Why";
import GlasgowInfoSection from "../components/GlasgowInfoSection";
import GlasgowParkingOptions from "../components/GlasgowParkingOptions";
import GlasgowPricingSection from "../components/GlasgowPricingSection";
import GlasgowFAQSection from "../components/GlasgowFAQSection";
import GlasgowTerminalParkingSection from "../components/GlasgowTerminalParkingSection";
import WhyBookWithUsGlasgowSection from "../components/WhyBookWithUsGlasgowSection";

export default function GlasgowAirportParking() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Seo
        title="Glasgow Airport Parking – Best Deals & Choices"
        description="Compare Glasgow Airport parking options: meet & greet, long stay, park & ride and more. Book secure parking near Glasgow Airport."
        keywords={["glasgow airport parking", "glasgow airport meet and greet", "glasgow parking"]}
        canonical={window.location.origin + "/glasgow-airport-parking"}
      />

      <Box>
        <HeroSection title="Glasgow Airport Parking" breadcrumb image={AIRPORT_IMAGE} />
      </Box>

      <Box sx={{ mt: { xs: 6, sm: 8, md: -10 } }}>
        <Why />
      </Box>

      <GlasgowInfoSection />
      <GlasgowParkingOptions />
      <GlasgowTerminalParkingSection />
      <WhyBookWithUsGlasgowSection />
      <GlasgowPricingSection />
      <GlasgowFAQSection />
    </>
  );
}
