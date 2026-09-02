// import mongoose from "mongoose";

// const connectDB = async () =>{
//     try{
//         mongoose.connection.on('connected', ()=> console.log('Database connected'));
//         await mongoose.connect(`${process.env.MONGODB_URI}/moviebooking`)

//     }catch(error){
//         console.log(error.message)

//     }
    
// }


// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "moviebooking",
    });

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.log("❌ MongoDB connection failed:");
    console.log(error.message);
    throw error;
  }
};

export default connectDB;