import React, { useRef, useState } from "react";
import HeroSection from "../../components/reusable/HeroSection";
import Seo from "../../components/reusable/Seo";
import ABOUT_US from "../../assets/optimized/about-us.webp";
import CompanyTimelineHorizontal from "./components/CompanyTimelineHorizontal";
import MissionStatement from "./components/MissionStatement";
import JoinTheTeam from "./components/JoinTheTeam";

export default function About() {
  return (
    <>
      <Seo 
        title="About Us - Go Airport Parking | Your Trusted Airport Parking Partner"
        description="Learn about Go Airport Parking, your trusted partner for affordable and secure airport parking across the UK. Discover our mission, values, and commitment to excellent customer service."
        keywords={[
          "about go airport parking",
          "airport parking company",
          "UK airport parking",
          "trusted parking provider"
        ]}
      />
      
      <HeroSection title="About Us" breadcrumb image={ABOUT_US} />

      <CompanyTimelineHorizontal />

      <MissionStatement />

      <JoinTheTeam />
    </>
  );
}
