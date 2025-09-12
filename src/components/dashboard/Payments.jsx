import React from 'react';
import { FaCreditCard, FaCalendarAlt, FaReceipt, FaCheckCircle, FaClock } from 'react-icons/fa';

const Payments = () => {
  // Mock data based on your API response
  const paymentData = {
    count: 2,
    results: [
      {
        id: 1,
        invoice: 1,
        amount_cents: 3000,
        currency: "USD",
        status: "PAID",
        reference: "330fb893-6856-4e33-b8a4-0367b52256de",
        metadata: {
          invoice: "INV-20250813151857",
          payment_type: "subscription",
          subscription: "Monthly Membership Platinum",
          subscription_id: 1
        },
        paid_at: "2025-08-13T15:21:37.390103Z",
        created_at: "2025-08-13T15:21:37.595482Z"
      },
      {
        id: 2,
        invoice: 2,
        amount_cents: 1500,
        currency: "USD",
        status: "PAID",
        reference: "21889840-abf5-4462-8c18-2c594b1dcd70",
        metadata: {
          booking: "Morning Vinyasa Yoga",
          invoice: "INV-20250813152229",
          booking_id: 1,
          payment_type: "booking"
        },
        paid_at: "2025-08-13T15:23:46.496632Z",
        created_at: "2025-08-13T15:23:46.934969Z"
      }
    ]
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (cents, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2
    }).format(cents / 100);
  };

  const getPaymentTypeIcon = (type) => {
    switch (type) {
      case 'subscription':
        return <FaCreditCard className="text-blue-500" />;
      case 'booking':
        return <FaReceipt className="text-green-500" />;
      default:
        return <FaCreditCard className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Payment History</h2>
        
        <div className="space-y-4">
          {paymentData.results.map((payment) => (
            <div key={payment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-50 rounded-full">
                    {getPaymentTypeIcon(payment.metadata.payment_type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {payment.metadata.payment_type === 'subscription' 
                        ? payment.metadata.subscription
                        : payment.metadata.booking}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                      <span className="flex items-center">
                        <FaCalendarAlt className="mr-1.5 h-3.5 w-3.5" />
                        {formatDate(payment.paid_at)}
                      </span>
                      <span>•</span>
                      <span>Invoice #{payment.metadata.invoice.split('-')[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {formatAmount(payment.amount_cents, payment.currency)}
                  </div>
                  <div className="flex items-center justify-end mt-1">
                    {payment.status === 'PAID' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <FaCheckCircle className="mr-1 h-3 w-3" />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <FaClock className="mr-1 h-3 w-3" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  <span className="font-medium mr-2">Reference:</span>
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {payment.reference}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {paymentData.count === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No payment history found</div>
            <p className="text-sm text-gray-500">Your payment history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;