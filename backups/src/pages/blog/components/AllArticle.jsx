import { Box, Grid, Typography, Stack, Avatar } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import flight from "../../../assets/optimized/blog-flight.webp";
import { Link } from "react-router-dom";
import theme from "../../../theme";
import { blogPosts } from "../../../assets/data";
import { useState } from "react";
import CustomButton from "../../../components/reusable/CustomButton";
import PageWrapper from "../../../components/reusable/PageWrapper";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";

import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../../components/utils/animation";

export default function AllArticles() {
  const [expanded, setExpanded] = useState(false);
  const VISIBLE_INIT = 2;

  const visiblePosts = expanded ? blogPosts : blogPosts.slice(0, VISIBLE_INIT);
  const hasMore = blogPosts.length > VISIBLE_INIT;

  // animation timing
  const BASE = 100;     // initial delay for first row
  const STEP = 110;     // stagger between rows
  const ROW_DURATION = 900;
  const ROW_DISTANCE = 26;

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper }}>
      <PageWrapper>
        <Box sx={{ py: 5 }}>
          {/* Heading */}
          <AnimateOnScroll
            type="zoom-in"
            duration={900}
            delay={60}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ mb: 3, letterSpacing: 0.2 }}
            >
              All Articles
            </Typography>
          </AnimateOnScroll>

          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 7 }}>
              {visiblePosts.map((post, i) => (
                <AnimateOnScroll
                  key={post.id}
                  type="slide-up"
                  distance={ROW_DISTANCE}
                  duration={ROW_DURATION}
                  delay={BASE + i * STEP}
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <Grid
                    component={Link}
                    to={`${post.id}`}
                    container
                    spacing={3}
                    alignItems="center"
                    sx={{
                      mb: { xs: 3, md: 5 },
                      textDecoration: "none",
                      color: "inherit",
                      willChange: "transform, opacity",
                      transform: "translateZ(0)",
                    }}
                  >
                    {/* Image */}
                    <Grid size={{ xs: 12, sm: 6, md: 7 }}>
                      <Box
                        sx={{
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: 3,
                          height: { xs: 180, sm: 220 },
                          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          cursor: "pointer",
                          "& img": {
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: `transform .4s ${EASE_SOFT}`,
                            display: "block",
                            transform: "translateZ(0)",
                            willChange: "transform",
                          },
                          "&:hover img": { transform: "scale(1.05)" },
                        }}
                      >
                        <img src={post.image} alt={post.title} loading="lazy" />
                      </Box>
                    </Grid>

                    {/* Text + meta + CTA */}
                    <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: theme.palette.text.primary,
                          mb: 1.5,
                        }}
                      >
                        {post.title}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1.25}
                        alignItems="center"
                        sx={{ mb: 2 }}
                      >
                        <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>
                          {(post.author || "?")[0]}
                        </Avatar>
                        <Typography variant="body2" color="text.secondary">
                          By {post.author}
                        </Typography>
                        <Box
                          sx={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            bgcolor: "text.disabled",
                          }}
                        />
                        <CalendarMonthOutlinedIcon
                          sx={{ fontSize: 18, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {post.date}
                        </Typography>
                      </Stack>

                      <CustomButton
                        component="span" // keep the row as the only link
                        variant="contained"
                        sx={{
                          px: 2.5,
                          py: 1,
                          fontWeight: 600,
                          backgroundColor: "primary.main",
                          "&:hover": { backgroundColor: "#159244" },
                        }}
                      >
                        Read More
                      </CustomButton>
                    </Grid>
                  </Grid>
                </AnimateOnScroll>
              ))}

              {/* More / Collapse button */}
              {hasMore && (
                <AnimateOnScroll
                  type="fade"
                  duration={600}
                  delay={BASE + visiblePosts.length * STEP + 80}
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <Box sx={{ display: "flex", justifyContent: "start", mt: 1 }}>
                    <CustomButton
                      onClick={() => setExpanded((v) => !v)}
                      aria-expanded={expanded}
                      variant="outlined"
                      endIcon={
                        <ExpandMoreIcon
                          sx={{
                            transition: `transform 250ms ${EASE_SOFT}`,
                            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        />
                      }
                      sx={{ px: 2.5, py: 1 }}
                    >
                      {expanded ? "Collapse" : "More"}
                    </CustomButton>
                  </Box>
                </AnimateOnScroll>
              )}
            </Grid>

            {/* Right side image */}
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <AnimateOnScroll
                type="slide-right"
                distance={24}
                duration={880}
                delay={120}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Box sx={{ overflow: "hidden" }}>
                  <Box
                    component="img"
                    src={flight}
                    alt="Article image"
                    sx={{
                      borderRadius: 4,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
              </AnimateOnScroll>
            </Grid>
          </Grid>
        </Box>
      </PageWrapper>
    </Box>
  );
}
