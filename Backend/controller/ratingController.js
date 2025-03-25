const RatingAndReview =require("../Models/ratingandReviews")

// add rating and reviews------------
exports.addRatingAndReviews = async (req, res) => {
    try {
        console.log("Inside the rating and reviews..🤖🤖");
        console.log("Full req.body:", req.body);;

        const { rating, review, stationId } = req.body; 
        const userId = req.userId;
        console.log(" UserId:", userId, "StationId:", stationId, "Rating:", rating);

        if (!rating || !review || !stationId) {
            return res.status(400).json({ message: "Rating, review, and station ID are required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const newReview = new RatingAndReview({
            rating,
            review,
            user: userId,
            station: stationId
        });

        await newReview.save();

        res.status(200).json({ success: true, message: "Review added successfully", data: newReview });
        console.log("New review:", newReview);

    } catch (error) {
        console.error("Error adding rating and review:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// view all reviwws
exports.getallReviws = async (req, res) => {
    console.log("Inside get rating and reviews...");
    
    try {
        const { stationId } = req.query; 
        console.log("Station ID received:", stationId);

        let query = {}; 
        if (stationId) {
            query.station = stationId; 
        }

        const allReviews = await RatingAndReview.find(query).populate("user", "fullName"); // Populate user details
        res.status(200).json(allReviews);
        console.log("All reviews:", allReviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};