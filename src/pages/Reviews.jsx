import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FaStar, FaUserCircle, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ReviewPageCard from '../components/reviews/ReviewPageCard';
import ReviewForm from '../components/reviews/ReviewForm';
import ErrorMessage from '../components/common/ErrorMessage';
import { authApiClient } from '../services/apiServices';

// Sample reviews data
const sampleReviews=[
  {
    "id": 1,
    "rating": 10,
    "comment": "string",
    "created_at": "2025-08-21T23:45:17.946269Z",
    "updated_at": "2025-08-21T23:45:17.946289Z",
    "member": 1,
    "fitness_class": 2
  },
  {
    "id": 2,
    "rating": 5,
    "comment": "string",
    "created_at": "2025-09-20T02:20:20.189899Z",
    "updated_at": "2025-09-20T02:20:20.189919Z",
    "member": 6,
    "fitness_class": 2
  },
  {
    "id": 3,
    "rating": 5,
    "comment": "FUck Off",
    "created_at": "2025-09-20T02:21:19.482715Z",
    "updated_at": "2025-09-20T02:21:19.482731Z",
    "member": 6,
    "fitness_class": 2
  }
]

const Reviews = () => {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState(sampleReviews);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    try {
      const fetchReviews = async () => {
        const response = await authApiClient.get("/feedbacks/");
        setReviews(response.data.data.results);
      }
      fetchReviews();
    } catch (error) {
      setError(error);
    }
    
  }, []);


  console.log(reviews)
 
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 my-15">
          <h1 className="text-4xl font-bold text-white mb-4">What Our Members Say</h1>
          <p className="text-xl text-brand-200">Read reviews from our valued members</p>
        </div>

        {/* Review Form */}
       <ReviewForm reviews={reviews} setReviews={setReviews} />

        {/* Reviews List */}
       <div className="space-y-6">
                 <h2 className="text-2xl font-semibold text-white mb-6">Member Reviews</h2>
                 {error && <ErrorMessage error={error} />}
                 {reviews.length === 0 ? (
                   <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review!</p>
                 ) : (
                   reviews?.map((review, index) => (
                    <ReviewPageCard key={review.id} review={review} index={index} />
                   ))
                 )}
               </div>
      </div>
    </div>
  );
};

export default Reviews;