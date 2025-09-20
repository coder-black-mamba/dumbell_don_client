import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  FaDownload,
  FaPrint,
  FaArrowLeft,
  FaCalendarAlt,
  FaUser,
  FaDumbbell,
  FaSpinner,
} from "react-icons/fa";
import ErrorMessage from "../components/common/ErrorMessage";
import { useAuth } from "../hooks/useAuth";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import Logo from '../assets/logo_white.png'
// Helper formatters
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const formatAmount = (cents, currency) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100);

const getStatusBadge = (status) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
  const statusClasses = {
    PAID: "bg-green-900/30 text-green-400",
    PENDING: "bg-yellow-900/30 text-yellow-400",
    DRAFT: "bg-gray-700 text-gray-300",
    CANCELLED: "bg-red-900/30 text-red-400",
  };
  return `${baseClasses} ${statusClasses[status] || "bg-gray-700 text-gray-300"}`;
};

const DownloadInvoice = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { invoice } = useLocation().state || { invoice: null };
  const [loading, setLoading] = useState(false);

  if (!invoice) {
    return <ErrorMessage message="No invoice data available" />;
  }

  const handleDownload = () => {
    setLoading(true);
    const node = document.getElementById("invoice-card");
    toPng(node, { 
      quality: 1.0, 
      cacheBust: true,
      backgroundColor: '#1f2937' // Match dark background
    })
      .then((dataUrl) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Add dark background
        pdf.setFillColor(31, 41, 55);
        pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');
        
        pdf.addImage(dataUrl, "PNG", 10, 10, pdfWidth, pdfHeight, undefined, 'FAST');
        pdf.save(`invoice-${invoice.number}.pdf`);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-5xl mx-auto my-16">
        

        {/* Invoice Card */}
        <div
          id="invoice-card"
          className="bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-700"
        >
          {/* Invoice Header */}
          <div className="px-6 py-5 bg-base-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <div className="w-24 h-24">
                    <img src={Logo} className="w-full h-full object-contain" alt="" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">INVOICE</h1>
                    <p className="text-indigo-300">#{invoice.number}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">Dumbbell Don's</div>
                <div className="text-indigo-300">Fitness & Wellness</div>
              </div>
            </div>
          </div>

          {/* Invoice Info */}
          <div className="px-6 py-5 border-b border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Bill To
                </h3>
                <div className="mt-2">
                  <p className="text-sm font-medium text-white">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                  <p className="text-sm text-gray-400">{user?.phone_number}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Invoice Date
                </h3>
                <div className="mt-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-300">
                    {formatDate(invoice.issue_date)}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Due Date
                </h3>
                <div className="mt-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-300">
                    {formatDate(invoice.due_date)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="px-6 py-5">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {invoice.metadata?.booking || 'Gym Service'}
                      </div>
                      <div className="text-sm text-gray-400 capitalize">
                        {invoice.metadata?.payment_type || 'Membership'}
                      </div>
                      <div className="text-sm text-gray-400 capitalize">
                        {invoice.metadata?.payment_type || 'Membership'} ID : {invoice.metadata?.booking_id || invoice.metadata?.subscription_id}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium text-white">
                      {formatAmount(invoice.total_cents, invoice.currency)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="mt-8 flex justify-end">
              <div className="w-full max-w-xs">
                <div className="flex justify-between py-2 text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-gray-300">
                    {formatAmount(invoice.total_cents, invoice.currency)}
                  </span>
                </div>
                <div className="flex justify-between py-2 text-base font-medium text-white border-t border-gray-700">
                  <span>Total</span>
                  <span>
                    {formatAmount(invoice.total_cents, invoice.currency)}
                  </span>
                </div>
                <div className="mt-4 text-right">
                  <span className={getStatusBadge(invoice.status)}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <div className="mb-2 md:mb-0">
                <p>Built with love by abu sayed , website: <a href="https://absyd.xyz"> absyd.xyz</a></p>
              </div>
              <div className="text-center md:text-right">
                <p>Dumbbell Don's Gym</p>
                <p>123 Fitness Street, New York, NY 10001</p>
                <p>contact@dumbbelldons.com | (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>


        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-400 hover:text-indigo-300 mb-4 sm:mb-0"
          >
            <FaArrowLeft className="mr-2" /> Back to Invoices
          </button>
          <div className="flex space-x-3">
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? (
                <FaSpinner className="mr-2 animate-spin" />
              ) : (
                <FaDownload className="mr-2" />
              )}
              Download PDF
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaPrint className="mr-2" /> Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadInvoice;