import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Link } from "react-router-dom";
import CustomButton from "../../../components/reusable/CustomButton";
import { blogPosts } from "../../../assets/data";
import theme from "../../../theme";
import PageWrapper from "../../../components/reusable/PageWrapper";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";

// shared animation utils
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../../components/utils/animation";

export default function TrendingBlogCard() {
  const CARD_HEIGHT = { xs: 380, md: 420 };
  const IMAGE_HEIGHT = 250;

  const trendingPosts = blogPosts.filter((p) => p.isTrending);

  // Slower, cinematic timings
  const BASE_DELAY = 150; // initial pause before first card
  const STEP = 140; // stagger between cards
  const DURATION = 1100; // longer glide
  const DISTANCE = 30; // more travel

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <PageWrapper>
        <Box sx={{ py: 5 }}>
          {/* Heading: slower zoom */}
          <AnimateOnScroll
            type="zoom-in"
            duration={1000}
            delay={100}
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
              Trending Today’s
            </Typography>
          </AnimateOnScroll>

          <Grid container spacing={3}>
            {trendingPosts.length > 0 ? (
              trendingPosts.map((p, i) => (
                <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  {/* Card: slower slide-up with wider stagger */}
                  <AnimateOnScroll
                    type="slide-up"
                    distance={DISTANCE}
                    duration={DURATION}
                    delay={BASE_DELAY + i * STEP}
                    easingTransform={EASE_SOFT}
                    easingOpacity={EASE_SOFT}
                    threshold={THRESHOLD}
                    rootMargin={ROOT_MARGIN}
                    once
                    style={smoothStyle}
                  >
                    <Box
                      component={Link}
                      to={`/blog/${p.id}`}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: CARD_HEIGHT,
                        textDecoration: "none",
                        color: "inherit",
                        // tiny lift on hover without layout shift
                        transition: `transform 240ms ${EASE_SOFT}`,
                        willChange: "transform, opacity",
                        transform: "translateZ(0)",
                        contain: "layout paint size style",
                        "&:hover": {
                          transform: "translateZ(0) translateY(-2px)",
                        },
                      }}
                    >
                      {/* Fixed-height image wrapper */}
                      <Box
                        sx={{
                          overflow: "hidden",
                          borderRadius: "16px",
                          height: IMAGE_HEIGHT,
                        }}
                      >
                        <Box
                          component="img"
                          src={p.image}
                          alt={p.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            transformOrigin: "center center",
                            transform: "translateZ(0)",
                            willChange: "transform",
                            transition: `transform 360ms ${EASE_SOFT}`,
                            "&:hover": {
                              transform: "translateZ(0) scale(1.08)",
                            },
                          }}
                        />
                      </Box>

                      {/* Content fills remaining space; button sticks to bottom */}
                      <Box
                        sx={{
                          mt: 2,
                          px: 1,
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{
                            lineHeight: 1.35,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {p.title}
                        </Typography>

                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1.25}
                          sx={{ my: 2 }}
                        >
                          <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>
                            H
                          </Avatar>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            By {p.author}
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
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {p.date}
                          </Typography>
                        </Stack>

                        <CustomButton
                          component="span" // avoid nested link semantics
                          variant="contained"
                          sx={{
                            mt: "auto",
                            alignSelf: "flex-start",
                            px: 2.5,
                            py: 1,
                            fontWeight: 600,
                            borderRadius: 2,
                            backgroundColor: "primary.main",
                            "&:hover": { backgroundColor: "#159244" },
                          }}
                        >
                          Read More
                        </CustomButton>
                      </Box>
                    </Box>
                  </AnimateOnScroll>
                </Grid>
              ))
            ) : (
              <Grid size={{ xs: 12 }}>
                <AnimateOnScroll
                  type="fade"
                  duration={900}
                  delay={BASE_DELAY}
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <Typography color="text.secondary">
                    No trending blogPosts right now.
                  </Typography>
                </AnimateOnScroll>
              </Grid>
            )}
          </Grid>
        </Box>
      </PageWrapper>
    </Box>
  );
}
