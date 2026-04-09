import * as React from "react"; // ⬅️ add this
import { Box, Grid, Typography } from "@mui/material";
import theme from "../../../theme";
import PageWrapper from "../../../components/reusable/PageWrapper";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import CustomButton from "../../../components/reusable/CustomButton";

import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../../components/utils/animation";

const options = [
  {
    title: "Park and Ride",
    description:
      "Lowest priced option for parking your car. With Park & Ride, you park your car in a car park near to...",
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "On-Site",
    description:
      "Closest parking to the port. On-site parking is usually the closest parking to the port terminal. A...",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Meet & Greet",
    description:
      "The easiest airport car parking option. Drive to your port terminal, meet a fully insured chauffeur,...",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Hotels & Parking",
    description:
      "A rapidly growing popular choice. If you have an early flight or want to fully relax before your tri...",
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function ParkingOptions() {
  const BASE_DELAY = 100;
  const STEP = 100;

  // ⬇️ NEW: which cards are expanded
  const [expanded, setExpanded] = React.useState({});

  // ⬇️ NEW: clamp styles
  const collapsedClamp = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };
  const expandedClamp = {
    display: "-webkit-box",
    WebkitLineClamp: 6, // show a bit more when expanded
    WebkitBoxOrient: "vertical",
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <PageWrapper>
        <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 6 } }}>
          {/* Section Heading */}
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
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, textAlign: "center", mb: 5 }}
            >
              The Parking Options To Choose From
            </Typography>
          </AnimateOnScroll>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {options.map((option, i) => {
              const isExpanded = !!expanded[i];

              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={option.title}>
                  {/* Card wrapper animation */}
                  <AnimateOnScroll
                    type="slide-up"
                    distance={22}
                    duration={720}
                    delay={BASE_DELAY + i * STEP}
                    easingTransform={EASE_SOFT}
                    easingOpacity={EASE_SOFT}
                    threshold={THRESHOLD}
                    rootMargin={ROOT_MARGIN}
                    once
                    style={smoothStyle}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      {/* Image wrapper (clip + hover target) */}
                      <Box
                        sx={{
                          width: "100%",
                          height: 180,
                          borderRadius: "12px",
                          overflow: "hidden",
                          mb: 2,
                          position: "relative",
                          "&:hover .card-img": { transform: "scale(1.2)" },
                        }}
                      >
                        <Box
                          component="img"
                          src={option.image}
                          alt={option.title}
                          className="card-img"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            transition: `transform 300ms ${EASE_SOFT}`,
                            willChange: "transform",
                            transform: "translateZ(0)",
                          }}
                        />
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        {option.title}
                      </Typography>

                      {/* Description (clamped when collapsed) */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          flexGrow: 1,
                          mb: 1.5,
                          ...(isExpanded ? expandedClamp : collapsedClamp),
                        }}
                      >
                        {option.description}
                      </Typography>

                      {/* Toggle button */}
                      <CustomButton
                        variant="text"
                        onClick={() =>
                          setExpanded((prev) => ({ ...prev, [i]: !prev[i] }))
                        }
                        sx={{
                          alignSelf: "flex-start",
                          p:0,
                          fontWeight: 600,
                        }}
                      >
                        {isExpanded ? "Read less" : "Read more"}
                      </CustomButton>
                    </Box>
                  </AnimateOnScroll>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </PageWrapper>
    </Box>
  );
}
