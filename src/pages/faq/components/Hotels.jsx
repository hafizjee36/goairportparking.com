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

export default function Hotels() {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const bookingInfo = [
    {
      q: "What is the check-in and check-out time?",
      a: "Check-in is from 2:00 PM, and check-out is until 11:00 AM. Early check-in or late check-out may be available on request.",
    },
    {
      q: "Do you require a deposit for booking?",
      a: "A credit card guarantee is required to secure your booking. Some rates may require full prepayment.",
    },
    {
      q: "Can I cancel my booking without a fee?",
      a: "Most rates allow free cancellation up to 24 hours before arrival, but check your rate’s terms for details.",
    },
  ];

  const amenitiesAndServices = [
    {
      q: "Is breakfast included in the room rate?",
      a: "This depends on your booking type. Some rates include breakfast, others do not. Check the details when booking.",
    },
    {
      q: "Do you offer airport shuttle service?",
      a: "Yes — we provide complimentary airport shuttle service at scheduled times. Please contact reception to reserve your spot.",
    },
    {
      q: "Is Wi-Fi available in the rooms?",
      a: "Yes — free high-speed Wi-Fi is available in all rooms and public areas.",
    },
  ];

  // animation timing (gentle & consistent)
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
          Booking Information
        </Typography>
      </AnimateOnScroll>

      {bookingInfo.map((item, idx) => (
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
              key={`book-${idx}`}
              panel={`book-${idx}`}
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
        delay={BASE + bookingInfo.length * STEP + 60}
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
        delay={BASE + bookingInfo.length * STEP + 100}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        style={smoothStyle}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Amenities & Services
        </Typography>
      </AnimateOnScroll>

      {amenitiesAndServices.map((item, idx) => (
        <Box key={`car-wrap-${idx}`} sx={{ mb: 1.25 }}>
          <AnimateOnScroll

            type="fade"
            duration={720}
            delay={BASE + bookingInfo.length * STEP + 140 + idx * STEP}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <FAQItem
              key={`amen-${idx}`}
              panel={`amen-${idx}`}
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
