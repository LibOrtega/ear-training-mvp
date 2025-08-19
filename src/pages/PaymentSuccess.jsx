import React from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleFooter from '../components/SimpleFooter';

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Payment Successful!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your payment has been processed.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <p className="text-center text-sm text-gray-600">
            Your payment has been successfully processed.
          </p>
          <div className="mt-5 sm:mt-6">
            <button
              onClick={() => navigate('/')}
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Go back to home
            </button>
          </div>
        </div>
      </div>
      
      <SimpleFooter />
    </div>
  );
}

export default PaymentSuccess;
