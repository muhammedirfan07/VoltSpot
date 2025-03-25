const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patners",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["approved", "rejected"],
    default: "approved",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const notifications= mongoose.model( "notifications", notificationSchema)
module.exports=notifications