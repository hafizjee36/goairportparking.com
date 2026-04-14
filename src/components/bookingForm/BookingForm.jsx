import * as React from "react";
import {
  format,
  addDays,
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
} from 'date-fns';

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// ✅ Redux and Navigation
import { useLocation, useNavigate, useSearchParams, useParams } from "react-router-dom";
import { airportConfigs } from "../../data/airportConfigs";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchData, setSearchData } from "../../redux/slice/searchSlice";

// ✅ bring in your reusable pieces
import AirportDropdown from "../reusable/AirportDropdown";
import GuestsDropdown from "../reusable/GuestDropdown";
import DateCard from "../reusable/DateCard";
import TimeCard from "../reusable/TimeCard";
import DiscountCodeField from "../reusable/DiscountCodeField";

// ✅ Dynamic airports hook
import { useAirports } from "../../hooks/useAirports";
// ✅ User region detection hook
import { useUserRegion } from "../../hooks/useUserRegion";
// Products service for dynamic parking companies
import { fetchProducts } from "../../services/productsService";
// URL utilities
import { parseSearchParamsFromUrl, updateUrlWithSearchParams } from "../../utils/urlUtils";
import CustomButton from "../reusable/CustomButton";
import theme from "../../theme";
import ErrorMessage from "../reusable/ErrorMessage"; 
import { Height } from "@mui/icons-material";

// IMPROVED: Field Wrapper Component
function FieldWrapper({ children, error, hasAttemptedSubmit, sx = {} }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", ...sx }}>
      {children}
      <ErrorMessage error={error} show={hasAttemptedSubmit} />
    </Box>
  );
}

