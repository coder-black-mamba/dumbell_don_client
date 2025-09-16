import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FaExclamationTriangle, FaArrowLeft, FaCreditCard } from 'react-icons/fa';

const PaymentFail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  // Get payment details from URL params or location state
  const errorMessage = searchParams.get('message') || 
                      location.state?.message || 
                      'Your payment could not be processed.';
  const transactionId = searchParams.get('transaction_id') || 
                       location.state?.transactionId || 
                       'N/A';
  
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRetryPayment = () => {
    // Navigate back to payment page or specific retry URL
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center p-8">
          <div className="text-error mb-6">
            <FaExclamationTriangle className="text-7xl" />
          </div>
          <h2 className="card-title text-2xl font-bold mb-4">Payment Failed</h2>
          <p className="text-base-content/70 mb-6">
            {errorMessage}
          </p>
          
          <div className="bg-base-200 rounded-box p-4 mb-6 w-full">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-base-300">
                <span className="text-sm opacity-70">Status:</span>
                <span className="badge badge-error">Failed</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-base-300">
                <span className="text-sm opacity-70">Transaction ID:</span>
                <div className="tooltip" data-tip={transactionId}>
                  <span className="text-sm font-mono truncate max-w-[160px] inline-block">
                    {transactionId}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm opacity-70">Date & Time:</span>
                <span className="text-sm">{date}</span>
              </div>
            </div>
          </div>

          <div className="card-actions w-full flex flex-col gap-3 mt-4">
            <button 
              className="btn btn-outline btn-primary w-full gap-2"
              onClick={handleRetryPayment}
            >
              <FaArrowLeft /> Try Again
            </button>
            <button 
              className="btn btn-ghost w-full gap-2"
              onClick={() => navigate('/contact')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Contact Support
            </button>
          </div>

          <div className="mt-6 text-sm text-base-content/70">
            <p className="mb-1">No amount has been charged to your account.</p>
            <p>
              Need help? <a href="/faq" className="link link-primary">Visit our FAQ</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;