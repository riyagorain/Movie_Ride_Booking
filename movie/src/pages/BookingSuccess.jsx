import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CheckCircle,
  Ticket,
  Car,
  CalendarDays,
  Clock,
  MapPin,
  Navigation,
  Users,
  Printer,
  Home,
  Film
} from 'lucide-react'
import toast from 'react-hot-toast'


const BookingSuccess = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const booking = location.state || {}


  // =====================================================
  // DATA
  // =====================================================

  const movie = booking.movie || null

  const movieDate =
    booking.date || 'N/A'

  const showTime =
    booking.showTime || 'N/A'

  const seats =
    booking.seats || []

  const movieFare =
    Number(booking.movieFare || 0)


  // Ride

  const rideType =
    booking.rideType || null

  const passengers =
    booking.passengers || 1

  const pickup =
    booking.pickupSearch ||
    booking.pickup ||
    'N/A'

  const destination =
    booking.destinationSearch ||
    booking.destination ||
    'N/A'

  const distance =
    booking.distance || null

  const rideTime =
    booking.rideTime ||
    booking.time ||
    null

  const rideFare =
    Number(booking.rideFare || booking.fare || 0)


  // Payment

  const paymentMethod =
    booking.paymentMethod || 'UPI'

  const totalFare =
    Number(
      booking.totalFare ||
      movieFare + rideFare
    )


  // =====================================================
  // BOOKING ID
  // =====================================================

  const bookingId =
    booking.bookingId ||
    `MOV${Date.now().toString().slice(-8)}`


  // =====================================================
  // PRINT TICKET
  // =====================================================

  const handlePrint = () => {

    window.print()

  }


  // =====================================================
  // GO HOME
  // =====================================================

  const handleHome = () => {

    navigate('/')

  }


  // =====================================================
  // NO BOOKING
  // =====================================================

  if (!movie && !rideType) {

    return (

      <div className="min-h-screen bg-gray-100 pt-28 px-4">

        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">

          <Ticket
            size={55}
            className="mx-auto text-gray-400 mb-4"
          />

          <h1 className="text-2xl font-bold text-gray-900">

            Booking Not Found

          </h1>

          <p className="text-gray-500 mt-2">

            We could not find your booking details.

          </p>

          <button
            onClick={() => navigate('/movies')}
            className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
          >

            Browse Movies

          </button>

        </div>

      </div>

    )

  }


  return (

    <div className="min-h-screen bg-gray-100 pt-24 pb-12">

      <div className="max-w-4xl mx-auto px-4">


        {/* ================================================= */}
        {/* SUCCESS HEADER */}
        {/* ================================================= */}

        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">

            <CheckCircle
              size={52}
              className="text-green-600"
            />

          </div>


          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-5">

            Booking Confirmed!

          </h1>


          <p className="text-gray-500 mt-2">

            Your movie and ride have been booked successfully.

          </p>


          <div className="inline-flex items-center gap-2 mt-4 bg-white border border-gray-200 rounded-full px-4 py-2">

            <span className="text-sm text-gray-500">

              Booking ID

            </span>

            <span className="font-bold text-indigo-600">

              {bookingId}

            </span>

          </div>

        </div>


        {/* ================================================= */}
        {/* MAIN TICKET */}
        {/* ================================================= */}

        <div
          id="booking-ticket"
          className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden"
        >


          {/* ================================================= */}
          {/* TICKET HEADER */}
          {/* ================================================= */}

          <div className="bg-indigo-600 text-white p-6">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">

                  <Film size={25} />

                </div>


                <div>

                  <p className="text-indigo-100 text-sm">

                    Movie + Ride

                  </p>

                  <h2 className="text-xl font-bold">

                    Booking Confirmation

                  </h2>

                </div>

              </div>


              <div className="hidden sm:block text-right">

                <p className="text-indigo-100 text-xs">

                  Booking ID

                </p>

                <p className="font-bold">

                  {bookingId}

                </p>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* MOVIE SECTION */}
          {/* ================================================= */}

          {movie && (

            <div className="p-6 border-b border-dashed border-gray-300">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">

                  <Ticket
                    size={21}
                    className="text-indigo-600"
                  />

                </div>


                <div>

                  <p className="text-xs text-gray-500">

                    MOVIE

                  </p>

                  <h3 className="text-xl font-bold text-gray-900">

                    {movie.title || 'Selected Movie'}

                  </h3>

                </div>

              </div>


              <div className="grid sm:grid-cols-3 gap-4">


                {/* DATE */}

                <div className="bg-gray-50 rounded-xl p-4">

                  <div className="flex items-center gap-2 text-gray-500 mb-2">

                    <CalendarDays size={17} />

                    <span className="text-sm">

                      Date

                    </span>

                  </div>

                  <p className="font-semibold text-gray-900">

                    {movieDate}

                  </p>

                </div>


                {/* TIME */}

                <div className="bg-gray-50 rounded-xl p-4">

                  <div className="flex items-center gap-2 text-gray-500 mb-2">

                    <Clock size={17} />

                    <span className="text-sm">

                      Show Time

                    </span>

                  </div>

                  <p className="font-semibold text-gray-900">

                    {showTime}

                  </p>

                </div>


                {/* SEATS */}

                <div className="bg-gray-50 rounded-xl p-4">

                  <div className="flex items-center gap-2 text-gray-500 mb-2">

                    <Users size={17} />

                    <span className="text-sm">

                      Seats

                    </span>

                  </div>

                  <p className="font-semibold text-gray-900">

                    {seats.length
                      ? seats.join(', ')
                      : 'N/A'
                    }

                  </p>

                </div>

              </div>


              {/* MOVIE PRICE */}

              <div className="flex justify-between mt-5 pt-5 border-t border-gray-200">

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
          {/* RIDE SECTION */}
          {/* ================================================= */}

          {rideType && (

            <div className="p-6 border-b border-dashed border-gray-300">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">

                  <Car
                    size={21}
                    className="text-green-600"
                  />

                </div>


                <div>

                  <p className="text-xs text-gray-500">

                    RIDE

                  </p>

                  <h3 className="text-xl font-bold text-gray-900">

                    {rideType}

                  </h3>

                </div>

              </div>


              {/* ROUTE */}

              <div className="space-y-4">


                {/* PICKUP */}

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">

                    <MapPin
                      size={16}
                      className="text-green-600"
                    />

                  </div>


                  <div>

                    <p className="text-xs text-gray-500">

                      Pickup

                    </p>

                    <p className="font-semibold text-gray-900">

                      {pickup}

                    </p>

                  </div>

                </div>


                {/* DESTINATION */}

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">

                    <Navigation
                      size={16}
                      className="text-red-500"
                    />

                  </div>


                  <div>

                    <p className="text-xs text-gray-500">

                      Destination

                    </p>

                    <p className="font-semibold text-gray-900">

                      {destination}

                    </p>

                  </div>

                </div>

              </div>


              {/* RIDE INFO */}

              <div className="grid grid-cols-3 gap-3 mt-6">


                <div className="bg-gray-50 rounded-xl p-4">

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


                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="text-xs text-gray-500">

                    Travel Time

                  </p>

                  <p className="font-semibold text-gray-900">

                    {rideTime
                      ? `${rideTime} min`
                      : '--'
                    }

                  </p>

                </div>


                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="text-xs text-gray-500">

                    Passengers

                  </p>

                  <p className="font-semibold text-gray-900">

                    {passengers}

                  </p>

                </div>

              </div>


              {/* RIDE PRICE */}

              <div className="flex justify-between mt-5 pt-5 border-t border-gray-200">

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
          {/* PAYMENT SUMMARY */}
          {/* ================================================= */}

          <div className="p-6">


            <div className="flex justify-between mb-3">

              <span className="text-gray-500">

                Payment Method

              </span>

              <span className="font-semibold text-gray-900">

                {paymentMethod}

              </span>

            </div>


            <div className="flex justify-between items-center pt-4 border-t border-gray-200">

              <span className="text-xl font-bold text-gray-900">

                Total Paid

              </span>

              <span className="text-3xl font-bold text-indigo-600">

                ₹{totalFare}

              </span>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* ACTION BUTTONS */}
        {/* ================================================= */}

        <div className="flex flex-col sm:flex-row gap-3 mt-6">


          <button

            onClick={handlePrint}

            className="flex-1 h-13 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50"
          >

            <Printer size={19} />

            Print Ticket

          </button>


          <button

            onClick={handleHome}

            className="flex-1 h-13 rounded-xl bg-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700"
          >

            <Home size={19} />

            Back to Home

          </button>

        </div>


        {/* ================================================= */}
        {/* SUCCESS MESSAGE */}
        {/* ================================================= */}

        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-400">

          <CheckCircle size={17} />

          Keep your booking ID for future reference.

        </div>

      </div>

    </div>

  )

}


export default BookingSuccess