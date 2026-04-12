import React from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import PageWrapper from "../../components/reusable/PageWrapper";
import Seo from "../../components/reusable/Seo";
import AnimateOnScroll from "../../components/reusable/AnimateOnScroll";
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../components/utils/animation";
import theme from "../../theme";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const WhyChooseUs = () => {

  let bullets = [
    {
      title: "Compare a Wide Range of Providers",
      description:
        "Quickly view and compare multiple parking services across UK airports and ports without switching between different websites.",
    },
    {
      title: "Access Competitive & Exclusive Pricing",
      description:
        "Find deals from a mix of providers, including selected partners offering competitive rates not always available elsewhere.",
    },
    {
      title: "Coverage Across Key Travel Locations",
      description:
        "Search parking options near major airports and ports across the UK and Ireland, including international routes.",
    },
    {
      title: "Simple & Transparent Booking Process",
      description:
        "Clear pricing and straightforward booking steps help you understand exactly what you’re paying for.",
    },
    {
      title: "Real Customer Reviews & Insights",
      description:
        "Use genuine traveller feedback to make more informed decisions before confirming your booking.",
    },
    {
      title: "Support When You Need It",
      description:
        "Access responsive customer support to help with bookings, changes, or general queries.",
    }
  ];

  return (
    <>
      <Seo 
        title="Why Choose Go Airport Parking | Compare & Save on Travel Parking"
        description="Discover why Go Airport Parking is a trusted comparison platform. Compare prices, find reliable providers, and book parking with confidence."
        keywords={[
          "why choose go airport parking",
          "best airport parking",
          "trusted parking provider",
          "airport parking benefits",
          "exclusive parking deals"
        ]}
      />

      <PageWrapper>
        <Box sx={{ my: { xs: 3, md: 7 } }}>

          {/* Heading + Description */}
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
              variant="h2"
              align="center"
              sx={{ fontWeight: 700, mb: { xs: 5, md: 7 } }}
            >
              Why Choose Us
            </Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{
                px: 1,
                my: 4,
                color: theme.palette.text.secondary,
                lineHeight: 1.6,
                fontSize: { xs: 14, md: 16 },
              }}
            >
              Finding the right parking before you travel shouldn’t feel confusing or time-consuming. At Go Airport Parking, the goal is simple — to help you compare different options clearly so you can make the right choice without overpaying.Unlike single-provider booking sites, our platform brings together a wide range of parking services across the UK and Ireland, including locations near major travel hubs such as Heathrow Airport, Manchester Airport, and Dublin Airport. This allows you to explore multiple options in one place instead of relying on limited availability from a single source.Whether you’re travelling for business, a family holiday, or a longer trip, different journeys require different types of parking. Some travellers prioritise convenience, while others focus on cost. By comparing options side by side, you can choose what fits your plans best — without compromise.We also work with a mix of independent operators and selected partner providers, giving you access to a broader range of prices and services. This helps create more flexibility, whether you're booking early or closer to your departure date.From short stays to extended trips, the aim is to make the process straightforward — clear pricing, easy comparison, and no unnecessary steps. With everything in one place, you can plan ahead with confidence and focus on your journey rather than the logistics.
            </Typography>
          </AnimateOnScroll>

          {/* Bullet Section */}
          <AnimateOnScroll
            type="zoom-in"
            duration={720}
            delay={40}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mb: 3, fontSize: { xs: 22, md: 32 } }}
            >
              Why Travellers Choose Go Airport Parking
            </Typography>

            <List
              sx={{
                "& .MuiListItem-root": {
                  display: "flex",
                  alignItems: "flex-start",
                  py: 1,
                },
              }}
            >
              {bullets.map((bullet, index) => (
                <ListItem key={index}>
                  <CheckCircleRoundedIcon
                    fontSize="small"
                    sx={{
                      color: theme.palette.primary.main,
                      mt: "4px",
                      mr: 1.5,
                      flexShrink: 0,
                    }}
                  />

                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>
                      {bullet.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 400,
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {bullet.description}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>

          </AnimateOnScroll>
        </Box>
      </PageWrapper>
    </>
  );
};

export default WhyChooseUs;