import { memo } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import PageWrapper from "../../../components/reusable/PageWrapper";
// ⬇️ use the Framer version
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import { Link } from "react-router-dom";
import { EASE_SOFT } from "../../../components/utils/animation";
import CustomButton from "../../../components/reusable/CustomButton";
import theme from "../../../theme";

const FAQS = [
  {
    q: "How does Go Airport Parking work?",
    a: "Go Airport Parking allows you to compare prices from multiple trusted parking providers in one place. Simply enter your travel dates, compare available options, and book the one that suits your needs and budget.",
  },
  {
    q: "What types of parking options can I compare?",
    a: "You can compare a range of services including Meet & Greet, Park & Ride, and on-site options, allowing you to choose based on convenience, price, and location.",
  },
  {
    q: "Are the parking providers secure and trustworthy?",
    a: "Yes, we only work with vetted and fully approved operators who meet strict safety and security standards, so you can book with confidence.",
  },
  {
    q: "Can I find cheap parking near major UK airports?",
    a: "Yes, our platform helps you find affordable options near major airports including Manchester, Heathrow, Birmingham, Luton, Stansted, and more.",
  },
  {
    q:"Do you offer parking at Dublin Airport as well?",
    a:"Yes, you can also compare and book parking options at Dublin Airport, giving you access to international travel locations in one place.",
  },
  {
    q:"How far in advance should I book?",
    a:"Booking in advance is recommended to secure the best prices and availability, especially during peak travel seasons.",
  },
  {
    q:"Can I cancel or change my booking?",
    a:"Most bookings can be amended or cancelled depending on the provider’s policy. Details are clearly shown before you confirm your reservation.",
  },
  {
    q:"How do I know which option is best for me?",
    a:"You can compare features such as price, distance from the terminal, transfer times, and customer reviews to choose the option that fits your travel plans.",
  },
  {
    q:"Is shuttle transport included in Park & Ride options?",
    a:"Yes, most Park & Ride services include a free shuttle transfer to and from the terminal as part of the booking.",
  },
  {
    q:"Why should I use a comparison site instead of booking directly?",
    a:"Using a comparison platform saves you time and money by showing multiple options side by side, helping you find better deals and make an informed decision.",
  },
];

function Frequently() {
  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper }}>
      <PageWrapper>
        <Grid
          container
          columnSpacing={{ md: 6 }}
          rowSpacing={{ xs: 4, md: 0 }}
          alignItems="flex-start"
          sx={{ py: { xs: 3, md: 5 } }}
        >
          {/* Left column */}
          <Grid size={{ xs: 12, md: 5 }}>
            <AnimateOnScroll
              type="slide-up"
              duration={1600}
              delay={0}
              distance={22}
              threshold={0.3}
              rootMargin="0px 0px -12% 0px"
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  lineHeight: 1.05,
                  mb: 2,
                  fontSize: { xs: 30, sm: 36, md: 42 },
                }}
              >
                Frequently Asked
                <br />
                Questions
              </Typography>
            </AnimateOnScroll>

            <AnimateOnScroll
              type="fade"
              duration={1400}
              delay={120}
              threshold={0.3}
              rootMargin="0px 0px -12% 0px"
              easingOpacity={EASE_SOFT}
            >
              <CustomButton
                component={Link}
                to="/faq"
                variant="contained"
                size="large"
                sx={{
                  mt: 1,
                  px: 3,
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                More FAQs
              </CustomButton>
            </AnimateOnScroll>
          </Grid>

          {/* Right column */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
              {FAQS.map((item, i) => (
                <AnimateOnScroll
                  key={item.q}
                  type="slide-left"
                  duration={1700}
                  delay={i * 140} // gentle stagger
                  distance={26}
                  threshold={0.25}
                  rootMargin="0px 0px -10% 0px"
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                >
                  <Box>
                    <Accordion
                      disableGutters
                      elevation={0}
                      square
                      defaultExpanded={i === 0}
                      // smoother expand/collapse
                      TransitionProps={{
                        timeout: 260,
                        easing: {
                          enter: "cubic-bezier(0.2, 0.8, 0.2, 1)",
                          exit: "cubic-bezier(0.2, 0.8, 0.2, 1)",
                        },
                      }}
                      sx={{
                        "&::before": { display: "none" },
                        bgcolor: "transparent",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          // Crossfade between + and −; no layout shift, smooth opacity
                          <Box
                            sx={{
                              position: "relative",
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              display: "grid",
                              placeItems: "center",
                              bgcolor: "rgba(0,0,0,0.06)",
                              overflow: "hidden",
                            }}
                          >
                            <AddRoundedIcon
                              className="faq-plus"
                              sx={{
                                position: "absolute",
                                fontSize: 18,
                                opacity: 1,
                                transition: "opacity 220ms ease",
                                // hide when expanded
                                ".Mui-expanded &": { opacity: 0 },
                              }}
                            />
                            <RemoveRoundedIcon
                              className="faq-minus"
                              sx={{
                                position: "absolute",
                                fontSize: 18,
                                opacity: 0,
                                transition: "opacity 220ms ease",
                                // show when expanded
                                ".Mui-expanded &": { opacity: 1 },
                              }}
                            />
                          </Box>
                        }
                        sx={{
                          px: 0,
                          py: 2,
                          "& .MuiAccordionSummary-content": { m: 0 },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700 }}
                        >
                          {item.q}
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails sx={{ pt: 0, pb: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", lineHeight: 1.7 }}
                        >
                          {item.a}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    {/* Divider between items */}
                    {i !== FAQS.length - 1 && <Divider sx={{ opacity: 0.5 }} />}
                  </Box>
                </AnimateOnScroll>
              ))}
            </Box>
          </Grid>
        </Grid>
      </PageWrapper>
    </Box>
  );
}

export default memo(Frequently);
