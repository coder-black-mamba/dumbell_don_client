import React from 'react'
import { motion } from 'framer-motion'
import { FaCheck, FaFire, FaStar } from 'react-icons/fa'

const PlanCard = ({plan}) => {
  return (
    <div key={plan.id}><motion.div
    
    className={`relative rounded-2xl overflow-hidden ${
      plan.description.toLowerCase().includes("popular")
        ? "shadow-2xl transform scale-105 z-10 border-2 border-brand"
        : "shadow-lg border border-gray-200"
    }`}
    whileHover={{ y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {/* {plan.popular && (
      <div className="absolute top-0 right-0 bg-brand text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
        MOST POPULAR
      </div>
    )} */}

    <div
      className={`p-8 ${
        plan.description.toLowerCase().includes("popular")
          ? "bg-base-300"
          : "bg-base-100"
      }`}
    >
      <div className="flex items-center mb-6">
        <div
          className={`p-3 rounded-full ${
            plan.description.toLowerCase().includes("popular")
              ? "bg-brand text-white"
              : "bg-gray-100 text-brand"
          }`}
        >
          {plan.description.toLowerCase().includes("popular") ? (
            <FaFire />
          ) : (
            <FaStar />
          )}
        </div>
        <h3 className="text-2xl font-bold ml-4">{plan.name}</h3>
      </div>

      <div className="mb-8">
        <div className="flex items-end">
          <span className="text-4xl font-bold">${plan.price_cents/100}</span>
          <span className="text-gray-500 ml-2">
            / {plan.duration_days} days
          </span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.description.split(",").map((feature, index) => (
          <li key={index} className="flex items-center">
            <FaCheck className="text-green-500 mr-3" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
          plan.description.toLowerCase().includes("popular")
            ? "bg-brand hover:bg-brand  text-white"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
        }`}
      >
        Get Started
      </button>
    </div>
  </motion.div></div>
  )
}

export default PlanCard