import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomButton from "../reusable/CustomButton.jsx";
import { blogService } from "../../services/blogService.js";
import theme from "../../theme";
import PageWrapper from "../reusable/PageWrapper";
import AnimateOnScroll from "../reusable/AnimateOnScroll";
import Skeleton from '@mui/material/Skeleton';

// shared animation utils
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../components/utils/animation";

export default function AirportBlogSection({ airportSlug }) {
  const CARD_HEIGHT = { xs: 380, md: 420 };
  const IMAGE_HEIGHT = 250;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  airportSlug = (airportSlug).split('-')[0];
  console.log('airportSlug: ',airportSlug);

  useEffect(() => {
    if (!airportSlug || typeof airportSlug !== 'string') {
      console.warn('Invalid airportSlug:', airportSlug);
      setLoading(false);
      return;
    }
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogService.fetchBlogs('airport-blogs'); // or same endpoint
        console.log('Full API Response:', response);
        const data = Array.isArray(response.data) ? response.data : [];
        // Filter blogs for THIS specific airport
        const normalize = s =>(s || '').toString().trim().replace(/\s+/g, ' ').toLowerCase();
        const filteredBlogs = data.filter(blog => blog && normalize(blog.airport_code) === airportSlug);
        console.log('Filtered airport blogs for', airportSlug, filteredBlogs);
        setBlogs(filteredBlogs);
      } catch (err) {
        console.error('Error fetching airport blogs:', err);
        setError('Failed to load articles');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [airportSlug]);

  // Same animation timings
  const BASE_DELAY = 150;
  const STEP = 140;
  const DURATION = 1100;
  const DISTANCE = 30;

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <PageWrapper>
        <Box sx={{ py: 5 }}>
          {/* Updated Heading */}
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
              Related Airport Articles
            </Typography>
          </AnimateOnScroll>

          {loading ? (
            <Grid container spacing={3}>
              {[...Array(3)].map((_, i) => (
                <Grid key={`skeleton-${i}`} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box sx={{ height: CARD_HEIGHT }}>
                    <Skeleton variant="rectangular" height={IMAGE_HEIGHT} sx={{ borderRadius: '16px' }} />
                    <Box sx={{ mt: 2, px: 1 }}>
                      <Skeleton width="80%" height={24} />
                      <Skeleton width="60%" height={16} sx={{ mt: 1 }} />
                      <Skeleton width="40%" height={16} sx={{ mt: 1 }} />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={3}>
              {blogs.length > 0 ? (
                blogs.map((p, i) => (
                  <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
                        to={`/blog/${p.url_slug || p.id}`}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          height: CARD_HEIGHT,
                          textDecoration: "none",
                          color: "inherit",
                          transition: `transform 240ms ${EASE_SOFT}`,
                          willChange: "transform, opacity",
                          transform: "translateZ(0)",
                          contain: "layout paint size style",
                          "&:hover": {
                            transform: "translateZ(0) translateY(-2px)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            overflow: "hidden",
                            borderRadius: "16px",
                            height: IMAGE_HEIGHT,
                          }}
                        >
                          <Box
                            component="img"
                            src={p.featured_image}
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
                            <CalendarMonthOutlinedIcon
                              sx={{ fontSize: 18, color: "text.secondary" }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              {new Date(p.created_at).toLocaleDateString()}
                            </Typography>
                          </Stack>
                          <Typography
                            variant="p"
                            sx={{
                              lineHeight: 1.35,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              mb: 2
                            }}
                          >
                            <div dangerouslySetInnerHTML={{ __html: p.short_description }} />
                          </Typography>

                          <CustomButton
                            component="span"
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
                    <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                      No articles for {airportSlug} airport yet. Check back soon!
                    </Typography>
                  </AnimateOnScroll>
                </Grid>
              )}
            </Grid>
          )}
        </Box>
      </PageWrapper>
    </Box>
  );
}

AirportBlogSection.propTypes = {
  airportSlug: PropTypes.string,
};

AirportBlogSection.defaultProps = {
  airportSlug: '',
};

