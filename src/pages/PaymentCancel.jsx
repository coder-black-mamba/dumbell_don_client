import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FaTimesCircle, FaArrowLeft, FaCreditCard, FaQuestionCircle } from 'react-icons/fa';

const PaymentCancel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get payment type from location state
  const { 
    paymentType = 'booking',
    reason = 'Payment was cancelled by the user.'
  } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // In a real app, you might want to log the cancellation
    console.log(`Payment cancelled for ${paymentType}:`, { reason });
  }, [paymentType, reason]);

  const handleRetry = () => {
    // Navigate back to the appropriate page based on payment type
    navigate(paymentType === 'booking' ? '/book' : '/pricing');
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-error text-error-content p-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4">
            <FaTimesCircle className="text-4xl" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Cancelled</h1>
          <p className="text-lg opacity-90">
            Your {paymentType} was not completed
          </p>
        </div>
        
        <div className="card-body p-6 md:p-8">
          {/* Message */}
          <div className="text-center mb-8">
            <p className="mb-4">
              {reason || 'The payment process was cancelled before completion.'}
            </p>
            <p className="text-sm opacity-80">
              No amount has been charged to your account.
            </p>
          </div>
          
          {/* Help Section */}
          <div className="bg-base-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-3 flex items-center justify-center">
              <FaQuestionCircle className="mr-2" />
              Need help?
            </h3>
            
            <div className="space-y-3">
              <div className="collapse collapse-plus bg-base-100 rounded-box">
                <input type="checkbox" /> 
                <div className="collapse-title font-medium">
                  Why was my payment cancelled?
                </div>
                <div className="collapse-content"> 
                  <p className="text-sm">
                    Payments can be cancelled for various reasons, including:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>You cancelled the payment process</li>
                      <li>The payment session expired</li>
                      <li>There was an issue with the payment method</li>
                    </ul>
                  </p>
                </div>
              </div>
              
              <div className="collapse collapse-plus bg-base-100 rounded-box">
                <input type="checkbox" /> 
                <div className="collapse-title font-medium">
                  Will I be charged?
                </div>
                <div className="collapse-content"> 
                  <p className="text-sm">
                    No, your account has not been charged. If you see a pending charge, 
                    it will be automatically removed from your account within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm">
                Still need assistance?{' '}
                <a href="/contact" className="link link-primary">Contact our support team</a>
              </p>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col space-y-3 mt-8">
            <button
              onClick={handleRetry}
              className="btn btn-primary btn-lg gap-2"
            >
              <FaCreditCard />
              Try Again
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="btn btn-ghost gap-2"
            >
              <FaArrowLeft /> Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;