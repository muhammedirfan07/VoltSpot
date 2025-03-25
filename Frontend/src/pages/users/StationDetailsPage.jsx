import React, { useEffect, useState } from "react";
import { Star, ArrowBigLeftDash, TrafficCone } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  avilableSlotAPI,
  bookingStaionAPI,
  getSingleStaionAPI,
  paymentAPI,
} from "../../Server/allAPI";
import SERVER_URL from "../../Server/serverURL";
import { toast } from "react-toastify";
import AddReview from "./ReviewRatingPage/AddReview";
import ReviewsAndRatingPage from "./ReviewRatingPage/ReviewsAndRatingPage";

const StationDetailsPage = () => {
  const { stationId } = useParams();
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slotNumber, setSlotNumber] = useState("");
  const [duration, setDuration] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [reviews, setReviews] = useState([]); // State to store reviews
  const navigate = useNavigate();

  useEffect(() => {
    singleStaionDetails();
  }, [stationId]);

  useEffect(() => {
    if (stationId && duration) {
      ViewAvilableSlots();
    }
  }, [stationId, duration]);

  const singleStaionDetails = async () => {
    try {
      const result = await getSingleStaionAPI(stationId);
      if (result.status === 200) {
        setStation(result.data);
      }
    } catch (error) {
      console.log("Error fetching station details:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateOverallRating = (reviews) => {
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
      setOverallRating(0);
      return;
    }

    const totalRating = reviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0
    );
    const averageRating = totalRating / reviews.length;
    setOverallRating(averageRating.toFixed(1)); // Round to 1 decimal place
  };

  // Callback function to handle fetched reviews
  const handleReviewsFetched = (reviews) => {
    setReviews(reviews);
    calculateOverallRating(reviews);
  };

  // avilable slot  viewing----
  const ViewAvilableSlots = async () => {
    console.log("inside the avilable slots........");
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("tokrn is not geting ");
    }
    const reqHeaders = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const startTime = new Date().toISOString();
      const result = await avilableSlotAPI(
        startTime,
        stationId,
        duration,
        reqHeaders
      );
      if (result.status === 200) {
        setAvailableSlots(result.data.availableSlots);
        console.log("avilabe slots :", result.data.availableSlots);
      }
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };

  // charging staion booking---
  const handleBooking = async () => {
    if (!slotNumber || duration < 1) {
      toast.warning("Please fill all required fields", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    const userData = sessionStorage.getItem("user");
    const authUser = JSON.parse(userData);
    const userId = authUser?._id;
    if (!userId) {
      toast.error("User not found. Please log in.");
      return;
    }
    const price = station?.pricePerHour * duration;
    sessionStorage.setItem("slotNumber", slotNumber);
    sessionStorage.setItem("duration", duration);
    sessionStorage.setItem("price", price);
    sessionStorage.setItem("stationId", stationId);
    sessionStorage.setItem("userId", userId);

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    const reqHeaders = {
      Authorization: `Bearer ${token}`,
    };

    const bookingData = {
      userId,
      stationId,
      slotNumber: parseInt(slotNumber),
      startTime: new Date().toISOString(),
      duration,
    };
    console.log("booking data :", bookingData);

    try {
      setIsSubmitting(true);
      const result = await bookingStaionAPI(bookingData, reqHeaders);
      if (result.status === 200) {
        toast.success("Booking successful!", {
          position: "top-center",
          theme: "dark",
        });

        setSlotNumber("");
        setDuration(1);
        const paymentResult = await paymentAPI(stationId, userId, price);
        console.log("Stripe Session ID:", paymentResult.data.id); // Add this line
        if (paymentResult.data.id) {
          navigate(`/stripe-checkout/${paymentResult.data.id}`);
        } else {
          toast.error("Failed to initiate payment", {
            position: "top-right",
            theme: "dark",
          });
        }
      } else {
        toast.error(result.response?.data?.message || "Booking failed!", {
          position: "top-right",
          theme: "dark",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong!", {
        position: "bottom-right",
        theme: "dark",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-0 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-black min-h-screen text-white p-8">
        <div className="max-w-6xl mx-auto">
          <Link to={"/home"}>
            <div className="flex text-green-700">
              <ArrowBigLeftDash /> Home
            </div>
          </Link>

          <div className="text-[#6B7280] text-4xl font-bold mb-8 uppercase">
            {station?.stationName}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="space-y-4">
              <div className="bg-neutral-900 rounded-xl p-3">
                <img
                  src={`${SERVER_URL}/${station?.image}`}
                  alt="Charging Station"
                  className="w-full h-[350px] rounded-md object-cover"
                />
              </div>
            </div>

            {/* Right Column - Station Info */}
            <div className="bg-neutral-900 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{station?.stationName}</h1>
              </div>

              <div className="flex items-center">
                <h3 className="text-xl font-bold mb-4">Location:</h3>
                <span className="text-md mb-3 ms-2">
                  {`${station?.city}, ${station?.state}`}
                </span>
              </div>

              <div className="flex items-center">
                <h3 className="text-xl font-bold mb-4">Charging type:</h3>
                <span className="text-md mb-3 ms-2">
                  {station?.chargingType}
                </span>
              </div>

              <div className="mb-6">
                <h2 className="font-bold mb-2">Available Slots</h2>
                <select
                  className="bg-neutral-800 w-50 rounded px-2 py-1"
                  value={slotNumber}
                  onChange={(e) => setSlotNumber(e.target.value)}
                >
                  <option value="">Select</option>
                  {Array.from({ length: station?.availableSlots }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Slot {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between mt-8">
                <div>
                  <div className="text-gray-400">Price</div>
                  <div className="text-xl font-bold">
                    ₹ {station?.pricePerHour * duration}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="text-gray-400">Hours</div>
                    <input
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) =>
                        setDuration(
                          Math.max(1, parseInt(e.target.value, 10) || 1)
                        )
                      }
                      className="w-16 bg-gray-700 rounded px-2 py-1"
                    />
                  </div>

                  <button
                    disabled={isSubmitting}
                    onClick={handleBooking}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    {isSubmitting ? "Payment..." : "Book Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="col-span-2 bg-neutral-900 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-xl">User Reviews</h2>
                <AddReview stationId={stationId} />
              </div>
              <ReviewsAndRatingPage
                stationId={stationId}
                onReviewsFetched={handleReviewsFetched}
              />
            </div>

            {/* Overall Rating */}
            <div className="bg-neutral-900 flex flex-col justify-center items-center rounded-lg p-6">
              <h1 className="font-bold text-2xl mb-3">Customer Review</h1>
              <h1 className="text-6xl font-bold mb-3">{overallRating}</h1>
              <div className="items-center gap-2 mb-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={
                        star <= overallRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StationDetailsPage;
