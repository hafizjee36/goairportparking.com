import {
  Box,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState, useMemo } from "react";
import PageWrapper from "../../components/reusable/PageWrapper";
import CustomStepper from "../../components/stepper/Stepper";
import theme from "../../theme";
import { useSelector } from "react-redux";
import { selectSearchData } from "../../redux/slice/searchSlice";
import ParkingCard from "./components/ParkingCard";
import AnimateOnScroll from "../../components/reusable/AnimateOnScroll";
import { useAirports } from "../../hooks/useAirports";
import BookingFormAlt from "../../components/bookingForm/BookingFormAlt";
import Seo from "../../components/reusable/Seo";

import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
  parkingCardStyle,
} from "../../components/utils/animation";

const featureCache = new Map();

const parseHtmlFeatures = (htmlString) => {
  if (!htmlString || typeof htmlString !== "string") {
    return ["Secure parking facility", "Professional service"];
  }

  if (featureCache.has(htmlString)) {
    return featureCache.get(htmlString);
  }

  try {
    if (typeof document === "undefined") {
      const fallback = ["Secure parking facility", "Professional service"];
      featureCache.set(htmlString, fallback);
      return fallback;
    }

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    const listItems = tempDiv.querySelectorAll("li");

    const features = Array.from(listItems)
      .map((li) => li.textContent?.trim())
      .filter((text) => text && text.length > 0);

    const result =
      features.length > 0
        ? features
        : ["Secure parking facility", "Professional service"];

    featureCache.set(htmlString, result);
    return result;
  } catch (error) {
    console.warn("⚠️ Error parsing HTML features:", error);

    const matches = htmlString.match(/<li[^>]*>(.*?)<\/li>/gi);
    if (matches) {
      const result = matches
        .map((match) => match.replace(/<\/?[^>]+(>|$)/g, "").trim())
        .filter((text) => text.length > 0);

      featureCache.set(htmlString, result);
      return result;
    }

    const fallback = ["Secure parking facility", "Professional service"];
    featureCache.set(htmlString, fallback);
    return fallback;
  }
};

