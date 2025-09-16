import React from "react";
import Logo from "../assets/logo_white.png";
import { useAuth } from "../hooks/useAuth";
import { FaCheckCircle, FaClock , FaReact } from "react-icons/fa";

const Recipt = ({payment}) => {
    const { user } = useAuth();

  return (
    <div>
      {" "}
      {/* Header with Logo */}
      <div className="bg-base-300 text-white p-6 text-center relative">
        <img
          src={Logo} // replace with your logo path
          alt="Logo"
          className="h-14 mx-auto mb-3 bg-base-100 p-2 shadow-md rounded"
        />
        <h1 className="text-2xl font-bold">Payment Receipt</h1>
        <p className="text-xs opacity-80">Thank you for your payment!</p>
      </div>
      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Success Banner */}
        <div className="text-center">
          <FaCheckCircle className="text-green-600 text-4xl mx-auto mb-2" />
          <h2 className="text-xl font-semibold text-gray-800">
            Payment Successful
          </h2>
          <p className="text-sm text-gray-500">
            Your{" "}
            {payment?.metadata?.payment_type === "booking"
              ? "class booking"
              : "subscription"}{" "}
            has been confirmed
          </p>
        </div>

        {/* User Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Customer Information
          </h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {`${user?.first_name} ${user?.last_name}` || "John Doe"}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {user?.email || "john@example.com"}
            </p>
            <p>
              <span className="font-medium">User ID:</span>{" "}
              {user?.id || "123-456-7890"}
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Payment Details
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span className="font-medium">Transaction ID:</span>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                {payment?.reference}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment ID:</span>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                {payment?.id}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Payment Method:</span>
              <span>SSL Commerz</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Date & Time:</span>
              <span className="flex items-center">
                <FaClock className="mr-1 text-xs text-gray-500" />
                {payment?.paid_at || "N/A"}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-semibold">
              <span>Total Paid:</span>
              <span className="text-green-600">
                ${(payment?.amount_cents / 100).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-gray-100 py-4 text-center text-xs text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} DumbbellDon. All rights reserved.
        </p>
        <p>www.dumbbelldon.com</p>
        <p>Built With ❤️ By : Abu Sayed , website : absyd.xyz </p>
      </div>
    </div>
  );
};

export default Recipt;
