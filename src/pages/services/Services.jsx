import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import DirectionsBusRoundedIcon from "@mui/icons-material/DirectionsBusRounded";
import LocalParkingRoundedIcon from "@mui/icons-material/LocalParkingRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";

import HeroSection from "../../components/reusable/HeroSection";
import Seo from "../../components/reusable/Seo";
import PageWrapper from "../../components/reusable/PageWrapper";
import FAQItem from "../../components/reusable/FaqItem";
import AnimateOnScroll from "../../components/reusable/AnimateOnScroll";
import Question from "../home/components/Question";
import theme from "../../theme";
import servicesHero from "../../assets/optimized/airport-parking.webp";
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../components/utils/animation";

const serviceCards = [
  {
    title: "Meet & Greet Parking",
    icon: <HandshakeRoundedIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />,
    description:
      "If convenience is your top priority, Meet & Greet is one of the simplest ways to park before you travel.",
    body:
      "Drive to the terminal area, where a trained driver meets you, takes your vehicle, and parks it securely on your behalf. When you return, your car is brought back to you — ready for a quick exit.",
    bestFor: ["Business travellers", "Families with luggage", "Short trips or tight schedules"],
  },
  {
    title: "Park & Ride Parking",
    icon: <DirectionsBusRoundedIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />,
    description:
      "Park & Ride is a popular choice for travellers looking to keep costs down while still having a reliable service.",
    body:
      "You park your vehicle at a designated location and take a shuttle transfer to the terminal. Transfers usually run frequently and are designed to fit around flight times.",
    bestFor: ["Budget-conscious travellers", "Longer trips", "Flexible travel schedules"],
  },
  {
    title: "Terminal / Short Stay Parking",
    icon: <LocalParkingRoundedIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />,
    description:
      "For those who prefer to stay closer to the terminal, this option offers quick and easy access without needing a transfer.",
    body:
      "You park your car within walking distance and head straight to check-in, making it a practical choice when time is limited.",
    bestFor: ["Short stays", "Business travel", "Minimal walking distance"],
  },
  {
    title: "Long Stay Parking",
    icon: <EventAvailableRoundedIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />,
    description:
      "Ideal for extended trips, long stay parking is designed to offer better value over several days or weeks.",
    body:
      "These parking locations are usually slightly further away but often include transfer options or easy access arrangements.",
    bestFor: ["Holidays and long trips", "Travellers looking for better overall value"],
  },
];

const howItWorks = [
  {
    title: "Search Your Location",
    description: "Enter your travel dates and departure location to view available options.",
    icon: <SearchRoundedIcon sx={{ color: theme.palette.primary.main, fontSize: 30 }} />,
  },
  {
    title: "Compare Services",
    description: "See different parking types, prices, and features in one place.",
    icon: <CompareArrowsRoundedIcon sx={{ color: theme.palette.primary.main, fontSize: 30 }} />,
  },
  {
    title: "Choose What Fits You",
    description: "Select the option that matches your budget and travel needs.",
    icon: <TaskAltRoundedIcon sx={{ color: theme.palette.primary.main, fontSize: 30 }} />,
  },
  {
    title: "Book in Minutes",
    description: "Secure your parking space online before your journey.",
    icon: <CreditScoreRoundedIcon sx={{ color: theme.palette.primary.main, fontSize: 30 }} />,
  },
];

const compareBenefits = [
  "Find better prices by viewing multiple providers",
  "Choose between convenience and cost",
  "Understand transfer times and distance",
  "Read real customer feedback before booking",
];

const whyChooseItems = [
  "Wide range of parking services in one place",
  "Trusted providers across UK and Ireland",
  "Clear pricing with no hidden surprises",
  "Easy comparison and booking process",
  "Options for every budget and travel style",
];

const faqs = [
  {
    q: "Which parking service is the most convenient?",
    a: "Meet & Greet is usually the most convenient as it allows you to go straight to the terminal without parking yourself.",
  },
  {
    q: "What is the cheapest parking option?",
    a: "Park & Ride is often the most affordable, especially for longer stays.",
  },
  {
    q: "Can I choose my parking type before booking?",
    a: "Yes, you can compare and select your preferred parking service during the booking process.",
  },
  {
    q: "Is long stay parking suitable for holidays?",
    a: "Yes, it is designed for extended trips and offers better value over multiple days.",
  },
  {
    q: "Do all parking options include transfers?",
    a: "Not all — transfers are usually included with off-site parking like Park & Ride.",
  },
  {
    q: "Is it better to book parking in advance?",
    a: "Yes, booking early helps secure better prices and ensures availability.",
  },
  {
    q: "Are these parking services secure?",
    a: "Most providers include security features such as monitoring and controlled access.",
  },
];

const renderBulletList = (items) => (
  <List
    sx={{
      py: 0,
      "& .MuiListItem-root": {
        px: 0,
        py: 0.75,
        alignItems: "flex-start",
      },
    }}
  >
    {items.map((item) => (
      <ListItem key={item}>
        <CheckCircleRoundedIcon
          sx={{
            color: theme.palette.primary.main,
            fontSize: 20,
            mt: "2px",
            mr: 1.25,
            flexShrink: 0,
          }}
        />
        <Typography color="text.secondary">{item}</Typography>
      </ListItem>
    ))}
  </List>
);

