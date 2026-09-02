import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

import {
  MapPin,
  Navigation,
  Car,
  Bike,
  Clock,
  Users,
  ChevronRight,
  Search,
  LocateFixed,
  X,
  Ticket,
  CalendarDays
} from 'lucide-react'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents
} from 'react-leaflet'

import L from 'leaflet'
import 'leaflet-routing-machine'


// ======================================================
// LEAFLET MARKER FIX
// ======================================================

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})


// ======================================================
// MAP CLICK HANDLER
// ======================================================

const MapClickHandler = ({
  pickup,
  destination,
  setPickup,
  setDestination,
  setPickupSearch,
  setDestinationSearch
}) => {

  useMapEvents({

    click(e) {

      const location = [
        e.latlng.lat,
        e.latlng.lng
      ]


      // First click = Pickup
      if (!pickup) {

        setPickup(location)

        setPickupSearch(
          `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`
        )

        return
      }


      // Second click = Destination
      if (!destination) {

        setDestination(location)

        setDestinationSearch(
          `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`
        )

        return
      }


      // Third click = Start again
      setPickup(location)

      setDestination(null)

      setPickupSearch(
        `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`
      )

      setDestinationSearch('')
    }

  })


  return null
}


// ======================================================
// MAP CENTER
// ======================================================

const MapCenter = ({ location }) => {

  const map = useMap()

  useEffect(() => {

    if (!location) return

    map.flyTo(
      location,
      15,
      {
        duration: 1
      }
    )

  }, [location, map])


  return null
}


// ======================================================
// ROUTING
// ======================================================

const Routing = ({
  pickup,
  destination,
  setDistance,
  setTime
}) => {

  const map = useMap()


  useEffect(() => {

    if (!pickup || !destination) {

      setDistance(null)
      setTime(null)

      return
    }


    if (!L.Routing) {

      console.error(
        'Leaflet Routing Machine is not loaded.'
      )

      return
    }


    const routingControl =
      L.Routing.control({

        waypoints: [

          L.latLng(
            pickup[0],
            pickup[1]
          ),

          L.latLng(
            destination[0],
            destination[1]
          )

        ],


        router:
          L.Routing.osrmv1({

            serviceUrl:
              'https://router.project-osrm.org/route/v1'

          }),


        routeWhileDragging: false,

        addWaypoints: false,

        draggableWaypoints: false,

        fitSelectedRoutes: true,

        show: false,

        createMarker: () => null,


        lineOptions: {

          styles: [
            {
              color: '#4f46e5',
              weight: 6,
              opacity: 0.8
            }
          ]

        }

      })


    routingControl.addTo(map)


    routingControl.on(
      'routesfound',
      (event) => {

        const route =
          event.routes?.[0]

        if (!route) return


        const distanceKm =
          (
            route.summary.totalDistance / 1000
          ).toFixed(1)


        const minutes =
          Math.ceil(
            route.summary.totalTime / 60
          )


        setDistance(distanceKm)

        setTime(minutes)

      }
    )


    routingControl.on(
      'routingerror',
      (error) => {

        console.error(
          'Routing error:',
          error
        )

        setDistance(null)

        setTime(null)

      }
    )


    return () => {

      try {

        map.removeControl(
          routingControl
        )

      } catch (error) {

        console.error(error)

      }

    }

  }, [
    pickup,
    destination,
    map,
    setDistance,
    setTime
  ])


  return null
}


// ======================================================
// MAIN COMPONENT
// ======================================================

