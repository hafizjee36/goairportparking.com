import { Box, Button, Typography } from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
    offer,
  } = item;

  const rating =
    average_rating !== null && average_rating !== undefined
      ? parseFloat(average_rating)
      : 0;

  const hasRating = average_rating !== null && average_rating !== undefined;
  const reviews = null;

  const currentPrice = parseFloat(price) || 0;
  const originalPrice = parseFloat(price_before_discount) || 0;
  const discountAmount = parseFloat(discount) || 0;
  const hasDiscount = discountAmount > 0 && originalPrice > currentPrice;
  const bookingFeeText = `(+${currency}1.95 booking fee)`;

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
      console.error("❌ No SKU available for product:", item);
      return;
    }

    setIsLoadingProduct(true);

    try {
      const getDeparture =
        searchParams.get("departure") || searchData.entryDate;
      const getArrival = searchParams.get("arrival") || searchData.exitDate;
      const getAirport = searchParams.get("airport") || searchData.airport;
      const getPromocode =
        searchParams.get("promocode") || searchData.discountCode;
      const getTrafficSource =
        searchParams.get("traffic_source") || searchData.trafficSource;

      localStorage.setItem("sku_id", item.sku_id);

      const normalizeDateTime = (value) =>
        value ? value.replace(/\+/g, " ").trim() : "";

      dispatch(setSelectedParking(item));

      if (typeof window !== "undefined") {
        const departureDate = parse(
          normalizeDateTime(getDeparture),
          "yyyy-MM-dd HH:mm",
          new Date()
        );

        const arrivalDate = parse(
          normalizeDateTime(getArrival),
          "yyyy-MM-dd HH:mm",
          new Date()
        );

        const paymentUrl = `/payment?departure=${format(
          departureDate,
          "dd-MM-yyyy HH:mm"
        )}&arrival=${format(
          arrivalDate,
          "dd-MM-yyyy HH:mm"
        )}&airport=${getAirport}&promocode=${
          getPromocode || ""
        }&sku=${item.sku}${
          getTrafficSource ? `&traffic_source=${getTrafficSource}` : ""
        }`;

        navigate(paymentUrl);
      }
    } catch (error) {
      console.error("❌ Error in handleBookNow:", error);
      dispatch(setSelectedParking(item));
    } finally {
      setIsLoadingProduct(false);
    }
  };

  const formattedCurrentPrice =
    getAirport?.toUpperCase() === "DXB"
      ? `AED${currentPrice.toFixed(2)}`
      : getAirport?.toUpperCase() === "DUB"
      ? `€${currentPrice.toFixed(2)}`
      : `£${currentPrice.toFixed(2)}`;

  const formattedOriginalPrice =
    getAirport?.toUpperCase() === "DXB"
      ? `AED${originalPrice.toFixed(2)}`
      : getAirport?.toUpperCase() === "DUB"
      ? `€${originalPrice.toFixed(2)}`
      : `£${originalPrice.toFixed(2)}`;

  const visibleFeatures =
    Array.isArray(features) && features.length > 0
      ? features.slice(0, 4)
      : ["Trusted parking facility"];

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(0,0,0,0.08)",
        bgcolor: "#fff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          p: 2,
          pb: 0,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            minHeight: { xs: 220, md: 240 },
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "#f3f4f6",
          }}
        >
          <Box
            component="img"
            src={image}
            alt={alt || name || "Parking image"}
            loading="lazy"
            decoding="async"
            width="1600"
            height="900"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/1600x900?text=Parking";
            }}
          />
        </Box>

        <Button
          onClick={handleOpenParkingInfoModal}
          startIcon={<InfoOutlineIcon />}
          sx={{
            position: "absolute",
            top: 22,
            right: 28,
            minWidth: 118,
            minHeight: 40,
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
          sx={{
            fontWeight: 800,
            lineHeight: 1.15,
            mb: 1,
            minHeight: { xs: 52, md: 56 },
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
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
            minHeight: 28,
            flexWrap: "wrap",
          }}
        >
          {hasRating ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minHeight: 24 }}>
              <Stars rating={rating} reviews={reviews} />
            </Box>
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontStyle: "italic",
                minHeight: 24,
                display: "flex",
                alignItems: "center",
              }}
            >
              No ratings yet
            </Typography>
          )}

          {category && (
            <>
              <Typography>|</Typography>
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
            minHeight: { xs: 132, md: 144 },
          }}
        >
          {visibleFeatures.map((f, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                minHeight: 24,
              }}
            >
              <CheckCircleOutlineIcon
                sx={{
                  color: "primary.main",
                  fontSize: 22,
                  mt: "1px",
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "text.primary",
                  lineHeight: 1.4,
                }}
              >
                {f}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          p: { xs: 2, md: 3 },
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 2,
          mt: "auto",
          minHeight: { xs: 132, md: 144 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            minHeight: 108,
            justifyContent: "flex-end",
            flex: "1 1 auto",
          }}
        >
          {hasDiscount ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography
                variant="body1"
                sx={{
                  textDecoration: "line-through",
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  minHeight: 28,
                }}
              >
                Was {formattedOriginalPrice}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: "success.main",
                  fontSize: { xs: "1.8rem", md: "2rem" },
                  lineHeight: 1,
                  minHeight: 36,
                }}
              >
                {formattedCurrentPrice}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  minHeight: 20,
                }}
              >
                {bookingFeeText}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Box sx={{ minHeight: 28 }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  color: "text.primary",
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  minHeight: 36,
                  lineHeight: 1.1,
                }}
              >
                {formattedCurrentPrice}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  minHeight: 20,
                }}
              >
                {bookingFeeText}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              minHeight: 20,
              display: "flex",
              alignItems: "center",
            }}
          >
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
        </Box>

        <Box sx={{ flexShrink: 0 }}>
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
              minWidth: 150,
              minHeight: 48,
              whiteSpace: "nowrap",
            }}
          >
            Book Now
          </CustomButton>
        </Box>
      </Box>

      <InfoAndMapModal
        open={openParkingInfoModal}
        onClose={handleCloseParkingInfoModal}
        productData={item}
      />
    </Box>
  );
}