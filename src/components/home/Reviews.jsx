import React from 'react';
import SectionTitle from '../SectionTitle';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import ReviewComponent from './ReviewComponent';

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    content: "Dumbbell Don transformed my fitness journey! The trainers are knowledgeable and the community is incredibly supportive. I've never felt better!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marathon Runner",
    content: "The personalized training program helped me shave 15 minutes off my marathon time. The facilities are top-notch and always clean.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Yoga Instructor",
    content: "As a fitness professional, I'm very particular about where I train. Dumbbell Don exceeds all my expectations with their equipment and trainer expertise.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/63.jpg"
  }
];



const Reviews = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="What Our Members Say"
          subtitle="Testimonials"
          description="Hear from our community of fitness enthusiasts"
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <ReviewComponent review={review} index={index} />
          ))}
        </div>
        <Link to="/reviews">
          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-brand text-white rounded-full font-medium hover:bg-brand/90 transition-colors"
            >
              Leave a Review
            </motion.button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Reviews;