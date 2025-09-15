import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FaStar, FaUserCircle, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Sample reviews data
const sampleReviews = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    date: '2025-08-15',
    comment: 'Amazing gym with top-notch equipment and professional trainers!',
    avatar: null
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 4,
    date: '2025-08-10',
    comment: 'Great atmosphere and friendly staff. Highly recommended!',
    avatar: null
  }
];

const Reviews = () => {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState(sampleReviews);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    hover: 0
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
      alert('Please log in to leave a review');
      return;
    }

    if (newReview.rating === 0) {
        alert('Please select a rating');
      return;
    }

    if (!newReview.comment.trim()) {
        alert('Please write your review');
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const review = {
        id: reviews.length + 1,
        name: user?.name || 'Anonymous',
        rating: newReview.rating,
        date: new Date().toISOString().split('T')[0],
        comment: newReview.comment.trim(),
        avatar: user?.avatar || null
      };

      setReviews([review, ...reviews]);
      setNewReview({ rating: 0, comment: '', hover: 0 });
      alert('Thank you for your review!');
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 my-15">
          <h1 className="text-4xl font-bold text-white mb-4">What Our Members Say</h1>
          <p className="text-xl text-brand-200">Read reviews from our valued members</p>
        </div>

        {/* Review Form */}
        <motion.div 
          className="bg-gray-800 rounded-xl shadow-lg p-6 mb-12 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
                          ? 'text-brand-400'
                          : 'text-gray-600'
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
                  {newReview.rating > 0 ? `${newReview.rating} star${newReview.rating > 1 ? 's' : ''}` : 'Rate us'}
                </span>
              </div>
              <div className="mt-4">
                <textarea
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-white placeholder-gray-400"
                  rows="4"
                  placeholder="Share your experience with us..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  disabled={!isAuthenticated || isLoading}
                ></textarea>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  disabled={!isAuthenticated || isLoading}
                  className={`flex items-center px-6 py-3 rounded-full font-medium text-white ${
                    isAuthenticated && !isLoading
                      ? 'bg-brand-600 hover:bg-brand-700 transition-colors duration-200'
                      : 'bg-gray-700 cursor-not-allowed text-gray-400'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      {isAuthenticated ? 'Submit Review' : 'Log in to Review'}
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

        {/* Reviews List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Member Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-700 hover:border-brand-500/50 transition-colors duration-200"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="h-12 w-12 rounded-full object-cover border-2 border-brand-500"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center border-2 border-brand-500/30">
                        <FaUserCircle className="h-10 w-10 text-brand-400/80" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                      <div className="flex items-center mt-1 sm:mt-0">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`h-5 w-5 ${i < review.rating ? 'text-brand-400' : 'text-gray-600'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400 ml-2">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-300 whitespace-pre-line">{review.comment}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;