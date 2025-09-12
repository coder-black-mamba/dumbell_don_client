import React from 'react';
import SectionTitle from '../SectionTitle';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

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
            <motion.div
              key={review.id}
              className="bg-base-100 rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative mb-6">
                <FaQuoteLeft className="text-brand text-4xl mb-4" />
                <p className="text-gray-300 italic">"{review.content}"</p>
              </div>
              
              <div className="flex items-center mt-8">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{review.name}</h4>
                  <p className="text-gray-600 text-sm mb-1">{review.role}</p>
                  <StarRating rating={review.rating} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-brand text-white rounded-full font-medium hover:bg-brand/90 transition-colors"
          >
            Leave a Review
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;