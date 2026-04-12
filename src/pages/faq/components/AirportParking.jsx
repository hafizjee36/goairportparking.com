import { useState, useEffect, useMemo } from "react";
import { Box, Typography, Divider } from "@mui/material";
import FAQItem from "../../../components/reusable/FaqItem";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";

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
      q: "What are the parking operating hours?",
      a: `Most parking providers operate 24/7, allowing you to arrive or collect your vehicle at any time, regardless of your flight schedule.`,
    },
    {
      q: "Are parking locations secure?",
      a: `Yes, listed providers typically include security features such as CCTV monitoring, controlled access, and regular on-site checks.`,
    },
    {
      q: "Do I need to leave my car keys?",
      a: `In many cases, you can keep your keys with self-parking options. However, some services like valet or busy periods may require key handover.`,
    },
    {
      q: "How far are parking locations from the terminal?",
      a: `Distance depends on the option selected. Off-site parking usually includes a short transfer, while closer options may be within walking distance.`,
    },
  ];

  const beforeYouBook = [
    {
      q: "When is the best time to book airport parking?",
      a: `Booking in advance is recommended as it often gives access to better prices and ensures availability.`,
    },
    {
      q: "Are there vehicle size or height restrictions?",
      a: `Most standard vehicles are accepted, but larger vehicles may have limitations depending on the facility.`,
    },
    {
      q: "What payment methods are available?",
      a: `Payments are usually accepted via major debit/credit cards and selected online payment methods.`,
    },
    {
      q: "Can I choose different types of parking services?",
      a: `Yes, you can select Meet & Greet, Park & Ride, or terminal parking based on your needs.`,
    },
  ];

  const bookingAndReservation = [
    {
      q: "What details are required when making a booking?",
      a: `You’ll need travel dates, vehicle details, and contact information.`,
    },
    {
      q: "Can I cancel or change my booking?",
      a: `Most bookings allow changes or cancellations, depending on provider policies.`,
    },
    {
      q: "Is full payment required at the time of booking?",
      a: `Some bookings require full payment upfront, while others offer flexible options.`,
    },
  ];

  const servicesAndTransfers = [
    {
      q: "Are shuttle transfers included?",
      a: `Many off-site parking options include shuttle transfers to and from the terminal.`,
    },
    {
      q: "How often do shuttle services run?",
      a: `Transfer frequency varies by provider but usually aligns with flight schedules.`,
    },
  ];

  const allFaqItems = useMemo(
    () => [
      ...carParkInfo,
      ...beforeYouBook,
      ...bookingAndReservation,
      ...servicesAndTransfers,
    ],
    []
  );

  useEffect(() => {
    const existingSchema = document.getElementById("faq-airport-parking-schema");
    if (existingSchema) existingSchema.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allFaqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-airport-parking-schema";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const injectedSchema = document.getElementById("faq-airport-parking-schema");
      if (injectedSchema) injectedSchema.remove();
    };
  }, [allFaqItems]);

  const BASE = 80;
  const STEP = 90;

  const renderSection = (title, items, prefix, offset) => (
    <>
      <AnimateOnScroll
        type="fade"
        duration={600}
        delay={offset}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        style={smoothStyle}
      >
        <Divider sx={{ my: { xs: 4, md: 6 } }} />
      </AnimateOnScroll>

      <AnimateOnScroll
        type="zoom-in"
        duration={850}
        delay={offset + 40}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        style={smoothStyle}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          {title}
        </Typography>
      </AnimateOnScroll>

      {items.map((item, idx) => (
        <Box key={`${prefix}-wrap-${idx}`} sx={{ mb: 1.25 }}>
          <AnimateOnScroll
            type="fade"
            duration={720}
            delay={offset + 80 + idx * STEP}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <FAQItem
              key={`${prefix}-${idx}`}
              panel={`${prefix}-${idx}`}
              expanded={expanded}
              onChange={handleChange}
              {...item}
            />
          </AnimateOnScroll>
        </Box>
      ))}
    </>
  );

  return (
    <Box>
      {/* Car Park Info */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        Car Park Information
      </Typography>

      {carParkInfo.map((item, idx) => (
        <Box key={idx} sx={{ mb: 1.25 }}>
          <FAQItem
            panel={`car-${idx}`}
            expanded={expanded}
            onChange={handleChange}
            {...item}
          />
        </Box>
      ))}

      {/* Other Sections */}
      {renderSection(
        "Before You Book",
        beforeYouBook,
        "pre",
        BASE + carParkInfo.length * STEP
      )}

      {renderSection(
        "Booking and Reservation",
        bookingAndReservation,
        "book",
        BASE + (carParkInfo.length + beforeYouBook.length) * STEP
      )}

      {renderSection(
        "Services and Transfers",
        servicesAndTransfers,
        "service",
        BASE +
          (carParkInfo.length +
            beforeYouBook.length +
            bookingAndReservation.length) *
            STEP
      )}
    </Box>
  );
}