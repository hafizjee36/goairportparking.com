import { Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import theme from "../../../theme";
import PageWrapper from "../../../components/reusable/PageWrapper";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import {
  EASE_SOFT,
  ROOT_MARGIN,
  smoothStyle,
  THRESHOLD,
} from "../../../components/utils/animation";

const TIMELINE = [
  {
    year: "2005",
    title: "The Journey Begins",
    body: "Founded near Gatwick Airport by Sarah Mitchell and Jonathan Clarke, offering simple, secure, and affordable airport parking.",
  },
  {
    year: "2010",
    title: "Nationwide Growth",
    body: "Partnered with major UK airports to expand services and give travellers more choice and competitive prices.",
  },
  {
    year: "2015",
    title: "Comparison Made Easy",
    body: "Launched our online booking platform, enabling customers to search, compare, and book from hundreds of parking options.",
  },
  {
    year: "2020",
    title: "Beyond Parking",
    body: "Introduced hotels, lounges, and car hire to become a one-stop travel extras marketplace.",
  },
];

export default function CompanyTimelineHorizontal() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    setIsDragging(true);
    const container = containerRef.current;
    if (!container) return;
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = x - startX;
    container.scrollLeft = scrollLeft - walk;
  };

  const LINE_Y = { xs: 72, sm: 88, md: 92 };
  const STAGGER_MS = 140;

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <PageWrapper>
        <Box sx={{ py: { xs: 6, md: 10 }, position: "relative" }}>
          {/* Section heading */}
          {/* <AnimateOnScroll
            type="zoom-in"
            duration={700}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{ fontWeight: 700, mb: { xs: 5, md: 7 } }}
            >
              The Company
            </Typography>
          </AnimateOnScroll> */}

          <AnimateOnScroll
            type="zoom-in"
            duration={700}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{ fontWeight: 700, mb: { xs: 5, md: 7 } }}
            >
              About Go Airport Parking
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                px: 1,
                mb: 5,
                color: theme.palette.text.secondary,
                lineHeight: 1.6,
                maxWidth: 700,
                mx: "auto",
              }}
            >
              We help travellers compare trusted parking options across the UK and Dublin,
              making it easy to find secure, affordable choices for every journey.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                px: 1,
                my: 1,
                color: theme.palette.text.secondary,
                lineHeight: 1.6,
              }}
            >
              Go Airport Parking helps you compare and book cheap parking near UK airports and Dublin quickly and easily. As a leading parking comparison platform, we bring together a wide range of trusted and secure parking providers, so you can find the best option based on your budget and travel needs.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                px: 1,
                my: 1,
                color: theme.palette.text.secondary,
                lineHeight: 1.6,
              }}
            >
              Instead of searching multiple websites, you can compare parking prices, locations, and services in one place, including popular options like Meet & Greet, Park & Ride, and on-site parking near terminals. Our platform is designed to help you find affordable and reliable parking near major UK airports such as Heathrow, Manchester, Birmingham, and Luton etc.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                px: 1,
                my: 1,
                color: theme.palette.text.secondary,
                lineHeight: 1.6,
              }}
            >
              We focus on offering secure parking with trusted operators, transparent pricing, and a smooth booking process. Through our strong network of partners, you can access cheap parking deals and exclusive offers that help you save more without compromising on quality or convenience.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                px: 1,
                my: 1,
                color: theme.palette.text.secondary,
                lineHeight: 1.6,
              }}
            >
              Whether you’re travelling for business or a holiday, Go Airport Parking makes it easy to find cheap, secure parking near airports, giving you a stress-free start and end to your journey.
            </Typography>
          </AnimateOnScroll>

          {/* Scroll container */}
          {/* <Box
            ref={containerRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            sx={{
              overflowX: "auto",
              overflowY: "hidden",
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",
              pb: 2,
              position: "relative",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 4,
                position: "relative",
                minHeight: 220,
                px: 1,
              }}
            >
              {TIMELINE.map((item, index) => {
                const delay = index * STAGGER_MS;
                return (
                  <AnimateOnScroll
                    key={item.year}
                    root={() => containerRef.current}
                    threshold={THRESHOLD}
                    rootMargin={ROOT_MARGIN}
                    type="slide-up"
                    distance={22}
                    duration={720}
                    delay={delay}
                    easingTransform={EASE_SOFT}
                    easingOpacity={EASE_SOFT}
                    once
                    as="div"
                    style={{ height: "100%", ...smoothStyle }}
                  > */}
          {/* <Box
                      sx={{
                        width: 320,
                        flex: "0 0 auto",
                        position: "relative",
                        textAlign: "center",
                      }}
                    > */}
          {/* Year */}
          {/* <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 0.5 }}
                      >
                        {item.year}
                      </Typography> */}

          {/* Title */}
          {/* <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary, mb: 5 }}
                      >
                        {item.title}
                      </Typography> */}

          {/* Circle */}
          {/* <Box
                        sx={{
                          position: "absolute",
                          top: LINE_Y,
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          border: `2px solid ${theme.palette.primary.main}`,
                          backgroundColor: theme.palette.background.paper,
                          zIndex: 1,
                          // tiny pop without wrappers (keeps layout stable)
                          "@keyframes popIn": {
                            from: {
                              transform: "translate(-50%, -50%) scale(0.95)",
                              opacity: 0,
                            },
                            to: {
                              transform: "translate(-50%, -50%) scale(1)",
                              opacity: 1,
                            },
                          },
                          animation:
                            "popIn 380ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
                          animationDelay: `${delay + 80}ms`,
                        }}
                      /> */}

          {/* Dashed line to next circle */}
          {/* {index < TIMELINE.length - 1 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: LINE_Y,
                            left: "calc(50% + 11px)",
                            width: "calc(100% + 2rem)",
                            borderTop: "2px dashed",
                            borderColor: theme.palette.divider,
                            zIndex: 0,
                            opacity: 0,
                            "@keyframes fadeInLine": {
                              from: { opacity: 0 },
                              to: { opacity: 1 },
                            },
                            animation: "fadeInLine 420ms ease-out both",
                            animationDelay: `${delay + 120}ms`,
                          }}
                        />
                      )} */}

          {/* Spacer */}
          {/* <Box sx={{ height: 15 }} /> */}

          {/* Body */}
          {/* <Typography
                        variant="body2"
                        sx={{
                          px: 1,
                          mt: 3,
                          color: theme.palette.text.secondary,
                          lineHeight: 1.6,
                        }}
                      >
                        {item.body}
                      </Typography>
                    </Box>
                  </AnimateOnScroll>
                );
              })}
            </Box>
          </Box> */}

          {/* Left fade */}
          {/* <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: 40,
              background: `linear-gradient(to right, ${theme.palette.background.default} 0%, transparent 100%)`,
              pointerEvents: "none",
            }}
          /> */}

          {/* Right fade */}
          {/* <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: 40,
              background: `linear-gradient(to left, ${theme.palette.background.default} 0%, transparent 100%)`,
              pointerEvents: "none",
            }}
          /> */}
        </Box>
      </PageWrapper>
    </Box>
  );
}
