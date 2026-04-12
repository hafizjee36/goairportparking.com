import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import MISSION_IMG from "../../../assets/optimized/mission-statement.webp";
import theme from "../../../theme";
import PageWrapper from "../../../components/reusable/PageWrapper";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../../components/utils/animation";

const POINTS = [
  {
    title: "Always put the customer first",
    desc: "We focus on delivering a smooth and reliable experience, helping travellers find the best parking options with ease and confidence.",
  },
  {
    title: "Enjoy what you do each day",
    desc: "We bring passion to our work, ensuring every customer receives a positive and helpful experience when comparing and booking parking.",
  },
  {
    title: "Build honest and transparent relationships",
    desc: "We believe in clear communication with customers and partners, creating trust through accurate information and reliable service.",
  },
  {
    title: "Create a strong team culture",
    desc: "We work together like a family, supporting each other to provide a better experience for every traveller.",
  },
  {
    title: "Take care of our people to serve customers better",
    desc: "We value our team and partners, knowing that great service starts with a motivated and supported workforce.",
  },
  {
    title: "Embrace and drive positive change",
    desc: "We continuously improve our platform and services to make parking comparison faster, easier, and more efficient.",
  },
  {
    title: "Be creative, open-minded, and forward-thinking",
    desc: "We explore new ideas and smarter solutions to enhance user experience and simplify the booking process.",
  },
  {
    title: "Focus on growth and learning",
    desc: "We constantly learn and evolve to stay ahead in the parking comparison industry and better serve our users.",
  },
  {
    title: "Never stop improving",
    desc: "We regularly refine our platform to offer more accurate results, better deals, and a smoother experience.",
  },
  {
    title: "Always innovate",
    desc: "We aim to bring new features and smarter technology to make finding parking more convenient than ever.",
  },
];

export default function MissionStatement() {
  const BASE_DELAY = 140;
  const STEP = 80;

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper }}>
      <PageWrapper>
        <Box sx={{ py: { xs: 6, md: 10 } }}>
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <AnimateOnScroll
                type="zoom-in"
                duration={720}
                delay={0}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                  Mission Statement
                </Typography>
              </AnimateOnScroll>

              <AnimateOnScroll
                type="fade"
                duration={680}
                delay={110}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontStyle: "italic",
                    color: theme.palette.text.secondary,
                    mb: 1,
                  }}
                >
                  “To Provide Pride, Passion and Peace of Mind”
                </Typography>
              </AnimateOnScroll>

              <AnimateOnScroll
                type="slide-up"
                distance={18}
                duration={720}
                delay={160}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 4,
                    maxWidth: 720,
                    lineHeight: 1.6,
                  }}
                >
                  Our mission is to deliver a reliable and stress-free parking
                  experience by helping travellers find secure, affordable
                  parking near major UK airports and Dublin. We are committed to
                  providing great value, trusted service, and complete peace of
                  mind from booking to return. At Go Airport Parking, we focus
                  on creating a customer-first experience built on trust,
                  transparency, and convenience. We aim to make it simple to
                  compare parking options, save money, and book with confidence,
                  no matter where your journey begins.
                </Typography>
              </AnimateOnScroll>

              <Grid container spacing={2}>
                {POINTS.map((item, idx) => (
                  <Grid key={idx} size={{ xs: 12, sm: 6 }}>
                    <AnimateOnScroll
                      type="fade"
                      duration={600}
                      delay={BASE_DELAY + idx * STEP}
                      easingTransform={EASE_SOFT}
                      easingOpacity={EASE_SOFT}
                      threshold={THRESHOLD}
                      rootMargin={ROOT_MARGIN}
                      once
                      as="div"
                      style={smoothStyle}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          p: 2,
                          borderRadius: 3,
                          border: "1px solid",
                          borderColor: "divider",
                          backgroundColor: theme.palette.background.default,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                            borderColor: theme.palette.primary.light,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          <CheckCircleRoundedIcon
                            sx={{
                              color: theme.palette.primary.main,
                              mt: "2px",
                              flexShrink: 0,
                              fontSize: 22,
                            }}
                          />

                          <Box sx={{ ml: 1.2 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 700,
                                color: theme.palette.text.primary,
                                lineHeight: 1.45,
                                mb: 0.6,
                              }}
                            >
                              {item.title}
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{
                                color: theme.palette.text.secondary,
                                lineHeight: 1.65,
                              }}
                            >
                              {item.desc}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </AnimateOnScroll>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <AnimateOnScroll
                type="slide-right"
                distance={26}
                duration={760}
                delay={120}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Box
                  component="img"
                  src={MISSION_IMG}
                  alt="Mission"
                  sx={{
                    width: "100%",
                    maxWidth: 420,
                    height: "auto",
                    display: "block",
                    mx: { xs: "auto", md: 0 },
                  }}
                />
              </AnimateOnScroll>
            </Grid>
          </Grid>
        </Box>
      </PageWrapper>
    </Box>
  );
}