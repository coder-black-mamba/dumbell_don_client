import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { FaSpinner } from "react-icons/fa";
import { authApiClient } from "../services/apiServices";
import ErrorMessage from "../components/common/ErrorMessage";

const PAYMENT_TYPES = {
  BOOKING: {
    id: "booking",
    label: "Class Booking",
    amount: "500",
    description: "One-time class booking",
    features: [
      "Access to one class",
      "Valid for 7 days",
      "Flexible scheduling",
    ],
  },
  SUBSCRIPTION: {
    id: "subscription",
    label: "Monthly Subscription",
    amount: "2000",
    description: "Unlimited classes for a month",
    features: [
      "Unlimited classes",
      "Priority booking",
      "Discounts on merchandise",
    ],
  },
};

const InitiateSubscriptionPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentDetails, setPaymentDetails] = useState(
    PAYMENT_TYPES.SUBSCRIPTION
  );
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if location.state exists
    if (!location.state) {
      console.error("No state provided, redirecting to classes page");
      navigate("/classes");
      return;
    }

    try {
      const { subscriptionData: subscriptionDataFromState } = location.state;

      if (!subscriptionDataFromState) {
        console.warn("No subscriptionData found in location.state");
      }

      if (subscriptionDataFromState) {
        setSubscriptionData(subscriptionDataFromState);
      } else {
        console.warn("subscriptionData is undefined or null");
      }
    } catch (error) {
      console.error("Error processing location state:", error);
      navigate("/classes");
    }
  }, [location.state, navigate]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();

  // method for initilizing payment
  const handlePayment = async () => {
    setIsSubmitting(true);
    try {
      const subscription_response = await authApiClient.post("subscriptions/", {
        plan: subscriptionData.id,
      });

      const subscription_id = subscription_response.data.data.id;
      console.log(subscriptionData);
      const invoice_response = await authApiClient.post(
        `invoices/?payment_type=subscription&id=${subscription_id}`,
        {
          notes: "nothing",
          metadata: {},
        }
      );
      // console.log(invoice_response)

      // initiating payment
      const invoice_id = invoice_response.data.data.number;
      const payment_response = await authApiClient.post(`payment/initiate/`, {
        invoice_id: invoice_id,
      });

      // console.log(payment_response)
      window.location.href = payment_response.data.payment_url;

      // navigate(`/dashboard`);
    } catch (error) {
      console.error("Error initializing payment:", error);
      setError("Failed to initialize payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4">Loading your information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-2xl mx-auto py-16">
        <div className="py-16 my-10">
          <ErrorMessage error={error} />
        </div>
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-content p-6">
            <h1 className="text-2xl font-bold text-center">Checkout</h1>
            <p className="text-center opacity-90 mt-2">
              Complete Your Subscription For Plan{" "}
              <span className="font-semibold">"{subscriptionData.title}"</span>
            </p>
          </div>

          <div className="card-body p-6 md:p-8">
            {/* Order Summary */}
            <div className="bg-base-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaCheckCircle className="text-success mr-2" />
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Membership ID: {user.id}</span>
                  <span className="badge badge-outline">{user.id}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Plan:</span>
                  <span className="font-semibold">
                    {subscriptionData.title}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Description:</span>
                  <span className="text-right">
                    {subscriptionData.description}
                  </span>
                </div>

                <div className="divider my-2"></div>

                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-primary">
                    {subscriptionData?.price_cents / 100} USD
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">What's included:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-success mt-1 mr-2 flex-shrink-0" />
                  <span>"Unlimited classes"</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-success mt-1 mr-2 flex-shrink-0" />
                  <span>"Priority booking"</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-success mt-1 mr-2 flex-shrink-0" />
                  <span>"Discounts on merchandise"</span>
                </li>
              </ul>
            </div>

            {/* Next Billing Info */}
            <div className="alert alert-info mb-6">
              <div>
                <FaCalendarAlt className="text-xl" />
                <span>
                  Your next billing date will be:{" "}
                  <strong>{subscriptionData.end_date}</strong>
                </span>
              </div>
            </div>

            {/* Payment Method
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
              <div className="bg-base-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-lg mr-4">
                    <img
                      src="https://www.svgrepo.com/show/306600/stripe.svg"
                      alt="Stripe"
                      className="h-8"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm opacity-70">
                      Pay securely using your credit or debit card
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Buttons */}
            <div className="flex flex-col space-y-3 mt-8">
              <button
                onClick={handlePayment}
                className={`btn bg-brand btn-lg `}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    <span> Processing ... PLease Stay On This Page</span>
                  </>
                ) : (
                  `Pay $${subscriptionData?.price_cents / 100} USD`
                )}
              </button>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn btn-ghost btn-lg gap-2"
              >
                <FaArrowLeft /> Back to {"Plans"}
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-base-content/70">
              <p>
                Your payment information is secure and encrypted. We do not
                store your payment details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiateSubscriptionPayment;
