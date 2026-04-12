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
        title="About Go Airport Parking | UK & Dublin Parking Comparison"
        description="Learn about Go Airport Parking, a trusted platform to compare secure and affordable parking options across UK airports and Dublin with ease."
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
