import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}finalhackathon`
    );

    console.log(
      `\n🔗 MongoDB connected !! DB HOST: ${connectionInstance.connection.host} ✅`
    );
  } catch (error) {
    console.log("❌ MONGODB connection FAILED ❌", error);
    process.exit(1);
  }
};
export default connectDB;
