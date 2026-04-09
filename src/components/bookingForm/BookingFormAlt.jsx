import * as React from "react";
import {
  format,
  addDays,
  addYears,
  addMinutes,
  startOfDay,
  isBefore,
  isAfter,
  isSameDay,
  set,
  getHours,
  getMinutes,
  parseISO,
  isValid
} from "date-fns";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check"; // ✅ Import Check Icon

// ✅ Redux and Navigation
import { useLocation, useNavigate, useSearchParams, useParams } from "react-router-dom";
import { airportConfigs } from "../../data/airportConfigs";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSearchData,
  setSearchData,
  updateSearchField,
} from "../../redux/slice/searchSlice";

// ✅ reusable
import AirportDropdown from "../reusable/AirportDropdown";
import GuestsDropdown from "../reusable/GuestDropdown";
import DateCard from "../reusable/DateCard";
import TimeCard from "../reusable/TimeCard";
import DiscountCodeField from "../reusable/DiscountCodeField";

// ✅ data and utilities
import { airportCode } from "../../assets/data";
import {
  parseSearchParamsFromUrl,
  updateUrlWithSearchParams,
} from "../../utils/urlUtils";
import { useAirports } from "../../hooks/useAirports";
// ✅ User region detection hook
import { useUserRegion } from "../../hooks/useUserRegion";
import { fetchProducts } from "../../services/productsService";
import CustomButton from "../reusable/CustomButton";

