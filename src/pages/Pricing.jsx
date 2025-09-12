import React, { useState } from 'react';
import { FaCheck, FaFire, FaStar, FaTrophy, FaDumbbell } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: {
        monthly: 29,
        yearly: 299
      },
      description: 'Perfect for beginners starting their fitness journey',
      features: [
        'Access to gym equipment',
        'Free Wi-Fi',
        'Locker room access',
        'Basic workout plan'
      ],
      popular: false,
      icon: <FaDumbbell className="text-3xl mb-4 text-brand" />
    },
    {
      id: 'pro',
      name: 'Pro',
      price: {
        monthly: 59,
        yearly: 599
      },
      description: 'Ideal for regular gym-goers who want more',
      features: [
        'Everything in Basic',
        'Group classes access',
        'Fitness assessment',
        'Personal trainer discount',
        'Sauna & steam room'
      ],
      popular: true,
      icon: <FaFire className="text-3xl mb-4 text-brand" />
    },
    {
      id: 'elite',
      name: 'Elite',
      price: {
        monthly: 99,
        yearly: 999
      },
      description: 'For those who demand the ultimate fitness experience',
      features: [
        'Everything in Pro',
        '24/7 gym access',
        'Unlimited personal training',
        'Nutritional guidance',
        'Massage therapy (2x/month)',
        'Guest passes (2/month)'
      ],
      popular: false,
      icon: <FaTrophy className="text-3xl mb-4 text-brand" />
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

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
            Flexible pricing plans designed to help you achieve your fitness goals.
          </p>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-full shadow-md inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-brand text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-brand text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Yearly Billing
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={fadeInUp}
              className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative ${
                plan.popular ? 'border-2 border-brand' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-brand text-white text-xs font-bold px-4 py-1 transform translate-x-2 -translate-y-2 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                  <div>{plan.icon}</div>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-gray-900">
                    ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-gray-500">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-green-600 mt-1">Save ${(plan.price.monthly * 12) - plan.price.yearly} annually</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <FaCheck className="text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-brand hover:bg-brand/90 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-24">
          <SectionTitle 
            title="Frequently Asked Questions" 
            description="Find answers to common questions about our membership plans and services."
            align="center"
          />

          <div className="space-y-4">
            {[
              {
                question: "Can I upgrade or downgrade my plan later?",
                answer: "Yes, you can change your plan at any time. Any price difference will be prorated."
              },
              {
                question: "Is there a contract or long-term commitment?",
                answer: "No, all our plans are month-to-month with no long-term contracts. You can cancel anytime."
              },
              {
                question: "Do you offer student or military discounts?",
                answer: "Yes, we offer 15% off for students and military personnel with valid ID."
              },
              {
                question: "Can I freeze my membership?",
                answer: "Yes, you can freeze your membership for up to 3 months per year for medical or travel reasons."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2 text-base-300">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;