export default function Booking() {
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const searchData = useSelector(selectSearchData);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");

  const { airports } = useAirports();

  const canonicalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/booking`
      : "https://www.goairportparking.com/booking";

  const getAirportTitle = (airportCode) => {
    if (!airportCode) return "";

    const airport = airports.find((airport) => airport.value === airportCode);
    return airport ? airport.level : airportCode;
  };

  const apiProducts = searchData?.products || [];
  const hasApiProducts = apiProducts.length > 0;

  const currentParkingOptions = useMemo(() => {
    if (hasApiProducts) {
      return apiProducts.map((product, index) => {
        let serviceType = "park-ride";
        if (product.display_name) {
          const typeStr = product.display_name.toLowerCase();
          if (typeStr.includes("meet") && typeStr.includes("greet")) {
            serviceType = "meet-greet";
          } else if (typeStr.includes("park") && typeStr.includes("ride")) {
            serviceType = "park-ride";
          } else if (
            typeStr.includes("on-airport") ||
            typeStr.includes("on airport")
          ) {
            serviceType = "on-airport";
          }
        }

        return {
          id: product.id || `api-${index}`,
          name: product.name || "Unknown Company",
          category: product.display_name || "Parking Service",
          type: serviceType,
          features:
            typeof product.short_description === "string"
              ? parseHtmlFeatures(product.short_description)
              : Array.isArray(product.features)
              ? product.features
              : [
                  "Secure parking facility",
                  "Regular shuttle service",
                  "Professional service",
                ],
          price: parseFloat(product.price || 0),
          price_before_discount: parseFloat(product.price_before_discount || 0),
          discount: parseFloat(product.discount || 0),
          priceBeforeDiscount: parseFloat(
            product.price_before_discount || product.price || 0
          ),
          image:
            product.image ||
            "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
          alt: product.name
            ? `${product.name} parking facility`
            : "Parking facility",
          rating: parseFloat(product.average_rating || 4.5),
          average_rating: product.average_rating,
          display_name: product.display_name,
          reviews: 0,
          airportCode: searchData.airport,
          offer: product.offer,
          adminCharges: 0,
          smsCharges: 0,
          extraAmount: parseFloat(product.extra_amount || 0),
          sku: product.sku,
          sku_id: product.sku_id,
          terms_conditions: product.terms_conditions,
          cancellation_status: product.cancellation_status,
        };
      });
    }

    return [];
  }, [hasApiProducts, apiProducts, searchData.airport]);

  const chipData = useMemo(() => {
    const totalCount = currentParkingOptions.length;
    const meetGreetCount = currentParkingOptions.filter(
      (p) => p.type === "meet-greet" || p.service_type === "meet-greet"
    ).length;
    const parkRideCount = currentParkingOptions.filter(
      (p) => p.type === "park-ride" || p.service_type === "park-ride"
    ).length;

    return [
      {
        key: "all",
        label: `All (${totalCount.toString().padStart(2, "0")})`,
        type: "all",
      },
      {
        key: "meet-greet",
        label: `Meet&Greet (${meetGreetCount.toString().padStart(2, "0")})`,
        type: "meet-greet",
      },
      {
        key: "park-ride",
        label: `Park&Ride (${parkRideCount.toString().padStart(2, "0")})`,
        type: "park-ride",
      },
    ];
  }, [currentParkingOptions]);

  const chipSx = (isActive) => ({
    height: 24,
    px: 0.5,
    fontWeight: 500,
    fontSize: "0.75rem",
    borderRadius: 1,
    bgcolor: isActive ? "primary.main" : "#F8BE144D",
    color: isActive ? "#000" : "#917828",
    "&:hover": {
      bgcolor: isActive ? "primaryLight.main" : "#F8BE141A",
    },
    cursor: "pointer",
  });

  const filteredOptions = useMemo(() => {
    let filtered = [...currentParkingOptions];

    if (activeFilter !== "all") {
      filtered = filtered.filter((option) => option.type === activeFilter);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "price":
            return a.price - b.price;
          case "rating":
            return b.rating - a.rating;
          case "name":
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [currentParkingOptions, activeFilter, sortBy]);

  const handleChipClick = (chipKey) => setActiveFilter(chipKey);
  const handleSortChange = (event) => setSortBy(event.target.value);

  const BASE = 80;

  return (
    <>
      <Seo
        title="Airport Parking Results | Go Airport Parking"
        description="Compare airport parking options and choose the best parking for your trip."
        canonical={canonicalUrl}
        robots="noindex,follow"
      />

      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        <PageWrapper>
          <Box sx={{ py: 3, minHeight: { xs: 220, md: 250 } }}>
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
              <CustomStepper activeStep={1} />
              <BookingFormAlt />
            </AnimateOnScroll>
          </Box>
        </PageWrapper>
      </Box>

      <Box sx={{ backgroundColor: theme.palette.background.default }}>
        <PageWrapper>
          {!isSmall && (
            <AnimateOnScroll
              type="slide-up"
              distance={18}
              duration={760}
              delay={BASE}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  flexDirection: { sm: "column", lg: "row" },
                  alignItems: { sm: "center", lg: "center" },
                  justifyContent: { sm: "center", lg: "space-between" },
                  gap: { md: 1.25, lg: 0 },
                  minHeight: { md: 110, lg: 72 },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "#000",
                    textAlign: { md: "center", lg: "left" },
                    minHeight: 58,
                  }}
                >
                  Choose your Parking
                  {searchData.airport && (
                    <Typography
                      component="span"
                      sx={{ fontSize: "0.7em", ml: 1, color: "#666" }}
                    >
                      ({getAirportTitle(searchData.airport)})
                    </Typography>
                  )}
                  <Typography
                    component="span"
                    sx={{
                      display: "block",
                      fontSize: "0.6em",
                      color: hasApiProducts ? "success.main" : "warning.main",
                      fontWeight: 600,
                      mt: 0.5,
                      minHeight: 18,
                    }}
                  ></Typography>
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: { md: "center", lg: "flex-end" },
                    alignItems: "center",
                    gap: 0.5,
                    mt: { md: 0.5, lg: 0 },
                    minHeight: 40,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ mr: 0.5, color: "#000", fontSize: 14 }}
                  >
                    Filter by:
                  </Typography>

                  {chipData.map((chip, i) => (
                    <AnimateOnScroll
                      key={chip.key}
                      type="fade"
                      duration={600}
                      delay={BASE + 60 + i * 60}
                      easingTransform={EASE_SOFT}
                      easingOpacity={EASE_SOFT}
                      threshold={THRESHOLD}
                      rootMargin={ROOT_MARGIN}
                      once
                      style={smoothStyle}
                      as="span"
                    >
                      <Chip
                        label={chip.label}
                        clickable
                        onClick={() => handleChipClick(chip.key)}
                        sx={chipSx(activeFilter === chip.key)}
                      />
                    </AnimateOnScroll>
                  ))}

                  <AnimateOnScroll
                    type="fade"
                    duration={620}
                    delay={BASE + 60 + chipData.length * 60}
                    easingTransform={EASE_SOFT}
                    easingOpacity={EASE_SOFT}
                    threshold={THRESHOLD}
                    rootMargin={ROOT_MARGIN}
                    once
                    style={smoothStyle}
                  >
                    <FormControl
                      size="small"
                      sx={{ minWidth: { md: 120, lg: 90 } }}
                    >
                      <Select
                        value={sortBy}
                        onChange={handleSortChange}
                        displayEmpty
                        sx={{
                          height: 24,
                          fontSize: 12,
                          borderRadius: 1,
                          border: `1px solid ${theme.palette.primary.main}`,
                          color: "primary.main",
                          fontWeight: 500,
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        }}
                      >
                        <MenuItem value="">Sort by</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                        <MenuItem value="rating">Rating</MenuItem>
                        <MenuItem value="name">Name</MenuItem>
                      </Select>
                    </FormControl>
                  </AnimateOnScroll>
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 1.5,
                  mb: 1,
                  px: 2,
                  py: 1.25,
                  borderRadius: 2,
                  backgroundColor: "#FFF8E1",
                  border: "1px solid rgba(248, 190, 20, 0.35)",
                  minHeight: 52,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#5F4B00",
                    fontWeight: 600,
                    textAlign: { md: "center", lg: "left" },
                    width: "100%",
                  }}
                >
                  A £1.95 booking fee applies to all bookings.
                </Typography>
              </Box>
            </AnimateOnScroll>
          )}

          {isSmall && (
            <AnimateOnScroll
              type="slide-up"
              distance={18}
              duration={760}
              delay={BASE}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <Box
                sx={{
                  py: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  minHeight: 180,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: "#000",
                    textAlign: "center",
                    minHeight: 64,
                  }}
                >
                  Choose your Parking
                  {searchData.airport && (
                    <Typography
                      component="span"
                      sx={{ fontSize: "0.7em", ml: 1, color: "#666" }}
                    >
                      ({getAirportTitle(searchData.airport)})
                    </Typography>
                  )}
                  <Typography
                    component="span"
                    sx={{
                      display: "block",
                      fontSize: "0.6em",
                      color: hasApiProducts ? "success.main" : "warning.main",
                      fontWeight: 600,
                      mt: 0.5,
                      minHeight: 18,
                    }}
                  ></Typography>
                </Typography>

                <Box
                  sx={{
                    mt: 0.5,
                    px: 1.5,
                    py: 1.1,
                    borderRadius: 2,
                    backgroundColor: "#FFF8E1",
                    border: "1px solid rgba(248, 190, 20, 0.35)",
                    minHeight: 50,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#5F4B00",
                      fontWeight: 600,
                      textAlign: "center",
                      fontSize: "0.9rem",
                      width: "100%",
                    }}
                  >
                    A £1.95 booking fee applies to all bookings.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 0.5,
                    overflowX: "auto",
                    px: 0.5,
                    py: 0.5,
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                    minHeight: 32,
                    alignItems: "center",
                  }}
                >
                  {chipData.map((chip, i) => (
                    <AnimateOnScroll
                      key={chip.key}
                      type="fade"
                      duration={600}
                      delay={BASE + 40 + i * 70}
                      easingTransform={EASE_SOFT}
                      easingOpacity={EASE_SOFT}
                      threshold={THRESHOLD}
                      rootMargin={ROOT_MARGIN}
                      once
                      style={smoothStyle}
                      as="span"
                    >
                      <Chip
                        label={chip.label}
                        clickable
                        onClick={() => handleChipClick(chip.key)}
                        sx={chipSx(activeFilter === chip.key)}
                      />
                    </AnimateOnScroll>
                  ))}
                </Box>

                <AnimateOnScroll
                  type="fade"
                  duration={620}
                  delay={BASE + 40 + chipData.length * 70}
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <FormControl size="small" sx={{ width: "100%" }}>
                    <Select
                      value={sortBy}
                      onChange={handleSortChange}
                      displayEmpty
                      sx={{
                        height: 36,
                        borderRadius: 1,
                        border: `1px solid ${theme.palette.primary.main}`,
                        color: "primary.main",
                        fontSize: "15px",
                        fontWeight: 500,
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                    >
                      <MenuItem value="" sx={{ fontSize: "15px" }}>
                        Sort by
                      </MenuItem>
                      <MenuItem value="price">Price</MenuItem>
                      <MenuItem value="rating">Rating</MenuItem>
                      <MenuItem value="name">Name</MenuItem>
                    </Select>
                  </FormControl>
                </AnimateOnScroll>
              </Box>
            </AnimateOnScroll>
          )}

          <Box sx={{ paddingY: 5, minHeight: 320 }}>
            {filteredOptions.length > 0 ? (
              <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
                {filteredOptions.map((p, i) => (
                  <Grid
                    key={p.id}
                    size={{ xs: 12, md: 6, lg: 4 }}
                    sx={{
                      display: "flex",
                      alignItems: "stretch",
                    }}
                  >
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
                      style={{
                        ...parkingCardStyle,
                        width: "100%",
                        display: "flex",
                      }}
                    >
                      <ParkingCard
                        item={p}
                        onMoreInfo={() => console.log("More info:", p.id)}
                      />
                    </AnimateOnScroll>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <AnimateOnScroll
                type="fade"
                duration={100}
                delay={BASE}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    py: 4,
                    minHeight: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    {searchData.airport
                      ? getAirportTitle(searchData.airport)
                      : ""}
                  </Typography>
                </Box>
              </AnimateOnScroll>
            )}
          </Box>
        </PageWrapper>
      </Box>
    </>
  );
}