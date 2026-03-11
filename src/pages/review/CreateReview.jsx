import React, { useEffect, useState } from "react";
import BookingDetails from "./BookingDetails";
import ReviewForm from "./ReviewForm";
import { RotatingLines } from "react-loader-spinner";
import "./Review.css";

const CreateReview = ({ bookingDetail }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (bookingDetail && Object.keys(bookingDetail).length > 0) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [bookingDetail]);

    return (
        <div className="review-page-container">
            <div className="review-title">
                <h1>Leave a review</h1>
            </div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <RotatingLines
                        strokeColor="#F1530A"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                </div>
            ) : (
                <>
                    <BookingDetails bookingDetail={bookingDetail} />
                    <ReviewForm bookingDetail={bookingDetail} />
                </>
            )}
        </div>
    );
};

export default CreateReview;
