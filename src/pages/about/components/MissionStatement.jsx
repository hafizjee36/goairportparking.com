// MissionStatement.jsx
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
  "Always put the customer first",
  "Enjoy what you do each day",
  "Form open and honest relationships with effective communication",
  "Build a positive team with a family spirit",
  "Take care of our employees to take care of our customers",
  "Embrace and drive change",
  "Be adventurous, creative and open minded",
  "Pursue growth and learning",
  "Continuously look to improve",
  "Always innovate",
];

export default function MissionStatement() {
  const BASE_DELAY = 140;
  const STEP = 80;

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper }}>
      <PageWrapper>
        <Box sx={{ py: { xs: 6, md: 10 } }}>
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
            {/* Left side: text + list */}
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
                    mb: 3,
                    maxWidth: 720,
                    lineHeight: 1.6,
                  }}
                >
                  Our goal is to offer excellent, secure airport parking at
                  unbeatable prices, and with unrivalled customer service.
                </Typography>
              </AnimateOnScroll>

              <Box sx={{ mt: 1 }}>
                {POINTS.map((text, idx) => (
                  <AnimateOnScroll
                    key={idx}
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
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 1.2,
                      }}
                    >
                      <CheckCircleRoundedIcon
                        fontSize="small"
                        sx={{
                          color: theme.palette.primary.main,
                          mt: "2px",
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          ml: 1,
                          color: theme.palette.text.secondary,
                          lineHeight: 1.7,
                        }}
                      >
                        {text}
                      </Typography>
                    </Box>
                  </AnimateOnScroll>
                ))}
              </Box>
            </Grid>

            {/* Right side: single image */}
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
