import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      ref: "User",
    },

    // =========================
    // MOVIE BOOKING
    // =========================

    movie: {
      type: String,
      ref: "Movie",
      default: null,
    },

    movieId: {
      type: String,
      default: null,
    },

    movieTitle: {
      type: String,
      default: "",
    },

    date: {
      type: String,
      default: "",
    },

    showTime: {
      type: String,
      default: "",
    },

    seats: {
      type: [String],
      default: [],
    },

    movieFare: {
      type: Number,
      default: 0,
    },

    // =========================
    // RIDE BOOKING
    // =========================

    rideType: {
      type: String,
      default: "",
    },

    passengers: {
      type: Number,
      default: 0,
    },

    pickup: {
      type: [Number],
      default: [],
    },

    destination: {
      type: [Number],
      default: [],
    },

    pickupSearch: {
      type: String,
      default: "",
    },

    destinationSearch: {
      type: String,
      default: "",
    },

    distance: {
      type: Number,
      default: 0,
    },

    rideTime: {
      type: Number,
      default: 0,
    },

    rideFare: {
      type: Number,
      default: 0,
    },

    // =========================
    // PAYMENT
    // =========================

    paymentMethod: {
      type: String,
      required: true,
    },

    totalFare: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    bookingStatus: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;