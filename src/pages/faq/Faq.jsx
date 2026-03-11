// Faq.jsx
import { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import HeroSection from "../../components/reusable/HeroSection";
import Seo from "../../components/reusable/Seo";
import PageWrapper from "../../components/reusable/PageWrapper";
import AirportParking from "./components/AirportParking";
import Hotels from "./components/Hotels";
import Lounges from "./components/Lounges";
import faq from "../../assets/optimized/faq.webp";
import theme from "../../theme";

const tabItem = [
  { label: "Airport Parking", value: "parking" },
  { label: "Hotels", value: "hotels" },
  { label: "Lounges", value: "lounges" },
];

export default function Faq() {
  const [tab, setTab] = useState("parking");

  return (
    <>
      <Seo 
        title="FAQs - Frequently Asked Questions | Go Airport Parking"
        description="Find answers to common questions about airport parking, bookings, payments, and our services. Get help with your airport parking queries."
        keywords={["airport parking faq", "parking questions", "booking help", "airport parking answers"]}
      />
      <HeroSection
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our services, policies, and support."
        image={faq}
      />

      <PageWrapper>
        <Box sx={{ my: 5 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mb: 3,
            }}
          >
            {tabItem.map(({ label, value }) => {
              const active = tab === value;
              return (
                <Button
                  key={value}
                  onClick={() => setTab(value)}
                  variant={active ? "contained" : "outlined"}
                  disableElevation
                  sx={{
                    px: 2.5,
                    fontWeight: 400,
                    textTransform: "none",
                    ...(active
                      ? {
                          bgcolor: "primary.main",
                          "&:hover": { bgcolor: theme.palette.primaryLight.main },
                          color: "#fff",
                        }
                      : {
                          bgcolor: "grey.200",
                          borderColor: "grey.300",
                          color: "text.primary",
                        }),
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </Box>

          {tab === "parking" && <AirportParking />}

          {tab === "hotels" && <Hotels />}

          {tab === "lounges" && <Lounges />}
        </Box>
      </PageWrapper>
    </>
  );
}

/** Tiny helper for visual placeholders; delete once real content is added */
function PlaceholderCard({ text }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "grey.50",
        border: "1px solid",
        borderColor: "grey.200",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}
