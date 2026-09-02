
import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// ==========================================
// CREATE BOOKING
// ==========================================

router.post("/create", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking creation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
});

// ==========================================
// GET ALL BOOKINGS
// ==========================================

router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get bookings",
      error: error.message,
    });
  }
});

export default router;
