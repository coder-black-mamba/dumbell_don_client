import React, { useState ,useEffect } from "react";
import { motion } from "framer-motion";
import { apiClient, authApiClient } from "../../services/apiServices";
import Loader from "../common/Loader";
import PlanCard from "../common/PlanCard";


const PricingContainer = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [pricingPlans, setPricingPlans] = useState([])
  const [monthlyPlans, setMonthlyPlans] = useState([])
  const [yearlyPlans, setYearlyPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPricingPlans=async()=>{
       const plans_response= await apiClient.get("/membership-plans/") 
       const monthly_plans=plans_response.data.filter((plan)=>plan.duration_days===30)
       const yearly_plans=plans_response.data.filter((plan)=>plan.duration_days===360)
       setMonthlyPlans(monthly_plans)
       setYearlyPlans(yearly_plans)
       setPricingPlans(plans_response.data)
       setLoading(false)
    }

    fetchPricingPlans()
    
  }, [])
 


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
    <div>
      <div className="flex justify-center mb-12">
        <div className="bg-white p-1 rounded-full shadow-md inline-flex">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              billingCycle === "monthly"
                ? "bg-brand text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              billingCycle === "yearly"
                ? "bg-brand text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Yearly Billing
            <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">
              Save 15%
            </span>
          </button>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {loading&&<Loader />}
        {!loading&&billingCycle==="monthly"&&monthlyPlans.map((plan, index) => (
         <motion.div key={plan.id}>
            <PlanCard plan={plan} key={plan.id} />
          </motion.div>
        ))}
        {!loading&&billingCycle==="yearly"&&yearlyPlans.map((plan, index) => (
         <motion.div key={plan.id}>
            <PlanCard plan={plan} key={plan.id} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PricingContainer;
