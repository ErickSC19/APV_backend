import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let URI = process.env.MONGO_URI;
    if (process.env.DEV) {
      URI = process.env.MONGO_LOCAL;
    }
    const db = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`MongoDB connected at: ${url}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
