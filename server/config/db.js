import mongoose from "mongoose";

// function to connect to the mongodb data
const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('Database Connected');
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/JOB`);
};

export default connectDB;
