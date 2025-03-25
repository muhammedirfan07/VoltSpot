import React, { useContext, useEffect, useState } from "react";
import Reviewcard from "./Reviewcard";
import { viewReviewAPI } from "../../../Server/allAPI";
import { reviewAndRatingContext } from "../../../context/ContextAPI";


const ReviewsAndRatingPage = ({ stationId ,onReviewsFetched  }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const {reviewStaionResponse,setReviewStaionResponse}=useContext(reviewAndRatingContext)

  useEffect(() => {
    getReviews();
  }, [stationId,reviewStaionResponse]);

  const getReviews = async () => {
    console.log("inside the get reviews and rating..");
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.log("token to geting ");
        return;
      }
      const reqHeaders = {
        Authorization: `Bearer ${token}`,
      };
      const result = await viewReviewAPI(stationId, reqHeaders);
      if (result.status === 200) {
        setReviews(result.data);
        console.log("all reviews :", result.data);
        onReviewsFetched(result.data);
      }
    } catch (err) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="space-y-4 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-black">
        {loading ? (
          <p className="text-gray-400">Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <Reviewcard key={review._id} review={review} />
          ))
        ) : (
          <p className="text-gray-400">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsAndRatingPage;
