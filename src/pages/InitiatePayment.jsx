import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

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

const InitiatePayment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get payment type from location state or default to booking
  const paymentType = location.state?.paymentType || "booking";
  const paymentDetails =
    PAYMENT_TYPES[paymentType.toUpperCase()] || PAYMENT_TYPES.BOOKING;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();

  const handlePayment = async () => {
    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to your backend to initiate the payment
      // For example:
      // const response = await initiatePaymentAPI({
      //   type: paymentDetails.id,
      //   amount: paymentDetails.amount,
      //   userId: user.id
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would redirect to payment gateway or show success message
      // navigate('/payment-success', {
      //   state: {
      //     paymentType: paymentDetails.id,
      //     amount: paymentDetails.amount,
      //     transactionId: response.transactionId
      //   }
      // });

      console.log("Payment initiated for:", paymentDetails.label);
    } catch (error) {
      console.error("Payment initiation failed:", error);
      // Handle error (show error message to user)
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
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-content p-6">
            <h1 className="text-2xl font-bold text-center">Checkout</h1>
            <p className="text-center opacity-90 mt-2">
              Complete your {paymentDetails.label.toLowerCase()}
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
                  <span className="font-medium">Membership ID:</span>
                  <span className="badge badge-outline">
                    {user.membershipId}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Plan:</span>
                  <span className="font-semibold">{paymentDetails.label}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Description:</span>
                  <span className="text-right">
                    {paymentDetails.description}
                  </span>
                </div>

                <div className="divider my-2"></div>

                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-primary">
                    {paymentDetails.amount} BDT
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">What's included:</h3>
              <ul className="space-y-2">
                {paymentDetails.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-success mt-1 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Billing Info */}
            {paymentDetails.id === "subscription" && (
              <div className="alert alert-info mb-6">
                <div>
                  <FaCalendarAlt className="text-xl" />
                  <span>
                    Your next billing date will be:{" "}
                    <strong>{user.nextBillingDate}</strong>
                  </span>
                </div>
              </div>
            )}

            {/* Payment Method */}
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
            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-3 mt-8">
              <button
                onClick={handlePayment}
                className={`btn btn-primary btn-lg ${
                  isSubmitting ? "loading" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Processing..."
                  : `Pay ${paymentDetails.amount} BDT`}
              </button>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn btn-ghost btn-lg gap-2"
              >
                <FaArrowLeft /> Back to{" "}
                {paymentDetails.id === "booking" ? "Classes" : "Plans"}
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

export default InitiatePayment;
