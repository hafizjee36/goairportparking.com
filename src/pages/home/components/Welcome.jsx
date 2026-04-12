import { Box, Grid, Typography, Stack } from "@mui/material";
import { keyframes } from "@mui/system";
import { useState, useMemo, memo } from "react";
import welcome from "../../../assets/optimized/welcome.webp";
import PageWrapper from "../../../components/reusable/PageWrapper";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import { EASE_SOFT } from "../../../components/utils/animation";

import global from "../../../assets/optimized/global.webp";
import customers from "../../../assets/optimized/customers.webp";
import location from "../../../assets/optimized/location.webp";
import business from "../../../assets/optimized/business.webp";
import award from "../../../assets/optimized/award.webp";
import theme from "../../../theme";

function Stat({ iconSrc, alt, text }) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      sx={{
        px: 2,
        py: 1.5,
        borderRadius: 2,
        minWidth: { xs: 220, sm: 260 },
        userSelect: "none",
        whiteSpace: "nowrap",
        bgcolor: "transparent",
      }}
    >
      {/* Icon image only — no background circle */}
      <Box
        component="img"
        src={iconSrc}
        alt={alt}
        sx={{
          width: { xs: 22, sm: 24, md: 26 },
          height: { xs: 22, sm: 24, md: 26 },
          objectFit: "contain",
          display: "block",
          flexShrink: 0,
        }}
      />

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontWeight: 600 }}
      >
        {text}
      </Typography>
    </Stack>
  );
}

function StatsCarouselAuto() {
  const baseItems = useMemo(
    () => [
      { iconSrc: global, alt: "Global reach", text: "100K+ Global Customers" },
      {
        iconSrc: customers,
        alt: "Happy customers",
        text: "100K+ Happy Customers",
      },
      {
        iconSrc: location,
        alt: "Parking locations",
        text: "30+ Parking Locations",
      },
      {
        iconSrc: business,
        alt: "competitive pricing",
        text: "Highly competitive Pricing",
      },
      { iconSrc: award, alt: "Awards", text: "Award-Winning Services" },
    ],
    []
  );

  // duplicate for seamless loop
  const items = [...baseItems, ...baseItems];

  const marquee = keyframes`
    from { transform: translate3d(0,0,0); }
    to   { transform: translate3d(-50%,0,0); }
  `;

  const [paused, setPaused] = useState(false);
  const pauseHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onTouchStart: () => setPaused(true),
    onTouchEnd: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <Box
        tabIndex={0}
        role="region"
        aria-label="Statistics carousel"
        {...pauseHandlers}
        sx={{
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "max-content",
            animation: `${marquee} 45s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
            "@media (prefers-reduced-motion: reduce)": { animation: "none" },
          }}
        >
          {items.map((it, i) => (
            <Stat
              key={`${it.text}-${i}`}
              iconSrc={it.iconSrc}
              alt={it.alt}
              text={it.text}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function Welcome() {
  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <PageWrapper>
        <Grid
          container
          columnSpacing={{ md: 6 }}
          rowSpacing={{ xs: 4, md: 0 }}
          alignItems="center"
        >
          {/* Text column — smooth slide up */}
          <Grid size={{ sm: 12, md: 6 }}>
            <AnimateOnScroll
              type="slide-up"
              duration={1700}
              delay={0}
              distance={24}
              threshold={0.3}
              rootMargin="0px 0px -15% 0px"
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, my: 4, lineHeight: 1.15 }}
              >
                Welcome to Go Airport Parking — Compare the Best Airport & Port Parking Deals in the UK
              </Typography>
            </AnimateOnScroll>

            <AnimateOnScroll
              type="slide-up"
              duration={1850}
              delay={140}
              distance={24}
              threshold={0.3}
              rootMargin="0px 0px -15% 0px"
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
            >
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.75, mb: 2 }}
              >
                Go Airport Parking is a trusted comparison platform designed to help you
                find the best airport and port parking deals across the UK and beyond. We
                work with carefully selected, fully approved parking providers to offer a
                wide choice of secure and affordable options tailored to every traveller’s
                needs.
              </Typography>
            </AnimateOnScroll>

            <AnimateOnScroll
              type="slide-up"
              duration={2000}
              delay={280}
              distance={24}
              threshold={0.3}
              rootMargin="0px 0px -15% 0px"
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
            >
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.75, mb: 2 }}
              >
                From the convenience of meet and greet parking to the cost-effective park
                and ride services and premium valet options, our platform allows you to
                quickly compare prices, features, and locations — all in one place. In just
                a few clicks, you can book reliable parking at competitive rates without
                any hidden surprises.
              </Typography>
            </AnimateOnScroll>

            <AnimateOnScroll
              type="slide-up"
              duration={2150}
              delay={420}
              distance={24}
              threshold={0.3}
              rootMargin="0px 0px -15% 0px"
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
            >
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.75, mb: 2 }}
              >
                We cover all major UK airports, including Manchester, Birmingham, Glasgow,
                Luton, Stansted, Bristol, Leeds, Heathrow, and Southampton, along with
                international locations such as Dublin Airport. No matter where you’re
                flying from, we make it easy to secure trusted parking close to your
                terminal.
              </Typography>
            </AnimateOnScroll>

            <AnimateOnScroll
              type="slide-up"
              duration={2300}
              delay={560}
              distance={24}
              threshold={0.3}
              rootMargin="0px 0px -15% 0px"
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
            >
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.75, mb: 2 }}
              >
                At Go Airport Parking, we go beyond just helping you park your car. Our
                goal is to make your entire travel experience smoother, safer, and
                stress-free from the moment you leave home to the moment you return.
              </Typography>
            </AnimateOnScroll>

            <AnimateOnScroll
              type="slide-up"
              duration={2450}
              delay={700}
              distance={24}
              threshold={0.3}
              rootMargin="0px 0px -15% 0px"
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
            >
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.75 }}
              >
                Whether you're travelling for business or leisure, by air or sea, you can
                rely on Go Airport Parking for convenient, secure, and affordable parking
                solutions every time.
              </Typography>
            </AnimateOnScroll>
          </Grid>

          {/* Image — gentle slide left */}
          <Grid
            size={{ sm: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              mt: 2,
            }}
          >
            <AnimateOnScroll
              type="slide-left"
              duration={1900}
              delay={160}
              distance={28}
              threshold={0.3}
              rootMargin="0px 0px -15% 0px"
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
            >
              <Box
                component="img"
                src={welcome}
                alt="Parking overview"
                loading="lazy"
                decoding="async"
                sx={{
                  width: "100%",
                  maxWidth: 520,
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 3,
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                }}
              />
            </AnimateOnScroll>
          </Grid>
        </Grid>
      </PageWrapper>

      <Box
        sx={{
          mt: { xs: 6, md: 8 },
          width: "100%",
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}
      />
      <StatsCarouselAuto />
    </Box>
  );
}

export default memo(Welcome);
