import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import { airportConfigs } from "../../data/airportConfigs";
import { getSectionData } from "../../data/airportSectionData.js";

import HeroSection from "../../components/reusable/HeroSection";
import Seo from "../../components/reusable/Seo";
import Why from "../airportParking/components/Why";

import InfoSection from "../../components/airport/InfoSection";
import BookThroughSection from "../../components/airport/BookThroughSection";
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

  // slug handle (airport-airport-parking ya airport-parking dono)
  const rawParam = params["airport-airport-parking"];
  const slug = rawParam ? rawParam.replace(/-airport-parking$/, "") : null;
  const slug2 = rawParam ? rawParam.replace(/-parking$/, "") : null;

  const config = airportConfigs[slug] || airportConfigs[slug2];

  if (!config) {
    return <Box>Airport not found</Box>;
  }

  // section data (custom ya default)
  const sectionData = config.sectionData || getSectionData(slug);

  return (
    <>
      {/* SEO */}
      <Seo
        title={config.seoTitle}
        description={config.seoDescription}
        keywords={config.seoKeywords}
        canonical={`${window.location.origin}${location.pathname}`}
      />

      {/* Hero Section */}
      <Box>
        <HeroSection
          title={`${config.name} Airport Parking`}
          breadcrumb
          image={bgImage}
        />
      </Box>

      {/* WHY section (existing) */}
      <Box sx={{ mt: { xs: 6, sm: 8, md: -10 } }}>
        <Why />
      </Box>

      {/* Info Section */}
      <InfoSection airportConfig={config} sectionData={sectionData} />

      {/* ✅ NEW SECTION (dynamic per airport) */}
      <BookThroughSection airportConfig={config} />

      {/* Parking Options */}
      <ParkingOptionsSection
        airportConfig={config}
        sectionData={sectionData}
      />

      {/* Terminal Parking */}
      <TerminalParkingSection
        airportConfig={config}
        sectionData={sectionData}
      />

      {/* Pricing */}
      <PricingSection
        airportConfig={config}
        sectionData={sectionData}
      />

      {/* FAQs */}
      <FAQSection
        airportConfig={config}
        sectionData={sectionData}
      />

      {/* Blog */}
      <AirportBlogSection airportSlug={slug} />
    </>
  );
}