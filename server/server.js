
// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/db.js';

// const app = express();
// const port = 3000;

// await connectDB()

// app.use(express.json());
// app.use(cors());

// // ✅ FIXED HERE
// app.get('/', (req, res) => res.send('Server is Live!'));

// app.listen(port, () => 
//   console.log(`Server listening at http://localhost:${port}`)
// );


// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/db.js';
// import { clerkMiddleware } from '@clerk/express'
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js"

// const app = express();
// const port = 3000;

// const startServer = async () => {
//   try {
//     await connectDB(); // DB connect first

//     app.use(express.json());
//     app.use(cors());
//     app.use(clerkMiddleware())

//     app.get('/', (req, res) => res.send('Server is Live!'));

//     app.use('/api/inngest', serve({ client: inngest, functions }))

//     // app.listen(port, () => {
//     //   console.log(`🚀 Server running at http://localhost:${port}`);
//     // });

//   } catch (error) {
//     console.log("❌ Server failed to start:", error.message);
//   }
// };

// startServer();

// export default app;


// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/db.js';
// import { clerkMiddleware } from '@clerk/express'

// const app = express();
// const port = 3000;

// const startServer = async () => {
//   try {
//     console.log("Starting server..."); // 👈 debug

//     await connectDB();

//     app.use(express.json());
//     app.use(cors());

//     app.get('/', (req, res) => {
//       res.send("Server is Live!");
//     });

//     app.listen(port, () => {
//       console.log(`🚀 Server running on http://localhost:${port}`);
//     });

//   } catch (error) {
//     console.log("❌ Error:", error);
//   }
// };

// startServer(); // 👈 VERY IMPORTANT


// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/db.js';
// import { clerkMiddleware } from '@clerk/express';
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js"

// const app = express();
// const port = 3000;

// const startServer = async () => {
//   try {
//     console.log("Starting server...");

//     await connectDB();

//     app.use(express.json());
//     app.use(cors());
//     app.use(clerkMiddleware()); // ✅ added

//     app.get('/', (req, res) => {
//       res.send("Server is Live!");
//     });

//     app.listen(port, () => {
//       console.log(`🚀 Server running on http://localhost:${port}`);
//     });

//   } catch (error) {
//     console.log("❌ Error:", error);
//   }
// };

// startServer();  

// import bookingRoutes from "./routes/bookingRoutes.js";
// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/db.js';
// import { clerkMiddleware } from '@clerk/express';
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js";

// app.use(clerkMiddleware());
// app.use("/api/bookings", bookingRoutes);
// const app = express();
// const port = 3000;

// const startServer = async () => {
//   try {
//     console.log("Starting server...");

//     await connectDB();
//     console.log("✅ DB Connected");

//     app.use(express.json());
//     app.use(cors());
//     app.use(clerkMiddleware());

//     // ✅ VERY IMPORTANT (you missed this)
//     app.use("/api/inngest", serve({ client: inngest, functions }));

//     app.get('/', (req, res) => {
//       res.send("Server is Live!");
//     });

//     app.listen(port, () => {
//       console.log(`🚀 Server running on http://localhost:${port}`);
//     });

//   } catch (error) {
//     console.log("❌ Error:", error);
//   }
// };

// startServer();


import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";

import { clerkMiddleware } from "@clerk/express";

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

import bookingRoutes from "./routes/bookingRoutes.js";




const app = express();

const port = process.env.PORT || 3000;


// ======================================================
// START SERVER
// ======================================================

const startServer = async () => {

  try {

    console.log("Starting server...");


    // ==================================================
    // DATABASE
    // ==================================================

    await connectDB();

    console.log("✅ DB Connected");


    // ==================================================
    // MIDDLEWARE
    // ==================================================

    app.use(express.json());

    app.use(cors());

    app.use(clerkMiddleware());


    // ==================================================
    // BOOKING ROUTES
    // ==================================================

    app.use(
      "/api/bookings",
      bookingRoutes
    );


    // ==================================================
    // INNGEST
    // ==================================================

    app.use(
      "/api/inngest",
      serve({
        client: inngest,
        functions
      })
    );


    // ==================================================
    // TEST ROUTE
    // ==================================================

    app.get("/", (req, res) => {

      res.send("Server is Live!");

    });


    // ==================================================
    // START SERVER
    // ==================================================

    app.listen(port, () => {

      console.log(
        `🚀 Server running on http://localhost:${port}`
      );

    });

  } catch (error) {

    console.log(
      "❌ Error:",
      error
    );

  }

};


startServer();
