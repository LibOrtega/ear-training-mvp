import React from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleFooter from '../components/SimpleFooter';

function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-lg mb-6">Your payment has been cancelled. You can try again or choose a different payment method.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
      
      <SimpleFooter />
    </div>
  );
}

export default PaymentCancel;
