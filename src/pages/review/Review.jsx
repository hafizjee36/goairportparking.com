import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CreateReview from "./CreateReview";
import "./Review.css";

const Review = () => {
    const [searchParams] = useSearchParams();
    const reference = searchParams.get("Reference");

    const [singlebooking, setSingleBooking] = useState({});
    const [status, setStatus] = useState("");

    const getReview = async () => {
        if (!reference) return;

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const apiKey = import.meta.env.VITE_API_KEY;

            const response = await fetch(
                `${apiUrl}/reviews/show?${new URLSearchParams({
                    key: apiKey,
                    reference: reference,
                })}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            const json = await response.json();

            if (json?.success) {
                setSingleBooking(json?.data);
            } else {
                setStatus(json?.errors || "Failed to load booking details");
            }
        } catch (error) {
            console.error("Error fetching review:", error);
            setStatus("An error occurred while loading the review.");
        }
    };

    useEffect(() => {
        if (reference) {
            getReview();
        } else {
            setStatus("No reference provided");
        }
    }, [reference]);

    return (
        <>
            {status?.length > 0 ? (
                <div className="review-page-container" style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2 style={{ color: 'var(--error-red)' }}>{status}</h2>
                </div>
            ) : (
                <CreateReview bookingDetail={singlebooking} />
            )}
        </>
    );
};

export default Review;
