import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import {
  ArrowLeft,
  CalendarDays,
  Car,
  CheckCircle,
  Clock,
  CreditCard,
  MapPin,
  Navigation,
  ShieldCheck,
  Ticket,
  Users
} from 'lucide-react'


const Payment = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const booking = location.state || {}


  // =====================================================
  // BOOKING DATA
  // =====================================================

  const movie = booking.movie || null

  const movieDate =
    booking.date || ''

  const showTime =
    booking.showTime || ''

  const seats =
    booking.seats || []

  const movieFare =
    Number(booking.movieFare || 0)


  // =====================================================
  // RIDE DATA
  // =====================================================

  const rideType =
    booking.rideType || ''

  const passengers =
    booking.passengers || 1

  const pickupSearch =
    booking.pickupSearch || ''

  const destinationSearch =
    booking.destinationSearch || ''

  const distance =
    booking.distance || null

  const rideTime =
    booking.time || null

  const rideFare =
    Number(booking.fare || 0)


  // =====================================================
  // TOTAL
  // =====================================================

  const totalFare =
    movieFare + rideFare


  // =====================================================
  // PAYMENT STATE
  // =====================================================

  const [paymentMethod, setPaymentMethod] =
    useState('UPI')

  const [upiId, setUpiId] =
    useState('')

  const [cardNumber, setCardNumber] =
    useState('')

  const [expiry, setExpiry] =
    useState('')

  const [cvv, setCvv] =
    useState('')

  const [processing, setProcessing] =
    useState(false)


  // =====================================================
  // PAYMENT HANDLER
  // =====================================================

const handlePayment = async () => {

  // -----------------------------------------------
  // Check booking
  // -----------------------------------------------

  if (!movie && !rideType) {
    toast.error('No booking information found.')
    navigate('/movies')
    return
  }

  // -----------------------------------------------
  // Validate UPI
  // -----------------------------------------------

  if (
    paymentMethod === 'UPI' &&
    !upiId.trim()
  ) {
    toast.error('Please enter your UPI ID.')
    return
  }

  // -----------------------------------------------
  // Validate Card
  // -----------------------------------------------

  if (
    paymentMethod === 'Card' &&
    (
      !cardNumber ||
      !expiry ||
      !cvv
    )
  ) {
    toast.error('Please fill all card details.')
    return
  }

  try {

    setProcessing(true)

    // -----------------------------------------------
    // Booking data
    // -----------------------------------------------

    const bookingData = {

      // Movie
      movie: movie?.title || '',
      movieId: booking.movieId || null,
      movieTitle: movie?.title || '',
      date: movieDate,
      showTime,
      seats,
      movieFare,

      // Ride
      rideType,
      passengers,
      pickup: booking.pickup || [],
      destination: booking.destination || [],
      pickupSearch,
      destinationSearch,
      distance: Number(distance || 0),
      rideTime: Number(rideTime || 0),
      rideFare,

      // Payment
      paymentMethod,
      totalFare,

      // Temporary user
      user: 'guest-user',

      paymentStatus: 'paid',
      bookingStatus: 'confirmed'
    }

    // -----------------------------------------------
    // Save booking to MongoDB
    // -----------------------------------------------

    const response = await axios.post(
  'http://localhost:3000/api/bookings/create',
  bookingData,
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
)

    if (response.data.success) {

      toast.success(
        'Payment successful! Booking confirmed.'
      )

      // ---------------------------------------------
      // Go to Booking Success
      // ---------------------------------------------

      navigate(
        '/booking-success',
        {
          state: {
            ...bookingData,
            bookingId: response.data.booking._id
          }
        }
      )

    } else {

      toast.error(
        response.data.message ||
        'Booking failed.'
      )

    }

  }  catch (error) {

  console.error("========== BOOKING ERROR ==========")
  console.error("Message:", error.message)
  console.error("Response:", error.response?.data)
  console.error("Status:", error.response?.status)
  console.error("Full error:", error)

  toast.error(
    error.response?.data?.message ||
    error.message ||
    "Unable to complete booking."
  )

} finally {

    setProcessing(false)

  }
}


  // =====================================================
  // NO BOOKING
  // =====================================================

  if (
    !movie &&
    !rideType
  ) {

    return (

      <div className="min-h-screen bg-gray-100 pt-28 px-4">

        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border p-8 text-center">

          <Ticket
            size={50}
            className="mx-auto text-gray-400 mb-4"
          />

          <h1 className="text-2xl font-bold text-gray-900">

            No Booking Found

          </h1>

          <p className="text-gray-500 mt-2">

            Please select a movie or book a ride first.

          </p>


          <button

            onClick={() =>
              navigate('/movies')
            }

            className="mt-6 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >

            Browse Movies

          </button>

        </div>

      </div>

    )
  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="min-h-screen bg-gray-100 pt-24 pb-12">

      <div className="max-w-6xl mx-auto px-4 md:px-8">


        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex items-center gap-4 mb-8">

          <button

            onClick={() =>
              navigate(-1)
            }

            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
          >

            <ArrowLeft
              size={20}
              className="text-gray-700"
            />

          </button>


          <div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">

              Checkout

            </h1>

            <p className="text-gray-500 mt-1">

              Review your movie and ride booking.

            </p>

          </div>

        </div>


        {/* ================================================= */}
        {/* MAIN GRID */}
        {/* ================================================= */}

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">


          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <div className="space-y-6">


            {/* ================================================= */}
            {/* MOVIE CARD */}
            {/* ================================================= */}

            {movie && (

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">

                    <Ticket
                      size={23}
                      className="text-indigo-600"
                    />

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">

                      Movie Ticket

                    </p>

                    <h2 className="text-xl font-bold text-gray-900">

                      {movie.title || 'Selected Movie'}

                    </h2>

                  </div>

                </div>


                <div className="grid sm:grid-cols-3 gap-4">


                  {/* DATE */}

                  <div className="bg-gray-50 rounded-xl p-4">

                    <div className="flex items-center gap-2 text-gray-500 mb-1">

                      <CalendarDays
                        size={17}
                      />

                      <span className="text-sm">
                        Date
                      </span>

                    </div>

                    <p className="font-semibold text-gray-900">

                      {movieDate || 'N/A'}

                    </p>

                  </div>


                  {/* TIME */}

                  <div className="bg-gray-50 rounded-xl p-4">

                    <div className="flex items-center gap-2 text-gray-500 mb-1">

                      <Clock
                        size={17}
                      />

                      <span className="text-sm">
                        Show Time
                      </span>

                    </div>

                    <p className="font-semibold text-gray-900">

                      {showTime || 'N/A'}

                    </p>

                  </div>


                  {/* SEATS */}

                  <div className="bg-gray-50 rounded-xl p-4">

                    <div className="flex items-center gap-2 text-gray-500 mb-1">

                      <Users
                        size={17}
                      />

                      <span className="text-sm">
                        Seats
                      </span>

                    </div>

                    <p className="font-semibold text-gray-900">

                      {seats.length > 0
                        ? seats.join(', ')
                        : 'N/A'
                      }

                    </p>

                  </div>

                </div>


                {/* MOVIE PRICE */}

                <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between">

                  <span className="text-gray-600">

                    Movie Tickets

                  </span>

                  <span className="font-bold text-gray-900">

                    ₹{movieFare}

                  </span>

                </div>

              </div>

            )}


            {/* ================================================= */}
            {/* RIDE CARD */}
            {/* ================================================= */}

            {rideType && (

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">

                    <Car
                      size={23}
                      className="text-green-600"
                    />

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">

                      Ride Booking

                    </p>

                    <h2 className="text-xl font-bold text-gray-900">

                      {rideType}

                    </h2>

                  </div>

                </div>


                {/* PICKUP */}

                <div className="flex gap-3">

                  <div className="flex flex-col items-center">

                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">

                      <MapPin
                        size={17}
                        className="text-green-600"
                      />

                    </div>

                    <div className="w-px h-10 border-l border-dashed border-gray-300" />

                  </div>


                  <div className="pb-4">

                    <p className="text-xs text-gray-500">
                      Pickup
                    </p>

                    <p className="text-sm font-semibold text-gray-900">

                      {pickupSearch || 'Pickup location'}

                    </p>

                  </div>

                </div>


                {/* DESTINATION */}

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">

                    <Navigation
                      size={17}
                      className="text-red-500"
                    />

                  </div>


                  <div>

                    <p className="text-xs text-gray-500">
                      Destination
                    </p>

                    <p className="text-sm font-semibold text-gray-900">

                      {destinationSearch || 'Destination'}

                    </p>

                  </div>

                </div>


                {/* RIDE DETAILS */}

                <div className="grid grid-cols-3 gap-3 mt-6">


                  <div className="bg-gray-50 rounded-xl p-3">

                    <p className="text-xs text-gray-500">
                      Distance
                    </p>

                    <p className="font-semibold text-gray-900">

                      {distance
                        ? `${distance} km`
                        : '--'
                      }

                    </p>

                  </div>


                  <div className="bg-gray-50 rounded-xl p-3">

                    <p className="text-xs text-gray-500">
                      Time
                    </p>

                    <p className="font-semibold text-gray-900">

                      {rideTime
                        ? `${rideTime} min`
                        : '--'
                      }

                    </p>

                  </div>


                  <div className="bg-gray-50 rounded-xl p-3">

                    <p className="text-xs text-gray-500">
                      Passengers
                    </p>

                    <p className="font-semibold text-gray-900">

                      {passengers}

                    </p>

                  </div>

                </div>


                {/* RIDE PRICE */}

                <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between">

                  <span className="text-gray-600">

                    Ride Fare

                  </span>

                  <span className="font-bold text-gray-900">

                    ₹{rideFare}

                  </span>

                </div>

              </div>

            )}


            {/* ================================================= */}
            {/* PAYMENT METHOD */}
            {/* ================================================= */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">

                  <CreditCard
                    size={23}
                    className="text-purple-600"
                  />

                </div>


                <div>

                  <p className="text-sm text-gray-500">

                    Payment

                  </p>

                  <h2 className="text-xl font-bold text-gray-900">

                    Choose Payment Method

                  </h2>

                </div>

              </div>


              {/* PAYMENT TABS */}

              <div className="grid grid-cols-2 gap-3 mb-5">


                <button

                  onClick={() =>
                    setPaymentMethod('UPI')
                  }

                  className={`h-12 rounded-xl border font-semibold transition ${
                    paymentMethod === 'UPI'

                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'

                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >

                  UPI

                </button>


                <button

                  onClick={() =>
                    setPaymentMethod('Card')
                  }

                  className={`h-12 rounded-xl border font-semibold transition ${
                    paymentMethod === 'Card'

                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'

                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >

                  Card

                </button>

              </div>


              {/* UPI */}

              {paymentMethod === 'UPI' && (

                <div>

                  <label className="text-sm font-medium text-gray-700 block mb-2">

                    UPI ID

                  </label>


                  <input

                    type="text"

                    value={upiId}

                    onChange={(e) =>
                      setUpiId(
                        e.target.value
                      )
                    }

                    placeholder="example@upi"

                    className="w-full h-13 px-4 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-indigo-500 text-gray-900"
                  />

                  <p className="text-xs text-gray-400 mt-2">

                    Example: yourname@upi

                  </p>

                </div>

              )}


              {/* CARD */}

              {paymentMethod === 'Card' && (

                <div className="space-y-4">

                  <div>

                    <label className="text-sm font-medium text-gray-700 block mb-2">

                      Card Number

                    </label>

                    <input

                      type="text"

                      value={cardNumber}

                      onChange={(e) =>
                        setCardNumber(
                          e.target.value
                        )
                      }

                      maxLength={19}

                      placeholder="1234 5678 9012 3456"

                      className="w-full h-13 px-4 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-indigo-500 text-gray-900"
                    />

                  </div>


                  <div className="grid grid-cols-2 gap-4">

                    <div>

                      <label className="text-sm font-medium text-gray-700 block mb-2">

                        Expiry

                      </label>

                      <input

                        type="text"

                        value={expiry}

                        onChange={(e) =>
                          setExpiry(
                            e.target.value
                          )
                        }

                        placeholder="MM/YY"

                        maxLength={5}

                        className="w-full h-13 px-4 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-indigo-500 text-gray-900"
                      />

                    </div>


                    <div>

                      <label className="text-sm font-medium text-gray-700 block mb-2">

                        CVV

                      </label>

                      <input

                        type="password"

                        value={cvv}

                        onChange={(e) =>
                          setCvv(
                            e.target.value
                          )
                        }

                        placeholder="***"

                        maxLength={4}

                        className="w-full h-13 px-4 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-indigo-500 text-gray-900"
                      />

                    </div>

                  </div>

                </div>

              )}

            </div>

          </div>


          {/* ================================================= */}
          {/* RIGHT SUMMARY */}
          {/* ================================================= */}

          <div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:sticky lg:top-28">

              <h2 className="text-xl font-bold text-gray-900 mb-6">

                Booking Summary

              </h2>


              {/* MOVIE */}

              {movie && (

                <div className="flex justify-between items-start gap-4 mb-4">

                  <div>

                    <p className="text-sm text-gray-500">
                      Movie Ticket
                    </p>

                    <p className="font-semibold text-gray-900">

                      {movie.title || 'Movie'}

                    </p>

                    <p className="text-xs text-gray-400 mt-1">

                      {seats.length}
                      {' '}
                      {seats.length === 1
                        ? 'seat'
                        : 'seats'
                      }

                    </p>

                  </div>

                  <p className="font-semibold text-gray-900">

                    ₹{movieFare}

                  </p>

                </div>

              )}


              {/* RIDE */}

              {rideType && (

                <div className="flex justify-between items-start gap-4 mb-4">

                  <div>

                    <p className="text-sm text-gray-500">
                      Ride
                    </p>

                    <p className="font-semibold text-gray-900">

                      {rideType}

                    </p>

                    <p className="text-xs text-gray-400 mt-1">

                      {distance
                        ? `${distance} km`
                        : ''
                      }

                    </p>

                  </div>

                  <p className="font-semibold text-gray-900">

                    ₹{rideFare}

                  </p>

                </div>

              )}


              <div className="border-t border-gray-200 pt-5 mt-5">


                <div className="flex justify-between text-gray-500 text-sm mb-2">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₹{totalFare}
                  </span>

                </div>


                <div className="flex justify-between text-gray-500 text-sm mb-4">

                  <span>
                    Convenience fee
                  </span>

                  <span>
                    ₹0
                  </span>

                </div>


                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">

                  <span className="text-lg font-bold text-gray-900">

                    Total

                  </span>

                  <span className="text-2xl font-bold text-indigo-600">

                    ₹{totalFare}

                  </span>

                </div>

              </div>


              {/* PAY BUTTON */}

              <button

                onClick={handlePayment}

                disabled={processing}

                className={`w-full mt-6 h-14 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition ${
                  processing

                    ? 'bg-gray-400 cursor-not-allowed'

                    : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
                }`}
              >

                {processing ? (

                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

                    Processing...

                  </>

                ) : (

                  <>
                    <CreditCard size={20} />

                    Pay ₹{totalFare}

                  </>

                )}

              </button>


              {/* SECURITY */}

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">

                <ShieldCheck
                  size={15}
                />

                Secure payment

              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* BOTTOM SECURITY */}
        {/* ================================================= */}

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">

          <CheckCircle
            size={17}
          />

          Your booking information is protected.

        </div>

      </div>

    </div>

  )
}


export default Payment
