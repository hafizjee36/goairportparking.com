// RelatedPosts.jsx
import { useState, useEffect } from 'react';
import { Box, Typography, Stack, Avatar, Button, Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { blogPosts } from "../../../assets/data";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import { blogService } from "../../../services/blogService.js";

import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../../components/utils/animation";

export default function RelatedPosts() {
  const [related, setRelated] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
        const loadBlogDetails = async () => {
          try {
            // Fetch popular posts list (exclude current slug)
            const blogsResponse = await blogService.fetchBlogs('trending-blog-card');
            const allBlogs = blogsResponse.data || [];
            const filteredBlogs = allBlogs.filter(blog => !blog.airport_id || blog.airport_id === '' || blog.airport_id === null);
            const filteredRelated = filteredBlogs.filter(p => p.url_slug !== slug).slice(0, 5);
            // console.log('seRelated: ',filteredRelated)
            setRelated(filteredRelated);
            
          } catch (err) {
            console.error('Failed to fetch blog details:', err);
            setError(err.message || 'Failed to load blog post');
          }
        };
  
        if (slug) {
          loadBlogDetails();
        }
      }, [slug]);

  if (related.length === 0) return null;

  const BASE = 80; // initial delay
  const STEP = 110; // stagger between left rows
  const ROW_DURATION = 900;
  const ROW_DISTANCE = 24;

  return (
    <Box sx={{ mt: 6 }}>
      <AnimateOnScroll
        type="zoom-in"
        duration={880}
        delay={40}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        style={smoothStyle}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
          Related Posts
        </Typography>
      </AnimateOnScroll>

      <Grid container spacing={4}>
        {/* Left column: two stacked rows */}
        <Grid size={{ xs: 12, md: 12 }}>
          {related.map((post, i) => (
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
                to={`/blog/${post.url_slug}`}
                container
                spacing={3}
                alignItems="center"
                sx={{
                  mb: { xs: 3, md: 5 },
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {/* thumb */}
                <Grid size={{ xs: 12, sm: 5 }}>
                  <Box
                    sx={{
                      overflow: "hidden",
                      borderRadius: 3,
                      height: { xs: 160, sm: 200 },
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      "& img": {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: `transform .4s ${EASE_SOFT}`,
                        transform: "translateZ(0)",
                        willChange: "transform",
                      },
                      "&:hover img": { transform: "scale(1.05)" },
                    }}
                  >
                    <img src={post.featured_image||post.image} alt={post.title}  loading="lazy" />
                  </Box>
                </Grid>

                {/* text */}
                <Grid size={{ xs: 12, sm: 7 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.35,
                      mb: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1.25}
                    alignItems="center"
                    sx={{ mb: 2, color: "text.secondary" }}
                  >
                    <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} />
                    <Typography variant="body2">{new Date(post.created_at).toLocaleDateString()}</Typography>
                  </Stack>

                  <Button
                    component="span"
                    variant="contained"
                    disableElevation
                    sx={{
                      textTransform: "none",
                      px: 2.5,
                      py: 1,
                      fontWeight: 600,
                      backgroundColor: "primary.main",
                      "&:hover": { backgroundColor: "success.dark" },
                    }}
                  >
                    Read More
                  </Button>
                </Grid>
              </Grid>
            </AnimateOnScroll>
          ))}
        </Grid>

        {/* Right column: one large featured card */}
        {/* {featured && (
          <Grid size={{ xs: 12, md: 5 }}>
            <AnimateOnScroll
              type="slide-right"
              distance={26}
              duration={920}
              delay={BASE + side.length * STEP}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <Box
                component={Link}
                to={`/blog/${featured.id}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <Box
                  sx={{
                    overflow: "hidden",
                    borderRadius: 3,
                    height: { xs: 220, md: 300 },
                    mb: 1.5,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                    "& img": {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: `transform .4s ${EASE_SOFT}`,
                      transform: "translateZ(0)",
                      willChange: "transform",
                    },
                    "&:hover img": { transform: "scale(1.05)" },
                  }}
                >
                  <img src={featured.image} alt={featured.title}  loading="lazy" />
                </Box>

                <Typography sx={{ fontWeight: 800, mb: 1 }}>
                  {featured.title}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1.25}
                  alignItems="center"
                  sx={{ mb: 2, color: "text.secondary" }}
                >
                  <Avatar sx={{ width: 26, height: 26, fontSize: 12 }}>
                    {(featured.author || "U")[0]}
                  </Avatar>
                  <Typography variant="body2">By {featured.author}</Typography>
                  <Box
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      bgcolor: "text.disabled",
                    }}
                  />
                  <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} />
                  <Typography variant="body2">{featured.date}</Typography>
                </Stack>

                <Button
                  component="span"
                  variant="contained"
                  disableElevation
                  sx={{
                    textTransform: "none",
                    px: 2.5,
                    py: 1,
                    fontWeight: 600,
                    backgroundColor: "primary.main",
                    "&:hover": { backgroundColor: "success.dark" },
                  }}
                >
                  Read More
                </Button>
              </Box>
            </AnimateOnScroll>
          </Grid>
        )} */}
      </Grid>
    </Box>
  );
}
