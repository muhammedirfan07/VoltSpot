import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { viewBookingAPI } from "../../Server/allAPI";

const BookingHistory = () => {
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    viewBookingHistory();
  }, []);

  const toggleBookingDetails = (id) => {
    if (expandedBooking === id) {
      setExpandedBooking(null);
    } else {
      setExpandedBooking(id);
    }
  };

  const viewBookingHistory = async () => {
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
      const result = await viewBookingAPI(userId, reqHeaders);
      if (result.status === 200) {
        setBookingHistory(result.data.bookings);
        console.log("history:", result.data.bookings);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="bg-gradient-to-t from-gray-800 to-slate-950 drop-shadow-xl rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-xl text-amber-50 font-semibold">Booking History</h2>
      </div>
      <div className="overflow-hidden">
        <ul className="divide-y divide-gray-500">
          {bookingHistory.length > 0 ? (
            bookingHistory.map((booking) => {
              const startTime = new Date(booking.startTime);
              const endTime = new Date(booking.endTime);

              // Format time without seconds
              const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

              return (
                <li key={booking._id}>
                  <div className="px-6 py-4">
                    <div
                      onClick={() => toggleBookingDetails(booking._id)}
                      className="cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="text-lg font-medium text-gray-200 mr-3">
                              {booking.stationId?.stationName || "Unknown Station"}
                            </h3>
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Booked on {startTime.toLocaleDateString()} 
                          </p>
                          <p className="text-base font-medium text-gray-100 mt-1">
                            {formatCurrency(booking.totalPrice)}
                          </p>
                        </div>
                        <button className="ml-3 text-gray-400 hover:text-gray-600">
                          {expandedBooking === booking._id ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </button>
                      </div>
                    </div>

                    {expandedBooking === booking._id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 mb-1">Booking ID</p>
                            <p className="font-medium text-gray-200">
                              {booking._id}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Station Name</p>
                            <p className="font-medium text-gray-200">
                              {booking.stationId?.stationName || "Unknown Station"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Location</p>
                            <p className="font-medium text-gray-200">
                              {`${booking.stationId?.city}, ${booking.stationId?.state}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Slot Number</p>
                            <p className="font-medium text-gray-200">
                              {booking.slotNumber}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Start Time</p>
                            <p className="font-medium text-gray-200">
                               {startTime.toLocaleTimeString([], timeOptions)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">End Time</p>
                            <p className="font-medium text-gray-200">
                               {endTime.toLocaleTimeString([], timeOptions)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Duration</p>
                            <p className="font-medium text-gray-200">
                              {booking.duration} hours
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Total Price</p>
                            <p className="font-medium text-gray-200">
                              {formatCurrency(booking.totalPrice)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <div className="py-8 text-center text-gray-500">
              No booking history available.
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BookingHistory;