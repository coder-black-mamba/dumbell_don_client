import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FaStar, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import ErrorMessage from "../common/ErrorMessage";
import SuccessMessage from "../common/SuccessMessage";
import { authApiClient } from "../../services/apiServices";


const ReviewForm = ({ reviews, setReviews }) => {
  const { isAuthenticated, user } = useAuth();
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    hover: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRatingClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleHoverRating = (rating) => {
    setNewReview({ ...newReview, hover: rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("Please log in to leave a review");
      return;
    }

    if (newReview.rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (!newReview.comment.trim()) {
      setError("Please write your review");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      // Simulate API call
      const review = {
        "rating": newReview.rating,
        "comment": newReview.comment.trim(),
        "fitness_class": 2,
        "created_at": new Date(),
      }

      const response = await authApiClient.post("/feedbacks/", review);
      console.log(response);
      setReviews([response.data, ...reviews]);
      setNewReview({ rating: 0, comment: "", hover: 0 });
      // alert("Thank you for your review!");
    } catch (error) {
      console.error("Failed to submit review:", error);
      setError("Failed to submit review. Please try again.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl shadow-lg p-6 mb-12 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {error && (
        <div className="py-5 my-5">
          <ErrorMessage message={error} />
        </div>
      )}
      {isLoading && (
        <SuccessMessage message={"Review Submitting...."} />
      )}
      <h2 className="text-2xl font-semibold text-white mb-6">Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={`text-3xl mr-1 cursor-pointer ${
                    (newReview.hover || newReview.rating) >= ratingValue
                      ? "text-brand-400"
                      : "text-gray-600"
                  }`}
                  onClick={() => handleRatingClick(ratingValue)}
                  onMouseEnter={() => handleHoverRating(ratingValue)}
                  onMouseLeave={() => handleHoverRating(0)}
                  disabled={isLoading}
                >
                  <FaStar />
                </button>
              );
            })}
            <span className="ml-2 text-brand-300">
              {newReview.rating > 0
                ? `${newReview.rating} star${newReview.rating > 1 ? "s" : ""}`
                : "Rate us"}
            </span>
          </div>
          <div className="mt-4">
            <textarea
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-white placeholder-gray-400"
              rows="4"
              placeholder="Share your experience with us..."
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              disabled={!isAuthenticated || isLoading}
            ></textarea>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={!isAuthenticated || isLoading}
              className={`flex items-center px-6 py-3 rounded-full font-medium text-white ${
                isAuthenticated && !isLoading
                  ? "bg-brand-600 hover:bg-brand-700 transition-colors duration-200"
                  : "bg-gray-700 cursor-not-allowed text-gray-400"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" />
                  {isAuthenticated ? "Submit Review" : "Log in to Review"}
                </>
              )}
            </button>
          </div>
          {!isAuthenticated && (
            <p className="text-sm text-gray-400 mt-2">
              You need to be logged in to leave a review.
            </p>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ReviewForm;
