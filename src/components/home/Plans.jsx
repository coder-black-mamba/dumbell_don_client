import React, { useEffect } from "react";
import SectionTitle from "../SectionTitle";
import { FaCheck, FaStar, FaCrown, FaFire } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState } from "react";
import Loader from "../common/Loader";
import { apiClient } from "../../services/apiServices";
import PlanCard from "../common/PlanCard";

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
  const [plans, setPlans] = useState(plans_const);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


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
              <PlanCard key={plan.id} plan={plan} />
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
