import React, { useEffect, useState } from 'react';
import { User, CreditCard, Calendar, Settings, LogOut } from 'lucide-react';
import BookingHistory from '../../pages/users/BookingHistory';
import { singleUserDetailsAPI } from '../../Server/allAPI';
import PaymentHistory from '../../pages/users/PaymentHistory';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [singleUserDetails, setSingleUserDetails] = useState({});
  const navigate =useNavigate()
  useEffect(() => {
    getViewUserDetails();
  }, []);

  const getViewUserDetails = async () => {
    console.log("inside the get view user details...");
    const userData = sessionStorage.getItem("user");
    const authUser = JSON.parse(userData);
    const userId = authUser?._id;
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.log("Token is not available.");
      return;
    }

    const reqHeaders = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await singleUserDetailsAPI(userId, reqHeaders);
      console.log("result:", result);

      if (result.status === 200) {
        setSingleUserDetails(result.data);
        console.log("user Details:", result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Format the join date
  const formatJoinDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen  bg-neutral-950">
      {/* Header */}
      <div className="max-w-full font-[Manrope] bg-gradient-to-t from-gray-800 to-black relative mx-auto px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-100">My Account</h1>
        <div className="flex items-center gap-4">
          
          <button onClick={()=>{navigate('/home')}}  className="text-gray-500 hover:text-gray-700">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className=" bg-neutral-900 shadow rounded-lg p-6 sticky top-8">
              <div className="flex flex-col items-center text-center mb-6">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                  alt="Profile"
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
                <h2 className="text-xl text-gray-200 font-semibold">{singleUserDetails.fullName}</h2>
                <p className="text-gray-200 text-sm mt-1">Member since {formatJoinDate(singleUserDetails.createdAt)}</p>
              </div>

              <nav className="mt-8">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full flex items-center p-3 text-left rounded-md ${
                        activeTab === 'profile' ? 'bg-gray-800 text-gray-50' : 'text-gray-200 hover:bg-slate-950'
                      }`}
                    >
                      <User size={18} className="mr-3" />
                      <span>Profile Information</span>
                    </button>
                  </li>
                  {/* payment history */}
                  {/* <li>
                    <button
                      onClick={() => setActiveTab('payments')}
                      className={`w-full flex items-center p-3 text-left rounded-md ${
                        activeTab === 'payments' ? 'bg-gray-800 text-gray-50' : 'text-gray-200 hover:bg-slate-950'
                      }`}
                    >
                      <CreditCard size={18} className="mr-3" />
                      <span>Payment History</span>
                    </button>
                  </li> */}
                  
                  <li>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className={`w-full flex items-center p-3 text-left rounded-md ${
                        activeTab === 'bookings' ? 'bg-gray-800 text-gray-50' : 'text-gray-200 hover:bg-slate-950'
                      }`}
                    >
                      <Calendar size={18} className="mr-3" />
                      <span>Booking History</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-gradient-to-t from-gray-800 to-slate-950 drop-shadow-xl rounded-lg p-6">
                <h2 className="text-xl text-amber-50 font-semibold mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">Full Name</label>
                      <div className="text-gray-900 p-2 bg-gray-50 rounded-md">{singleUserDetails.fullName}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">Email Address</label>
                      <div className="text-gray-900 p-2 bg-gray-50 rounded-md">{singleUserDetails.email}</div>
                    </div>
                   
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">Member Since</label>
                      <div className="text-gray-900 p-2 bg-gray-50 rounded-md">{formatJoinDate(singleUserDetails.createdAt)}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <PaymentHistory />
            )}

            {activeTab === 'bookings' && (
              <BookingHistory />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;