const RideBooking = () => {

  const navigate = useNavigate()

  const location = useLocation()


  // ====================================================
  // MOVIE BOOKING DATA
  // ====================================================

  const movieData = location.state || {}

  const movie =
    movieData.movie || null

  const movieId =
    movieData.movieId || null

  const movieDate =
    movieData.date || null

  const showTime =
    movieData.showTime || null

  const seats =
    movieData.seats || []

  const movieFare =
    Number(movieData.movieFare || 0)


  // ====================================================
  // RIDE STATES
  // ====================================================

  const [pickup, setPickup] =
    useState(null)


  const [destination, setDestination] =
    useState(null)


  const [pickupSearch, setPickupSearch] =
    useState('')


  const [destinationSearch, setDestinationSearch] =
    useState('')


  const [pickupResults, setPickupResults] =
    useState([])


  const [destinationResults, setDestinationResults] =
    useState([])


  const [rideType, setRideType] =
    useState('Car')


  const [distance, setDistance] =
    useState(null)


  const [time, setTime] =
    useState(null)


  const [passengers, setPassengers] =
    useState(1)


  const [searching, setSearching] =
    useState(false)


  // ====================================================
  // RIDE DATA
  // ====================================================

  const rides = [

    {
      name: 'Bike',
      icon: Bike,
      basePrice: 30,
      perKm: 12
    },

    {
      name: 'Auto',
      icon: Car,
      basePrice: 40,
      perKm: 16
    },

    {
      name: 'Car',
      icon: Car,
      basePrice: 60,
      perKm: 22
    }

  ]


  const selectedRide =
    rides.find(
      ride =>
        ride.name === rideType
    )


  // ====================================================
  // RIDE FARE
  // ====================================================

  const fare =
    distance && selectedRide
      ? Math.round(
          selectedRide.basePrice +
          Number(distance) *
          selectedRide.perKm
        )
      : null


  // ====================================================
  // TOTAL FARE
  // ====================================================

  const totalFare =
    movieFare +
    Number(fare || 0)


  // ====================================================
  // SEARCH LOCATION
  // ====================================================

  const searchLocation =
    async (
      query,
      type
    ) => {

      if (!query.trim()) {

        if (type === 'pickup') {

          setPickupResults([])

        } else {

          setDestinationResults([])

        }

        return
      }


      try {

        setSearching(true)


        const response =
          await axios.get(
            'https://nominatim.openstreetmap.org/search',
            {
              params: {

                q: query,

                format: 'json',

                addressdetails: 1,

                limit: 5

              },

              headers: {

                'Accept-Language':
                  'en'

              }

            }
          )


        if (type === 'pickup') {

          setPickupResults(
            response.data
          )

        } else {

          setDestinationResults(
            response.data
          )

        }

      } catch (error) {

        console.error(
          'Location search error:',
          error
        )

      } finally {

        setSearching(false)

      }

    }


  // ====================================================
  // SELECT LOCATION
  // ====================================================

  const selectLocation =
    (place, type) => {

      const location = [

        parseFloat(place.lat),

        parseFloat(place.lon)

      ]


      if (type === 'pickup') {

        setPickup(location)

        setPickupSearch(
          place.display_name
        )

        setPickupResults([])

      } else {

        setDestination(location)

        setDestinationSearch(
          place.display_name
        )

        setDestinationResults([])

      }

    }


  // ====================================================
  // CURRENT LOCATION
  // ====================================================

  const getCurrentLocation =
    () => {

      if (!navigator.geolocation) {

        alert(
          'Geolocation is not supported by your browser.'
        )

        return
      }


      navigator.geolocation.getCurrentPosition(

        (position) => {

          const location = [

            position.coords.latitude,

            position.coords.longitude

          ]


          setPickup(location)


          setPickupSearch(
            `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`
          )

        },


        () => {

          alert(
            'Unable to get your current location.'
          )

        }

      )

    }


  // ====================================================
  // CLEAR PICKUP
  // ====================================================

  const clearPickup = () => {

    setPickup(null)

    setPickupSearch('')

    setDistance(null)

    setTime(null)

  }


  // ====================================================
  // CLEAR DESTINATION
  // ====================================================

  const clearDestination = () => {

    setDestination(null)

    setDestinationSearch('')

    setDistance(null)

    setTime(null)

  }


  // ====================================================
  // CONFIRM RIDE → PAYMENT
  // ====================================================

  const confirmRide = () => {

    if (!pickup || !destination) {

      alert(
        'Please select pickup and destination.'
      )

      return
    }


    if (!distance) {

      alert(
        'Please wait for the route to calculate.'
      )

      return
    }


    navigate(
      '/payment',
      {

        state: {

          // ==========================================
          // MOVIE BOOKING DATA
          // ==========================================

          type: 'combined',

          movie,

          movieId,

          date: movieDate,

          showTime,

          seats,

          movieFare,


          // ==========================================
          // RIDE BOOKING DATA
          // ==========================================

          rideType,

          passengers,

          pickup,

          destination,

          pickupSearch,

          destinationSearch,

          distance,

          time,

          fare,


          // ==========================================
          // FINAL TOTAL
          // ==========================================

          totalFare:
            movieFare +
            Number(fare || 0)

        }

      }
    )

  }


  // ====================================================
  // UI
  // ====================================================

  return (

    <div className="min-h-screen bg-gray-100 pt-24 pb-10">

      <div className="max-w-7xl mx-auto px-4 md:px-8">


        {/* ================================================= */}
        {/* MOVIE BOOKING HEADER */}
        {/* ================================================= */}

        {movie && (

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">


              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center">

                  <Ticket
                    size={28}
                    className="text-indigo-600"
                  />

                </div>


                <div>

                  <p className="text-sm text-gray-500">
                    Movie Booking
                  </p>

                  <h2 className="text-xl font-bold text-gray-900">
                    {movie.title || 'Selected Movie'}
                  </h2>

                </div>

              </div>


              <div className="flex flex-wrap gap-4 text-sm">

                <div className="flex items-center gap-2 text-gray-600">

                  <CalendarDays
                    size={17}
                  />

                  <span>
                    {movieDate || 'Selected date'}
                  </span>

                </div>


                <div className="flex items-center gap-2 text-gray-600">

                  <Clock
                    size={17}
                  />

                  <span>
                    {showTime || 'Selected show'}
                  </span>

                </div>


                <div className="font-semibold text-indigo-600">

                  Seats:
                  {' '}
                  {seats.length > 0
                    ? seats.join(', ')
                    : 'None'
                  }

                </div>

              </div>

            </div>

          </div>

        )}


        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-6">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">

            Book Your Ride

          </h1>


          <p className="text-gray-500 mt-2">

            Choose your pickup and destination.

          </p>

        </div>


        {/* ================================================= */}
        {/* MAIN */}
        {/* ================================================= */}

        <div className="grid lg:grid-cols-[420px_1fr] gap-6">


          {/* ================================================= */}
          {/* LEFT PANEL */}
          {/* ================================================= */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">


            <h2 className="text-xl font-semibold text-gray-900 mb-6">

              Where are you going?

            </h2>


            {/* ================================================= */}
            {/* PICKUP */}
            {/* ================================================= */}

            <div className="relative">

              <MapPin
                size={20}
                className="absolute left-4 top-4 text-green-600 z-10"
              />


              <input
                type="text"
                value={pickupSearch}

                onChange={(e) => {

                  setPickupSearch(
                    e.target.value
                  )

                  searchLocation(
                    e.target.value,
                    'pickup'
                  )

                }}

                placeholder="Search pickup location"

                className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-10 outline-none focus:border-indigo-500 text-gray-900"
              />


              {pickupSearch && (

                <button
                  type="button"
                  onClick={clearPickup}

                  className="absolute right-3 top-4 text-gray-400 hover:text-gray-700"
                >

                  <X size={20} />

                </button>

              )}


              {pickupResults.length > 0 && (

                <div className="absolute top-16 left-0 right-0 bg-white border rounded-xl shadow-xl z-[3000] overflow-hidden">

                  {pickupResults.map(
                    place => (

                      <button
                        type="button"

                        key={place.place_id}

                        onClick={() =>
                          selectLocation(
                            place,
                            'pickup'
                          )
                        }

                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b"
                      >

                        <div className="flex gap-3">

                          <MapPin
                            size={18}
                            className="text-green-600 flex-shrink-0 mt-1"
                          />

                          <span className="text-sm text-gray-900">

                            {place.display_name}

                          </span>

                        </div>

                      </button>

                    )
                  )}

                </div>

              )}

            </div>


            {/* ================================================= */}
            {/* CONNECTING LINE */}
            {/* ================================================= */}

            <div className="ml-6 h-5 border-l-2 border-dashed border-gray-300" />


            {/* ================================================= */}
            {/* DESTINATION */}
            {/* ================================================= */}

            <div className="relative">

              <Navigation
                size={20}
                className="absolute left-4 top-4 text-red-500 z-10"
              />


              <input
                type="text"

                value={destinationSearch}

                onChange={(e) => {

                  setDestinationSearch(
                    e.target.value
                  )

                  searchLocation(
                    e.target.value,
                    'destination'
                  )

                }}

                placeholder="Search destination"

                className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-10 outline-none focus:border-indigo-500 text-gray-900"
              />


              {destinationSearch && (

                <button
                  type="button"

                  onClick={clearDestination}

                  className="absolute right-3 top-4 text-gray-400 hover:text-gray-700"
                >

                  <X size={20} />

                </button>

              )}


              {destinationResults.length > 0 && (

                <div className="absolute top-16 left-0 right-0 bg-white border rounded-xl shadow-xl z-[3000] overflow-hidden">

                  {destinationResults.map(
                    place => (

                      <button
                        type="button"

                        key={place.place_id}

                        onClick={() =>
                          selectLocation(
                            place,
                            'destination'
                          )
                        }

                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b"
                      >

                        <div className="flex gap-3">

                          <Navigation
                            size={18}
                            className="text-red-500 flex-shrink-0 mt-1"
                          />

                          <span className="text-sm text-gray-900">

                            {place.display_name}

                          </span>

                        </div>

                      </button>

                    )
                  )}

                </div>

              )}

            </div>


            {/* ================================================= */}
            {/* SEARCH STATUS */}
            {/* ================================================= */}

            <div className="mt-3 bg-indigo-50 border border-indigo-100 rounded-xl p-3">

              <p className="text-sm text-indigo-700">

                {searching
                  ? '🔎 Searching location...'

                  : !pickup
                  ? '📍 Search for pickup or click the map.'

                  : !destination
                  ? '🎯 Search for destination or click the map.'

                  : '✅ Route calculated.'
                }

              </p>

            </div>


            {/* ================================================= */}
            {/* RIDE SELECTION */}
            {/* ================================================= */}

            <div className="border-t border-gray-200 my-6" />


            <h3 className="font-semibold text-gray-900 mb-4">

              Choose your ride

            </h3>


            <div className="space-y-3">

              {rides.map(
                ride => {

                  const Icon =
                    ride.icon


                  const selected =
                    rideType === ride.name


                  const estimatedPrice =
                    distance

                      ? Math.round(
                          ride.basePrice +
                          Number(distance) *
                          ride.perKm
                        )

                      : ride.basePrice


                  return (

                    <button
                      type="button"

                      key={ride.name}

                      onClick={() =>
                        setRideType(
                          ride.name
                        )
                      }

                      className={`w-full p-4 rounded-xl border flex items-center justify-between transition ${
                        selected

                          ? 'border-indigo-500 bg-indigo-50'

                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">

                          <Icon
                            size={25}
                            className="text-gray-700"
                          />

                        </div>


                        <div className="text-left">

                          <p className="font-semibold text-gray-900">

                            {ride.name}

                          </p>


                          <div className="flex items-center gap-1 text-sm text-gray-500">

                            <Clock size={14} />

                            {time

                              ? `${time} min`

                              : 'Select locations'

                            }

                          </div>

                        </div>

                      </div>


                      <div className="text-right">

                        <p className="font-bold text-gray-900">

                          ₹{estimatedPrice}

                        </p>


                        <p className="text-xs text-gray-500">

                          Estimated

                        </p>

                      </div>

                    </button>

                  )

                }
              )}

            </div>


            {/* ================================================= */}
            {/* PASSENGERS */}
            {/* ================================================= */}

            <div className="mt-6">

              <label className="text-sm font-medium text-gray-700 block mb-2">

                Passengers

              </label>


              <div className="relative">

                <Users
                  size={18}
                  className="absolute left-4 top-4 text-gray-500"
                />


                <select

                  value={passengers}

                  onChange={(e) =>
                    setPassengers(
                      Number(e.target.value)
                    )
                  }

                  className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl pl-11 text-gray-900"
                >

                  <option value={1}>
                    1 Passenger
                  </option>

                  <option value={2}>
                    2 Passengers
                  </option>

                  <option value={3}>
                    3 Passengers
                  </option>

                  <option value={4}>
                    4 Passengers
                  </option>

                </select>

              </div>

            </div>


            {/* ================================================= */}
            {/* PRICE SUMMARY */}
            {/* ================================================= */}

            {movie && (

              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">

                <p className="font-semibold text-gray-900 mb-3">

                  Booking Summary

                </p>


                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">

                    <span className="text-gray-600">
                      Movie Tickets
                    </span>

                    <span className="font-semibold">
                      ₹{movieFare}
                    </span>

                  </div>


                  <div className="flex justify-between">

                    <span className="text-gray-600">
                      Ride
                    </span>

                    <span className="font-semibold">

                      {fare
                        ? `₹${fare}`
                        : '--'
                      }

                    </span>

                  </div>


                  <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">

                    <span className="font-bold text-gray-900">
                      Total
                    </span>

                    <span className="font-bold text-xl text-indigo-600">

                      ₹{totalFare}

                    </span>

                  </div>

                </div>

              </div>

            )}


            {/* ================================================= */}
            {/* CONFIRM */}
            {/* ================================================= */}

            <button

              type="button"

              onClick={confirmRide}

              disabled={
                !pickup ||
                !destination ||
                !distance
              }

              className={`w-full mt-6 h-14 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 transition ${
                pickup &&
                destination &&
                distance

                  ? 'bg-indigo-600 hover:bg-indigo-700'

                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >

              Continue to Payment

              <ChevronRight size={20} />

            </button>

          </div>


          {/* ================================================= */}
          {/* MAP */}
          {/* ================================================= */}

          <div className="relative min-h-[650px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">

            <MapContainer

              center={[
                23.5204,
                87.3119
              ]}

              zoom={13}

              scrollWheelZoom={true}

              className="w-full h-[650px]"
            >


              <TileLayer

                attribution="&copy; OpenStreetMap contributors"

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />


              <MapClickHandler

                pickup={pickup}

                destination={destination}

                setPickup={setPickup}

                setDestination={setDestination}

                setPickupSearch={
                  setPickupSearch
                }

                setDestinationSearch={
                  setDestinationSearch
                }

              />


              <MapCenter

                location={
                  destination ||
                  pickup
                }

              />


              <Routing

                pickup={pickup}

                destination={destination}

                setDistance={setDistance}

                setTime={setTime}

              />


              {/* PICKUP MARKER */}

              {pickup && (

                <Marker
                  position={pickup}
                >

                  <Popup>

                    <strong>
                      Pickup Location
                    </strong>

                    <br />

                    {pickupSearch}

                  </Popup>

                </Marker>

              )}


              {/* DESTINATION MARKER */}

              {destination && (

                <Marker
                  position={destination}
                >

                  <Popup>

                    <strong>
                      Destination
                    </strong>

                    <br />

                    {destinationSearch}

                  </Popup>

                </Marker>

              )}

            </MapContainer>


            {/* ================================================= */}
            {/* MAP TOP BAR */}
            {/* ================================================= */}

            <div className="absolute top-5 left-5 right-5 z-[1000] flex gap-3">

              <div className="flex-1 bg-white rounded-xl shadow-lg flex items-center px-4 h-12">

                <Search
                  size={18}
                  className="text-gray-500"
                />

                <span className="ml-3 text-sm text-gray-500">

                  Click the map or use the fields on the left

                </span>

              </div>


              <button

                type="button"

                onClick={
                  getCurrentLocation
                }

                className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-50"

                title="Use my location"
              >

                <LocateFixed
                  size={20}
                  className="text-gray-700"
                />

              </button>

            </div>


            {/* ================================================= */}
            {/* MAP BOTTOM INFO */}
            {/* ================================================= */}

            <div className="absolute bottom-5 left-5 right-5 z-[1000]">

              <div className="bg-white rounded-xl shadow-xl p-4 grid grid-cols-3 gap-4">


                {/* DISTANCE */}

                <div>

                  <p className="text-sm text-gray-500">
                    Distance
                  </p>

                  <p className="text-lg font-bold text-gray-900">

                    {distance
                      ? `${distance} km`
                      : '--'
                    }

                  </p>

                </div>


                {/* TIME */}

                <div className="border-l border-gray-200 pl-4">

                  <p className="text-sm text-gray-500">
                    Estimated time
                  </p>

                  <p className="text-lg font-bold text-gray-900">

                    {time
                      ? `${time} min`
                      : '--'
                    }

                  </p>

                </div>


                {/* FARE */}

                <div className="border-l border-gray-200 pl-4">

                  <p className="text-sm text-gray-500">
                    Estimated fare
                  </p>

                  <p className="text-lg font-bold text-gray-900">

                    {fare
                      ? `₹${fare}`
                      : '--'
                    }

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}


export default RideBooking
