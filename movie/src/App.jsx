// import React from 'react'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import { Route, Routes, useLocation } from 'react-router-dom'

// import Home from './pages/Home'
// import Movies from './pages/Movies'
// import MovieDeatils from './pages/MovieDeatils'
// import SeatLayout from './pages/SeatLayout'
// import MyBookings from './pages/MyBookings'
// import Favourite from './pages/Favourite'

// import { Toaster } from 'react-hot-toast'
// import LayOut from './pages/admin/LayOut'
// import Dashboard from './pages/admin/Dashboard'
// import AddShow from './pages/admin/AddShow'
// import ListShow from './pages/admin/ListShow'
// import ListBooking from './pages/admin/ListBooking'


// const App = () => {

//   const location = useLocation()
//   const isAdminRoute = location.pathname.startsWith('/admin')

//   return (
//     <>
//       <Toaster position="top-right" />

//       {!isAdminRoute && <Navbar />}

//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/movies' element={<Movies />} />
//         <Route path='/movies/:id' element={<MovieDeatils />} />
//         <Route path='/movies/:id/:date' element={<SeatLayout />} />
//         <Route path='/my-bookings' element={<MyBookings />} />
//         <Route path='/favourite' element={<Favourite />} />
//         <Route path='/admin/*' element={<LayOut/>}>
//         <Route index element ={<Dashboard/>} />
//         <Route path="add-shows" element={<AddShow/>}/>
//         <Route path="list-shows" element={<ListShow/>}/>
//         <Route path="list-bookings" element={<ListBooking/>}/>
//         </Route>
        
//       </Routes>

//       {!isAdminRoute && <Footer />}
//     </>
//   )
// }

// export default App
// import React from 'react'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import { Route, Routes, useLocation } from 'react-router-dom'

// import Home from './pages/Home'
// import Movies from './pages/Movies'
// import MovieDeatils from './pages/MovieDeatils'
// import SeatLayout from './pages/SeatLayout'
// import MyBookings from './pages/MyBookings'
// import Favourite from './pages/Favourite'
// import RideBooking from './pages/RideBooking'

// import { Toaster } from 'react-hot-toast'

// import LayOut from './pages/admin/LayOut'
// import Dashboard from './pages/admin/Dashboard'
// import AddShow from './pages/admin/AddShow'
// import ListShow from './pages/admin/ListShow'
// import ListBooking from './pages/admin/ListBooking'
// import RideBooking from './pages/RideBooking'
// const App = () => {

//   const location = useLocation()
//   const isAdminRoute = location.pathname.startsWith('/admin')

//   return (
//     <>
//       <Toaster position="top-right" />

//       {!isAdminRoute && <Navbar />}

//       <Routes>

//         {/* User Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/movies" element={<Movies />} />
//         <Route path="/movies/:id" element={<MovieDeatils />} />
//         <Route path="/movies/:id/:date" element={<SeatLayout />} />
//         <Route path="/my-bookings" element={<MyBookings />} />
//         <Route path="/favourite" element={<Favourite />} />
//         <Route path="/ride-booking" element={<RideBooking />} />

//         {/* Admin Routes */}
//         <Route path="/admin/*" element={<LayOut />}>
//           <Route index element={<Dashboard />} />
//           <Route path="add-shows" element={<AddShow />} />
//           <Route path="list-shows" element={<ListShow />} />
//           <Route path="list-bookings" element={<ListBooking />} />
//         </Route>

//       </Routes>

//       {!isAdminRoute && <Footer />}

//     </>
//   )
// }

// export default App/
// import React from 'react'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import { Route, Routes, useLocation } from 'react-router-dom'

// import Home from './pages/Home'
// import Movies from './pages/Movies'
// import MovieDeatils from './pages/MovieDeatils'
// import SeatLayout from './pages/SeatLayout'
// import MyBookings from './pages/MyBookings'
// import Favourite from './pages/Favourite'
// import RideBooking from './pages/RideBooking'

// import { Toaster } from 'react-hot-toast'

// import LayOut from './pages/admin/LayOut'
// import Dashboard from './pages/admin/Dashboard'
// import AddShow from './pages/admin/AddShow'
// import ListShow from './pages/admin/ListShow'
// import ListBooking from './pages/admin/ListBooking'

// const App = () => {

//   const location = useLocation()
//   const isAdminRoute = location.pathname.startsWith('/admin')

//   return (
//     <>
//       <Toaster position="top-right" />

//       {!isAdminRoute && <Navbar />}

//       <Routes>

