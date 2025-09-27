import React, { useEffect, useState } from 'react';
import SectionTitle from '../SectionTitle';
import { FaStar, FaQuoteLeft, FaUserAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { authApiClient } from '../../services/apiServices';
import { format } from 'date-fns';
import ReviewCard from './ReviewCard';

const staticReviews=[
  {
      "id": 5,
      "member": {
          "id": 6,
          "email": "sayed.eeeee.386@gmail.com",
          "first_name": "abu",
          "last_name": "sayed",
          "profile_picture": null,
          "profile_picture_url": null
      },
      "rating": 4,
      "comment": "oi kiree",
      "created_at": "2025-09-20T03:21:21.684865Z",
      "updated_at": "2025-09-20T03:21:21.684881Z",
      "fitness_class": 2
  },
  {
      "id": 6,
      "member": {
          "id": 6,
          "email": "sayed.eeeee.386@gmail.com",
          "first_name": "abu",
          "last_name": "sayed",
          "profile_picture": null,
          "profile_picture_url": null
      },
      "rating": 2,
      "comment": "hi hello",
      "created_at": "2025-09-20T03:21:46.973669Z",
      "updated_at": "2025-09-20T03:21:46.973686Z",
      "fitness_class": 2
  },
  {
      "id": 7,
      "member": {
          "id": 2,
          "email": "sde.sayed24@gmail.com",
          "first_name": "abu",
          "last_name": "sayed",
          "profile_picture": null,
          "profile_picture_url": null
      },
      "rating": 6,
      "comment": "Sexy Nice Wow",
      "created_at": "2025-09-21T17:49:03.390883Z",
      "updated_at": "2025-09-21T17:49:03.390899Z",
      "fitness_class": 5
  },
  {
      "id": 1,
      "member": {
          "id": 1,
          "email": "admin@gmail.com",
          "first_name": "admin",
          "last_name": "admin",
          "profile_picture": null,
          "profile_picture_url": null
      },
      "rating": 5,
      "comment": "string",
      "created_at": "2025-08-21T23:45:17.946269Z",
      "updated_at": "2025-09-27T09:44:58.267294Z",
      "fitness_class": 2
  },
  {
      "id": 8,
      "member": {
          "id": 1,
          "email": "admin@gmail.com",
          "first_name": "admin",
          "last_name": "admin",
          "profile_picture": null,
          "profile_picture_url": null
      },
      "rating": 4,
      "comment": "Kire Beda Kemon AChis",
      "created_at": "2025-09-27T09:52:51.096702Z",
      "updated_at": "2025-09-27T09:52:51.096720Z",
      "fitness_class": 7
  }
];


const Reviews = () => {
  const [reviews, setReviews] = useState(staticReviews);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await authApiClient.get('feedbacks/');
        // Sort by most recent first
        const sortedReviews = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setReviews(sortedReviews);
      } catch (err) {
        setReviews(staticReviews);
        console.error('Error fetching reviews:', err);
        // setError('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Get top 3 most recent reviews for the home page
  const featuredReviews = reviews.slice(0, 3);




  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="What Our Members Say"
          subtitle="Testimonials"
          description="Hear from our community of fitness enthusiasts"
          center
        />

        {featuredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-7xl mx-auto">
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to leave a review!
          </div>
        )}

        <Link to="/reviews">
          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-brand text-white rounded-full font-medium hover:bg-brand/90 transition-colors"
            >
              {reviews.length > 3 ? 'View All Reviews' : 'Leave a Review'}
            </motion.button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Reviews;