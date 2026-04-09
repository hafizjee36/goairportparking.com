import { lazy, Suspense, useEffect } from "react";
import Hero from "./components/Hero";
import Seo from "../../components/reusable/Seo";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import BookingForm from "../../components/bookingForm/BookingForm";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchField, selectSearchData } from "../../redux/slice/searchSlice";

// Lazy load below-the-fold homepage sections
const HowItWorks = lazy(() => import("./components/HowItWorks"));
const GlobalServices = lazy(() => import("./components/GlobalServices"));
const Welcome = lazy(() => import("./components/Welcome"));
const OurServices = lazy(() => import("./components/OurServices"));
const Customers = lazy(() => import("./components/Customers"));
const CustomerReview = lazy(() => import("./components/CustomerReview"));
const Subscribe = lazy(() => import("./components/Subscribe"));
const Frequently = lazy(() => import("./components/Frequently"));
const Question = lazy(() => import("./components/Question"));

export default function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const searchData = useSelector(selectSearchData);

  useEffect(() => {
    const trafficSource =
      searchParams.get("utm_source") || searchParams.get("traffic_source");

    if (trafficSource && trafficSource !== searchData.trafficSource) {
      dispatch(updateSearchField({ field: "trafficSource", value: trafficSource }));
      console.log("Home: Captured traffic_source:", trafficSource);
      console.log("Home: Updated Redux searchData:", {
        ...searchData,
        trafficSource,
      });
    }
  }, [searchParams, dispatch, searchData.trafficSource]);

  return (
    <>
      <Seo
        title="Cheap Airport Parking - Compare & Save Up to 60% | Go Airport Parking"
        description="Compare and book the cheapest airport parking deals in the UK. Find secure meet & greet, park & ride, and long stay parking at all major airports. Instant confirmation & best price guarantee."
        keywords={[
          "cheap airport parking",
          "airport parking deals",
          "compare airport parking",
          "UK airport parking",
          "meet and greet parking",
          "park and ride",
          "secure airport parking",
          "best airport parking prices",
        ]}
      />

      <Box>
        <Hero />
        {!isSmallScreen && (
          <Box
            sx={{
              position: "absolute",
              bottom: { md: -110 },
              left: 0,
              right: 0,
              zIndex: 2,
              px: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: "1200px" }}>
              <BookingForm />
            </Box>
          </Box>
        )}
      </Box>

      {isSmallScreen && (
        <Box sx={{ px: 2, mt: 4 }}>
          <BookingForm />
        </Box>
      )}

      <Suspense fallback={null}>
        <Box sx={{ mt: { xs: 6, sm: 8, md: 16 } }}>
          <HowItWorks />
        </Box>
        <Box sx={{ mt: 2 }}>
          <GlobalServices />
        </Box>
        <Welcome />
        <OurServices />
        <Customers />
        <CustomerReview />
        <Subscribe />
        <Frequently />
        <Question />
      </Suspense>
    </>
  );
}