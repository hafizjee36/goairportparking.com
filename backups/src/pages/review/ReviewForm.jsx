import React, { useEffect, useState } from "react";
import { Radio } from "pretty-checkbox-react";
import { FaStar } from "react-icons/fa";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Review.css";
import 'pretty-checkbox/dist/pretty-checkbox.min.css'; // Ensure styles are imported

const ReviewForm = ({ bookingDetail }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const reference = searchParams.get("Reference");

    const [open, setOpen] = useState(false);
    const [state, setState] = useState("");
    const [errors, setErrors] = useState({
        state: "validated",
        title: "",
        comments: "",
    });

    const [singleUserReview, setSingleUserReview] = useState({
        company_id: "",
        email: "",
        fullName: "",
        title: "",
        comments: "",
        recommended: false,
        convenience: 5,
        punctuality: 5,
        customer_service: 5,
        collection_vehicle: 5,
        overall: 5,
    });

    useEffect(() => {
        if (bookingDetail) {
            // Small delay to simulate loading or ensure data is ready
            const timer = setTimeout(() => {
                setSingleUserReview((prev) => ({
                    ...prev,
                    company_id: bookingDetail?.company?.id ? `${bookingDetail?.company?.id}` : "",
                    email: bookingDetail.customer?.email || "",
                    fullName: bookingDetail.customer ? `${bookingDetail.customer?.first_name} ${bookingDetail.customer?.last_name}` : "",
                }));
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [bookingDetail]);

    const reviewScrollToView = (errors) => {
        let stateError = Object.values(errors)[0];
        let titleError = Object.keys(errors)[1]; // title is the second key in initial errors object? 
        // Actually, in the validation logic below, we set errors.title if it fails.
        // The original logic relied on the order of keys.

        // Let's find the first error field
        let firstErrorField = null;
        if (errors.title) firstErrorField = 'title';
        else if (errors.comments) firstErrorField = 'comments';

        if (stateError !== 'validated' && firstErrorField) {
            const element = document.querySelector(`[name="${firstErrorField}"]`);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }
    };

    const validateReviewForm = (form) => {
        let newErrors = {
            state: 'validated',
            title: '',
            comments: '',
        };

        if (!form.title || form.title.length === 0) {
            newErrors.state = 'error';
            newErrors.title = 'Please Enter Review Title ';
        }
        if (!form.comments || form.comments.length === 0) {
            newErrors.state = 'error';
            newErrors.comments = 'Please Enter Review Comments ';
        }

        reviewScrollToView(newErrors);
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validateReviewForm(singleUserReview);
        setErrors(validation);

        if (validation.state !== "validated") {
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const apiKey = import.meta.env.VITE_API_KEY;

            const response = await fetch(`${apiUrl}/reviews/store`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    key: apiKey,
                    reference: reference,
                    company_id: singleUserReview?.company_id,
                    fullname: singleUserReview?.fullName,
                    email: singleUserReview?.email,
                    review_title: singleUserReview?.title,
                    comments: singleUserReview?.comments,
                    recommend: `${singleUserReview?.recommended ? "yes" : "no"}`,
                    convenience: singleUserReview?.convenience,
                    punctuality: singleUserReview?.punctuality,
                    customer_service: singleUserReview?.customer_service,
                    collection_vehicle: singleUserReview?.collection_vehicle,
                    overall: singleUserReview?.overall,
                }),
            });

            const json = await response.json();

            if (json.success) {
                setOpen(true);
                setState(`Thanks for your review`);
                setTimeout(() => {
                    setOpen(false);
                    navigate("/");
                }, 2000);
            } else {
                setOpen(true);
                setState(json.errors || "Something went wrong");
                setTimeout(() => {
                    setOpen(false);
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            setOpen(true);
            setState("An error occurred. Please try again later.");
            setTimeout(() => {
                setOpen(false);
            }, 4000);
        }
    };

    const handleChange = (e) => {
        setSingleUserReview({
            ...singleUserReview,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="review-form">
            <Modal open={open} onClose={() => setOpen(false)} center>
                <div className="modal-container">
                    <h2>{state}</h2>
                </div>
            </Modal>
            <form className="form-control" onSubmit={handleSubmit}>
                <div className="input-group">
                    <div className="title">
                        <h4>Would you recommend to a friend?</h4>
                        <Radio
                            checked={singleUserReview.recommended}
                            onClick={() =>
                                setSingleUserReview({
                                    ...singleUserReview,
                                    recommended: true,
                                })
                            }
                            style={{ marginRight: '10px', color: '#252654', fontWeight: '600' }}
                        >
                            Yes
                        </Radio>
                        <Radio
                            checked={!singleUserReview.recommended}
                            onClick={() =>
                                setSingleUserReview({
                                    ...singleUserReview,
                                    recommended: false,
                                })
                            }
                            style={{ color: '#252654', fontWeight: '600' }}

                        >
                            No
                        </Radio>
                    </div>
                    <div className="input-row">
                        <div className="input-field">
                            <label htmlFor="reviewtitle">Review Title</label>
                            <input
                                className={errors.title && !singleUserReview.title ? "input-error" : ""}
                                type="text"
                                placeholder="title"
                                name="title"
                                value={singleUserReview.title}
                                onChange={handleChange}
                            />
                            {errors.title && !singleUserReview.title && (
                                <label className="error-label">{errors.title}</label>
                            )}
                        </div>
                        <div className="input-field">
                            <label htmlFor="reviewcomments">Review Comments</label>
                            <textarea
                                className={errors.comments && !singleUserReview.comments ? "input-error" : ""}
                                placeholder="comments..."
                                name="comments"
                                rows={5}
                                value={singleUserReview.comments}
                                onChange={handleChange}
                            />
                            {errors.comments && !singleUserReview.comments && (
                                <label className="error-label">{errors.comments}</label>
                            )}
                        </div>
                    </div>
                </div>
                <div className="rating-container">
                    <div className="title">
                        <h3>Your Rating</h3>
                    </div>
                    <div className="rating-counter">
                        {[
                            { label: "Convenience of drop off/collection points", key: "convenience" },
                            { label: "Punctuality of service", key: "punctuality" },
                            { label: "Customer service rating", key: "customer_service" },
                            { label: "Process for leaving/collecting vehicle", key: "collection_vehicle" },
                            { label: "Over All Ratings", key: "overall" },
                        ].map((item) => (
                            <div className="rating-row" key={item.key}>
                                <h3 className="rating-label">{item.label}</h3>
                                <div className="stars">
                                    {[...Array(5)].map((_, index) => {
                                        let rating = index + 1;
                                        return (
                                            <FaStar
                                                key={index}
                                                className={`star-icon ${rating <= singleUserReview[item.key]
                                                    ? "star-filled"
                                                    : "star-empty"
                                                    }`}
                                                onClick={() =>
                                                    setSingleUserReview({
                                                        ...singleUserReview,
                                                        [item.key]: rating,
                                                    })
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="btn-container">
                        <button className="submit-btn">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