export default function BookingFormAlt({ forceMobile = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const reduxSearchData = useSelector(selectSearchData);
  const isBookingPage = location.pathname === "/booking";

  // Utility to force mobile sizing for Grid items when embedded in narrow sidebars
  const gridSize = (sizes) => (forceMobile ? { xs: 12 } : sizes);

  // ✅ Dynamic airports data
  const { airports, loading: airportsLoading } = useAirports();

  // ✅ User region detection from IP
  const { region: userRegion, isDubai: isUserFromDubai, loading: regionLoading } = useUserRegion();

  // ✅ Filter airports based on user region - hide Dubai when user is NOT from Dubai
  const filteredAirports = React.useMemo(() => {
    if (!airports || airports.length === 0) return [];
    
    // Helper function to check if airport is Dubai
    const isDubaiAirport = (apt) => {
      return (apt.level && apt.level.toLowerCase().includes('dubai')) ||
        (apt.value && apt.value.toLowerCase() === 'dxb') ||
        (apt.name && apt.name.toLowerCase().includes('dubai')) ||
        (apt.code && apt.code.toLowerCase() === 'dxb');
    };
    
    // If user is NOT from Dubai, exclude Dubai airport
    if (!isUserFromDubai) {
      return airports.filter(apt => !isDubaiAirport(apt));
    }
    
    // If user is from Dubai, show all airports including Dubai
    return airports;
  }, [airports, isUserFromDubai]);

  /* ---- Config ---- */
  const TIME_STEP_MIN = 30; // keep in sync with DateTimeDropdown timeStep
  const YEAR_MIN = 2025;
  const YEAR_MAX = 2027;
  const MAX_RANGE = addYears(new Date(), 2);

  /* ---- Helpers ---- */
  const roundUpToStep = (t, stepMin = TIME_STEP_MIN) => {
    if (!t) return t;
    const minutes = getMinutes(t);
    const remainder = minutes % stepMin;
    const base = remainder === 0 ? t : addMinutes(t, stepMin - remainder);
    return set(base, { seconds: 0, milliseconds: 0 });
  };
  const nowRounded = () => roundUpToStep(new Date());

  const clampTo = (dt, min, max) => {
    if (!dt) return dt;
    if (min && isBefore(dt, min)) return min;
    if (max && isAfter(dt, max)) return max;
    return dt;
  };

  // Helper functions to get combined date/time like BookingForm.jsx
  const getEntryDateTime = () => {
    if (!entryDate || !entryTime) return null;
    return set(entryDate, {
      hours: getHours(entryTime),
      minutes: getMinutes(entryTime),
      seconds: 0,
      milliseconds: 0
    });
  };

  const getExitDateTime = () => {
    if (!exitDate || !exitTime) return null;
    return set(exitDate, {
      hours: getHours(exitTime),
      minutes: getMinutes(exitTime),
      seconds: 0,
      milliseconds: 0
    });
  };

  /* ---- State ---- */
  const [airport, setAirport] = React.useState("");
  const [airportOpen, setAirportOpen] = React.useState(false);

  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const [guestsOpen, setGuestsOpen] = React.useState(false);

  // ✅ FIXED: Default to today and 7 days from today - Separate date and time fields
  // ✅ FIXED: Default to today and 7 days from today - Separate date and time fields
  const today = new Date(); // ✅ Today's date
  const sevenDaysFromToday = addDays(today, 7); // Exit date 7 days from today
  const noonTime = set(today, { hours: 12, minutes: 0 }); // Default time at noon

  // Separate date and time states like BookingForm.jsx
  const [entryDate, setEntryDate] = React.useState(today); // Entry date
  const [entryTime, setEntryTime] = React.useState(noonTime); // Entry time
  const [exitDate, setExitDate] = React.useState(sevenDaysFromToday); // Exit date
  const [exitTime, setExitTime] = React.useState(noonTime); // Exit time

  const [entryDateOpen, setEntryDateOpen] = React.useState(false);
  const [entryTimeOpen, setEntryTimeOpen] = React.useState(false);
  const [exitDateOpen, setExitDateOpen] = React.useState(false);
  const [exitTimeOpen, setExitTimeOpen] = React.useState(false);

  const [code, setCode] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  // Flag to prevent multiple auto-fetches on component load
  const [hasAutoFetched, setHasAutoFetched] = React.useState(false);

  // ✅ New state for success feedback
  const [isUpdateSuccess, setIsUpdateSuccess] = React.useState(false);

  // Helper function to fetch products - wrapped in useCallback
  const fetchProductsForSearch = React.useCallback(
    async (searchData) => {
      try {
        // Get discount code from multiple possible sources
        const discountCode =
          searchData.discountCode || searchData.promocode || "";

        const productsParams = {
          airport: searchData.airport,
          departure: `${searchData.entryDate} ${searchData.entryTime}`,
          arrival: `${searchData.exitDate} ${searchData.exitTime}`,
          promocode: discountCode,
        };

        const productsResult = await fetchProducts(productsParams);

        if (productsResult.success) {
          // Store products in Redux
          dispatch(
            setSearchData({
              ...searchData,
              products: productsResult.data,
              productsCount: productsResult.data.length,
            })
          );
        } else {
          // Still update search data but with empty products
          dispatch(
            setSearchData({
              ...searchData,
              products: [],
              productsCount: 0,
              productsError: productsResult.error,
            })
          );
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        dispatch(
          setSearchData({
            ...searchData,
            products: [],
            productsCount: 0,
            productsError: error.message,
          })
        );
      }
    },
    [dispatch]
  );

  // Stable reference to track if we've initialized
  const initRef = React.useRef(false);

  /* ---- Init from URL params only on mount or URL change ---- */
  React.useEffect(() => {
    // Only parse URL params, don't depend on Redux to prevent loops
    const urlParams = parseSearchParamsFromUrl(searchParams);

    // Check if we're on Manchester Airport page
    const isManchesterPage =
      location.pathname === "/manchester-airport-parking";

    // If we have URL params, use them (they take priority)
    if (urlParams.airport) {
      // Set state values (only if different)
      if (urlParams.airport !== airport) setAirport(urlParams.airport);
      if (urlParams.adults !== adults) setAdults(urlParams.adults);
      if (urlParams.children !== children) setChildren(urlParams.children);

      const newCode = urlParams.discountCode || urlParams.promocode || "";
      if (newCode !== code) setCode(newCode);

      // Handle dates and times separately
      if (urlParams.entryDate) {
        const entryDateParsed = parseISO(urlParams.entryDate);
        if (isValid(entryDateParsed)) {
          setEntryDate(entryDateParsed);
        }
      }

      if (urlParams.entryTime) {
        const [hours, minutes] = urlParams.entryTime.split(":");
        const entryTimeParsed = set(new Date(), {
          hours: parseInt(hours),
          minutes: parseInt(minutes)
        });
        if (isValid(entryTimeParsed)) {
          setEntryTime(entryTimeParsed);
        }
      }

      if (urlParams.exitDate) {
        const exitDateParsed = parseISO(urlParams.exitDate);
        if (isValid(exitDateParsed)) {
          setExitDate(exitDateParsed);
        }
      }

      if (urlParams.exitTime) {
        const [hours, minutes] = urlParams.exitTime.split(":");
        const exitTimeParsed = set(new Date(), {
          hours: parseInt(hours),
          minutes: parseInt(minutes)
        });
        if (isValid(exitTimeParsed)) {
          setExitTime(exitTimeParsed);
        }
      }

      // Auto-fetch products on booking page load if we have search params
      if (
        isBookingPage &&
        urlParams.airport &&
        urlParams.entryDate &&
        urlParams.exitDate &&
        !hasAutoFetched
      ) {
        setHasAutoFetched(true);
        fetchProductsForSearch(urlParams);
      }

      initRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]); // Only depend on URL params string

  // Separate effect for Redux initialization (only if no URL params)
  React.useEffect(() => {
    if (!initRef.current && reduxSearchData.airport && !airport) {
      if (reduxSearchData.airport !== airport)
        setAirport(reduxSearchData.airport);
      if (reduxSearchData.adults !== adults) setAdults(reduxSearchData.adults);
      if (reduxSearchData.children !== children)
        setChildren(reduxSearchData.children);

      const newCode = reduxSearchData.discountCode || "";
      if (newCode !== code) setCode(newCode);

      initRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxSearchData.airport]); // Only run when Redux airport changes

  // Set Manchester/Birmingham/Dublin/Heathrow as default airport when on respective Airport pages
  React.useEffect(() => {
    const isManchesterPage =
      location.pathname === "/manchester-airport-parking";
    const isHeathrowPage = location.pathname === "/heathrow-airport-parking";
    const isLeedsPage = location.pathname === "/leeds-airport-parking";
    const isStanstedPage = location.pathname === "/stansted-airport-parking";
    const isBirminghamPage =
      location.pathname === "/birmingham-airport-parking";
    const isDublinPage = location.pathname === "/dublin-airport-parking";
    const isBristolPage = location.pathname === "/bristol-airport-parking";
    const isLutonPage = location.pathname === "/luton-airport-parking";
    const isSouthamptonPage = location.pathname === "/southampton-port-parking";
    const isGlasgowPage = location.pathname === "/glasgow-airport-parking";
    const isDubaiPage = location.pathname === "/dubai-airport-parking";

    // Only apply defaults on specific airport pages
    if (
      !isManchesterPage &&
      !isHeathrowPage &&
      !isLeedsPage &&
      !isBirminghamPage &&
      !isDublinPage &&
      !isStanstedPage &&
      !isBristolPage &&
      !isLutonPage &&
      !isSouthamptonPage &&
      !isGlasgowPage &&
      !isDubaiPage
    )
      return;

    // If URL already specifies an airport, do not override it
    const urlHasAirport = !!searchParams.get("airport");
    if (urlHasAirport) return;

    // Need airports to resolve the correct value
    if (!airports || airports.length === 0) return;

    const targetCode = isManchesterPage
      ? "MAN"
      : isHeathrowPage
        ? "LHR"
        : isLeedsPage
          ? "LBA"
          : isBirminghamPage
            ? "BHX"
            : isStanstedPage
              ? "STN"
              : isBristolPage
                ? "BRS"
                : isLutonPage
                  ? "LTN"
                : isSouthamptonPage
                      ? "GBSOU"
                  : isGlasgowPage
                      ? "GLA"
                    : isDubaiPage
                      ? "DXB"
                  : "DUB";

    const targetCity = isManchesterPage
      ? "manchester"
      : isHeathrowPage
        ? "heathrow"
        : isLeedsPage
          ? "leeds"
          : isBirminghamPage
            ? "birmingham"
            : isStanstedPage
              ? "stansted"
              : isBristolPage
                ? "bristol"
                : isLutonPage
                  ? "luton"
                : isSouthamptonPage
                      ? "southampton"
                  : isGlasgowPage
                      ? "glasgow"
                      : isDubaiPage
                        ? "dubai"
                  : "dublin";

    // If current already matches the target code, nothing to do
    const currentCode = (airport || "").toUpperCase();
    if (currentCode === targetCode) return;

    const matchesTarget = (apt) =>
      (apt.value && String(apt.value).toUpperCase() === targetCode) ||
      (apt.code && String(apt.code).toUpperCase() === targetCode) ||
      (apt.level && String(apt.level).toLowerCase().includes(targetCity)) ||
      (apt.name && String(apt.name).toLowerCase().includes(targetCity)) ||
      (apt.label && String(apt.label).toLowerCase().includes(targetCity));

    let match = airports.find(matchesTarget);
    if (!match) {
      match = airportCode.find(matchesTarget);
    }

    if (match) {
      const airportValue =
        match.value || match.code || match.level || match.name || match.label;

      setAirport(airportValue);
      dispatch(updateSearchField({ field: "airport", value: airportValue }));

      // Mark as initialized to prevent other init flows from competing
      initRef.current = true;
    }
  }, [location.pathname, airports, searchParams.toString(), dispatch]);

  // ✅ NEW: Set Dubai as default airport based on IP region detection
  // This runs when user region is detected and airports are loaded
  React.useEffect(() => {
    // Only run if:
    // 1. User is from Dubai (based on IP)
    // 2. Airports are loaded
    // 3. No airport is selected yet
    // 4. Not on a specific airport page (let the page-specific logic handle it)
    const isSpecificAirportPage = 
      location.pathname === '/manchester-airport-parking' ||
      location.pathname === '/heathrow-airport-parking' ||
      location.pathname === '/leeds-airport-parking' ||
      location.pathname === '/stansted-airport-parking' ||
      location.pathname === '/bristol-airport-parking' ||
      location.pathname === '/luton-airport-parking' ||
      location.pathname === '/birmingham-airport-parking' ||
      location.pathname === '/southampton-port-parking' ||
      location.pathname === '/glasgow-airport-parking' ||
      location.pathname === '/dubai-airport-parking' ||
      location.pathname === '/dublin-airport-parking';

    if (
      isUserFromDubai && 
      !regionLoading && 
      airports && 
      airports.length > 0 && 
      !airport &&
      !isSpecificAirportPage
    ) {
      console.log('🌍 IP Detection: User is from Dubai, setting Dubai Airport as default in BookingFormAlt');
      
      const dubaiAirport = airports.find(apt =>
        (apt.level && apt.level.toLowerCase().includes('dubai')) ||
        (apt.value && apt.value.toLowerCase() === 'dxb') ||
        (apt.name && apt.name.toLowerCase().includes('dubai')) ||
        (apt.code && apt.code.toLowerCase() === 'dxb')
      );

      if (dubaiAirport) {
        const airportValue = dubaiAirport.value || dubaiAirport.code || dubaiAirport.level;
        
        setAirport(airportValue);
        dispatch(updateSearchField({ field: "airport", value: airportValue }));
      } else {
        console.log('❌ IP Detection: Dubai airport not found in:', airports);
      }
    }
  }, [isUserFromDubai, regionLoading, airports, airport, dispatch, location.pathname]);

  // Ensure on first mount the default entry isn't in the past
  React.useEffect(() => {
    // Skip this validation if we've already initialized from URL params
    if (initRef.current) {
      return;
    }

    const nr = nowRounded();
    const entryDateTime = getEntryDateTime();
    const exitDateTime = getExitDateTime();

    if (entryDateTime && isBefore(entryDateTime, nr)) {
      handleEntryDateChange(nr);
      handleEntryTimeChange(nr);
    }

    // also ensure exit respects (entry + step)
    const minExit = entryDateTime
      ? addMinutes(entryDateTime, TIME_STEP_MIN)
      : addMinutes(nr, TIME_STEP_MIN);
    if (exitDateTime && isBefore(exitDateTime, minExit)) {
      handleExitDateChange(minExit);
      handleExitTimeChange(minExit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  const openOnly = (which) => {
    setAirportOpen(which === "airport");
    setGuestsOpen(which === "guests");
    setEntryDateOpen(which === "entryDate");
    setEntryTimeOpen(which === "entryTime");
    setExitDateOpen(which === "exitDate");
    setExitTimeOpen(which === "exitTime");
  };

  /* ---- Change handlers with clamping - Separate date/time handlers like BookingForm.jsx ---- */

  // Entry Date Change Handler
  const handleEntryDateChange = (newDate) => {
    if (!newDate) return;
    setEntryDate(newDate);

    const now = new Date();
    // if switching to today and chosen time is before now, bump to next slot
    if (isSameDay(newDate, now)) {
      const currentEntry = set(newDate, {
        hours: getHours(entryTime),
        minutes: getMinutes(entryTime)
      });
      if (isBefore(currentEntry, now)) {
        setEntryTime(roundUpToStep(now));
      }
    }

    // Always set exit date to entry date + 7 days (like BookingForm.jsx)
    setExitDate(addDays(newDate, 7));

    // Sync with Redux
    dispatch(
      updateSearchField({
        field: "entryDate",
        value: format(newDate, "yyyy-MM-dd"),
      })
    );
    dispatch(
      updateSearchField({
        field: "exitDate",
        value: format(addDays(newDate, 7), "yyyy-MM-dd"),
      })
    );
  };

  // Entry Time Change Handler
  const handleEntryTimeChange = (newTime) => {
    if (!newTime) return;
    const now = new Date();

    let nextTime = newTime;
    // if entry date is today, prevent picking a past time by snapping forward
    if (isSameDay(entryDate, now)) {
      const candidate = set(entryDate, {
        hours: getHours(newTime),
        minutes: getMinutes(newTime)
      });
      if (isBefore(candidate, now)) {
        nextTime = roundUpToStep(now);
      }
    }

    setEntryTime(nextTime);

    // keep existing exit >= entry logic
    const newEntry = set(entryDate, {
      hours: getHours(nextTime),
      minutes: getMinutes(nextTime)
    });
    const currentExit = getExitDateTime();
    if (currentExit && isAfter(newEntry, currentExit)) {
      const bumpedExit = addMinutes(nextTime, 60);
      setExitTime(bumpedExit);
      dispatch(
        updateSearchField({
          field: "exitTime",
          value: format(bumpedExit, "HH:mm"),
        })
      );
    }

    // Sync with Redux
    dispatch(
      updateSearchField({ field: "entryTime", value: format(nextTime, "HH:mm") })
    );
  };

  // Exit Date Change Handler
  const handleExitDateChange = (newDate) => {
    if (!newDate) return;
    const newExit = set(newDate, {
      hours: getHours(exitTime),
      minutes: getMinutes(exitTime)
    });
    const currentEntry = getEntryDateTime();

    // Don't allow exit before entry
    if (currentEntry && isBefore(newExit, currentEntry)) return;
    setExitDate(newDate);

    // Sync with Redux
    dispatch(
      updateSearchField({
        field: "exitDate",
        value: format(newDate, "yyyy-MM-dd"),
      })
    );
  };

  // Exit Time Change Handler
  const handleExitTimeChange = (newTime) => {
    if (!newTime) return;
    const newExit = set(exitDate, {
      hours: getHours(newTime),
      minutes: getMinutes(newTime)
    });
    const currentEntry = getEntryDateTime();

    // Don't allow exit before entry
    if (currentEntry && isBefore(newExit, currentEntry)) return;
    setExitTime(newTime);

    // Sync with Redux
    dispatch(
      updateSearchField({ field: "exitTime", value: format(newTime, "HH:mm") })
    );
  };

  const handleAirportChange = (newAirport) => {
    setAirport(newAirport);
    dispatch(updateSearchField({ field: "airport", value: newAirport }));
  };

  const handleGuestsChange = ({ adults: a, children: c }) => {
    setAdults(a);
    setChildren(c);
    dispatch(updateSearchField({ field: "adults", value: a }));
    dispatch(updateSearchField({ field: "children", value: c }));
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    dispatch(updateSearchField({ field: "discountCode", value: newCode }));
  };

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        borderRadius: forceMobile ? 0 : "20px",
        px: forceMobile ? 0 : { xs: 2, sm: 3 },
        py: forceMobile ? 0 : { xs: 3, sm: 4 },
        mx: forceMobile ? 0 : "auto",
        maxWidth: forceMobile ? "100%" : "1200px",
        width: "100%",
      }}
    >
      <Grid
        container
        spacing={1}
        alignItems="stretch"
        justifyContent="center"
        sx={{
          "& > .MuiGrid-item > *": { minHeight: forceMobile ? 56 : 72 },
          maxWidth: "100%",
        }}
      >
        {/* Airport */}
        <Grid size={gridSize({ xs: 12, sm: 6, lg: 2.4 })}>
          <AirportDropdown
            value={airport}
            options={filteredAirports?.length > 0 ? filteredAirports : airportCode}
            open={airportOpen}
            onOpenChange={(next) => {
              setAirportOpen(next);
              if (next) openOnly("airport");
            }}
            onChange={handleAirportChange}
            placeholder={
              airportsLoading ? "Loading airports..." : "Select Airport"
            }
          />
        </Grid>

        {/* Entry Date */}
        <Grid size={gridSize({ xs: 6, sm: 3, lg: 1.8 })}>
          <DateCard
            maxHeight={45}
            label="Entry Date"
            value={entryDate}
            onChange={handleEntryDateChange}
            open={entryDateOpen}
            onOpenChange={(next) => {
              setEntryDateOpen(next);
              if (next) openOnly("entryDate");
            }}
            minDate={startOfDay(new Date())}
            maxDate={addYears(new Date(), 2)}
            minYear={YEAR_MIN}
            maxYear={YEAR_MAX}
          />
        </Grid>

        {/* Entry Time */}
        <Grid size={gridSize({ xs: 6, sm: 3, lg: 1.8 })}>
          <TimeCard
            maxHeight={45}
            label="Entry Time"
            value={entryTime}
            onChange={handleEntryTimeChange}
            open={entryTimeOpen}
            onOpenChange={(next) => {
              setEntryTimeOpen(next);
              if (next) openOnly("entryTime");
            }}
            timeStep={TIME_STEP_MIN}
            // ⬇️ prevent selecting a past time when the entry date is today
            minTime={
              isSameDay(entryDate, new Date()) ? roundUpToStep(new Date()) : null
            }
          />
        </Grid>

        {/* Exit Date */}
        <Grid size={gridSize({ xs: 6, sm: 3, lg: 1.8 })}>
          <DateCard
            maxHeight={45}
            label="Exit Date"
            value={exitDate}
            onChange={handleExitDateChange}
            minDate={entryDate}
            maxDate={addYears(new Date(), 2)}
            minYear={YEAR_MIN}
            maxYear={YEAR_MAX}
            open={exitDateOpen}
            onOpenChange={(next) => {
              setExitDateOpen(next);
              if (next) openOnly("exitDate");
            }}
          />
        </Grid>

        {/* Exit Time */}
        <Grid size={gridSize({ xs: 6, sm: 3, lg: 1.8 })}>
          <TimeCard
            maxHeight={45}
            label="Exit Time"
            value={exitTime}
            onChange={handleExitTimeChange}
            minTime={isSameDay(entryDate, exitDate) ? entryTime : null}
            open={exitTimeOpen}
            onOpenChange={(next) => {
              setExitTimeOpen(next);
              if (next) openOnly("exitTime");
            }}
            timeStep={30}
          />
        </Grid>

        {/* Guests */}
        {/* <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
          <GuestsDropdown
            adults={adults}
            children={children}
            open={guestsOpen}
            onOpenChange={(next) => {
              setGuestsOpen(next);
              if (next) openOnly("guests");
            }}
            onChange={handleGuestsChange}
          />
        </Grid> */}

        {/* Discount Code */}
        <Grid size={gridSize({ xs: 12, sm: 6, lg: 2.4 })}>
          <DiscountCodeField value={code} onChange={handleCodeChange} />
        </Grid>

        {/* Update button */}
        <Grid size={gridSize({ xs: 12, sm: 6, lg: 1.8 })} display="flex">
          <CustomButton
            fullWidth
            isLoading={isSearching}
            loadingText="Updating..."
            onClick={async () => {
              // Prevent clicking if already successful/loading
              if (isUpdateSuccess || isSearching) return;

              setIsSearching(true);
              setIsUpdateSuccess(false); // reset just in case

              try {
                const entryDateTime = getEntryDateTime();
                const exitDateTime = getExitDateTime();

                const payload = {
                  airport,
                  adults,
                  children,
                  guests: { adults, children, total: adults + children },
                  discountCode: code || "",
                  trafficSource: reduxSearchData.trafficSource || "",
                  entryDate: entryDate ? format(entryDate, "yyyy-MM-dd") : "",
                  entryTime: entryTime ? format(entryTime, "HH:mm") : "",
                  exitDate: exitDate ? format(exitDate, "yyyy-MM-dd") : "",
                  exitTime: exitTime ? format(exitTime, "HH:mm") : "",
                  entryISO: entryDateTime ? entryDateTime.toISOString() : "",
                  exitISO: exitDateTime ? exitDateTime.toISOString() : "",
                  pretty: {
                    entryDate: entryDate ? format(entryDate, "dd/MM/yyyy") : "",
                    entryTime: entryTime ? format(entryTime, "HH:mm") : "",
                    exitDate: exitDate ? format(exitDate, "dd/MM/yyyy") : "",
                    exitTime: exitTime ? format(exitTime, "HH:mm") : "",
                  },
                };

                console.log("🔄 BookingFormAlt Update search:", payload);

                // Fetch new products with updated search criteria
                const productsParams = {
                  airport,
                  departure: entryDateTime ? format(entryDateTime, "yyyy-MM-dd HH:mm") : "",
                  arrival: exitDateTime ? format(exitDateTime, "yyyy-MM-dd HH:mm") : "",
                  ...(code && { promocode: code }),
                };

                console.log("📦 Fetching updated products:", productsParams);

                const productsResult = await fetchProducts(productsParams);
                console.log("📥 Updated products result:", productsResult);

                if (productsResult.success) {
                  console.log(
                    `✅ Found ${productsResult.data.length} updated parking options!`
                  );
                  // Store products in Redux
                  dispatch(
                    setSearchData({
                      ...payload,
                      products: productsResult.data,
                      productsCount: productsResult.data.length,
                    })
                  );

                  // ✅ Show success state
                  setIsUpdateSuccess(true);
                  setTimeout(() => {
                    setIsUpdateSuccess(false);
                  }, 3000); // revert after 3s

                } else {
                  console.warn(
                    "⚠️ No updated products found:",
                    productsResult.error
                  );
                  // Still update search data but with empty products
                  dispatch(
                    setSearchData({
                      ...payload,
                      products: [],
                      productsCount: 0,
                      productsError: productsResult.error,
                    })
                  );
                }

                // Update URL with new search params
                if (isBookingPage) {
                  const urlSearchString = new URLSearchParams();
                  urlSearchString.set("airport", payload.airport);
                  urlSearchString.set(
                    "departure",
                    `${payload.entryDate}+${payload.entryTime}`
                  );
                  urlSearchString.set(
                    "arrival",
                    `${payload.exitDate}+${payload.exitTime}`
                  );
                  urlSearchString.set("adults", payload.adults.toString());
                  urlSearchString.set("children", payload.children.toString());
                  urlSearchString.set("promocode", payload.discountCode);
                  urlSearchString.set("product", "null");

                  navigate(`${location.pathname}?${urlSearchString.toString()}`, { replace: true });
                } else {
                  // Navigate to booking page with URL params
                  updateUrlWithSearchParams(payload, navigate, "/booking");
                }
              } catch (error) {
                console.error("❌ Update search error:", error);
              } finally {
                setIsSearching(false);
              }
            }}
            sx={{
              backgroundColor: isUpdateSuccess ? "success.main" : "primary.main",
              "&:hover": {
                backgroundColor: isUpdateSuccess ? "success.dark" : "primary.dark",
              },
              transition: "background-color 0.3s ease",
            }}
          >
            {isUpdateSuccess ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckIcon />
                Updated
              </Box>
            ) : (
              "Update"
            )}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}
