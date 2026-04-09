import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import { airportConfigs } from "../../data/airportConfigs";
import { parkingOptions } from "../../assets/data.js";
import { getSectionData } from "../../data/airportSectionData.js";
import HeroSection from "../../components/reusable/HeroSection";
import Seo from "../../components/reusable/Seo";
import Why from "../airportParking/components/Why";
import InfoSection from "../../components/airport/InfoSection";
import ParkingOptionsSection from "../../components/airport/ParkingOptionsSection";
import TerminalParkingSection from "../../components/airport/TerminalParkingSection";
import PricingSection from "../../components/airport/PricingSection";
import FAQSection from "../../components/airport/FAQSection";
import AirportBlogSection from "../../components/airport/AirportBlogSection";
import bgImage from "../../assets/AirportsImages/airport-parking.webp";

export default function AirportPage() {
  const params = useParams();
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  
  const rawParam = params['airport-airport-parking'];
  const slug = rawParam ? rawParam.replace(/-airport-parking$/, '') : null; // e.g. 'birmingham'
  const slug2 = rawParam ? rawParam.replace(/-parking$/, '') : null; 
  const config = airportConfigs[slug] || airportConfigs[slug2];

  if (!config) {
    // Fallback or 404
    return <Box>Airport not found</Box>;
  }

  const sectionData = config.sectionData || getSectionData(slug);

  return (
    <>
      <Seo 
        title={config.seoTitle}
        description={config.seoDescription}
        keywords={config.seoKeywords}
        canonical={`${window.location.origin}${location.pathname}`}
      />
      
      <Box>
        <HeroSection 
          title={`${config.name} Airport Parking`} 
          breadcrumb 
          image={bgImage} 
        />
      </Box>

      <Box sx={{ mt: { xs: 6, sm: 8, md: -10 } }}>
        <Why />
      </Box>
      
      <InfoSection airportConfig={config} sectionData={sectionData} />

      <ParkingOptionsSection airportConfig={config} sectionData={sectionData} />

      <TerminalParkingSection airportConfig={config} sectionData={sectionData} />

      <PricingSection airportConfig={config} sectionData={sectionData} />

      <FAQSection airportConfig={config} sectionData={sectionData} />
      <AirportBlogSection airportSlug={slug} />
    </>
  );
}
