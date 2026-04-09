// HeroSection.jsx
import React from "react";
import { Box, Container, Typography, Link as MUILink } from "@mui/material";
import AnimateOnScroll from "./AnimateOnScroll";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink, useLocation } from "react-router-dom";

const toTitle = (slug = "") =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const HeroSection = React.memo(function HeroSection({
  title,
  subtitle,
  image,
  breadcrumb = false, // ⬅️ new prop
}) {
  const { pathname } = useLocation();
  const segments = React.useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  );

  return (
    <Box
      role="banner"
      aria-label={title}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: { xs: 160, sm: 220, md: 350 },
        color: "#fff",
        textAlign: "center",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45))",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <AnimateOnScroll
          type="slide-up"
          distance={24}
          duration={800}
          delay={0}
          once
          threshold={0}
          rootMargin="0px 0px -20% 0px"
          as="div"
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: 24, sm: 32, md: 40 },
            }}
          >
            {title}
          </Typography>
        </AnimateOnScroll>

        {/* Subtitle or Breadcrumb (same visual space & typography sizing) */}
        {(subtitle || breadcrumb) && (
          <AnimateOnScroll
            type="fade"
            duration={800}
            delay={150}
            once
            threshold={0}
            rootMargin="0px 0px -20% 0px"
            as="div"
          >
            {breadcrumb ? (
              <Box
                component="nav"
                aria-label="breadcrumb"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Breadcrumbs
                  separator=" / "
                  sx={{
                    // match subtitle typography sizing & feel
                    "& .MuiBreadcrumbs-ol": { justifyContent: "center" },
                    typography: {
                      fontSize: { xs: 12, sm: 14, md: 16 },
                    },
                    color: "inherit",
                    opacity: 0.9,
                  }}
                >
                  <MUILink
                    component={RouterLink}
                    to="/"
                    underline="hover"
                    color="inherit"
                    sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
                  >
                    Home
                  </MUILink>

                  {segments.map((seg, idx) => {
                    const isLast = idx === segments.length - 1;
                    const label = toTitle(seg);
                    // Only "Home" clickable per your requirement; all segments are plain text
                    return (
                      <Typography
                        key={idx}
                        sx={{
                          opacity: isLast ? 0.95 : 0.9,
                          fontSize: { xs: 12, sm: 14, md: 16 },
                        }}
                      >
                        {label}
                      </Typography>
                    );
                  })}
                </Breadcrumbs>
              </Box>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  mx: "auto",
                  maxWidth: 900,
                  fontSize: { xs: 12, sm: 14, md: 16 },
                }}
              >
                {subtitle}
              </Typography>
            )}
          </AnimateOnScroll>
        )}
      </Container>
    </Box>
  );
});

export default HeroSection;
