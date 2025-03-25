import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      toast.success("Payment successful!", { position: "top-center", theme: "dark" });
      // You can also fetch additional details using the sessionId if needed
    } else {
      navigate('/home');
    }
  }, [sessionId, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
        <div  className='  absolute top-5  left-5'>
        <Link   to={'/'} ><i class="fa-solid fa-bolt text-2xl" style={{color: "#f0efef"}}></i> 
        <span className="text-3xl font-bold text-white"><span className='text-green-600'>Volt</span>Spot</span></Link>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg">Thank you for your payment.</p>
        <button
          onClick={() => navigate('/home')}
          className="mt-6 font-[DM_Sans] bg-green-500 hover:-translate-y-1 hover:scale-108 text-white  px-6 py-2 rounded-lg transition-all duration-300 ease-in-out "
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;