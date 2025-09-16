import React, { useEffect } from "react";
import SectionTitle from "../SectionTitle";
import { FaCheck, FaStar, FaCrown, FaFire } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState } from "react";
import Loader from "../common/Loader";
import { apiClient } from "../../services/apiServices";

const plans_const =[
  
  {
    "id": 3,
    "name": "Basic",
    "description": "Access to gym equipment,Free Wi-Fi,Locker room access,Basic workout plan,-----,-----,----",
    "duration_days": 30,
    "price_cents": 1500,
    "is_active": true,
    "updated_at": "2025-09-16T16:28:28.916544Z",
    "created_at": "2025-08-13T15:07:55.672926Z",
    "created_by": 2
  },
  {
    "id": 2,
    "name": "Pro",
    "description": "Most Popular,Everything in Basic,Group classes,Personal trainer (2x/month),Sauna & Spa access,Nutrition consultation,Progress tracking",
    "duration_days": 30,
    "price_cents": 30000,
    "is_active": true,
    "updated_at": "2025-09-16T16:26:58.621132Z",
    "created_at": "2025-08-13T15:07:12.984557Z",
    "created_by": 2
  },
  {
    "id": 1,
    "name": "Elite",
    "description": "Everything in Pro,Unlimited personal training,Massage therapy (2x/month),Towel service,Guest passes (2/month),Priority booking,Special Treat",
    "duration_days": 30,
    "price_cents": 80000,
    "is_active": true,
    "updated_at": "2025-09-16T16:29:11.242472Z",
    "created_at": "2025-08-13T15:04:57.587726Z",
    "created_by": 2
  }
]

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPlans(plans_const);
    }, 2000);
    setLoading(false);
  }, []);

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Membership Plans"
          subtitle="Choose Your Plan"
          description="Flexible pricing options to suit your fitness journey"
        />

        {loading && <Loader />}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
            {plans?.map((plan, index) => (
              <motion.div
                key={plan.id}
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
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Need help choosing the right plan?
          </p>
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
