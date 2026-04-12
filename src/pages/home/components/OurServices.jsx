import { memo } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import PageWrapper from "../../../components/reusable/PageWrapper";
import meet from "../../../assets/optimized/meet.webp";
import car from "../../../assets/optimized/car.webp";
import tower from "../../../assets/optimized/tower.webp";
// ⬇️ swap to the Framer version
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import { EASE_SOFT } from "../../../components/utils/animation";
import theme from "../../../theme";

const SERVICES = [
  {
    title: "Meet & Greet",
    img: meet,
    desc: "Meet & Greet is the quickest and most convenient way to sort your parking before a flight. Simply drive to the terminal, where a professional, fully insured driver from a trusted partner will meet you, help with your luggage, and take your vehicle to a secure car park.When you return, your car is brought back to the terminal, so you can leave without delays. It’s the perfect choice for travellers who want a smooth, time-saving experience with minimum effort.",
  },
  {
    title: "Park & Ride",
    img: car,
    desc: "Park & Ride is a practical and budget-friendly option for travellers looking to save money. Drive to a nearby secure car park, leave your vehicle, and take a free shuttle bus that runs directly to the terminal.Shuttle services operate regularly, making transfers quick and easy. On your return, the same service takes you back to your car, ready for your journey home. It’s a reliable and cost-effective solution for both short and long trips.",
  },
  {
    title: "Onsite",
    img: tower,
    desc: "On-site options are ideal for travellers who prefer to stay close to the terminal. These car parks are located within the airport grounds and are managed by approved operators, offering quick access either by a short walk or a brief shuttle ride.This option is especially popular with business travellers and those who value convenience, proximity, and a straightforward start to their journey.",
  },
];

function OurServices() {
  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper }}>
      <PageWrapper>
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 800, mb: { xs: 3, md: 5 }, lineHeight: 1.15 }}
          >
            Our Services
          </Typography>

          <Grid container spacing={{ xs: 4, md: 6 }}>
            {SERVICES.map((s, i) => (
              <Grid key={s.title} size={{ xs: 12, md: 4 }}>
                <Stack spacing={1.5} alignItems="center" textAlign="center">
                  {/* Image — smooth hover (no shake) */}
                  <Box
                    component="img"
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    sx={{
                      width: 96,
                      height: 96,
                      objectFit: "contain",
                      borderRadius: 2,
                      filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.15))",
                      transition:
                        "transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1), filter 320ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                      willChange: "transform",
                      "&:hover": {
                        animation: "wobble-horizontal 1s ease-in-out 1",
                      },
                      "@keyframes wobble-horizontal": {
                        "0%": { transform: "translateX(0)" },
                        "16.65%": { transform: "translateX(8px)" },
                        "33.3%": { transform: "translateX(-6px)" },
                        "49.95%": { transform: "translateX(4px)" },
                        "66.6%": { transform: "translateX(-2px)" },
                        "83.25%": { transform: "translateX(1px)" },
                        "100%": { transform: "translateX(0)" },
                      },
                    }}
                  />

                  {/* Title (kept static) */}
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {s.title}
                  </Typography>

                  {/* Description — buttery slide-up */}
                  <AnimateOnScroll
                    type="slide-up"
                    duration={1800} // slower = smoother
                    delay={i * 160} // gentle cascade across cards
                    distance={22} // modest travel
                    threshold={0.3} // starts a bit later in viewport
                    rootMargin="0px 0px -12% 0px"
                    easingTransform={EASE_SOFT} // soft ease for transform
                    easingOpacity={EASE_SOFT} // match opacity ease
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        maxWidth: 420,
                        lineHeight: 1.65,
                      }}
                    >
                      {s.desc}
                    </Typography>
                  </AnimateOnScroll>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </PageWrapper>
    </Box>
  );
}

export default memo(OurServices);
