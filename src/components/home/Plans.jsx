import React from 'react';
import SectionTitle from '../SectionTitle';
import { FaCheck, FaFire, FaStar, FaCrown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const plans = [
  {
    id: 1,
    name: "Basic",
    price: 29,
    period: "month",
    popular: false,
    features: [
      "Access to gym facilities",
      "Standard equipment",
      "Locker room access",
      "Free WiFi",
      "24/7 Access"
    ],
    icon: <FaFire className="w-6 h-6" />
  },
  {
    id: 2,
    name: "Premium",
    price: 59,
    period: "month",
    popular: true,
    features: [
      "Everything in Basic",
      "Group classes",
      "Personal trainer (2x/month)",
      "Sauna & Spa access",
      "Nutrition consultation",
      "Progress tracking"
    ],
    icon: <FaStar className="w-6 h-6" />
  },
  {
    id: 3,
    name: "Elite",
    price: 99,
    period: "month",
    popular: false,
    features: [
      "Everything in Premium",
      "Unlimited personal training",
      "Massage therapy (2x/month)",
      "Towel service",
      "Guest passes (2/month)",
      "Priority booking"
    ],
    icon: <FaCrown className="w-6 h-6" />
  }
];

const Plans = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Membership Plans"
          subtitle="Choose Your Plan"
          description="Flexible pricing options to suit your fitness journey"
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`relative rounded-2xl overflow-hidden ${
                plan.popular 
                  ? 'shadow-2xl transform scale-105 z-10 border-2 border-brand' 
                  : 'shadow-lg border border-gray-200'
              }`}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-brand text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              
              <div className={`p-8 ${
                plan.popular ? 'bg-base-300' : 'bg-base-100'
              }`}>
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-full ${
                    plan.popular ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold ml-4">{plan.name}</h3>
                </div>

                <div className="mb-8">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500 ml-2">/ {plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheck className="text-green-500 mr-3" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-brand hover:bg-brand  text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}>
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Need help choosing the right plan?</p>
          <Link to="/contact">
          <button className="px-6 py-2 border-2 border-brand text-brand hover:bg-brand hover:text-white rounded-full font-medium transition-colors">
            Contact Us
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Plans;