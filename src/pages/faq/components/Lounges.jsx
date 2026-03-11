import { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import FAQItem from "../../../components/reusable/FaqItem";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";

// shared animation utils
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../../components/utils/animation";

export default function Lounges() {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const loungeAccessInfo = [
    {
      q: "How can I access the lounge?",
      a: "You can access the lounge by booking online in advance or paying at the entrance, subject to availability.",
    },
    {
      q: "Is lounge access included with my flight ticket?",
      a: "Lounge access is usually not included unless you’re flying business or first class, or hold certain membership cards.",
    },
    {
      q: "Can I bring a guest into the lounge?",
      a: "Yes — most lounges allow guests for an additional fee. Policies vary, so check your booking details.",
    },
  ];

  const loungeFacilities = [
    {
      q: "What facilities are available in the lounge?",
      a: "Lounges typically include comfortable seating, complimentary food and drinks, high-speed Wi-Fi, and charging points.",
    },
    {
      q: "Are there shower facilities in the lounge?",
      a: "Yes — selected lounges offer showers for travelers. Towels and toiletries are usually provided.",
    },
    {
      q: "Is alcohol served in the lounge?",
      a: "Yes — most lounges offer a selection of alcoholic beverages, subject to local regulations and time of day.",
    },
  ];

  // animation timing
  const BASE = 80; // initial delay
  const STEP = 90; // stagger per item

  return (
    <Box>
      {/* Group 1 */}
      <AnimateOnScroll
        type="zoom-in"
        duration={850}
        delay={20}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        style={smoothStyle}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Lounge Access Information
        </Typography>
      </AnimateOnScroll>

      {loungeAccessInfo.map((item, idx) => (
        <Box key={`car-wrap-${idx}`} sx={{ mb: 1.25 }}>
          <AnimateOnScroll
            type="fade"
            duration={720}
            delay={BASE + idx * STEP}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <FAQItem
              key={`access-${idx}`}
              panel={`access-${idx}`}
              expanded={expanded}
              onChange={handleChange}
              {...item}
            />
          </AnimateOnScroll>
        </Box>
      ))}

      {/* Divider fade */}
      <AnimateOnScroll
        type="fade"
        duration={600}
        delay={BASE + loungeAccessInfo.length * STEP + 60}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        style={smoothStyle}
      >
        <Divider sx={{ my: { xs: 4, md: 6 } }} />
      </AnimateOnScroll>

      {/* Group 2 */}
      <AnimateOnScroll
        type="zoom-in"
        duration={850}
        delay={BASE + loungeAccessInfo.length * STEP + 100}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        style={smoothStyle}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Lounge Facilities
        </Typography>
      </AnimateOnScroll>

      {loungeFacilities.map((item, idx) => (
        <Box key={`car-wrap-${idx}`} sx={{ mb: 1.25 }}>
          <AnimateOnScroll
            type="fade"
            duration={720}
            delay={BASE + loungeAccessInfo.length * STEP + 140 + idx * STEP}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <FAQItem
              key={`fac-${idx}`}
              panel={`fac-${idx}`}
              expanded={expanded}
              onChange={handleChange}
              {...item}
            />
          </AnimateOnScroll>
        </Box>
      ))}
    </Box>
  );
}
