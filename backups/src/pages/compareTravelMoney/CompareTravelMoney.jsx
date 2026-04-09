// CompareTravelMoney.jsx
import { useState } from "react";
import { Box, Grid, TextField, Typography, MenuItem } from "@mui/material";
import HeroSection from "../../components/reusable/HeroSection";
import PageWrapper from "../../components/reusable/PageWrapper";
import Seo from "../../components/reusable/Seo";
import compare from "../../assets/optimized/compare.webp";
import { currencies } from "../../assets/data";
import RadioCardGroup from "./components/RadioCardGroup";
import FieldLabel from "./components/FieldLabel";
import ProviderCard from "./components/ProviderCard";
import currencyClub from "../../assets/optimized/currency-club.webp";
import sterling from "../../assets/optimized/sterling.webp";
import tesco from "../../assets/optimized/tesco.webp";
import travelex from "../../assets/optimized/travelex.webp";
import CustomButton from "../../components/reusable/CustomButton";
import AnimateOnScroll from "../../components/reusable/AnimateOnScroll";

// shared animation utils
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../components/utils/animation";

export default function CompareTravelMoney() {
  const [currency, setCurrency] = useState("select-currency");
  const [amount, setAmount] = useState("");
  const [payment, setPayment] = useState("debit");
  const [delivery, setDelivery] = useState("home");

  const selectedCurrency = currencies.find((c) => c.code === currency);
  const symbol = selectedCurrency?.symbol ?? "£";

  const handleCompare = () => {
    console.log({ currency, amount, payment, delivery });
  };

  const providers = [
    {
      id: "tcc",
      name: "The Currency Club",
      logo: `${currencyClub}`,
      youReceive: "£850.13",
      rate: "1.1368",
      insuredDelivery: "Free",
    },
    {
      id: "sterling",
      name: "Sterling",
      logo: `${sterling}`,
      youReceive: "£850.13",
      rate: "1.1368",
      insuredDelivery: "Free",
    },
    {
      id: "tesco",
      name: "TESCO",
      logo: `${tesco}`,
      youReceive: "£845.13",
      rate: "1.1368",
      insuredDelivery: "Free",
    },
    {
      id: "travelex",
      name: "Travelex",
      logo: `${travelex}`,
      youReceive: "£850.13",
      rate: "1.1368",
      insuredDelivery: "Free",
    },
  ];

  // animation timing
  const BASE = 80; // initial delay
  const STEP = 90; // stagger per row/element
  const ROW_DIST = 18;
  const ROW_DUR = 760;

  return (
    <>
      <HeroSection
        title="Find Todays Cheapest Currency Deals"
        subtitle="Compare live rates from trusted providers and secure the best currency exchange deals available today — saving you time and money."
        image={compare}
      />

      <PageWrapper>
        <Box sx={{ mt: { xs: 3, md: 5 } }}>
          {/* Panel container */}
          <AnimateOnScroll
            type="zoom-in"
            duration={900}
            delay={40}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Box
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                bgcolor: "grey.50",
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Compare Travel Money
              </Typography>

              {/* Row 1: Currency + Amount */}
              <AnimateOnScroll
                type="slide-up"
                distance={ROW_DIST}
                duration={ROW_DUR}
                delay={BASE + STEP * 0}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Grid container spacing={2} sx={{ mb: 1 }}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FieldLabel>Currency</FieldLabel>
                    <TextField
                      select
                      placeholder="Select currency"
                      size="small"
                      fullWidth
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      sx={{
                        "& .MuiInputBase-root": { height: 44 },
                        "& .MuiSelect-select": {
                          display: "flex",
                          alignItems: "center",
                          py: 0,
                        },
                      }}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: (theme) => ({
                              /* Firefox */
                              // scrollbarColor: `${theme.palette.primary.main} transparent`,
                              /* WebKit */
                              // "::-webkit-scrollbar-thumb": {
                              //   backgroundColor: theme.palette.primary.main,
                              // },
                            }),
                          },
                        },
                      }}
                    >
                      <MenuItem value="select-currency">
                        <em>Select Currency</em>
                      </MenuItem>
                      {currencies.map((c) => (
                        <MenuItem key={c.code} value={c.code}>
                          {c.name} ({c.code})
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <FieldLabel>Amount to spend ({symbol})</FieldLabel>
                    <TextField
                      placeholder="750"
                      size="small"
                      fullWidth
                      value={amount}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        setAmount(numericValue);
                      }}
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    />
                  </Grid>
                </Grid>
              </AnimateOnScroll>

              {/* Row 2: Payment method */}
              <AnimateOnScroll
                type="slide-up"
                distance={ROW_DIST}
                duration={ROW_DUR}
                delay={BASE + STEP * 1}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Grid container spacing={2} sx={{ mb: 1 }}>
                  <Grid size={{ xs: 12 }}>
                    <RadioCardGroup
                      label="Payment method"
                      name="payment"
                      value={payment}
                      onChange={setPayment}
                      options={[
                        { label: "Debit card", value: "debit" },
                        { label: "Credit card", value: "credit" },
                        { label: "Bank Transfer", value: "bank" },
                      ]}
                      columns={{ xs: 1, sm: 3 }}
                    />
                  </Grid>
                </Grid>
              </AnimateOnScroll>

              {/* Row 3: Delivery + CTA */}
              <AnimateOnScroll
                type="slide-up"
                distance={ROW_DIST}
                duration={ROW_DUR}
                delay={BASE + STEP * 2}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid size={{ xs: 12, md: 9 }}>
                    <RadioCardGroup
                      label="Delivery or collection?"
                      name="delivery"
                      value={delivery}
                      onChange={setDelivery}
                      options={[
                        { label: "Home Delivery", value: "home" },
                        { label: "Store Collection", value: "store" },
                      ]}
                      columns={{ xs: 1, sm: 2 }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3 }}>
                    <AnimateOnScroll
                      type="fade"
                      duration={680}
                      delay={BASE + STEP * 2 + 80}
                      easingTransform={EASE_SOFT}
                      easingOpacity={EASE_SOFT}
                      threshold={THRESHOLD}
                      rootMargin={ROOT_MARGIN}
                      once
                      style={smoothStyle}
                    >
                      <CustomButton
                        fullWidth
                        variant="contained"
                        onClick={handleCompare}
                        disableElevation
                        sx={{ height: 44 }}
                      >
                        Compare Rates
                      </CustomButton>
                    </AnimateOnScroll>
                  </Grid>
                </Grid>
              </AnimateOnScroll>
            </Box>
          </AnimateOnScroll>
        </Box>
      </PageWrapper>

      {/* Providers */}
      <PageWrapper>
        <Box sx={{ my: 3 }}>
          <Grid container spacing={2}>
            {providers.map((p, i) => (
              <Grid key={p.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <AnimateOnScroll
                  type="slide-up"
                  distance={20}
                  duration={760}
                  delay={BASE + i * 110}
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <ProviderCard item={p} />
                </AnimateOnScroll>
              </Grid>
            ))}
          </Grid>
        </Box>
      </PageWrapper>
    </>
  );
}
