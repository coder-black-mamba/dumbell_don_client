import React from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaStar } from "react-icons/fa";
// import { reviews } from '../data/reviews';

const ReviewPageCard = ({ review, index }) => {
  return (
    <motion.div
      key={review.id+5}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-700 hover:border-brand-500/50 transition-colors duration-200"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          {review.member?.avatar ? (
            <img
              src={review.member?.avatar}
              alt={review.member?.name}
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
            <h3 className="text-lg font-semibold text-white">
              {review.member?.name || "Anonymous"}
            </h3>
            <div className="flex items-center mt-1 sm:mt-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? "text-brand" : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400 ml-2">
                {new Date(review?.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          <p className="mt-2 text-gray-300 whitespace-pre-line">
            {review?.comment}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewPageCard;
