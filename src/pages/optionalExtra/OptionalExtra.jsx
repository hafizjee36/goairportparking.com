// OptionalExtrasPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Stack,
  Divider,
  IconButton,
  Popper,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CustomButton from "../../components/reusable/CustomButton";
import AirportDropdown from "../../components/reusable/AirportDropdown";
import GuestsDropdown from "../../components/reusable/GuestDropdown";
import { extras, baseProduct, airportCode } from "../../assets/data";
import CustomStepper from "../../components/stepper/Stepper";
import ExtraCard from "./components/ExtraCard";
import PageWrapper from "../../components/reusable/PageWrapper";
import theme from "../../theme";

// ✨ animations
import AnimateOnScroll from "../../components/reusable/AnimateOnScroll";
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../components/utils/animation";

const Pound = ({ value }) => <>£{value.toFixed(2)}</>;

export default function OptionalExtrasPage() {
  const navigate = useNavigate();

  const [basket, setBasket] = useState([]);
  const [filter, setFilter] = useState("all");
  const basketTotal = basket.reduce((s, b) => s + b.price, 0);
  const orderTotal = baseProduct.price + baseProduct.bookingFee + basketTotal;

  const [airport, setAirport] = useState("Birmingham");
  const [airportOpen, setAirportOpen] = useState(false);

  const [guestsOpen, setGuestsOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  // // anchors for Poppers
  // const airportRef = useRef(null);
  // const guestsRef = useRef(null);

  // only handle ESC key (click-away handled by ClickAwayListener)
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setAirportOpen(false);
        setGuestsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleUpdate = () => {
    const payload = {
      airport,
      guests: { adults, children, total: adults + children },
      extrasBasket: basket,
      totals: {
        base: baseProduct.price,
        bookingFee: baseProduct.bookingFee,
        basket: basketTotal,
        order: orderTotal,
      },
    };

    console.groupCollapsed("OptionalExtras • Update");
    console.log("Payload:", payload);
    console.table(basket);
    console.groupEnd();
  };

  const handlePayment = () => {
    navigate("/payment");
  };

  const chipData = [
    { key: "all", label: "All (03)" },
    { key: "lounges", label: "Lounges (03)" },
    // add more filters here if needed
  ];

  // Field “card” like the screenshot
  const FieldButton = ({ label, value, onClick, "aria-controls": ctrls }) => (
    <Box
      role="button"
      tabIndex={0}
      aria-haspopup="menu"
      aria-controls={ctrls}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick(e)}
      sx={{
        width: "100%",
        height: 56,
        border: "1px solid #E3E6EA",
        borderRadius: 2,
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        bgcolor: "#fff",
        transition: "border-color .15s ease",
        "&:hover": { borderColor: "#D4D9DE" },
        "&:focus-visible": {
          outline: "2px solid rgba(25,118,210,.35)",
          outlineOffset: "2px",
        },
      }}
    >
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", lineHeight: 1 }}
        >
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={500} noWrap sx={{ mt: 0.25 }}>
          {value}
        </Typography>
      </Box>
      <ExpandMoreIcon sx={{ color: "text.disabled", ml: 1 }} />
    </Box>
  );

  // animation timing
  const BASE = 60;
  const STEP = 90;

  // helpers for popper width equal to button width

  return (
    <>
      {/* Top section (stepper + inline controls) */}
      <Box sx={{ bgcolor: "background.paper" }}>
        <PageWrapper>
          <Box sx={{ py: 3 }}>
            <AnimateOnScroll
              type="fade"
              duration={700}
              delay={0}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <CustomStepper activeStep={2} />
            </AnimateOnScroll>

            <Grid container spacing={1} sx={{ px: 3 }}>
              {/* Airport field + panel */}
              {/* <Grid size={{ xs: 12, sm: 5 }}>
                <AnimateOnScroll
                  type="slide-up"
                  distance={16}
                  duration={720}
                  delay={BASE}
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <AirportDropdown
                    value={airport}
                    options={airportCode}
                    open={airportOpen}
                    onOpenChange={(next) => {
                      setAirportOpen(next);
                      if (next) setGuestsOpen(false);
                    }}
                    onChange={setAirport}
                  />
                </AnimateOnScroll>
              </Grid> */}

              {/* Guests field + panel */}
              {/* <Grid size={{ xs: 12, sm: 5 }}>
                <AnimateOnScroll
                  type="slide-up"
                  distance={16}
                  duration={720}
                  delay={BASE + STEP}
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <GuestsDropdown
                    adults={adults}
                    children={children}
                    open={guestsOpen}
                    onOpenChange={(next) => {
                      setGuestsOpen(next);
                      if (next) setAirportOpen(false);
                    }}
                    onChange={({ adults: a, children: c }) => {
                      setAdults(a);
                      setChildren(c);
                    }}
                  />
                </AnimateOnScroll>
              </Grid> */}

              {/* Update button on the right */}
              {/* <Grid size={{ xs: 12, sm: 2 }}>
                <AnimateOnScroll
                  type="slide-up"
                  distance={14}
                  duration={680}
                  delay={BASE + STEP * 2}
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <CustomButton
                    variant="contained"
                    fullWidth
                    onClick={handleUpdate}
                    sx={{
                      height: 56,
                      backgroundColor: "#E0E0E0",
                      color: theme.palette.text.black80,
                      boxShadow: "none",
                      textTransform: "none",
                      fontWeight: 500,
                      "&:hover": { backgroundColor: "#D5D5D5" },
                    }}
                  >
                    Update
                  </CustomButton>
                </AnimateOnScroll>
              </Grid> */}
            </Grid>
          </Box>
        </PageWrapper>
      </Box>

      {/* Main content */}
      <Box sx={{ bgcolor: "background.default" }}>
        <PageWrapper>
          <Box sx={{ px: { xs: 2, sm: 3 }, py: 4 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "center", sm: "center" }}
              justifyContent={{ xs: "center", sm: "space-between" }}
              spacing={2}
              sx={{ flexWrap: "wrap", minWidth: 0 }}
            >
              <AnimateOnScroll
                type="fade"
                duration={700}
                delay={0}
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
                  sx={{
                    mr: { xs: 0, sm: 2 },
                    whiteSpace: "nowrap",
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  Optional Extras
                </Typography>
              </AnimateOnScroll>

              <AnimateOnScroll
                type="slide-up"
                distance={12}
                duration={680}
                delay={50}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    flexShrink: 0,
                    flexWrap: "wrap",
                    justifyContent: { xs: "center", sm: "flex-start" },
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    Filter by:
                  </Typography>
                  {chipData.map((chip) => (
                    <Chip
                      key={chip.key}
                      label={chip.label}
                      color={filter === chip.key ? "primary" : "default"}
                      variant={filter === chip.key ? "filled" : "outlined"}
                      onClick={() => setFilter(chip.key)}
                      size="small"
                      sx={{
                        height: 24,
                        px: 0.5,
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        borderRadius: 1,
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </Stack>
              </AnimateOnScroll>
            </Stack>
          </Box>

          <Box sx={{ px: { xs: 2, sm: 3 }, pb: 4 }}>
            <Grid container spacing={3}>
              {/* Left column */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Stack spacing={3}>
                  {(filter === "all" ? extras : extras).map((e, i) => (
                    <AnimateOnScroll
                      key={e.id}
                      type="slide-up"
                      distance={22}
                      duration={760}
                      delay={BASE + i * 90}
                      easingTransform={EASE_SOFT}
                      easingOpacity={EASE_SOFT}
                      threshold={THRESHOLD}
                      rootMargin={ROOT_MARGIN}
                      once
                      as="div"
                      style={smoothStyle}
                    >
                      <ExtraCard
                        item={e}
                        onAdd={(b) => setBasket((c) => [...c, b])}
                      />
                    </AnimateOnScroll>
                  ))}
                </Stack>
              </Grid>

              {/* Right column */}
              <Grid size={{ xs: 12, md: 4 }}>
                <AnimateOnScroll
                  type="slide-right"
                  distance={20}
                  duration={740}
                  delay={BASE + STEP}
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <Box
                    sx={{
                      maxWidth: 400,
                      mx: "auto",
                      position: "sticky",
                      top: 24,
                      alignSelf: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#EFF3F5",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "white",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <Box sx={{ p: 2 }}>
                          <Typography variant="h6" fontWeight="bold">
                            Order summary
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {airport}
                          </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ p: 2 }}>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography fontWeight={500}>
                              {baseProduct.title ?? "Selected parking"}
                            </Typography>
                            <Typography fontWeight={500}>
                              <Pound value={baseProduct.price} />
                            </Typography>
                          </Stack>
                          <Box sx={{ mt: 1 }}>
                            <Stack mt={1.5} direction="row" spacing={1}>
                              <Stack alignItems="center" spacing={0.5}>
                                <AccessTimeIcon
                                  fontSize="small"
                                  color="action"
                                />
                                <Box
                                  sx={{
                                    height: 18,
                                    borderLeft: "2px dotted grey",
                                  }}
                                />
                                <AccessTimeIcon
                                  fontSize="small"
                                  color="action"
                                />
                              </Stack>
                              <Stack spacing={3}>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Entry:{" "}
                                  {baseProduct.entry ??
                                    "09 August, 2025 - 04:00pm"}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Exit:{" "}
                                  {baseProduct.exit ??
                                    "09 August, 2025 - 04:00pm"}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Box>
                        </Box>
                      </Box>

                      {/* Extras */}
                      {basket.length > 0 && (
                        <Box sx={{ p: 2, pt: 1 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Extras
                          </Typography>
                          <Stack spacing={1}>
                            {basket.map((b) => (
                              <Stack
                                key={b.id + String(b.title) + String(b.price)}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Typography variant="body2">
                                  {b.title}
                                </Typography>
                                <Typography variant="body2">
                                  <Pound value={b.price} />
                                </Typography>
                              </Stack>
                            ))}
                          </Stack>
                        </Box>
                      )}

                      {/* Booking fee */}
                      <Box sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography>Booking fee</Typography>
                          <Typography>
                            <Pound value={baseProduct.bookingFee} />
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: "white",
                        borderRadius: 2,
                        mt: 2,
                        p: 2,
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        mb={2}
                      >
                        <Typography fontWeight="bold">Total</Typography>
                        <Typography fontWeight="bold">
                          <Pound value={orderTotal} />
                        </Typography>
                      </Stack>
                      <CustomButton
                        onClick={() => handlePayment()}
                        variant="contained"
                        fullWidth
                      >
                        {basket.length > 0
                          ? "Proceed to payment"
                          : "Proceed without extras"}
                      </CustomButton>
                    </Box>
                  </Box>
                </AnimateOnScroll>
              </Grid>
            </Grid>
          </Box>
        </PageWrapper>
      </Box>
    </>
  );
}
