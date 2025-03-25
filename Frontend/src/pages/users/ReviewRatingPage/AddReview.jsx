import React, { useContext, useState } from 'react';
import { Star } from 'lucide-react';
import { addReviewAPI } from '../../../Server/allAPI';
import { toast } from "react-toastify";
import { reviewAndRatingContext } from '../../../context/ContextAPI';

const AddReview = ({stationId}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const {reviewStaionResponse,setReviewStaionResponse}=useContext(reviewAndRatingContext)
  
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };


  
    const handleSubmit = async (e) => {
      e.preventDefault();
    console.log( "Inside add ratind reviews page...");
    
      const userData = sessionStorage.getItem("user");
      const authUser = JSON.parse(userData);
      const userId = authUser?._id;
  
      if (!userId) {
        toast.error("User not found. Please log in.");
        return;
      }
  
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found");
        return;
      }
      
    const reqHeaders = {
        Authorization: `Bearer ${token}`,
      };
      
  
      const reviewData = { rating, review, stationId };
  
      try {
        const result = await addReviewAPI(reviewData,reqHeaders);
        if (result.status === 200) {
            console.log("rewsult :",result.data);
            setReviewStaionResponse(result)
          setIsOpen(false);
          setRating(0);
          setReview("");
        } else {
          toast.error(response?.data?.message || "Failed to add review", {
            position: "top-right",
            theme: "dark",
          });
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        toast.error("Something went wrong!", { position: "bottom-right", theme: "dark" });
      }
    };
  

  return (
    <div className="relative">
      <button 
        onClick={toggleCollapse} 
        className="bg-green-700 hover:bg-green-800 text-white rounded-lg py-1 px-3 transition-all duration-200"
      >
        Add Review
      </button>
      
      <div
        className={`absolute right-0 w-80 z-10 transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-4 border border-gray-700 rounded-lg bg-neutral-800 shadow-lg">
          <h3 className="text-white font-bold mb-3">Add Your Review</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-gray-300 mb-1">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer ${
                      star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="mb-3">
              <label className="block text-gray-300 mb-1">Review</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full bg-neutral-700 text-white rounded p-2"
                rows="3"
                placeholder="Share your experience..."
              ></textarea>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={toggleCollapse}
                className="bg-gray-700 hover:bg-gray-600 text-white rounded px-3 py-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-600 text-white rounded px-3 py-1"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;