const mongoose = require("mongoose");
const Counter = require("./counterModel");

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: Number,
    unique: true,
  }, // Auto-increment ID
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  stationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "evstations",
    required: true,
  },
  slotNumber: {
    type: Number,
    required: true,
  }, 
  duration :{
    type:Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  }, // Booking start time
  endTime: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["confirmed", "canceled"],
    default: "confirmed",
  },
});

// Auto-increment booking ID
bookingSchema.pre("save", async function (next) {
  if (!this.bookingId) {
    const counter = await Counter.findOneAndUpdate(
      { name: "bookingId" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    this.bookingId = counter.value;
  }
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
