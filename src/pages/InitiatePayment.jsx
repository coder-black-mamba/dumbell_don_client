import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaSpinner,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { authApiClient } from "../services/apiServices";
import ErrorMessage from "../components/common/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";

const PAYMENT_TYPES = {
  BOOKING: {
    id: "booking",
    label: "Class Booking",
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
    description: "Unlimited classes for a month",
    features: [
      "Unlimited classes",
      "Priority booking",
      "Discounts on merchandise",
    ],
  },
};

const InitiatePayment = ({ paymentType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
    console.log("Initiate Payment")
  // Form state for customer and shipping info
  const [formData, setFormData] = useState({
    cus_name: '',
    cus_phone: '',
    cus_add1: '',
    cus_city: 'Dhaka',
    cus_country: 'Bangladesh',
    ship_name: '',
    ship_phone: '',
    ship_add1: '',
    ship_city: 'Dhaka',
    ship_country: 'Bangladesh',
    ship_postcode: '1207',
    sameAsBilling: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Update shipping address when same as billing is checked
  useEffect(() => {
    if (formData.sameAsBilling) {
      setFormData(prev => ({
        ...prev,
        ship_name: prev.cus_name,
        ship_phone: prev.cus_phone,
        ship_add1: prev.cus_add1,
        ship_city: prev.cus_city,
        ship_country: prev.cus_country,
      }));
    }
  }, [formData.sameAsBilling, formData.cus_name, formData.cus_phone, formData.cus_add1, formData.cus_city, formData.cus_country]);

  // Load data from location.state
  useEffect(() => {
    if (!location.state) {
      navigate(paymentType === PAYMENT_TYPES.BOOKING.id ? "/classes" : "/subscriptions");
      return;
    }

    if (paymentType === PAYMENT_TYPES.BOOKING.id) {
      const { classData } = location.state;
      if (!classData) {
        navigate("/classes");
        return;
      }
      setData(classData);
    } else if (paymentType === PAYMENT_TYPES.SUBSCRIPTION.id) {
      const { plan } = location.state;
      if (!plan) {
        navigate("/subscriptions");
        return;
      }
      setData(plan);
    }
  }, [location.state, navigate, paymentType]);

  const handlePayment = async (e) => {
    if (paymentType === PAYMENT_TYPES.BOOKING.id) e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let invoiceId;

      if (paymentType === PAYMENT_TYPES.BOOKING.id) {
        // Validate billing/shipping info
        if (!formData.cus_name || !formData.cus_phone || !formData.cus_add1) {
          setError("Please fill in all required customer information");
          setIsSubmitting(false);
          return;
        }
        if (!formData.sameAsBilling && (!formData.ship_name || !formData.ship_phone || !formData.ship_add1)) {
          setError("Please fill in all required shipping information");
          setIsSubmitting(false);
          return;
        }

        // Create booking
        toast.loading("Creating Booking...");
        const bookingResp = await authApiClient.post("bookings/", {
          fitness_class_id: data.id,
          member_id: user.id,
        });
        toast.success("Booking Created!");

        const bookingId = bookingResp.data.data.id;

        // Create invoice
        toast.loading("Creating Invoice...");
        const invoiceResp = await authApiClient.post(
          `invoices/?payment_type=booking&id=${bookingId}`,
          { notes: `Booking for ${data.name} class`, metadata: {} }
        );
        toast.success("Invoice Created!");
        invoiceId = invoiceResp.data.data.number;

        // Prepare payment payload
        const paymentPayload = {
          invoice_id: invoiceId,
          cus_name: formData.cus_name,
          cus_email: user.email,
          cus_phone: formData.cus_phone,
          cus_add1: formData.cus_add1,
          cus_city: formData.cus_city,
          cus_country: formData.cus_country,
          shipping_method: "NO",
          multi_card_name: "",
          num_of_item: 1,
          product_name: `Fitness Class: ${data.name}`,
          product_category: "Fitness",
          product_profile: "physical-goods",
          ship_name: formData.sameAsBilling ? formData.cus_name : formData.ship_name,
          ship_email: user.email,
          ship_add1: formData.sameAsBilling ? formData.cus_add1 : formData.ship_add1,
          ship_city: formData.sameAsBilling ? formData.cus_city : formData.ship_city,
          ship_country: formData.sameAsBilling ? formData.cus_country : formData.ship_country,
          ship_phone: formData.sameAsBilling ? formData.cus_phone : formData.ship_phone,
          ship_postcode: formData.sameAsBilling ? '1207' : formData.ship_postcode,
        };

        // Initiate payment
        toast.loading("Initializing Payment...");
        const paymentResp = await authApiClient.post("payment/initiate/", paymentPayload);
        window.location.href = paymentResp.data.payment_url;
      } else if (paymentType === PAYMENT_TYPES.SUBSCRIPTION.id) {
        // Create subscription
        toast.loading("Creating Subscription...");
        const subscriptionResp = await authApiClient.post("subscriptions/", {
          plan: data.id,
        });
        toast.success("Subscription Created!");

        const subscriptionId = subscriptionResp.data.data.id;

        // Create invoice
        toast.loading("Creating Invoice...");
        const invoiceResp = await authApiClient.post(
          `invoices/?payment_type=subscription&id=${subscriptionId}`,
          { notes: "Subscription Payment", metadata: {} }
        );
        toast.success("Invoice Created!");
        invoiceId = invoiceResp.data.data.number;

        // Initiate payment
        toast.loading("Initializing Payment...");
        const paymentResp = await authApiClient.post("payment/initiate/", {
          invoice_id: invoiceId,
        });
        window.location.href = paymentResp.data.payment_url;
      }
    } catch (err) {
      console.error(err);
      setError("Failed to initialize payment");
      toast.error("Failed to process payment");
    } finally {
      setIsSubmitting(false);
      toast.dismiss();
    }
  };

  if (!user || !data) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4">Loading your information...</p>
        </div>
      </div>
    );
  }

  const paymentDetails = PAYMENT_TYPES[paymentType.toUpperCase()] || PAYMENT_TYPES.BOOKING;

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <Toaster />
      <div className="max-w-2xl mx-auto py-8">
        {error && <div className="alert alert-error mb-6">{error}</div>}
        
        <div className="card bg-base-100 shadow-xl overflow-hidden mb-8">
          <div className="bg-primary text-primary-content p-6">
            <h1 className="text-2xl font-bold text-center">Checkout</h1>
            <p className="text-center opacity-90 mt-2">
              Complete your {paymentDetails.label} for <span className="font-semibold">"{data.name || data.title}"</span>
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
                  <span className="font-medium">{paymentType === PAYMENT_TYPES.BOOKING.id ? 'Class Title:' : 'Plan:'}</span>
                  <span className="font-semibold">{data.name || data.title}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Description:</span>
                  <span className="text-right">
                    {data.description}
                  </span>
                </div>

                <div className="divider my-2"></div>

                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-primary">
                    ${data.price_cents / 100} USD
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

            {/* Billing and Shipping Form */}
            {paymentType === PAYMENT_TYPES.BOOKING.id && (
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Billing Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Billing Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Full Name *</span>
                      </label>
                      <input
                        type="text"
                        name="cus_name"
                        value={formData.cus_name}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Phone *</span>
                      </label>
                      <input
                        type="tel"
                        name="cus_phone"
                        value={formData.cus_phone}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Address *</span>
                    </label>
                    <input
                      type="text"
                      name="cus_add1"
                      value={formData.cus_add1}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">City</span>
                      </label>
                      <input
                        type="text"
                        name="cus_city"
                        value={formData.cus_city}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Country</span>
                      </label>
                      <input
                        type="text"
                        name="cus_country"
                        value={formData.cus_country}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Shipping Information</h3>
                    <label className="label cursor-pointer space-x-2">
                      <span className="label-text">Same as billing</span>
                      <input
                        type="checkbox"
                        name="sameAsBilling"
                        checked={formData.sameAsBilling}
                        onChange={handleInputChange}
                        className="toggle toggle-primary"
                      />
                    </label>
                  </div>
                  
                  {!formData.sameAsBilling && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Full Name *</span>
                          </label>
                          <input
                            type="text"
                            name="ship_name"
                            value={formData.ship_name}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                            required={!formData.sameAsBilling}
                            disabled={formData.sameAsBilling}
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Phone *</span>
                          </label>
                          <input
                            type="tel"
                            name="ship_phone"
                            value={formData.ship_phone}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                            required={!formData.sameAsBilling}
                            disabled={formData.sameAsBilling}
                          />
                        </div>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Address *</span>
                        </label>
                        <input
                          type="text"
                          name="ship_add1"
                          value={formData.ship_add1}
                          onChange={handleInputChange}
                          className="input input-bordered w-full"
                          required={!formData.sameAsBilling}
                          disabled={formData.sameAsBilling}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">City</span>
                          </label>
                          <input
                            type="text"
                            name="ship_city"
                            value={formData.ship_city}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                            disabled={formData.sameAsBilling}
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Country</span>
                          </label>
                          <input
                            type="text"
                            name="ship_country"
                            value={formData.ship_country}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                            disabled={formData.sameAsBilling}
                          />
                        </div>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Postal Code</span>
                        </label>
                        <input
                          type="text"
                          name="ship_postcode"
                          value={formData.ship_postcode}
                          onChange={handleInputChange}
                          className="input input-bordered w-full"
                          disabled={formData.sameAsBilling}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="card-actions  w-full pt-4">
                  <button
                    type="submit"
                    className={`btn bg-brand w-full flex  ${isSubmitting ? 'opacity-70' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                        <span>Processing... Please Stay On This Page</span>
                      </>
                    ) : (
                      `Pay $${data.price_cents / 100} USD`
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Subscription Payment Button */}
            {paymentType === PAYMENT_TYPES.SUBSCRIPTION.id && (
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handlePayment}
                  className="btn bg-brand btn-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      <span>Processing... Please Stay On This Page</span>
                    </>
                  ) : (
                    `Pay $${data.price_cents / 100} USD`
                  )}
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="btn btn-ghost btn-lg gap-2"
                >
                  <FaArrowLeft /> Back to Plans
                </button>
              </div>
            )}

            <div className="mt-6 text-center text-sm text-base-content/70">
              <p>Your payment information is secure and encrypted. We do not store your payment details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiatePayment;