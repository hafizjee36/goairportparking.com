import React from "react";
import { format } from "date-fns";
import "./Review.css";

const BookingDetails = ({ bookingDetail }) => {
  return (
    <div className="booking-details-container">
      <div className="title">
        <h2>Your Booking Details</h2>
      </div>
      <div className="booking-details-wrapper">
        <div className="booking-info-item">
          <div className="booking-info-title">
            <h3>Booking Date</h3>
          </div>
          <div className="booking-info-value">
            <p>
              {bookingDetail?.created_at
                ? format(new Date(bookingDetail?.created_at), "dd-MMMM-yyyy HH:mm")
                : ""}
            </p>
          </div>
        </div>
        <div className="booking-info-item">
          <div className="booking-info-title">
            <h3>Departure Date</h3>
          </div>
          <div className="booking-info-value">
            <p>
              {bookingDetail?.booking_details?.departure_dateTime
                ? format(new Date(bookingDetail?.booking_details?.departure_dateTime),
                  "dd-MMMM-yyyy HH:mm"
                )
                : ""}
            </p>
          </div>
        </div>
        <div className="booking-info-item">
          <div className="booking-info-title">
            <h3>Arrival Date</h3>
          </div>
          <div className="booking-info-value">
            <p>
              {bookingDetail?.booking_details?.arrival_dateTime
                ? format(new Date(bookingDetail?.booking_details?.arrival_dateTime),
                  "dd-MMMM-yyyy HH:mm"
                )
                : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