//         {/* User Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/movies" element={<Movies />} />
//         <Route path="/movies/:id" element={<MovieDeatils />} />
//         <Route path="/movies/:id/:date" element={<SeatLayout />} />
//         <Route path="/my-bookings" element={<MyBookings />} />
//         <Route path="/favourite" element={<Favourite />} />

//         {/* Ride Booking */}
//         <Route path="/ride-booking" element={<RideBooking />} />

//         {/* Admin Routes */}
//         <Route path="/admin/*" element={<LayOut />}>
//           <Route index element={<Dashboard />} />
//           <Route path="add-shows" element={<AddShow />} />
//           <Route path="list-shows" element={<ListShow />} />
//           <Route path="list-bookings" element={<ListBooking />} />
//         </Route>

//       </Routes>

//       {!isAdminRoute && <Footer />}
//     </>
//   )
// }

// export default App
// import React from 'react'

// import Navbar from './components/Navbar'
// import Footer from './components/Footer'

// import {
//   Route,
//   Routes,
//   useLocation
// } from 'react-router-dom'


// import Home from './pages/Home'
// import Movies from './pages/Movies'
// import MovieDeatils from './pages/MovieDeatils'
// import SeatLayout from './pages/SeatLayout'
// import MyBookings from './pages/MyBookings'
// import Favourite from './pages/Favourite'
// import RideBooking from './pages/RideBooking'
// import Payment from './pages/Payment'

// import { Toaster } from 'react-hot-toast'


// import LayOut from './pages/admin/LayOut'
// import Dashboard from './pages/admin/Dashboard'
// import AddShow from './pages/admin/AddShow'
// import ListShow from './pages/admin/ListShow'
// import ListBooking from './pages/admin/ListBooking'


// const App = () => {

//   const location = useLocation()

//   const isAdminRoute =
//     location.pathname.startsWith('/admin')


//   return (

//     <>

//       <Toaster
//         position="top-right"
//       />


//       {/* NAVBAR */}

//       {!isAdminRoute && (
//         <Navbar />
//       )}


//       {/* ROUTES */}

//       <Routes>


//         {/* ========================= */}
//         {/* USER ROUTES */}
//         {/* ========================= */}

//         <Route
//           path="/"
//           element={<Home />}
//         />


//         <Route
//           path="/movies"
//           element={<Movies />}
//         />


//         <Route
//           path="/movies/:id"
//           element={<MovieDeatils />}
//         />


//         <Route
//           path="/movies/:id/:date"
//           element={<SeatLayout />}
//         />


//         <Route
//           path="/my-bookings"
//           element={<MyBookings />}
//         />


//         <Route
//           path="/favourite"
//           element={<Favourite />}
//         />


//         {/* ========================= */}
//         {/* RIDE BOOKING */}
//         {/* ========================= */}

//         <Route
//           path="/ride-booking"
//           element={<RideBooking />}
//         />


//         {/* ========================= */}
//         {/* ADMIN */}
//         {/* ========================= */}

//         <Route
//           path="/admin/*"
//           element={<LayOut />}
//         >

//           <Route
//             index
//             element={<Dashboard />}
//           />

//           <Route
//             path="add-shows"
//             element={<AddShow />}
//           />

//           <Route
//             path="list-shows"
//             element={<ListShow />}
//           />

//           <Route
//             path="list-bookings"
//             element={<ListBooking />}
//           />

//         </Route>


//       </Routes>


//       {/* FOOTER */}

//       {!isAdminRoute && (
//         <Footer />
//       )}

//     </>

//   )
// }


// export default App


// import React from 'react'

// import Navbar from './components/Navbar'
// import Footer from './components/Footer'

// import {
//   Route,
//   Routes,
//   useLocation
// } from 'react-router-dom'

// // ===============================
// // USER PAGES
// // ===============================

// import Home from './pages/Home'
// import Movies from './pages/Movies'
// import MovieDeatils from './pages/MovieDeatils'
// import SeatLayout from './pages/SeatLayout'
// import MyBookings from './pages/MyBookings'
// import Favourite from './pages/Favourite'
// import RideBooking from './pages/RideBooking'
// import Payment from './pages/Payment'

// // ===============================
// // ADMIN PAGES
// // ===============================

// import LayOut from './pages/admin/LayOut'
// import Dashboard from './pages/admin/Dashboard'
// import AddShow from './pages/admin/AddShow'
// import ListShow from './pages/admin/ListShow'
// import ListBooking from './pages/admin/ListBooking'

// // ===============================
// // TOAST
// // ===============================

// import { Toaster } from 'react-hot-toast'


// const App = () => {

//   const location = useLocation()

//   const isAdminRoute =
//     location.pathname.startsWith('/admin')


//   return (

//     <>

//       {/* =============================== */}
//       {/* TOASTER */}
//       {/* =============================== */}

