import React, { useState } from "react";
import { FaCheck, FaFire, FaStar, FaTrophy, FaDumbbell } from "react-icons/fa";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import PricingContainer from "../components/pricing/PricingContainer";
import Loader from "../components/common/Loader";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-base-300 py-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Choose Your Plan
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Flexible pricing plans designed to help you achieve your fitness
            goals.
          </p>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="container mx-auto px-4 mt-12">
        {/* Pricing Cards */}
        <PricingContainer />
        {/* FAQ Section */}
      </div>
    </div>
  );
};

export default Pricing;