export default function BookingForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const reduxSearchData = useSelector(selectSearchData);
  const isBookingPage = location.pathname === "/booking";

  const { airports, loading: airportsLoading, error: airportsError } = useAirports();

  const { region: userRegion, isDubai: isUserFromDubai, loading: regionLoading } = useUserRegion();

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


  const today = new Date(); // Changed from tomorrow to today
  const sevenDaysFromToday = addDays(today, 7); // Exit date 7 days from today
  const noonTime = set(new Date(), { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 });

  /* ---- State ---- */
  const [airport, setAirport] = React.useState("");
  const [airportOpen, setAirportOpen] = React.useState(false);

  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const [guestsOpen, setGuestsOpen] = React.useState(false);

  const [entryDate, setEntryDate] = React.useState(today); //  Changed to today
  const [entryTime, setEntryTime] = React.useState(noonTime);
  const [exitDate, setExitDate] = React.useState(sevenDaysFromToday); // Updated reference
  const [exitTime, setExitTime] = React.useState(noonTime);

  const [entryDateOpen, setEntryDateOpen] = React.useState(false);
  const [entryTimeOpen, setEntryTimeOpen] = React.useState(false);
  const [exitDateOpen, setExitDateOpen] = React.useState(false);
  const [exitTimeOpen, setExitTimeOpen] = React.useState(false);

  const [code, setCode] = React.useState("");

  // Validation and loading states
  const [validationErrors, setValidationErrors] = React.useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  // Real-time validation for better UX
  const [showRealTimeValidation, setShowRealTimeValidation] =
    React.useState(false);

  // Initialize from URL params or Redux data - FIXED: Prevent infinite loops
  React.useEffect(() => {
    // Priority: URL params > Redux data > defaults
    const urlParams = parseSearchParamsFromUrl(searchParams);

    // console.log('🔗 URL params found:', urlParams);
    // console.log('🔄 Redux search data:', reduxSearchData);

    // Only run initialization once or when URL params change
    // Don't depend on reduxSearchData to prevent infinite loops
    if (urlParams.airport) {
      // URL params take priority
      const sourceData = urlParams;

      if (sourceData.airport) setAirport(sourceData.airport);
      if (sourceData.adults !== undefined) setAdults(sourceData.adults);
      if (sourceData.children !== undefined) setChildren(sourceData.children);
      if (sourceData.discountCode || sourceData.promocode)
        setCode(sourceData.discountCode || sourceData.promocode);

      // Handle dates and times from URL params
      if (sourceData.entryDate && sourceData.entryTime) {
        setEntryDate(parseISO(sourceData.entryDate));
        const [hours, minutes] = sourceData.entryTime.split(":");
        setEntryTime(set(new Date(), { hours: parseInt(hours), minutes: parseInt(minutes), seconds: 0, milliseconds: 0 }));
      } else if (sourceData.entryDate) {
        setEntryDate(parseISO(sourceData.entryDate));
      }

      if (sourceData.exitDate && sourceData.exitTime) {
        setExitDate(parseISO(sourceData.exitDate));
        const [hours, minutes] = sourceData.exitTime.split(":");
        setExitTime(set(new Date(), { hours: parseInt(hours), minutes: parseInt(minutes), seconds: 0, milliseconds: 0 }));
      } else if (sourceData.exitDate) {
        setExitDate(parseISO(sourceData.exitDate));
      }

      // Update Redux to keep it in sync
      const searchData = {
        airport: sourceData.airport,
        adults: sourceData.adults,
        children: sourceData.children,
        entryDate: sourceData.entryDate,
        entryTime: sourceData.entryTime,
        exitDate: sourceData.exitDate,
        exitTime: sourceData.exitTime,
        discountCode: sourceData.discountCode || sourceData.promocode || "",
        trafficSource: sourceData.trafficSource || "",
      };
      dispatch(setSearchData(searchData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Only depend on searchParams to prevent infinite loops

  // Separate effect for Redux data initialization (only on mount)
  React.useEffect(() => {
    // Only initialize from Redux if no URL params and we haven't initialized yet
    const urlParams = parseSearchParamsFromUrl(searchParams);

    if (!urlParams.airport && reduxSearchData.airport && !airport) {
      console.log('🔄 Initializing from Redux data on mount');
      const sourceData = reduxSearchData;

      if (sourceData.airport) setAirport(sourceData.airport);
      if (sourceData.adults !== undefined) setAdults(sourceData.adults);
      if (sourceData.children !== undefined) setChildren(sourceData.children);
      if (sourceData.discountCode || sourceData.promocode)
        setCode(sourceData.discountCode || sourceData.promocode);

      // Handle dates and times
      if (sourceData.entryDate && sourceData.entryTime) {
        setEntryDate(parseISO(sourceData.entryDate));
        const [hours, minutes] = sourceData.entryTime.split(":");
        setEntryTime(set(new Date(), { hours: parseInt(hours), minutes: parseInt(minutes), seconds: 0, milliseconds: 0 }));
      } else if (sourceData.entryDate) {
        setEntryDate(parseISO(sourceData.entryDate));
      }

      if (sourceData.exitDate && sourceData.exitTime) {
        setExitDate(parseISO(sourceData.exitDate));
        const [hours, minutes] = sourceData.exitTime.split(":");
        setExitTime(set(new Date(), { hours: parseInt(hours), minutes: parseInt(minutes), seconds: 0, milliseconds: 0 }));
      } else if (sourceData.exitDate) {
        setExitDate(parseISO(sourceData.exitDate));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

// Dynamic airport detection using useParams for /:airport-airport-parking
  const params = useParams();
  React.useEffect(() => {
    if (params.airport && !airport && airports && airports.length > 0) {
      // Find matching airport
      const slug = params.airport;
      const config = airportConfigs[slug];
      if (config) {
        const targetAirport = airports.find(apt => 
          (apt.code === config.code) ||
          (apt.level && apt.level.toLowerCase().includes(slug)) ||
          (apt.value && apt.value.toLowerCase().includes(config.code.toLowerCase()))
        );
        if (targetAirport) {
          const airportValue = targetAirport.value || targetAirport.code || targetAirport.level;
          console.log(`🏢 Setting ${config.name} as default for /${slug}-airport-parking page`);
          setAirport(airportValue);
          dispatch(setSearchData({
            ...reduxSearchData,
            airport: airportValue
          }));
        }
      }
    }
  }, [params.airport, airports, airport, dispatch, reduxSearchData]);

  React.useEffect(() => {
    if (!airports || airports.length === 0) return;
  
    const airportMap = [
      { slugs: ['manchester'],              code: 'man',   name: 'Manchester'      },
      { slugs: ['heathrow'],                code: 'lhr',   name: 'Heathrow'        },
      { slugs: ['leeds', 'bradford'],       code: 'lba',   name: 'Leeds Bradford'  },
      { slugs: ['stansted'],                code: 'stn',   name: 'Stansted'        },
      { slugs: ['bristol'],                 code: 'brs',   name: 'Bristol'         },
      { slugs: ['luton'],                   code: 'ltn',   name: 'Luton'           },
      { slugs: ['birmingham'],              code: 'bhx',   name: 'Birmingham'      },
      { slugs: ['southampton'],             code: 'gbsou', name: 'Southampton Port' },
      { slugs: ['glasgow'],                 code: 'gla',   name: 'Glasgow'         },
      { slugs: ['dubai'],                   code: 'dxb',   name: 'Dubai'           },
    ];
  
    const pathname = location.pathname.toLowerCase();
    console.log('pathname: ',pathname);
    // Find which airport matches current URL path
    const matched = airportMap.find(({ slugs }) =>
      slugs.some(slugs => pathname.includes(slugs))
    );
  
    if (!matched) {
      console.log('❌ No airport matched for path:', pathname);
      return;
    }
  
    // Find airport object from airports list
    const foundAirport = airports.find(apt =>
      apt.code?.toLowerCase()  === matched.code ||
      apt.value?.toLowerCase() === matched.code ||
      apt.level?.toLowerCase().includes(matched.slugs[0]) ||
      apt.name?.toLowerCase().includes(matched.slugs[0])
    );
  
    if (foundAirport) {
      const airportValue = foundAirport.value || foundAirport.code || foundAirport.level;
      console.log(`✈️ Found ${matched.name} airport:`, foundAirport, 'Using value:', airportValue);
  
      setAirport(airportValue);
      dispatch(setSearchData({
        ...reduxSearchData,
        airport: airportValue
      }));
    } else {
      console.log(`❌ ${matched.name} airport not found in:`, airports);
    }
  
  }, [location.pathname, airports]);
  // NEW: Set Dubai as default airport based on IP region detection
  // This runs when user region is detected and airports are loaded
  React.useEffect(() => {
    // Only run if:
    // 1. User is from Dubai (based on IP)
    // 2. Airports are loaded
    // 3. No airport is selected yet
    // 4. Not on a specific airport page (let the page-specific logic handle it)
    const isSpecificAirportPage = 
      location.pathname === '/abz-airport-parking' ||
      location.pathname === '/cwl-airport-parking' ||
      location.pathname === '/dov-airport-parking' ||
      location.pathname === '/ema-airport-parking' ||
      location.pathname === '/edi-airport-parking' ||
      location.pathname === '/ext-airport-parking' ||
      location.pathname === '/lgw-airport-parking' ||
      location.pathname === '/man-airport-parking' ||
      location.pathname === '/lhr-airport-parking' ||
      location.pathname === '/lba-airport-parking' ||
      location.pathname === '/stn-airport-parking' ||
      location.pathname === '/brs-airport-parking' ||
      location.pathname === '/ltn-airport-parking' ||
      location.pathname === '/bhx-airport-parking' ||
      location.pathname === '/sop-port-parking' ||
      location.pathname === '/gla-airport-parking' ||
      location.pathname === '/dxb-airport-parking';

    if (
      isUserFromDubai && 
      !regionLoading && 
      airports && 
      airports.length > 0 && 
      !airport &&
      !isSpecificAirportPage
    ) {
      console.log('🌍 IP Detection: User is from Dubai, setting Dubai Airport as default');
      
      const dubaiAirport = airports.find(apt =>
        (apt.level && apt.level.toLowerCase().includes('dubai')) ||
        (apt.value && apt.value.toLowerCase() === 'dxb') ||
        (apt.name && apt.name.toLowerCase().includes('dubai')) ||
        (apt.code && apt.code.toLowerCase() === 'dxb')
      );

      if (dubaiAirport) {
        const airportValue = dubaiAirport.value || dubaiAirport.code || dubaiAirport.level;
        // console.log('✈️ IP Detection: Found Dubai airport:', dubaiAirport, 'Using value:', airportValue);
        
        setAirport(airportValue);
        dispatch(setSearchData({
          ...reduxSearchData,
          airport: airportValue
        }));
      } else {
        console.log('❌ IP Detection: Dubai airport not found in:', airports);
      }
    }
  }, [isUserFromDubai, regionLoading, airports, airport, dispatch, reduxSearchData, location.pathname]);

  /* ---- Helpers ---- */

  const TIME_STEP_MIN = 30; // keep in sync with TimeCard timeStep
  const roundUpToStep = (t, stepMin = TIME_STEP_MIN) => {
    const minutes = getMinutes(t);
    const remainder = minutes % stepMin;
    if (remainder === 0) {
      return set(t, { seconds: 0, milliseconds: 0 });
    }
    const nextT = addMinutes(t, stepMin - remainder);
    return set(nextT, { seconds: 0, milliseconds: 0 });
  };

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

  const openOnly = (which) => {
    setAirportOpen(which === "airport");
    setGuestsOpen(which === "guests");
    setEntryDateOpen(which === "entryDate");
    setEntryTimeOpen(which === "entryTime");
    setExitDateOpen(which === "exitDate");
    setExitTimeOpen(which === "exitTime");
  };

  // ✅ Clear validation errors and enable real-time validation
  const clearFieldError = (field) => {
    if (hasAttemptedSubmit && validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
    // Enable real-time validation after first submit attempt
    if (hasAttemptedSubmit) {
      setShowRealTimeValidation(true);
    }
  };

  /* ---- Validation - IMPROVED ---- */
  const validateForm = React.useCallback(() => {
    const errors = {};

    if (!airport) errors.airport = "Please select an airport";
    if (!entryDate) errors.entryDate = "Please select entry date";
    if (!entryTime) errors.entryTime = "Please select entry time";
    if (!exitDate) errors.exitDate = "Please select exit date";
    if (!exitTime) errors.exitTime = "Please select exit time";

    const now = new Date();
    const todayStart = startOfDay(now);

    // ❌ entry date in past (by day)
    if (entryDate) {
      const entryDateStart = startOfDay(entryDate);
      if (isBefore(entryDateStart, todayStart)) {
        errors.entryDate = "Entry date cannot be in the past";
      }
    }

    const entryDateTime = getEntryDateTime();
    const exitDateTime = getExitDateTime();

    // ❌ when entry date is today, entry time cannot be earlier than now
    if (
      entryDateTime &&
      isSameDay(entryDate, now) &&
      isBefore(entryDateTime, now)
    ) {
      errors.entryTime = "Entry time cannot be earlier than the current time";
    }

    // ❌ exit must be strictly after entry
    if (entryDateTime && exitDateTime && !isAfter(exitDateTime, entryDateTime)) {
      errors.exitDate = "Exit date and time must be after entry date and time";
      errors.exitTime = "Exit time must be after entry time";
    }

    return errors;
  }, [airport, entryDate, entryTime, exitDate, exitTime]);

  // ✅ Real-time validation effect - FIXED: Remove validateForm from dependencies to prevent infinite loop
  React.useEffect(() => {
    if (showRealTimeValidation) {
      const errors = validateForm();
      setValidationErrors(errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showRealTimeValidation, airport, entryDate, entryTime, exitDate, exitTime]); // Include actual values instead of validateForm function

  /* ---- Constraints: ensure exit >= entry ---- */
  const handleEntryDateChange = (newDate) => {
    if (!newDate) return;
    setEntryDate(newDate);
    clearFieldError("entryDate");

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

    // NEW CODE: Always set exit date to entry date + 7 days
    setExitDate(addDays(newDate, 7)); // Set exit date to 7 days after entry date

    // Keep the same exit time if already selected, or use entry time
    if (exitTime) {
      // Keep existing exit time
    } else {
      setExitTime(entryTime);
    }
  };

  const handleEntryTimeChange = (newTime) => {
    if (!newTime) return;
    const now = new Date();

    let nextTime = newTime;
    // if entry date is today, prevent picking a past time by snapping forward
    if (entryDate && isSameDay(entryDate, now)) {
      const candidate = set(entryDate, {
        hours: getHours(newTime),
        minutes: getMinutes(newTime)
      });
      if (isBefore(candidate, now)) {
        nextTime = roundUpToStep(now);
      }
    }

    setEntryTime(nextTime);
    clearFieldError("entryTime");

    // keep existing exit >= entry logic
    if (entryDate && nextTime) {
      const newEntry = set(entryDate, {
        hours: getHours(nextTime),
        minutes: getMinutes(nextTime)
      });
      const currentExit = getExitDateTime();
      if (currentExit && isAfter(newEntry, currentExit)) {
        setExitTime(addMinutes(nextTime, 60)); // add 1 hour
      }
    }
  };

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
    clearFieldError("exitDate");
  };

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
    clearFieldError("exitTime");
  };

  const handleAirportChange = (newAirport) => {
    setAirport(newAirport);
    clearFieldError("airport");
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    clearFieldError("discountCode");
  };

  const handleGuestsChange = ({ adults: a, children: c }) => {
    setAdults(a);
    setChildren(c);
    clearFieldError("guests");
  };

  /* ---- Form Submit - FIXED: Prevent multiple calls and improve navigation ---- */
  const handleSearch = React.useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (isSearching) {
      console.log('🚫 Search already in progress, ignoring duplicate call');
      return;
    }

    const searchId = `search-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    console.log('🔥 handleSearch called - starting search process');
    console.log('🔥 Search ID:', searchId);
    console.log('🔥 Current isSearching state:', isSearching);

    setHasAttemptedSubmit(true);
    setShowRealTimeValidation(true);
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSearching(true);

      try {
        const entry = getEntryDateTime();
        const exit = getExitDateTime();

        const searchData = {
          airport,
          adults,
          children,
          entryDate: entry ? format(entry, "yyyy-MM-dd") : "",
          entryTime: entry ? format(entry, "HH:mm") : "",
          exitDate: exit ? format(exit, "yyyy-MM-dd") : "",
          exitTime: exit ? format(exit, "HH:mm") : "",
          discountCode: code || "",
          trafficSource: searchParams.get("traffic_source") || reduxSearchData.trafficSource || "",
        };

        console.log('📊 BookingForm searchData:', searchData);

        // 🎆 Fetch products from API
        console.log('🚀 Fetching products for search...');

        // Use different discount code sources based on the page
        const discountCodeSource = isBookingPage
          ? searchParams.get('promocode') || ''
          : reduxSearchData.promocode || code || '';

        const productsParams = {
          airport,
          departure: entry ? format(entry, "yyyy-MM-dd HH:mm") : "",
          arrival: exit ? format(exit, "yyyy-MM-dd HH:mm") : "",
          promocode: discountCodeSource // Use page-specific discount code source
        };



        const productsResult = await fetchProducts(productsParams);


        // Prepare final search data with products
        const finalSearchData = {
          ...searchData,
          products: productsResult.success ? productsResult.data : [],
          productsCount: productsResult.success ? productsResult.data.length : 0,
          ...(productsResult.error && { productsError: productsResult.error })
        };

        console.log('✅ finalSearchData:', finalSearchData);
        console.log('📍 finalSearchData.trafficSource:', finalSearchData.trafficSource);

        // Update Redux with complete data
        dispatch(setSearchData(finalSearchData));


        if (!isBookingPage) {

          // Fix URL parameter encoding - use proper format
          const urlParams = new URLSearchParams();
          urlParams.set('airport', finalSearchData.airport);
          urlParams.set('departure', `${finalSearchData.entryDate} ${finalSearchData.entryTime}`);
          urlParams.set('arrival', `${finalSearchData.exitDate} ${finalSearchData.exitTime}`);
          urlParams.set('adults', finalSearchData.adults.toString());
          urlParams.set('children', finalSearchData.children.toString());
          if (finalSearchData.discountCode) {
            urlParams.set('promocode', finalSearchData.discountCode);
          } else {
            urlParams.set('promocode', '');
          }
          // Add traffic_source - check both finalSearchData and current URL params
          const trafficSourceToSet = finalSearchData.trafficSource || searchParams.get("traffic_source") || "";
          if (trafficSourceToSet) {
            urlParams.set('traffic_source', trafficSourceToSet);
            console.log('✅ traffic_source added to URL:', trafficSourceToSet);
          } else {
            console.warn('⚠️ traffic_source NOT found in finalSearchData or URL params');
          }
          urlParams.set('product', 'null');

          const bookingUrl = `/booking?${urlParams.toString()}`;
          console.log('🔗 Original URL:', bookingUrl);
          console.log('🔗 URL params object:', Object.fromEntries(urlParams));

          // Try multiple navigation strategies
          console.log('🚀 Attempting navigation via React Router...');

          try {
            navigate(bookingUrl, { replace: false });
            console.log('✅ React Router navigation initiated');
          } catch (error) {
            console.error('❌ React Router navigation failed:', error);
            window.location.href = `${window.location.origin}${bookingUrl}`;
          }
        } else {
          // If already on booking page, just update URL params
          const urlSearchString = new URLSearchParams();
          urlSearchString.set('airport', finalSearchData.airport);
          urlSearchString.set('departure', `${finalSearchData.entryDate}+${finalSearchData.entryTime}`);
          urlSearchString.set('arrival', `${finalSearchData.exitDate}+${finalSearchData.exitTime}`);
          urlSearchString.set('adults', finalSearchData.adults.toString());
          urlSearchString.set('children', finalSearchData.children.toString());
          if (finalSearchData.discountCode) {
            urlSearchString.set('promocode', finalSearchData.discountCode);
          }
          // Add traffic_source - check both finalSearchData and current URL params
          const trafficSourceToSet = finalSearchData.trafficSource || searchParams.get("traffic_source") || "";
          if (trafficSourceToSet) {
            urlSearchString.set('traffic_source', trafficSourceToSet);
            console.log('✅ traffic_source added to URL on booking page:', trafficSourceToSet);
          } else {
            console.warn('⚠️ traffic_source NOT found in finalSearchData or URL params on booking page');
          }
          urlSearchString.set('product', 'null');

          window.history.replaceState(null, '', `${location.pathname}?${urlSearchString.toString()}`);
        }
      } catch (error) {
        console.error("Search error:", error);
        // Still dispatch basic search data even if API fails
        const entry = getEntryDateTime();
        const exit = getExitDateTime();
        const basicSearchData = {
          airport,
          adults,
          children,
          entryDate: entry ? format(entry, "yyyy-MM-dd") : "",
          entryTime: entry ? format(entry, "HH:mm") : "",
          exitDate: exit ? format(exit, "yyyy-MM-dd") : "",
          exitTime: exit ? format(exit, "HH:mm") : "",
          discountCode: code || "",
          trafficSource: searchParams.get("traffic_source") || reduxSearchData.trafficSource || "",
          products: [],
          productsCount: 0,
          productsError: error.message
        };
        dispatch(setSearchData(basicSearchData));

        if (!isBookingPage) {
          updateUrlWithSearchParams(basicSearchData, navigate, "/booking");
        }
      } finally {
        setIsSearching(false);
      }
    }
  }, [isSearching, airport, adults, children, code, entryDate, entryTime, exitDate, exitTime, isBookingPage, location.pathname, navigate, dispatch, validateForm, getEntryDateTime, getExitDateTime]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: "20px",
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 4 },
        boxShadow: 1,
        mx: "auto",
        width: "90%",
      }}
    >
      {/* Top row with better spacing for error messages */}
      <Grid
        container
        spacing={1}
        alignItems="flex-start"
        sx={{
          "& > .MuiGrid-item": {
            minHeight:
              hasAttemptedSubmit && Object.keys(validationErrors).length > 0
                ? 95 // Increased height when errors are shown
                : 72,
          },
        }}
      >
        {/* Airport */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FieldWrapper
            error={validationErrors.airport}
            hasAttemptedSubmit={hasAttemptedSubmit}
          >
            <AirportDropdown
              maxHeight={45}
              value={airport}
              options={filteredAirports}
              open={airportOpen}
              onOpenChange={(next) => {
                setAirportOpen(next);
                if (next) openOnly("airport");
              }}
              onChange={handleAirportChange}
              error={hasAttemptedSubmit && !!validationErrors.airport}
              placeholder={airportsLoading ? "Loading airports..." : "Select Airport"}
            />
          </FieldWrapper>
        </Grid>

        {/* Entry Date */}
        <Grid size={{ xs: 6, sm: 3, md: 2 }}>
          <FieldWrapper
            error={validationErrors.entryDate}
            hasAttemptedSubmit={hasAttemptedSubmit}
          >
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
              maxDate={addDays(new Date(), 365 * 2)}
              minYear={2025}
              maxYear={2027}
              error={hasAttemptedSubmit && !!validationErrors.entryDate}
            />
          </FieldWrapper>
        </Grid>

        {/* Entry Time */}
        <Grid size={{ xs: 6, sm: 3, md: 2 }}>
          <FieldWrapper
            error={validationErrors.entryTime}
            hasAttemptedSubmit={hasAttemptedSubmit}
          >
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
                entryDate && isSameDay(entryDate, new Date())
                  ? roundUpToStep(new Date())
                  : null
              }
              error={hasAttemptedSubmit && !!validationErrors.entryTime}
            />
          </FieldWrapper>
        </Grid>

        {/* Exit Date */}
        <Grid size={{ xs: 6, sm: 3, md: 2 }}>
          <FieldWrapper
            error={validationErrors.exitDate}
            hasAttemptedSubmit={hasAttemptedSubmit}
          >
            <DateCard
              maxHeight={45}
              label="Exit Date"
              value={exitDate}
              onChange={handleExitDateChange}
              minDate={entryDate}
              maxDate={addDays(new Date(), 365 * 2)}
              minYear={2025}
              maxYear={2027}
              open={exitDateOpen}
              onOpenChange={(next) => {
                setExitDateOpen(next);
                if (next) openOnly("exitDate");
              }}
              error={hasAttemptedSubmit && !!validationErrors.exitDate}
            />
          </FieldWrapper>
        </Grid>

        {/* Exit Time */}
        <Grid size={{ xs: 6, sm: 3, md: 2 }}>
          <FieldWrapper
            error={validationErrors.exitTime}
            hasAttemptedSubmit={hasAttemptedSubmit}
          >
            <TimeCard
              maxHeight={45}
              label="Exit Time"
              value={exitTime}
              onChange={handleExitTimeChange}
              minTime={entryDate && isSameDay(entryDate, exitDate) ? entryTime : null}
              open={exitTimeOpen}
              onOpenChange={(next) => {
                setExitTimeOpen(next);
                if (next) openOnly("exitTime");
              }}
              timeStep={30}
              error={hasAttemptedSubmit && !!validationErrors.exitTime}
            />
          </FieldWrapper>
        </Grid>

        {/* Guests */}
        {/* <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <GuestsDropdown
          maxHeight={45}
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
        <Grid size={{ xs: 12, sm: 6, md: 5 }}>
          <DiscountCodeField
            value={code}
            onChange={handleCodeChange}
            error={hasAttemptedSubmit && !!validationErrors.discountCode}
            helperText={hasAttemptedSubmit ? validationErrors.discountCode : ""}
          />
        </Grid>

        {/* Search button */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <CustomButton
            fullWidth
            endIcon={<SearchIcon />}
            onClick={handleSearch}
            isLoading={isSearching}
            loadingText="Searching..."
            sx={{ height: "58px" }}
          >
            {isBookingPage ? "Update" : "Search"}
          </CustomButton>
        </Grid>
      </Grid>

      {/* Feature highlights - only show on non-booking pages */}
      {!isBookingPage && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 3,
            mt: 3,
            textAlign: "center",
          }}
        >
          {[
            "Open review policy",
            "Secure parking",
            "Up to 70% off advanced bookings",
          ].map((text, idx) => (
            <Box
              key={idx}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <CheckCircleIcon color="primary" fontSize="small" />
              <Typography fontSize={14}>{text}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