//       <Toaster
//         position="top-right"
//         reverseOrder={false}
//       />


//       {/* =============================== */}
//       {/* NAVBAR */}
//       {/* =============================== */}

//       {!isAdminRoute && (
//         <Navbar />
//       )}


//       {/* =============================== */}
//       {/* ROUTES */}
//       {/* =============================== */}

//       <Routes>


//         {/* ================================= */}
//         {/* USER ROUTES */}
//         {/* ================================= */}

//         <Route
//           path="/"
//           element={<Home />}
//         />


//         <Route
//           path="/movies"
//           element={<Movies />}
//         />


//         <Route
//           path="/movies/:id"
//           element={<MovieDeatils />}
//         />


//         <Route
//           path="/movies/:id/:date"
//           element={<SeatLayout />}
//         />


//         <Route
//           path="/my-bookings"
//           element={<MyBookings />}
//         />


//         <Route
//           path="/favourite"
//           element={<Favourite />}
//         />


//         {/* ================================= */}
//         {/* RIDE BOOKING */}
//         {/* ================================= */}

//         <Route
//           path="/ride-booking"
//           element={<RideBooking />}
//         />


//         {/* ================================= */}
//         {/* PAYMENT */}
//         {/* ================================= */}

//         <Route
//           path="/payment"
//           element={<Payment />}
//         />


//         {/* ================================= */}
//         {/* ADMIN ROUTES */}
//         {/* ================================= */}

//         <Route
//           path="/admin/*"
//           element={<LayOut />}
//         >

//           <Route
//             index
//             element={<Dashboard />}
//           />


//           <Route
//             path="add-shows"
//             element={<AddShow />}
//           />


//           <Route
//             path="list-shows"
//             element={<ListShow />}
//           />


//           <Route
//             path="list-bookings"
//             element={<ListBooking />}
//           />

//         </Route>

//       </Routes>


//       {/* =============================== */}
//       {/* FOOTER */}
//       {/* =============================== */}

//       {!isAdminRoute && (
//         <Footer />
//       )}

//     </>

//   )
// }


// export default App
// import BookingSuccess from './pages/BookingSuccess'
// import React from 'react'

// import Navbar from './components/Navbar'
// import Footer from './components/Footer'

// import {
//   Route,
//   Routes,
//   useLocation
// } from 'react-router-dom'

// // ===============================
// // USER PAGES
// // ===============================

// import Home from './pages/Home'
// import Movies from './pages/Movies'
// import MovieDeatils from './pages/MovieDeatils'
// import SeatLayout from './pages/SeatLayout'
// import MyBookings from './pages/MyBookings'
// import Favourite from './pages/Favourite'

// // Ride Booking
// import RideBooking from './pages/RideBooking'

// // Payment
// import Payment from './pages/Payment'

// // ===============================
// // ADMIN PAGES
// // ===============================

// import LayOut from './pages/admin/LayOut'
// import Dashboard from './pages/admin/Dashboard'
// import AddShow from './pages/admin/AddShow'
// import ListShow from './pages/admin/ListShow'
// import ListBooking from './pages/admin/ListBooking'

// // ===============================
// // TOAST
// // ===============================

// import { Toaster } from 'react-hot-toast'


// const App = () => {

//   const location = useLocation()

//   // Check if current page is an admin page
//   const isAdminRoute =
//     location.pathname.startsWith('/admin')


//   return (

//     <>

//       {/* ================================= */}
//       {/* TOASTER */}
//       {/* ================================= */}

//       <Toaster
//         position="top-right"
//         reverseOrder={false}
//       />


//       {/* ================================= */}
//       {/* NAVBAR */}
//       {/* ================================= */}

//       {!isAdminRoute && (
//         <Navbar />
//       )}


//       {/* ================================= */}
//       {/* ROUTES */}
//       {/* ================================= */}

//       <Routes>


//         {/* ================================= */}
//         {/* USER ROUTES */}
//         {/* ================================= */}


//         {/* HOME */}

//         <Route
//           path="/"
//           element={<Home />}
//         />


//         {/* MOVIES */}

//         <Route
//           path="/movies"
//           element={<Movies />}
//         />


//         {/* MOVIE DETAILS */}

//         <Route
//           path="/movies/:id"
//           element={<MovieDeatils />}
//         />


//         {/* SEAT LAYOUT */}

//         <Route
//           path="/movies/:id/:date"
//           element={<SeatLayout />}
//         />


//         {/* MY BOOKINGS */}

//         <Route
//           path="/my-bookings"
//           element={<MyBookings />}
//         />


//         {/* FAVOURITE */}

