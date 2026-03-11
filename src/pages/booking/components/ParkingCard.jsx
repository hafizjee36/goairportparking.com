import { Box, Button, Typography, CircularProgress } from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import theme from "../../../theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import InfoAndMapModal from "../../../components/modal/infoAndMapModal/InfoAndMapModal";
import Stars from "../../../components/reusable/Stars";
import CustomButton from "../../../components/reusable/CustomButton";
import { setSelectedParking } from "../../../redux/slice/paymentSlice";
import { selectSearchData } from "../../../redux/slice/searchSlice";
import { format, parse } from "date-fns";

export default function ParkingCard({ item }) {
  const {
    sku_id,
    name,
    features = [],
    price,
    price_before_discount,
    discount,
    image,
    alt,
    average_rating,
    category,
    display_name,
    offer,
  } = item;
  // Handle dynamic rating from backend
  const rating =
    average_rating !== null && average_rating !== undefined
      ? parseFloat(average_rating)
      : 0;
  const hasRating = average_rating !== null && average_rating !== undefined;

  // For now, we don't have reviews count in the API response
  // You might want to add this field to your backend API response
  const reviews = null; // This could be added to your API response later

  // Handle discount information
  const currentPrice = parseFloat(price) || 0;
  const originalPrice = parseFloat(price_before_discount) || 0;
  const discountAmount = parseFloat(discount) || 0;
  const hasDiscount = discountAmount > 0 && originalPrice > currentPrice;

  const [openParkingInfoModal, setOpenParkingInfoModal] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchData = useSelector(selectSearchData);
  const getAirport = searchParams.get("airport") || searchData.airport;

  const handleOpenParkingInfoModal = () => {
    setOpenParkingInfoModal(true);
  };

  const handleCloseParkingInfoModal = () => {
    setOpenParkingInfoModal(false);
  };

  const handleBookNow = async () => {
    if (!item.sku) {
      console.error('❌ No SKU available for product:', item);
      // // Fallback: still navigate with basic product info
      // dispatch(setSelectedParking(item));
      // navigate('/payment');
      return;
    }

    setIsLoadingProduct(true);

    try {
      // Get search parameters from URL or Redux state
      const getDeparture = searchParams.get("departure") || searchData.entryDate;
      const getArrival = searchParams.get("arrival") || searchData.exitDate;
      const getAirport = searchParams.get("airport") || searchData.airport;
      const getPromocode = searchParams.get("promocode") || searchData.discountCode;
      const getTrafficSource = searchParams.get("traffic_source") || searchData.trafficSource;
      localStorage.setItem("sku_id", item.sku_id);

      console.log('🎯 ParkingCard: Retrieved parameters:', {
        getTrafficSource,
        reduxTrafficSource: searchData.trafficSource,
        urlTrafficSource: searchParams.get("traffic_source")
      });

      const normalizeDateTime = (value) =>
        value ? value.replace(/\+/g, ' ').trim() : '';
      
      // Store selected parking in Redux
      dispatch(setSelectedParking(item));

      if (typeof window !== "undefined") {
        
        const departureDate = parse(normalizeDateTime(getDeparture), "yyyy-MM-dd HH:mm", new Date());
        const arrivalDate = parse(normalizeDateTime(getArrival), "yyyy-MM-dd HH:mm", new Date());
      
        const paymentUrl = `/payment?departure=${format(departureDate,
          "dd-MM-yyyy HH:mm"
        )}&arrival=${format(arrivalDate,
          "dd-MM-yyyy HH:mm"
        )}&airport=${getAirport}&promocode=${getPromocode || ""}&sku=${item.sku}${getTrafficSource ? `&traffic_source=${getTrafficSource}` : ""}`;
        
        console.log('🔗 ParkingCard: Built payment URL:', paymentUrl);
        console.log('📍 ParkingCard: traffic_source included:', !!getTrafficSource);

        // console.log('🔗 Navigating to payment:', paymentUrl);
        navigate(paymentUrl);
      }

      // Navigate to payment page
    } catch (error) {
      console.error("❌ Error in handleBookNow:", error);
      // Fallback: still navigate with basic product info
      dispatch(setSelectedParking(item));
      // navigate("/payment");
    } finally {
      setIsLoadingProduct(false);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(0,0,0,0.08)",
        bgcolor: "#fff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        height: "100%",
        minHeight: "100%",
      }}
    >
      <Box sx={{ position: "relative", p: 2, pb: 0 }}>
        <Box
          component="img"
          src={image}
          alt={alt}
          sx={{
            width: "100%",
            height: { xs: 240, md: 240 },
            objectFit: "cover",
            borderRadius: 3,
            display: "block",
          }}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/1000x600?text=Parking";
          }}
        />
        <Button
          onClick={handleOpenParkingInfoModal}
          startIcon={<InfoOutlineIcon />}
          sx={{
            position: "absolute",
            top: 22,
            right: 28,
            color: "#000",
            bgcolor: "#fff",
            borderRadius: 999,
            px: 2,
            py: 0.75,
            fontWeight: 700,
            textTransform: "none",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            "&:hover": { bgcolor: "#fff" },
          }}
        >
          More info
        </Button>
      </Box>

      <Box
        sx={{
          p: { xs: 2, md: 3 },
          pb: 0,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, lineHeight: 1.15, mb: 1 }}
        >
          {name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            color: "text.secondary",
            mb: 2,
          }}
        >
          {hasRating ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Stars rating={rating} reviews={reviews} />
            </Box>
          ) : (
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontStyle: "italic" }}
            >
              No ratings yet
            </Typography>
          )}
          {category && (
            <>
              <Typography> | </Typography>
              <Typography variant="subtitle2">{category}</Typography>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: 1.25,
            flexGrow: 1,
            alignContent: "start",
          }}
        >
          {Array.isArray(features) &&
            features?.map((f, i) => (
              <Box
                key={i}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CheckCircleOutlineIcon
                  sx={{ color: "primary.main", fontSize: 22 }}
                />
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  {f}
                </Typography>
              </Box>
            ))}
          {/* Show message if no valid features */}
          {(!Array.isArray(features) || features.length === 0) && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircleOutlineIcon
                sx={{ color: "primary.main", fontSize: 22 }}
              />
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                Secure parking facility
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          p: { xs: 2, md: 3 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mt: "auto", // Push to bottom
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {/* {hasDiscount && (
            <Box
              sx={{
                alignSelf: "flex-start",
                backgroundColor: "error.main",
                color: "white",
                px: 1.5,
                py: 0.75,
                borderRadius: 2,
                fontSize: "0.8rem",
                fontWeight: 800,
                mb: 0.5,
                boxShadow: "0 2px 8px rgba(255,0,0,0.2)",
              }}
            >
              SAVE {discountPercentage}%
            </Box>
          )} */}

          {/* Price Section */}
          {hasDiscount ? (
            // With Discount - Show original price struck through first, then discounted price
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography
                variant="body1"
                sx={{
                  textDecoration: "line-through",
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                }}
              >
                Was { getAirport?.toUpperCase() === "DXB" ? `AED${originalPrice.toFixed(2)}`: getAirport?.toUpperCase() === "DUB" ? `€${originalPrice.toFixed(2)}` : `£${originalPrice.toFixed(2)}`}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: "success.main",
                  fontSize: { xs: "1.8rem", md: "2rem" },
                  lineHeight: 1,
                }}
              >
                {getAirport?.toUpperCase() === "DXB" ? `AED${originalPrice.toFixed(2)}`: getAirport?.toUpperCase() === "DUB" ? `€${currentPrice.toFixed(2)}` : `£${currentPrice.toFixed(2)}`}
              </Typography>
              {/* <Typography
                variant="body2"
                sx={{
                  color: "success.main",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  backgroundColor: "success.light",
                  color: "white",
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  display: "inline-block",
                  alignSelf: "flex-start",
                  
                }}
              >
                💰 You save £{discountAmount.toFixed(2)}!
              </Typography> */}
            </Box>
          ) : (
            // Without Discount - Show regular price
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: "text.primary",
                fontSize: { xs: "1.5rem", md: "1.75rem" },
              }}
            >
              {getAirport == "DXB"
              ? `AED${currentPrice.toFixed(2)}`:
              getAirport == "DUB"
                ? `€${currentPrice.toFixed(2)}`
                : `£${currentPrice.toFixed(2)}`}
            </Typography>
          )}

          {/* Special Offer Text */}
          {offer && (
            <Typography
              variant="body2"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                fontSize: "0.85rem",
                fontStyle: "italic",
              }}
            >
              ✨ {offer}
            </Typography>
          )}
        </Box>

        <CustomButton
          onClick={handleBookNow}
          customVariant="primary"
          size="medium"
          disabled={isLoadingProduct}
          isLoading={isLoadingProduct}
          loadingText="Getting Details..."
          sx={{
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          Book Now
        </CustomButton>
      </Box>

      {/* Modal component */}
      <InfoAndMapModal
        open={openParkingInfoModal}
        onClose={handleCloseParkingInfoModal}
        productData={item}
      />
    </Box>
  );
}
