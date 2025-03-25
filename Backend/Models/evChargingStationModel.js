const mongoose = require("mongoose");

const evChargingStationSchema = new mongoose.Schema({
  stationId: {
    type: Number,
    unique: true,
    required: true,
  }, // Auto-incrementing ID
  stationName: {
    type: String,
    required: true,
    trim: true,
    // unique: true,
  },
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
      unique: true,
    }, // [Longitude, Latitude]
  },
  image: {
    type: String,
    // required: true,
  }, // Image URL (uploaded file path)
  mapUrl: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  availableSlots: {
    type: Number,
    required: true,
  },
  chargingType: {
    type: String,
    enum: ["slow", "fast", "superfast"],
    required: true,
  },
  vehicleType: {
    type: String,
    enum: ["2-wheeler", "3-wheeler", "4-wheeler"],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "partner",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  rejectionReason: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-incrementing `stationId`
evChargingStationSchema.pre("validate", async function (next) {
  if (!this.stationId) {
    const lastStation = await this.constructor
      .findOne()
      .sort({ stationId: -1 });
    this.stationId = lastStation ? lastStation.stationId + 1 : 1;
  }
  next();
});

// Create index for geolocation search
evChargingStationSchema.index({ location: "2dsphere" });

const evstations = mongoose.model("evstations", evChargingStationSchema);
module.exports = evstations;
