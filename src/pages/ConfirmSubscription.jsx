import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { authApiClient } from "../services/apiServices";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { FaCheckCircle, FaArrowLeft, FaCreditCard } from "react-icons/fa";

const ConfirmSubscription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [plan, setPlan] = useState(null);

  const { plan: planFromState } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);


    const fetchPlanDetails = async () => {
      try {
        setLoading(true);
        const response = await authApiClient.get(`membership-plans/${id}/`);
        setPlan(response.data.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load plan details");
      } finally {
        setLoading(false);
      }
    };

    if (planFromState) {
      setPlan(planFromState);
      setLoading(false);
    } else if (id) {
      fetchPlanDetails();
    } else {
      setError("No plan selected");
      setLoading(false);
    }
  }, [id, planFromState]);

  const handleSubscribe = () => {
    if (!plan) return;
    
    navigate("/payment/initiate/subscription", {
      state: { plan }
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
        <div className="card bg-base-100 shadow-xl max-w-md w-full">
          <div className="card-body items-center text-center">
            <div className="text-error text-5xl mb-4">
              <FaCreditCard />
            </div>
            <h2 className="card-title text-2xl mb-2">Subscription Error</h2>
            <p className="mb-6">{error}</p>
            <div className="card-actions">
              <button onClick={handleGoBack} className="btn btn-primary">
                <FaArrowLeft className="mr-2" /> Back to Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
        <div className="card bg-base-100 shadow-xl max-w-md w-full">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl mb-2">No Plan Selected</h2>
            <p className="mb-6">Please select a plan to continue</p>
            <div className="card-actions">
              <button onClick={handleGoBack} className="btn btn-primary">
                <FaArrowLeft className="mr-2" /> Back to Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="card bg-base-100 shadow-xl overflow-hidden mt-12">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-primary-content p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
              <FaCheckCircle className="text-3xl" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Confirm Subscription</h1>
            <p className="opacity-90">Review your plan details before proceeding</p>
          </div>

          {/* Plan Details */}
          <div className="p-6 md:p-8">
            <div className="bg-base-200 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-center mb-6">{plan.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-500">Price</span>
                  <span className="text-3xl font-bold text-primary">
                    ${plan.price_cents / 100}
                  </span>
                  <span className="text-sm text-gray-500">one-time payment</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-500">Duration</span>
                  <span className="text-2xl font-bold">
                    {plan.duration_days} days
                  </span>
                  <span className="text-sm text-gray-500">access period</span>
                </div>
              </div>

              {plan.description && (
                <div className="bg-base-100 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-2">What's included:</h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGoBack}
                className="btn btn-outline flex-1"
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>
              <button
                onClick={handleSubscribe}
                className="btn bg-brand flex-1"
              >
                <FaCreditCard className="mr-2" /> Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSubscription;
