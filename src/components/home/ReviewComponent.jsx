import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft , FaStar} from "react-icons/fa";
// import StarRating from "./StarRating";

const ReviewComponent = ({ review, index }) => {

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


    return (
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
  );
};

export default ReviewComponent;
