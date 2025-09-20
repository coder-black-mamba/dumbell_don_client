import React , { useState, useEffect } from "react";
import {
  FaFileInvoiceDollar,
  FaDownload,
  FaPrint,
  FaCheckCircle,
  FaClock,
  FaFilePdf,
  FaCreditCard,
} from "react-icons/fa";
import { authApiClient } from "../../services/apiServices";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import { useNavigate } from "react-router";

const Invoices = () => {
  const [invoiceData, setInvoiceData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchInvoiceData = async () => {
      try {
        const response = await authApiClient.get("invoices/");
        setInvoiceData(response.data.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch invoice data"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchInvoiceData();
  }, []);
  


    

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (cents, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 2,
    }).format(cents / 100);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      PAID: "bg-green-100 text-green-800",
      PENDING: "bg-yellow-100 text-yellow-800",
      OVERDUE: "bg-red-100 text-red-800",
      CANCELLED: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusClasses[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status === "PAID" ? (
          <FaCheckCircle className="mr-1 h-3 w-3" />
        ) : (
          <FaClock className="mr-1 h-3 w-3" />
        )}
        {status.charAt(0) + status.slice(1).toLowerCase()}
      </span>
    );
  };


  const handlePrint = (invoiceNumber, e) => {
    e.stopPropagation();
    // Implement print functionality
    console.log(`Printing invoice ${invoiceNumber}`);
  };

  const handlePayment = (invoiceId) => {
    // Navigate to invoice detail view
    console.log(`Paying invoice ${invoiceId}`);
  };

  if(loading){
    return <Loader />;
  }

  if(error){
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-base-300 rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold">Invoices</h2>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Filter
            </button>
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              New Invoice
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-base-300">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Invoice
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Issue Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Due Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-base-300 divide-y divide-gray-200">
              {invoiceData.results?.map((invoice) => {
                return (
                  <tr
                    key={invoice.id}
                    className="hover:bg-base-100 cursor-pointer"
                    // onClick={() => handleRowClick(invoice.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaFileInvoiceDollar className="flex-shrink-0 h-5 w-5 text-gray-200" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-200">
                            {invoice.number}
                          </div>
                        </div>
                        <div className="my-2">
                        </div>
                      </div>
                      {invoice.status !== "PAID" && (
                        <button
                          type="button"
                          onClick={(e) => handlePayment(invoice.id)}
                          className="btn bg-brand mt-4 w-full"
                          title="Pay Invoice"
                        >
                          Pay Now
                          <FaCreditCard className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-200">
                        {invoice.metadata.payment_type === "subscription"
                          ? invoice.metadata.subscription
                          : invoice.metadata.booking?.split(" - ")[3] ||
                          "Booking"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {invoice.metadata.payment_type.charAt(0).toUpperCase() +
                          invoice.metadata.payment_type.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(invoice.issue_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm ${invoice.status === "OVERDUE"
                            ? "text-red-600 font-medium"
                            : "text-gray-500"}`}
                      >
                        {formatDate(invoice.due_date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                      {formatAmount(invoice.total_cents, invoice.currency)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(invoice.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={(e) => navigate(`/download-invoice/`, {
                            state: { invoice },
                          })}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Download"
                        >
                          <FaDownload className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => handlePrint(invoice.number, e)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Print"
                        >
                          <FaPrint className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {invoiceData.count === 0 ? (
          <div className="text-center py-12">
            <FaFileInvoiceDollar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No invoices
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new invoice.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaFileInvoiceDollar className="-ml-1 mr-2 h-5 w-5" />
                New Invoice
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-base-300 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">{invoiceData.count}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    &larr;
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    &rarr;
                  </a>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;
