import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FaCheckCircle, FaHome, FaFileInvoiceDollar, FaCalendarAlt, FaClock } from 'react-icons/fa';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get payment details from location state
  const { 
    paymentType = 'booking',
    amount = '0.00',
    transactionId = 'N/A',
    nextBillingDate
  } = location.state || {};
  
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // In a real app, you might want to confirm the payment with your backend
    // to ensure it was actually completed
  }, []);

  const handleViewBooking = () => {
    // In a real app, you would navigate to the user's bookings
    navigate('/dashboard/bookings');
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl overflow-hidden py-16">
        {/* Header */}
        <div className="bg-success text-success-content p-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4">
            <FaCheckCircle className="text-4xl" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-lg opacity-90">
            Your {paymentType === 'booking' ? 'class booking' : 'subscription'} has been confirmed
          </p>
        </div>
        
        <div className="card-body p-6 md:p-8">
          {/* Order Summary */}
          <div className="bg-base-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaFileInvoiceDollar className="mr-2" />
              Order Confirmation
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Transaction ID:</span>
                <div className="tooltip" data-tip={transactionId}>
                  <span className="font-mono text-sm bg-base-300 px-2 py-1 rounded">
                    {transactionId.substring(0, 8)}...
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Payment Method:</span>
                <span>Credit Card</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Date & Time:</span>
                <div className="flex items-center">
                  <FaClock className="mr-1 text-sm" />
                  <span>{date}</span>
                </div>
              </div>
              
              <div className="divider my-2"></div>
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Amount Paid:</span>
                <span className="text-success">{amount} BDT</span>
              </div>
            </div>
          </div>
          
          {/* Next Steps */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">What's next?</h3>
            <div className="space-y-4">
              {paymentType === 'booking' ? (
                <div className="alert alert-info">
                  <div>
                    <FaCalendarAlt className="text-xl" />
                    <span>Your class has been booked! Check your email for confirmation and details.</span>
                  </div>
                </div>
              ) : (
                <div className="alert alert-success">
                  <div>
                    <FaCalendarAlt className="text-xl" />
                    <span>
                      Your subscription is now active! Next billing date: 
                      <strong> {nextBillingDate || 'N/A'}</strong>
                    </span>
                  </div>
                </div>
              )}
              
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="font-medium mb-2">Need help with your {paymentType === 'booking' ? 'booking' : 'subscription'}?</p>
                <p className="text-sm opacity-80">
                  Visit our <a href="/help" className="link link-primary">Help Center</a> or 
                  <a href="/contact" className="link link-primary ml-2">Contact Support</a>
                </p>
              </div>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col space-y-3 mt-8">
            <button
              onClick={paymentType === 'booking' ? handleViewBooking : () => navigate('/dashboard')}
              className="btn btn-primary btn-lg gap-2"
            >
              <FaHome />
              {paymentType === 'booking' ? 'View My Bookings' : 'Go to Dashboard'}
            </button>
            
            <button
              onClick={() => {
                // In a real app, generate and download invoice
                alert('Invoice download would start here');
              }}
              className="btn btn-outline gap-2"
            >
              <FaFileInvoiceDollar /> Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;