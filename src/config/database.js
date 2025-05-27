
import mongoose from "mongoose";

export async function connectDB(){
    await mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("✅ MongoDB Atlas connected!"))
        .catch((error) => {
            console.error("MongoDB connection error:", error.message);
            process.exit(1);
        })
};