//         <Route
//           path="/favourite"
//           element={<Favourite />}
//         />


//         {/* ================================= */}
//         {/* 🚕 RIDE BOOKING */}
//         {/* ================================= */}

//         <Route
//           path="/ride-booking"
//           element={<RideBooking />}
//         />


//         {/* ================================= */}
//         {/* 💳 PAYMENT */}
//         {/* ================================= */}

//         <Route
//           path="/payment"
//           element={<Payment />}
//         />


//         {/* ================================= */}
//         {/* ADMIN ROUTES */}
//         {/* ================================= */}

//         <Route
//           path="/admin/*"
//           element={<LayOut />}
//         >

//           {/* Admin Dashboard */}

//           <Route
//             index
//             element={<Dashboard />}
//           />


//           {/* Add Shows */}

//           <Route
//             path="add-shows"
//             element={<AddShow />}
//           />


//           {/* List Shows */}

//           <Route
//             path="list-shows"
//             element={<ListShow />}
//           />


//           {/* List Bookings */}

//           <Route
//             path="list-bookings"
//             element={<ListBooking />}
//           />

//         </Route>


//       </Routes>
//       <Route
//   path="/booking-success"
//   element={<BookingSuccess />}
// />


//       {/* ================================= */}
//       {/* FOOTER */}
//       {/* ================================= */}

//       {!isAdminRoute && (
//         <Footer />
//       )}

//     </>

//   )
// }


// export default App
import React from 'react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom'

// ===============================
// USER PAGES
// ===============================

import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDeatils from './pages/MovieDeatils'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favourite from './pages/Favourite'

// Ride Booking
import RideBooking from './pages/RideBooking'

// Payment
import Payment from './pages/Payment'

// Booking Success
import BookingSuccess from './pages/BookingSuccess'

// ===============================
// ADMIN PAGES
// ===============================

import LayOut from './pages/admin/LayOut'
import Dashboard from './pages/admin/Dashboard'
import AddShow from './pages/admin/AddShow'
import ListShow from './pages/admin/ListShow'
import ListBooking from './pages/admin/ListBooking'

// ===============================
// TOAST
// ===============================

import { Toaster } from 'react-hot-toast'


const App = () => {

  const location = useLocation()

  // Check if current page is an admin page
  const isAdminRoute =
    location.pathname.startsWith('/admin')


  return (

    <>

      {/* ================================= */}
      {/* TOASTER */}
      {/* ================================= */}

      <Toaster
        position="top-right"
        reverseOrder={false}
      />


      {/* ================================= */}
      {/* NAVBAR */}
      {/* ================================= */}

      {!isAdminRoute && (
        <Navbar />
      )}


      {/* ================================= */}
      {/* ROUTES */}
      {/* ================================= */}

      <Routes>


        {/* ================================= */}
        {/* USER ROUTES */}
        {/* ================================= */}


        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* MOVIES */}

        <Route
          path="/movies"
          element={<Movies />}
        />


        {/* MOVIE DETAILS */}

        <Route
          path="/movies/:id"
          element={<MovieDeatils />}
        />


        {/* SEAT LAYOUT */}

        <Route
          path="/movies/:id/:date"
          element={<SeatLayout />}
        />


        {/* MY BOOKINGS */}

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />


        {/* FAVOURITE */}

        <Route
          path="/favourite"
          element={<Favourite />}
        />


        {/* ================================= */}
        {/* 🚕 RIDE BOOKING */}
        {/* ================================= */}

        <Route
          path="/ride-booking"
          element={<RideBooking />}
        />


        {/* ================================= */}
        {/* 💳 PAYMENT */}
        {/* ================================= */}

        <Route
          path="/payment"
          element={<Payment />}
        />


        {/* ================================= */}
        {/* 🎟 BOOKING SUCCESS */}
        {/* ================================= */}

        <Route
          path="/booking-success"
          element={<BookingSuccess />}
        />


        {/* ================================= */}
        {/* ADMIN ROUTES */}
        {/* ================================= */}

        <Route
          path="/admin/*"
          element={<LayOut />}
        >

          {/* Admin Dashboard */}

          <Route
            index
            element={<Dashboard />}
          />


          {/* Add Shows */}

          <Route
            path="add-shows"
            element={<AddShow />}
          />


          {/* List Shows */}

          <Route
            path="list-shows"
            element={<ListShow />}
          />


          {/* List Bookings */}

          <Route
            path="list-bookings"
            element={<ListBooking />}
          />

        </Route>


      </Routes>


      {/* ================================= */}
      {/* FOOTER */}
      {/* ================================= */}

      {!isAdminRoute && (
        <Footer />
      )}

    </>

  )
}


export default App