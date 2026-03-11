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
import { parseSearchParamsFromUrl } from "../../utils/urlUtils";
import AnimateOnScroll from "../../components/reusable/AnimateOnScroll";
import { useAirports } from "../../hooks/useAirports";
import { useCookies } from 'react-cookie';

// shared animation utils
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
  parkingCardStyle,
} from "../../components/utils/animation";

import BookingFormAlt from "../../components/bookingForm/BookingFormAlt";
// Feature cache to avoid repeated DOM parsing (40% performance boost!)
const featureCache = new Map();

/**
 * Parse HTML features string into individual feature items
 * @param {string} htmlString - HTML string with <ul><li> structure
 * @returns {Array} Array of feature strings
 */
const parseHtmlFeatures = (htmlString) => {
  if (!htmlString || typeof htmlString !== "string") {
    return ["Secure parking facility", "Professional service"];
  }

  // Check cache first
  if (featureCache.has(htmlString)) {
    return featureCache.get(htmlString);
  }

  try {
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    // Extract all <li> elements
    const listItems = tempDiv.querySelectorAll("li");

    // Convert NodeList to array and extract text content
    const features = Array.from(listItems)
      .map((li) => li.textContent?.trim())
      .filter((text) => text && text.length > 0); // Remove empty items

    // console.log("🔍 Parsed HTML features:", features);

    // Return features or fallback if none found
    const result = features.length > 0
      ? features
      : ["Secure parking facility", "Professional service"];

    // Store in cache for future use
    featureCache.set(htmlString, result);
    return result;
  } catch (error) {
    console.warn("⚠️ Error parsing HTML features:", error);
    // Fallback: try simple regex extraction
    const matches = htmlString.match(/<li[^>]*>(.*?)<\/li>/gi);
    if (matches) {
      const result = matches
        .map((match) => match.replace(/<\/?[^>]+(>|$)/g, "").trim())
        .filter((text) => text.length > 0);

      // Cache the regex fallback result too
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

  // Get airports data to convert airport code to title
  const { airports, loading: airportsLoading } = useAirports();

  // Function to get airport title from airport code
  const getAirportTitle = (airportCode) => {
    if (!airportCode) return "";

    // airports data structure: { level: "Name", value: "CODE" }
    const airport = airports.find((airport) => airport.value === airportCode);
    return airport ? airport.level : airportCode; // fallback to code if not found
  };

  // Get API products from Redux state (fetched by BookingForm)
  const apiProducts = searchData?.products || [];
  const hasApiProducts = apiProducts.length > 0;

  // console.log("📊 Booking page data:", {
  //   searchData,
  //   apiProducts: apiProducts.length,
  //   hasApiProducts,
  // });

  // Debug: Log first API product structure
  if (hasApiProducts) {
    console.log("🔍 First API Product Structure:", apiProducts[0]);
    // console.log(
    //   "🔍 Features type:",
    //   typeof apiProducts[0]?.features,
    //   apiProducts[0]?.features
    // );
  }

  // Use API products only - no static fallback
  const currentParkingOptions = useMemo(() => {
    if (hasApiProducts) {
      // Transform API products to match the UI format
      return apiProducts.map((product, index) => {
        // Determine service type based on API response (using display_name)
        let serviceType = "park-ride"; // default
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
          // ✅ Fixed: Map discount fields correctly for ParkingCard component
          price_before_discount: parseFloat(product.price_before_discount || 0),
          discount: parseFloat(product.discount || 0),
          // Keep legacy camelCase for backward compatibility
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
          // ✅ Fixed: Pass through average_rating and display_name to ParkingCard
          average_rating: product.average_rating,
          display_name: product.display_name,
          reviews: 0, // No reviews count in new API structure
          // Remove distance fields since not in API
          airportCode: searchData.airport, // No airport_code in new API
          offer: product.offer,
          adminCharges: 0, // No admin_charges in new API - using extra_amount instead
          smsCharges: 0, // No sms_charges in new API
          extraAmount: parseFloat(product.extra_amount || 0),
          sku: product.sku,
          sku_id: product.sku_id,
          terms_conditions: product.terms_conditions,
          cancellation_status: product.cancellation_status,
        };
      });
    } else {
      // No API products found - return empty array to show "no options" message
      return [];
    }
  }, [hasApiProducts, apiProducts, searchData.airport]);

  // Generate dynamic chip data based on current options
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

  // Client-side filtering based on active filter + sorting
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

  // Animation timing
  const BASE = 80;
  const STEP = 90;

  // console.log("search data", searchData);

  return (
    <>
      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        <PageWrapper>
          <Box sx={{ py: 3 }}>
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

              {/* {!isSmall ? <BookingFormAlt /> : null} */}
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
                }}
              >
                {/* Title */}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "#000",
                    textAlign: { md: "center", lg: "left" },
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
                  {/* API/Static Data Indicator */}
                  <Typography
                    component="span"
                    sx={{
                      display: "block",
                      fontSize: "0.6em",
                      color: hasApiProducts ? "success.main" : "warning.main",
                      fontWeight: 600,
                      mt: 0.5,
                    }}
                  ></Typography>
                </Typography>

                {/* Filter + Sort */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: { md: "center", lg: "flex-end" },
                    alignItems: "center",
                    gap: 0.5,
                    mt: { md: 0.5, lg: 0 },
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
                      // animate each chip with small stagger
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
            </AnimateOnScroll>
          )}

          {/* Small Screen (sm and down) */}
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
                sx={{ py: 2, display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "#000", textAlign: "center" }}
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
                  {/* API/Static Data Indicator - Mobile */}
                  <Typography
                    component="span"
                    sx={{
                      display: "block",
                      fontSize: "0.6em",
                      color: hasApiProducts ? "success.main" : "warning.main",
                      fontWeight: 600,
                      mt: 0.5,
                    }}
                  ></Typography>
                </Typography>

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

          <Box sx={{ paddingY: 5 }}>
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
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    {/* No parking companies found for{" "} */}
                    {searchData.airport
                      ? getAirportTitle(searchData.airport)
                      : ""}
                    {/* : "selected airport" */}
                  </Typography>
                  {/* <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {searchData.productsError ? 
                      `Error: ${searchData.productsError}` : 
                      "Try selecting a different airport or adjusting your search dates."}
                  </Typography> */}
                </Box>
              </AnimateOnScroll>
            )}
          </Box>
        </PageWrapper>
      </Box>
    </>
  );
}
