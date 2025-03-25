const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'evstations', 
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const RatingAndReview = mongoose.model('RatingAndReview', ratingAndReviewSchema);

module.exports = RatingAndReview;
