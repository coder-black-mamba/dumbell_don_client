import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  FaCheckCircle,
  FaHome,
  FaFileInvoiceDollar,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { authApiClient } from "../services/apiServices";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";
import { toPng } from "html-to-image";
import Loader from "../components/common/Loader";
import Recipt from "../components/Recipt";

const PaymentSuccess = () => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fethchPayment = async () => {
      const payment = await authApiClient.get(`/payments/${id}`);
      setPayment(payment.data.data);
      setLoading(false);
    };
    fethchPayment();
  }, [id]);

  const handleViewBooking = () => {
    navigate("/dashboard/bookings");
  };

  const handleDownloadReceipt = () => {
    navigate("/download-recipt", { state: { payment } });
  };

  console.log(payment);
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-24 flex-col ">
      {loading ? (
        <Loader />
      ) : (
        <div className="card w-full max-w-2xl bg-base-100 shadow-xl overflow-hidden py-16">
          {/* Header */}
          <div className="bg-success text-success-content p-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4">
              <FaCheckCircle className="text-4xl" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-lg opacity-90">
              Your{" "}
              {payment?.metadata?.payment_type === "booking"
                ? "class booking"
                : "subscription"}{" "}
              has been confirmed
            </p>
          </div>

          {/* Body */}
          <div className="card-body p-6 md:p-8">
            <div className="bg-base-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaFileInvoiceDollar className="mr-2" />
                Order Confirmation
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Transaction ID:</span>
                  <div className="tooltip" data-tip={payment?.reference}>
                    <span className="font-mono text-sm bg-base-300 px-2 py-1 rounded">
                      {payment?.reference.substring(0, 8)}...
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Payment Method:</span>
                  <span>SSL Commerz</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Date & Time:</span>
                  <div className="flex items-center">
                    <FaClock className="mr-1 text-sm" />
                    <span>{payment?.paid_at || "N/A"}</span>
                  </div>
                </div>

                <div className="divider my-2"></div>

                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Amount Paid:</span>
                  <span className="text-success">
                    {payment?.amount_cents / 100} USD
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-3 mt-8">
              <button
                onClick={
                  payment?.metadata?.paymentType === "booking"
                    ? handleViewBooking
                    : () => navigate("/dashboard")
                }
                className="btn btn-primary btn-lg gap-2"
              >
                <FaHome />
                {payment?.metadata?.paymentType === "booking"
                  ? "View My Bookings"
                  : "Go to Dashboard"}
              </button>

              <button
                onClick={handleDownloadReceipt}
                className="btn btn-outline gap-2"
              >
                <FaFileInvoiceDollar /> Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
