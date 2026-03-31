// Hook for automatic booking synchronization - matching reference project pattern
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { format, parse } from "date-fns";
import { apiKey } from "../common/config/api";
import apiCall from "../services/apiService";

const safeJsonParse = async (response) => {
  const clonedResponse = response.clone(); // Clone for multiple reads
  let rawText = '';
  
  try {
    if (!response.ok) {
      rawText = await clonedResponse.text();
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    rawText = await response.text();
    console.log(`🔍 Raw Alveus API response (${response.url}):`, rawText.slice(0, 500) + (rawText.length > 500 ? '...' : ''));
    
    // Check if it's JSON (starts with { or [)
    if (rawText.trim().startsWith('{') || rawText.trim().startsWith('[')) {
      const json = JSON.parse(rawText);
      return { success: true, data: json, raw: rawText };
    } else {
      throw new Error('Response is not valid JSON');
    }
  } catch (err) {
    console.error('❌ safeJsonParse failed:', err.message);
    
    // Use clone for error logging
    const errorText = await clonedResponse.text();
    console.error('Raw response snippet:', errorText.slice(0, 200));
    
    return { success: false, error: err.message, status: response.status, raw: errorText };
  }
};

export const useBookingSync = ({
  personalData,
  vehicleData,
  bookingOptions,
  selectedProduct,
  searchData,
  enabled = true,
}) => {
  const [searchParams] = useSearchParams();
  const [syncStatus, setSyncStatus] = useState("initial"); // initial, triggered, stored, error
  const [multimode, setMultimode] = useState("");
  const [referenceNo, setReferenceNo] = useState([]);
  const [make, setMake] = useState("TBC");
  const [model, setModel] = useState("TBC");
  const [color, setColor] = useState("TBC");
  const [regNo, setRegNo] = useState("TBC");
  const [error, setError] = useState("");
  const [responseError, setResponseError] = useState("");

  // Use ref to prevent multiple simultaneous calls
  const syncInProgress = useRef(false);

  // Get URL parameters like reference project
  const getReference = searchParams.get("reference_no");
  const getAirport = searchParams.get("airport");
  const getDeparture = searchParams.get("departure");
  const getArrival = searchParams.get("arrival");
  const getPromocode = searchParams.get("promocode");
  const getDiscountCode =
    searchParams.get("discountcode") || searchParams.get("discount_code");
  const getTrafficSource = searchParams.get("traffic_source");

  // Initialize references from URL if available
  useEffect(() => {
    if (getReference) {
      setReferenceNo([getReference]);
      setMultimode(`MM-${getReference}`);
      setSyncStatus("stored"); // Already have references
    }
  }, [getReference]);

  useEffect(() => {
    if (vehicleData && vehicleData.length > 0) {
      const v = vehicleData[0]; // Get first vehicle

      setMake(v.make || "TBC");
      setModel(v.model || "TBC");
      setColor(v.color || "TBC");
      setRegNo(v.reg_no || "TBC");
    }
  }, [vehicleData]);

  // Check if user has filled required personal details (matching reference project)
  const isFormReady =
    personalData?.firstName?.length > 0 &&
    personalData?.lastName?.length > 0 &&
    personalData?.email?.length > 0 &&
    personalData?.phone?.length > 0;

  const handleSyncBooking = async () => {
    if (syncInProgress.current) {
      console.log("🔄 useBookingSync: Skipping sync - already in progress");
      return { success: false, reason: "sync in progress" };
    }

    setSyncStatus("triggered");
    syncInProgress.current = true;
    setError("");
    setResponseError("");

    try {
      // Prepare booking details matching reference project format
      const buildDateTime = (dateStr, timeStr) => {
        if (!dateStr) return "";
        const t = timeStr && typeof timeStr === "string" ? timeStr : "12:00";
        return format(parse(`${dateStr} ${t}`, "yyyy-MM-dd HH:mm", new Date()),
          "dd-MM-yyyy HH:mm"
        );
      };
      const formatFromUrl = (dt) =>
        dt ? format(parse(dt, "yyyy-MM-dd HH:mm", new Date()), "dd-MM-yyyy HH:mm") : "";

      const dep = getDeparture
        ? getDeparture
        : buildDateTime(searchData?.entryDate, searchData?.entryTime);
      const arr = getArrival
        ? getArrival
        : buildDateTime(searchData?.exitDate, searchData?.exitTime);

      const bookingDetails = {
        key: apiKey,
        sku: selectedProduct?.sku,
        api_tag: selectedProduct?.api_tag || selectedProduct?.sku_tag || "",
        multi_mode_reference_no: multimode,

        // Personal details
        title: personalData?.title || "Mr",
        first_name: personalData?.firstName || "",
        last_name: personalData?.lastName || "",
        email: personalData?.email || "",
        contact_no: personalData?.phone || "",

        // Travel details
        departure: dep,
        arrival: arr,
        departure_terminal: personalData?.departureTerminal || "",
        departure_flight_no: personalData?.departureFlightNo || "",
        arrival_terminal: personalData?.arrivalTerminal || "",
        arrival_flight_no: personalData?.arrivalFlightNo || "",

        // Pricing
        amount: selectedProduct?.price || "0.00",
        discount_amount: selectedProduct?.discount || "0.00",
        discount_code:
          getPromocode ||
          getDiscountCode ||
          searchData?.discountCode ||
          searchData?.promocode ||
          "",
        promocode:
          getPromocode ||
          getDiscountCode ||
          searchData?.discountCode ||
          searchData?.promocode ||
          "",

        // Options
        cancellation_status: bookingOptions?.cancellationProtection ? "1" : "0",
        sms_confirmation: bookingOptions?.smsUpdates ? "1" : "0",
        valet_type: "",
        instruction: "Online booking via Smart Parking Deals",
        no_of_peoples: personalData?.numberOfPeople || 1,
        traffic_source: getTrafficSource || "",

        // Vehicles
        vehicles:
          vehicleData && vehicleData.length > 0
            ? vehicleData.map((vehicle) => ({
              make: vehicle.make || "TBC",
              model: vehicle.model || "TBC",
              color: vehicle.color || "TBC",
              reg_no: vehicle.reg_no || "TBC",
            }))
            : [
              {
                make: "TBC",
                model: "TBC",
                color: "TBC",
                reg_no: "TBC",
              },
            ],
      };
      const bookingDetails2 = {
        p_id: '',
        passenger: personalData?.numberOfPeople || 1,
        Car_Registration: regNo,
        Car_Manufacturer: make,
        Car_Model: model,
        Car_Colour: color,
        airport: getAirport || searchData?.airport || '',
        price: (parseFloat(selectedProduct?.price) + 1.95).toFixed(2) || "0.00",
        new_reference: 'referenceNo',
        Departure_Terminal: personalData?.departureTerminal || "",
        Return_Terminal: personalData?.arrivalTerminal || "",

        First_Name: personalData?.firstName || "",
        Surname: personalData?.lastName || "",
        Email: personalData?.email || "",
        Contact_Number: personalData?.phone || "",

        Departure_Flight_Number: personalData?.departureFlightNo || "",
        Return_Flight_Number: personalData?.arrivalFlightNo || "",
        rdate: new Date().toLocaleTimeString(),
        selectedDate: dep.split(" ")[0],
        changedDate: arr.split(" ")[0],
        arrivalTime: dep.split(" ")[1],
        departureTime: arr.split(" ")[1],

        operator_id: '',
        promoCode: getPromocode ||
          getDiscountCode ||
          searchData?.discountCode ||
          searchData?.promocode ||
          "",
        promo_price: selectedProduct?.discount || "0.00",
        website: 'goairportparking.com',
        access_token: '5MEsB9lLwVqu4qndXvEUE428bqGZY',
        cur: 'GBP',
        webtype: 'arrival',
        traffic_source: getTrafficSource || ""
      };

      let response;

      // Check if we need to store or update (matching reference project logic)
      if (multimode.length === 0 && referenceNo.length === 0) {

        response = await apiCall("POST", "/bookings/store", bookingDetails);
        
        const skudId = localStorage.getItem("sku_id");
        const urlP = `https://globalparkingtech.co.uk/api_get_product?product_code=` + skudId + '&airport=' + bookingDetails2.airport;
        
        console.log('🌐 Fetching Alveus product:', urlP);
        const resp = await fetch(urlP);
        const productResult = await safeJsonParse(resp);
        
        if (productResult.success) {
          bookingDetails2.p_id = productResult.data?.data?.id || '';
          bookingDetails2.operator_id = productResult.data?.data?.operator_id || '';
          console.log("✅ Response from Alveus product:", productResult.data);
        } else {
          console.error("❌ Alveus product API failed:", productResult.error);
          bookingDetails2.p_id = '';
          bookingDetails2.operator_id = '';
        }

        if (
          response?.data?.reference_no &&
          response?.data?.multi_mode_reference_no
        ) {
          const newMultiMode = response.data.multi_mode_reference_no;
          const newReferenceNo = response.data.reference_no;

          bookingDetails2.new_reference = newReferenceNo;

          console.log("bookingDetails2:", bookingDetails2);
          if (bookingDetails2.p_id) {
            const url = `https://globalparkingtech.co.uk/api_create_booking3?` + new URLSearchParams(bookingDetails2).toString();
            console.log('🌐 Creating Alveus booking:', url);
            
            const response2 = await fetch(url);
            const alveusResult = await safeJsonParse(response2);
            
            if (alveusResult.success) {
              const bookingId = alveusResult.data?.booking_last_inserted_id || alveusResult.data?.id;
              localStorage.setItem("bookingId", bookingId || 'unknown');
              localStorage.removeItem("sku_id");
              console.log("✅ Response from Alveus admin:", alveusResult.data);
              console.log("bookingId:", localStorage.getItem("bookingId"));
            } else {
              console.error("❌ Alveus booking API failed:", alveusResult.error);
              console.error("Raw Alveus response:", alveusResult.raw?.slice(0, 500));
              localStorage.setItem("bookingId", "alveus_failed");
              // Continue - don't fail entire booking sync
            }
          } else {
            console.log("Product ID is missing, skipping Alveus booking creation.");
            localStorage.setItem("bookingId", "no_product_id");
          }

          setMultimode(newMultiMode);
          setReferenceNo(newReferenceNo);
          setSyncStatus("stored");

          // Store in sessionStorage like reference project
          if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem(
              "detail",
              JSON.stringify({
                ...bookingDetails,
                reference_no: newReferenceNo,
                multi_mode_reference_no: newMultiMode,
              })
            );
          }

          return {
            success: true,
            data: response.data,
            multiModeReference: newMultiMode,
            referenceNo: newReferenceNo,
          };
        } else {
          throw new Error(
            response?.message || "Failed to get booking references"
          );
        }
      } else {
        console.log("🔄 useBookingSync: Updating existing booking...");
        response = await apiCall("POST", "/bookings/update", {
          ...bookingDetails,
          multi_mode_reference_no: multimode,
          reference_no: referenceNo,
        });

        if (
          response?.data?.reference_no &&
          response?.data?.multi_mode_reference_no
        ) {
          setSyncStatus("stored");

          // Update sessionStorage
          if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem(
              "detail",
              JSON.stringify({
                ...bookingDetails,
                reference_no: response.data.reference_no,
                multi_mode_reference_no: response.data.multi_mode_reference_no,
              })
            );
          }

          return {
            success: true,
            data: response.data,
            multiModeReference: response.data.multi_mode_reference_no,
            referenceNo: response.data.reference_no,
          };
        } else {
          setResponseError(response?.message || "Update failed");
          throw new Error(response?.message || "Failed to update booking");
        }
      }
      } catch (err) {
        console.error("❌ useBookingSync error:", err);
        const errorMsg = err.message || "Booking sync failed";
        setError(errorMsg);
        setResponseError(errorMsg);
        setSyncStatus("error");
        return { success: false, error: errorMsg };
      } finally {
        syncInProgress.current = false;
      }
  };

  // Auto-sync when form is ready (matching reference project with 3 second delay)
  useEffect(() => {
    if (!enabled || !isFormReady || syncStatus !== "initial") return;

    console.log(
      "⏱️ useBookingSync: Form is ready, starting 3-second delay timer..."
    );
    const delayTimer = setTimeout(() => {
      console.log("⚡ useBookingSync: 3 seconds passed, triggering sync...");
      handleSyncBooking();
    }, 3000); // 3 second delay exactly like reference project

    return () => {
      console.log("🧹 useBookingSync: Cleaning up delay timer");
      clearTimeout(delayTimer);
    };
  }, [isFormReady, syncStatus, enabled]); // Remove dependencies that cause re-renders

  // Manual sync function for immediate sync if needed (payment time)
  const triggerSync = async () => {
    console.log("🚀 useBookingSync: Manual sync triggered");
    // Always allow sync at payment time (following reference project)
    return await handleSyncBooking();
  };

  // Reset function
  const resetSync = () => {
    console.log("🔄 useBookingSync: Resetting sync state");
    setSyncStatus("initial");
    setMultimode("");
    setReferenceNo([]);
    setError("");
    setResponseError("");
    syncInProgress.current = false;
  };

  return {
    syncStatus, // 'initial', 'triggered', 'stored', 'error'
    multimode, // multimode reference
    referenceNo, // reference number array
    error, // sync error if any
    responseError, // API response error
    isFormReady, // whether form has required data
    triggerSync, // manual sync trigger (returns promise)
    resetSync, // reset sync state
    isLoading: syncInProgress.current || syncStatus === "triggered",
    handleSyncBooking, // expose for manual calls
  };
};

export default useBookingSync;
