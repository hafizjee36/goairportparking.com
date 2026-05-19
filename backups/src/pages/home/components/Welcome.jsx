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
                Welcome to Go Airport Parking — One of the UK’s leading airport{" "}
                <br />
                and port parking comparison platform
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
                We partner with trusted, fully-approved operators to bring you a
                wide range of parking options at unbeatable prices. Whether you
                prefer the convenience of Meet & Greet, the value of Park &
                Ride, or premium valet parking, our platform lets you compare,
                book, and save in seconds. With locations covering all major UK
                airports — including Manchester, Birmingham, Glasgow, Luton,
                Stansted, Bristol, Leeds, Heathrow, and Southampton — as well as
                international destinations such as Dublin, Go Airport Parking
                connects travelers with the best deals from reliable local
                providers. More than just parking — Go Airport is your trusted
                travel partner, ensuring a smooth start and finish to every
                journey.
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
                sx={{ color: "text.secondary", lineHeight: 1.75 }}
              >
                Whether you're traveling by air or sea, CLOUDAINAIRE MANAGEMENT CONSULTANCY LLC
                ensures a seamless start and finish to your journey with our
                commitment to convenience and security. Experience the
                convenience of hassle-free parking solutions with us.
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
