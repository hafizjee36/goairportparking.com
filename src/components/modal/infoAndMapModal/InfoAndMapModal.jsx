import { useState, useMemo, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSearchData } from "../../../redux/slice/searchSlice";
import { format, parseISO, isValid } from "date-fns";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Overview from "./components/Overview";
import OnArrival from "./components/OnArrival";
import OnReturn from "./components/OnReturn";
import Map from "./components/Map";
import Reviews from "./components/Reviews";
import Stars from "../../reusable/Stars";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CustomButton from "../../reusable/CustomButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedParking } from "../../../redux/slice/paymentSlice";
import { fetchSingleProduct } from "../../../services/productService";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`info-tabpanel-${index}`}
      aria-labelledby={`info-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ width: "100%" }}>{children}</Box>}
    </div>
  );
}

const a11yProps = (index) => ({
  id: `info-tab-${index}`,
  "aria-controls": `info-tabpanel-${index}`,
});

export default function InfoAndMapModal({ open, onClose, productData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [detailedProductData, setDetailedProductData] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [searchParams] = useSearchParams();
  const searchData = useSelector(selectSearchData);

  const [total, setTotal] = useState(0);

  // Get booking dates from URL params or Redux state
  const getDeparture = searchParams.get('departure') || searchData.entryDate;
  const getArrival = searchParams.get('arrival') || searchData.exitDate;

  // Parse combined date+time format from URL (e.g., "2025-09-24+12:00")
  const parseDateTimeFromURL = (dateTimeString) => {
    if (!dateTimeString) return { date: null, time: null };

    // Handle URL encoded format: "2025-09-24+12:00" or "2025-09-24 12:00"
    const cleanString = decodeURIComponent(dateTimeString).replace(/\+/g, ' ');

    // Split by space to separate date and time
    const parts = cleanString.split(' ');
    if (parts.length >= 2) {
      return { date: parts[0], time: parts[1] };
    } else if (parts.length === 1) {
      // Only date provided, use default time
      return { date: parts[0], time: '10:00' };
    }

    return { date: null, time: null };
  };

  // Parse departure and arrival
  const departureInfo = parseDateTimeFromURL(getDeparture) || {
    date: searchData.entryDate,
    time: searchData.entryTime || '10:00'
  };
  const arrivalInfo = parseDateTimeFromURL(getArrival) || {
    date: searchData.exitDate,
    time: searchData.exitTime || '10:00'
  };
  const getAirport = searchParams.get('airport') || searchData.airport;

  // Format dates for display
  const formatDateForDisplay = (date, time) => {
    if (!date) return 'Not specified';
    const dateObj = parseISO(date);
    if (!isValid(dateObj)) return 'Not specified';
    return `${format(dateObj, 'dd-MM-yyyy')}, ${time}`;
  };

  const departureDisplay = formatDateForDisplay(departureInfo.date, departureInfo.time);
  const arrivalDisplay = formatDateForDisplay(arrivalInfo.date, arrivalInfo.time);

  // Debug logging
  // console.log('🗓️ Date Parsing Debug:', {
  //   rawDeparture: getDeparture,
  //   rawArrival: getArrival,
  //   departureInfo,
  //   arrivalInfo,
  //   departureDisplay,
  //   arrivalDisplay
  // });

  // Fetch product details when modal opens
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!open || !productData?.sku || isLoadingDetails) return;

      setIsLoadingDetails(true);
      setDetailedProductData(null);

      try {
        // const getAirport = searchParams.get('airport') || searchData.airport;
        const getPromocode = searchParams.get('promocode') || searchData.discountCode;

        // Format dates for API call (DD-MM-YYYY HH:mm)
        const formatDateForApi = (date, time) => {
          if (!date) return '';
          const dateObj = parseISO(date);
          if (!isValid(dateObj)) return '';
          return `${format(dateObj, 'dd-MM-yyyy')} ${time || '10:00'}`;
        };

        const departureFormatted = formatDateForApi(departureInfo.date, departureInfo.time);
        const arrivalFormatted = formatDateForApi(arrivalInfo.date, arrivalInfo.time);

        console.log('📞 Fetching product details for modal with:', {
          sku: productData.sku,
          departure: departureFormatted,
          arrival: arrivalFormatted,
          airport: getAirport,
          discount_code: getPromocode
        });

        const response = await fetchSingleProduct({
          sku: productData.sku,
          departure: departureFormatted,
          arrival: arrivalFormatted,
          airport: getAirport,
          discount_code: getPromocode || ''
        });

        if (response.success) {
          console.log('✅ Product details fetched for modal:', response.data);
          const reviewsArry = response.data.reviews || [];
          setTotal(reviewsArry.length);
          setDetailedProductData(response.data);
        } else {
          console.error('❌ Failed to fetch product details for modal:', response.error);
        }
      } catch (error) {
        console.error('❌ Error fetching product details for modal:', error);
      } finally {
        setIsLoadingDetails(false);
      }
    };

    fetchProductDetails();
  }, [open]);

  // Use detailed product data if available, otherwise fall back to basic product data
  const displayProductData = detailedProductData || productData;
  const average_rating = productData?.average_rating;

  const TABS = useMemo(
    () => [
      {
        label: "Overview",
        shortLabel: "Overview",
        node: <Overview productData={displayProductData} isLoading={isLoadingDetails} />
      },
      {
        label: "On Arrival",
        shortLabel: "On Arrival",
        node: <OnArrival productData={displayProductData} isLoading={isLoadingDetails} />
      },
      {
        label: "On Return",
        shortLabel: "On Return",
        node: <OnReturn productData={displayProductData} isLoading={isLoadingDetails} />
      },
      {
        label: "Reviews",
        shortLabel: "Reviews",
        node: <Reviews productData={displayProductData} isLoading={isLoadingDetails} averageRating={average_rating} />
      },
    ],
    [displayProductData, isLoadingDetails]
  );
  const handleBookNow = async () => {
    if (!productData?.sku) {
      console.error('❌ No SKU available for product:', productData);
      // Fallback: still navigate with basic product info
      dispatch(setSelectedParking(productData));
      navigate('/payment');
      return;
    }

    setIsBookingLoading(true);

    try {
      // Get search parameters from URL or Redux state
      const getAirport = searchParams.get('airport') || searchData.airport;
      const getPromocode = searchParams.get('promocode') || searchData.discountCode;

      // Format dates for API call (DD-MM-YYYY HH:mm)
      const formatDateForApi = (date, time) => {
        if (!date) return '';
        const dateObj = parseISO(date);
        if (!isValid(dateObj)) return '';
        return `${format(dateObj, 'dd-MM-yyyy')} ${time || '10:00'}`;
      };

      const departureFormatted = formatDateForApi(departureInfo.date, departureInfo.time);
      const arrivalFormatted = formatDateForApi(arrivalInfo.date, arrivalInfo.time);

      console.log('📞 Calling single product API with:', {
        sku: productData.sku,
        departure: departureFormatted,
        arrival: arrivalFormatted,
        airport: getAirport,
        discount_code: getPromocode
      });

      // Call the single product API
      const response = await fetchSingleProduct({
        sku: productData.sku,
        departure: departureFormatted,
        arrival: arrivalFormatted,
        airport: getAirport,
        discount_code: getPromocode || ''
      });

      if (response.success) {
        console.log('✅ Single product details fetched:', response.data);

        // Merge the detailed product info with the existing item data
        const enhancedProduct = {
          ...productData, // Keep existing product data
          ...response.data, // Override with detailed API response
          // Keep the UI-friendly fields we already have
          features: productData.features, // Keep parsed features
          type: productData.type, // Keep determined service type
        };

        // Store the enhanced product details in Redux
        dispatch(setSelectedParking(enhancedProduct));

        console.log('🎯 Enhanced product data stored:', enhancedProduct);
      } else {
        console.error('❌ Failed to fetch product details:', response.error);
        // Fallback: still navigate with basic product info
        dispatch(setSelectedParking(productData));
      }

      // Navigate to payment page
      navigate('/payment');

    } catch (error) {
      console.error('❌ Error in handleBookNow:', error);
      // Fallback: still navigate with basic product info
      dispatch(setSelectedParking(productData));
      navigate('/payment');
    } finally {
      setIsBookingLoading(false);
    }
  };


  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "center",
        p: { xs: 0, md: 2 },
        overflowY: { xs: "auto", md: "hidden" },
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          height: { xs: "100vh", sm: "90vh", md: "80vh" },
          width: { xs: "100%", sm: "90%", md: 1280 },
          maxWidth: { xs: "100%", sm: "calc(100vw - 32px)", md: 1280 },
          borderRadius: { xs: 0, sm: 3 },
          overflow: "hidden",
          flexDirection: { xs: "column", md: "row" },
          bgcolor: "background.paper",
        }}
      >
        {/* Back Button */}
        <Button
          onClick={onClose}
          startIcon={<ArrowBackIosNewIcon sx={{ width: 15, height: 15 }} />}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "text.secondary",
            fontWeight: 500,
            textTransform: "none",
            bgcolor: "transparent",
            "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
            borderRadius: 2,
            zIndex: 10, // keep above content
          }}
        >
          Back
        </Button>

        {/* LEFT: vertical Tabs on md+ */}
        {isMdUp && (
          <Box
            sx={{
              width: 220,
              display: "flex",
              borderRight: "1px solid",
              borderColor: "divider",
              bgcolor: theme.palette.background.paper,
              flexDirection: "column",
            }}
          >
            <Box sx={{ height: 150 }} />
            <Tabs
              orientation="vertical"
              value={tab}
              onChange={(_e, v) => setTab(v)}
              variant="scrollable"
              aria-label="Parking details tabs"
              sx={{
                width: "100%",
                "& .MuiTab-root": {
                  alignItems: "flex-start",
                  textTransform: "none",
                  fontWeight: 600,
                },
                "& .Mui-selected": {
                  color: "success.main !important",
                  fontWeight: 800,
                },
                "& .MuiTabs-indicator": {
                  left: 0,
                  width: 3,
                  bgcolor: "success.main",
                  borderRadius: 2,
                },
              }}
            >
              {TABS.map((t, i) => (
                <Tab key={t.label} label={t.label} {...a11yProps(i)} />
              ))}
            </Tabs>
          </Box>
        )}

        {/* Mobile Layout */}
        {!isMdUp ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              bgcolor: "background.paper",
            }}
          >
            {/* Mobile Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                position: "relative",
              }}
            >
              <Box
                component="img"
                src={productData?.image || "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80"}
                alt={productData?.display_name || "Parking"}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0, pr: 4 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    mb: 0.5,
                    fontSize: '1.1rem',
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {productData?.name || "Parking Service"}
                </Typography>
                <Stars
                  rating={productData?.average_rating || 0}
                  reviews={productData?.reviews_count || 0}
                  size="small"
                />

              </Box>
            </Box>

            {/* Mobile Horizontal Tabs */}
            <Box sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}>
              <Tabs
                value={tab}
                scrollButtons="auto"
                allowScrollButtonsMobile
                onChange={(_e, v) => setTab(v)}
                variant="scrollable"
                aria-label="Parking details tabs"
                sx={{
                  minHeight: 48,
                  "& .MuiTabs-scroller": {
                    "& .MuiTabs-flexContainer": {
                      px: 1,
                    },
                  },
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    minWidth: 80,
                    px: 2,
                    py: 1.5,
                    minHeight: 48,
                    color: "text.secondary",
                    whiteSpace: 'nowrap',
                  },
                  "& .Mui-selected": {
                    color: "#f59e0b !important", // Orange color like in image
                    fontWeight: 700,
                  },
                  "& .MuiTabs-indicator": {
                    height: 3,
                    bgcolor: "#f59e0b", // Orange indicator
                    borderRadius: 2,
                  },
                }}
              >
                {TABS.map((t, i) => (
                  <Tab
                    key={t.label}
                    label={t.label}
                    {...a11yProps(i)}
                  />
                ))}
              </Tabs>
            </Box>

            {/* Mobile Scrollable Content */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                p: 2,
                pb: 0, // No padding bottom since we have fixed section
              }}
            >
              {TABS[tab]?.node}
            </Box>

            {/* Mobile Fixed Bottom Section - Travel Dates & Book Button */}
            <Box
              sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                p: 2,
                boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {/* Travel Dates Section */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: '1.1rem',
                  color: "text.primary"
                }}
              >
                Your travel dates and times
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <AccessTimeIcon fontSize="small" sx={{ color: "text.secondary" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: "text.primary"
                    }}
                  >
                    Entry: {departureDisplay}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    ml: 1.5,
                    height: 16,
                    width: 2,
                    bgcolor: "divider",
                    borderRadius: 1,
                    my: 0.5,
                  }}
                />

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeIcon fontSize="small" sx={{ color: "text.secondary" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: "text.primary"
                    }}
                  >
                    Exit: {arrivalDisplay}
                  </Typography>
                </Box>
              </Box>

              {/* Book Button */}
              <CustomButton
                variant="contained"
                fullWidth
                onClick={handleBookNow}
                disabled={isBookingLoading}
                isLoading={isBookingLoading}
                loadingText="Processing..."
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  py: 1.75,
                  bgcolor: "#f59e0b", // Orange color like in image
                  "&:hover": {
                    bgcolor: "#d97706",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  },
                }}
              >
                Book
              </CustomButton>
            </Box>
          </Box>
        ) : (
          // Desktop Layout (Original)
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              backgroundColor: theme.palette.background.default,
              height: "100%",
              overflowY: "hidden",
            }}
          >
            {/* Desktop Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 3,
                height: 150,
                borderBottom: "1px solid",
                borderColor: "divider",
                flexWrap: "wrap",
              }}
            >
              <Box
                component="img"
                src={productData?.image || "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80"}
                alt={productData?.display_name || "Parking"}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 0.5,
                    fontSize: '1.25rem',
                    lineHeight: 1.4,
                  }}
                >
                  {productData?.name || "Parking Service"}
                </Typography>
                {productData?.display_name && productData.display_name !== productData?.name && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mb: 1,
                      fontSize: '0.875rem',
                    }}
                  >
                    {productData.display_name}
                  </Typography>
                )}
                <Stars
                  rating={productData?.average_rating || 0}
                  reviews={total}
                  size="medium"
                />
              </Box>
            </Box>

            {/* Desktop Content */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                p: 3,
                flex: 1,
                minHeight: 0,
                alignItems: "start",
                overflow: "hidden",
              }}
            >
              {/* Desktop Booking card */}
              <Box
                sx={{
                  width: 340,
                  border: "1px solid #eee",
                  borderRadius: 2,
                  p: 3,
                  bgcolor: "#fff",
                  position: "sticky",
                  top: 24,
                  alignSelf: "start",
                  order: 2,
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Total Price
                  </Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    {productData?.price_before_discount && productData.price_before_discount !== productData.price && (
                      <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                        {getAirport === "DXB"? "AED": getAirport === "DUB" ? "€" : "£"}{parseFloat(productData.price_before_discount || 0).toFixed(2)}
                      </Typography>
                    )}
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                      {getAirport === "DXB"? "AED": getAirport === "DUB" ? "€" : "£"}{parseFloat(productData?.price || 0).toFixed(2)}
                    </Typography>
                    {productData?.discount > 0 && (
                      <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                        Save {getAirport === "DXB"? "AED": getAirport === "DUB" ? "€" : "£"}{parseFloat(productData.discount || 0).toFixed(2)}
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: "grid", gap: 1.2, mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      Entry: {departureDisplay}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      ml: 1,
                      height: 18,
                      borderLeft: "2px dotted grey",
                    }}
                  />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      Exit: {arrivalDisplay}
                    </Typography>
                  </Box>
                </Box>

                <CustomButton
                  variant="contained"
                  fullWidth
                  onClick={handleBookNow}
                  disabled={isBookingLoading}
                  isLoading={isBookingLoading}
                  loadingText="Processing..."
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    py: 1,
                  }}
                >
                  Book Now
                </CustomButton>
              </Box>

              {/* Desktop Tab content */}
              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                  height: "100%",
                  overflowY: "auto",
                  order: 1,
                  pr: 1,
                }}
              >
                {TABS.map((t, i) => (
                  <TabPanel key={t.label} value={tab} index={i}>
                    {t.node}
                  </TabPanel>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
