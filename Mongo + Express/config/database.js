const mongoose = require("mongoose")

async function connectDB() {
    if (!process.env.MONGODB_URI) {
        throw new Error("MongoDB URI is missing");
    }

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB Connected')
}

module.exports = connectDB