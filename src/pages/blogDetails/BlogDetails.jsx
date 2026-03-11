// BlogDetails.jsx
import HeroSection from "../../components/reusable/HeroSection";
import blogImage from "../../assets/optimized/blog.webp";
import PageWrapper from "../../components/reusable/PageWrapper";
import theme from "../../theme";

import { Box, Typography, Stack, Avatar, Grid, Chip } from "@mui/material";

import { Link, useParams, Navigate } from "react-router-dom";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import { blogPosts } from "../../assets/data";
import RichHtml from "../../components/utils/RichText";
import RelatedPosts from "./components/RelatedPosts";
import AnimateOnScroll from "../../components/reusable/AnimateOnScroll";
import advertisement from "../../assets/optimized/advertisement.webp";

import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../components/utils/animation";

export default function BlogDetails() {
  const { id } = useParams();
  const post = blogPosts.find((p) => String(p.id) === String(id));
  if (!post) return <Navigate to="/blog" replace />;

  const popular = blogPosts.filter((p) => p.id !== post.id);

  const BASE = 80;
  const STEP = 110;

  return (
    <>
      <HeroSection title="Blog Details" breadcrumb image={blogImage} />

      <Box sx={{ backgroundColor: theme.palette.background.default, py: 4 }}>
        <PageWrapper>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 8 }}>
              <AnimateOnScroll
                type="zoom-in"
                duration={900}
                delay={40}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, lineHeight: 1.3, mb: 2 }}
                >
                  {post.title}
                </Typography>
              </AnimateOnScroll>

              <AnimateOnScroll
                type="fade"
                duration={750}
                delay={BASE}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ color: "text.secondary", mb: 3 }}
                >
                  <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>
                    {(post.author || "U")[0]}
                  </Avatar>
                  <Typography variant="body2">By {post.author}</Typography>

                  <Box
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      bgcolor: "text.disabled",
                    }}
                  />

                  <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} />
                  <Typography variant="body2">{post.date}</Typography>
                </Stack>
              </AnimateOnScroll>

              <AnimateOnScroll
                type="fade"
                duration={900}
                delay={BASE + 100}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <RichHtml html={post.blogHtml} />
              </AnimateOnScroll>
            </Grid>

            {/* RIGHT: Popular posts */}
            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{
                borderLeft: { md: 1, xs: 0 },
                borderColor: theme.palette.divider,
                pl: { md: 3 },
                mt: { xs: 4, md: 0 },
              }}
            >
              <AnimateOnScroll
                type="slide-right"
                distance={24}
                duration={850}
                delay={100}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
                  Popular Posts
                </Typography>
              </AnimateOnScroll>

              <Stack spacing={2.5}>
                {popular.map((p, i) => (
                  <AnimateOnScroll
                    key={p.id}
                    type="slide-right"
                    distance={22}
                    duration={850}
                    delay={BASE + i * STEP}
                    easingTransform={EASE_SOFT}
                    easingOpacity={EASE_SOFT}
                    threshold={THRESHOLD}
                    rootMargin={ROOT_MARGIN}
                    once
                    style={smoothStyle}
                  >
                    <Stack
                      component={Link}
                      to={p.href || `/blog/${p.id}`}
                      direction="row"
                      spacing={1.5}
                      sx={{
                        textDecoration: "none",
                        color: "inherit",
                        alignItems: "center",
                      }}
                    >
                      {/* Thumb */}
                      <Box
                        sx={{
                          width: 84,
                          height: 60,
                          borderRadius: 2,
                          overflow: "hidden",
                          flexShrink: 0,
                          "& img": {
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            transition: `transform .35s ${EASE_SOFT}`,
                            transform: "translateZ(0)",
                            willChange: "transform",
                          },
                          "&:hover img": { transform: "scale(1.05)" },
                        }}
                      >
                        <Box component="img" src={p.image} alt={p.title} />
                      </Box>

                      {/* Title + meta */}
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: 14,
                            lineHeight: 1.35,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            mb: 0.5,
                          }}
                        >
                          {p.title}
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ color: "text.secondary" }}
                        >
                          <Avatar sx={{ width: 18, height: 18, fontSize: 10 }}>
                            {(p.author || "U")[0]}
                          </Avatar>
                          <Typography variant="caption">
                            By {p.author}
                          </Typography>
                          <CalendarMonthOutlinedIcon sx={{ fontSize: 14 }} />
                          <Typography variant="caption">{p.date}</Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </AnimateOnScroll>
                ))}
              </Stack>

              {/* === Advertisement Section (image in a box) === */}
              <AnimateOnScroll
                type="fade"
                duration={750}
                delay={BASE + popular.length * STEP + 40}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Box sx={{ mt: 4 }}>
                  <Box
                    component="img"
                    src={advertisement}
                    alt="Advertisement"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: 2, // optional; remove if you want sharp corners
                    }}
                  />
                </Box>
              </AnimateOnScroll>

              <AnimateOnScroll
                type="fade"
                duration={700}
                delay={BASE + popular.length * STEP + 80}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Box sx={{ mt: 4 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 800, mb: 2 }}
                  >
                    Related Topics
                  </Typography>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}>
                    {[
                      "Airport Guides",
                      "Airport Parking",
                      "Business Travel",
                      "Editor's Picks",
                      "Flight Tips",
                      "Expert Guides",
                      "Health & Wellbeing",
                      "Manchester Airport",
                      "Travel Deals",
                      "Travel Destinations",
                      "Travel News",
                      "Travel Tips",
                    ].map((t) => (
                      <Chip
                        key={t}
                        label={t}
                        sx={{
                          borderRadius: "999px",
                          bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                              ? "grey.800"
                              : "grey.200",
                          color: "text.primary",
                          fontWeight: 600,
                          "& .MuiChip-label": { px: 1.5, py: 0.75 },
                          "&:hover": {
                            cursor: "pointer",
                            bgcolor: (theme) =>
                              theme.palette.mode === "dark"
                                ? "grey.700"
                                : "grey.300",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </AnimateOnScroll>
            </Grid>
          </Grid>
        </PageWrapper>
      </Box>

      <Box sx={{ backgroundColor: theme.palette.background.paper, py: 4 }}>
        <PageWrapper>
          <RelatedPosts />
        </PageWrapper>
      </Box>
    </>
  );
}
