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

export default function AirportParking() {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const carParkInfo = [
    {
      q: "What are your car park opening hours?",
      a: `Our car park is open 24 hours a day, 7 days a week, including weekends and public holidays. Whether your flight is early morning or late at night, we're here to provide safe and convenient parking whenever you need it, ensuring flexibility for all travel schedules.`,
    },
    {
      q: "Is the car park secure and monitored?",
      a: `Yes — our facility is monitored by CCTV with regular patrols by on-site staff.`,
    },
    {
      q: "Do I need to leave my keys with you?",
      a: `Most bookings are self-park; key drop may be required for valeting or peak-time operations. This will be clearly shown during booking.`,
    },
    {
      q: "How far is the car park from the airport terminal?",
      a: `Typically 5–10 minutes by shuttle. Exact times vary by location and traffic.`,
    },
  ];

  const priorToBooking = [
    {
      q: "How far in advance should I book my parking space?",
      a: `We recommend booking as early as possible to secure the best rate and availability, especially during holidays.`,
    },
    {
      q: "Are there any height or size restrictions for vehicles?",
      a: `Yes — our car park can accommodate most standard cars, SUVs, and small vans. However, vehicles over 2.1 metres in height or unusually long/wide may not fit in certain spaces. Please check with our team before booking to confirm suitability and avoid any issues on arrival.`,
    },
    {
      q: "What payment methods do you accept for bookings?",
      a: `We accept major credit/debit cards and most digital wallets. Availability may vary by location.`,
    },
    {
      q: "Can I choose between meet-and-greet and park-and-ride services?",
      a: `Yes — options are shown during checkout. Meet-and-greet offers maximum convenience at the terminal, while park-and-ride is a great value choice.`,
    },
  ];

  // animation timing
  const BASE = 80; // initial delay
  const STEP = 90; // stagger per item

  return (
    <Box>
      {/* Section 1 */}
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
          Car Park Information
        </Typography>
      </AnimateOnScroll>

      {carParkInfo.map((item, idx) => (
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
              key={`car-${idx}`}
              panel={`car-${idx}`}
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
        delay={BASE + carParkInfo.length * STEP + 60}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        style={smoothStyle}
      >
        <Divider sx={{ my: { xs: 4, md: 6 } }} />
      </AnimateOnScroll>

      {/* Section 2 */}
      <AnimateOnScroll
        type="zoom-in"
        duration={850}
        delay={BASE + carParkInfo.length * STEP + 100}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        style={smoothStyle}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Prior to Booking
        </Typography>
      </AnimateOnScroll>

      {priorToBooking.map((item, idx) => (
        <Box key={`car-wrap-${idx}`} sx={{ mb: 1.25 }}>
          <AnimateOnScroll
            type="fade"
            duration={720}
            delay={BASE + carParkInfo.length * STEP + 140 + idx * STEP}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <FAQItem
              key={`pre-${idx}`}
              panel={`pre-${idx}`}
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