export default function Services() {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    }),
    []
  );

  useEffect(() => {
    const existingSchema = document.getElementById("services-faq-schema");
    if (existingSchema) existingSchema.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "services-faq-schema";
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const injectedSchema = document.getElementById("services-faq-schema");
      if (injectedSchema) injectedSchema.remove();
    };
  }, [faqSchema]);

  return (
    <>
      <Seo
        title="Airport Parking Services | Meet & Greet, Park & Ride & More"
        description="Compare different airport parking services including Meet & Greet, Park & Ride, and long stay options to find what suits your journey."
        keywords={[
          "airport parking services",
          "meet and greet parking",
          "park and ride parking",
          "short stay parking",
          "long stay parking",
          "compare airport parking services",
        ]}
      />

      <HeroSection
        title="Our Parking Services"
        breadcrumb
        image={servicesHero}
      />

      <PageWrapper>
        <Box sx={{ my: { xs: 5, md: 8 } }}>
          <AnimateOnScroll
            type="zoom-in"
            duration={700}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Typography
              align="center"
              sx={{
                maxWidth: 980,
                mx: "auto",
                color: theme.palette.text.secondary,
                lineHeight: 1.8,
                fontSize: { xs: 15, md: 16 },
              }}
            >
              Choosing the right parking before your trip can make a big difference to how smoothly
              your journey begins. Instead of relying on a single option, comparing multiple parking
              services allows you to find the right balance between convenience, price, and location.
            </Typography>

            <Typography
              align="center"
              sx={{
                maxWidth: 980,
                mx: "auto",
                mt: 2,
                color: theme.palette.text.secondary,
                lineHeight: 1.8,
                fontSize: { xs: 15, md: 16 },
              }}
            >
              At Go Airport Parking, we bring together a wide range of parking services from trusted
              providers across the UK and Ireland. Whether you’re travelling for a short break, a
              business trip, or a longer holiday, you can quickly explore different options and
              select what works best for you.
            </Typography>

            <Typography
              align="center"
              sx={{
                maxWidth: 980,
                mx: "auto",
                mt: 2,
                color: theme.palette.text.secondary,
                lineHeight: 1.8,
                fontSize: { xs: 15, md: 16 },
              }}
            >
              From quick drop-off style services to more budget-friendly alternatives, each parking
              type offers its own advantages depending on your priorities.
            </Typography>
          </AnimateOnScroll>
        </Box>

        <Box sx={{ mb: { xs: 6, md: 9 } }}>
          <AnimateOnScroll
            type="fade-up"
            duration={700}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Typography variant="h2" align="center" sx={{ fontWeight: 700, mb: 4 }}>
              Our Parking Services
            </Typography>
          </AnimateOnScroll>

          <Grid container spacing={3}>
            {serviceCards.map((service, index) => (
              <Grid key={service.title} size={{ xs: 12, md: 6 }}>
                <AnimateOnScroll
                  type="fade-up"
                  duration={700}
                  delay={index * 100}
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                        {service.icon}
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {service.title}
                        </Typography>
                      </Box>

                      <Typography sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                        {service.description}
                      </Typography>

                      <Typography
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.8,
                          mt: 2,
                        }}
                      >
                        {service.body}
                      </Typography>

                      <Divider sx={{ my: 2.5 }} />

                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                        Best for:
                      </Typography>

                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {service.bestFor.map((item) => (
                          <Chip
                            key={item}
                            label={item}
                            sx={{
                              borderRadius: 2,
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </AnimateOnScroll>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: { xs: 6, md: 9 } }}>
          <AnimateOnScroll
            type="fade-up"
            duration={700}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Typography variant="h2" align="center" sx={{ fontWeight: 700, mb: 4 }}>
              How It Works
            </Typography>
          </AnimateOnScroll>

          <Grid container spacing={3}>
            {howItWorks.map((item, index) => (
              <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <AnimateOnScroll
                  type="fade-up"
                  duration={700}
                  delay={index * 100}
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                      textAlign: "center",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                      <Box sx={{ mb: 2 }}>{item.icon}</Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                        {index + 1}. {item.title}
                      </Typography>
                      <Typography sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </AnimateOnScroll>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: { xs: 6, md: 9 } }}>
          <AnimateOnScroll
            type="fade-up"
            duration={700}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Typography variant="h2" align="center" sx={{ fontWeight: 700, mb: 3 }}>
              Compare Parking Services?
            </Typography>

            <Typography
              align="center"
              sx={{
                maxWidth: 900,
                mx: "auto",
                color: theme.palette.text.secondary,
                lineHeight: 1.8,
              }}
            >
              Not all parking options are the same. Comparing helps you:
            </Typography>
          </AnimateOnScroll>

          <Box sx={{ maxWidth: 900, mx: "auto", mt: 2 }}>
            {renderBulletList(compareBenefits)}

            <Typography sx={{ color: theme.palette.text.secondary, lineHeight: 1.8, mt: 1 }}>
              By comparing instead of booking directly, you have more control over your travel plans.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: { xs: 6, md: 9 } }}>
          <AnimateOnScroll
            type="fade-up"
            duration={700}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Typography variant="h2" align="center" sx={{ fontWeight: 700, mb: 4 }}>
              Why Choose Go Airport Parking
            </Typography>
          </AnimateOnScroll>

          <Box sx={{ maxWidth: 900, mx: "auto" }}>
            {renderBulletList(whyChooseItems)}
          </Box>
        </Box>

        <Box sx={{ mb: { xs: 6, md: 9 } }}>
          <Question
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before choosing your airport parking service."
          />

          <Box sx={{ mb: { xs: 6, md: 9 } }}>
  <AnimateOnScroll
    type="fade-up"
    duration={700}
    easingTransform={EASE_SOFT}
    easingOpacity={EASE_SOFT}
    threshold={THRESHOLD}
    rootMargin={ROOT_MARGIN}
    once
    style={smoothStyle}
  >
    <Typography variant="h2" align="center" sx={{ fontWeight: 700, mb: 4 }}>
      FAQs
    </Typography>
  </AnimateOnScroll>

  <Box sx={{ mt: 4 }}>
    {faqs.map((item, index) => (
      <AnimateOnScroll
        key={item.q}
        type="fade-up"
        duration={650}
        delay={index * 60}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        style={smoothStyle}
      >
        <FAQItem
          q={item.q}
          a={item.a}
          expanded={expanded}
          panel={`panel-${index}`}
          onChange={handleChange}
        />
      </AnimateOnScroll>
    ))}
  </Box>
</Box>
        </Box>
      </PageWrapper>
    </>
  );
}