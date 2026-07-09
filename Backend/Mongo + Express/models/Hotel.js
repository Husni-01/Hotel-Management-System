const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["single", "double", "suite", "family"],
        required: true
    },
    pricePerNight: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    availableRooms: { type: Number, required: true, min: 0 }
}, { _id: false });

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Hotel name is required"],
        trim: true,
        minlength: [3, "Hotel name must contain at least 3 characters"]
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    location: {
        city: { type: String, required: true, trim: true },
        district: { type: String, required: true, trim: true },
        country: { type: String, default: "Sri Lanka" }
    },
    category: {
        type: String,
        enum: ["budget", "mid-range", "luxury"],
        default: "mid-range"
    },
    description: { type: String, trim: true },
    amenities: [{ type: String, trim: true }],
    rooms: [roomSchema],
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, min: 0, default: 0 },
    // soft delete
    isActive: { type: Boolean, default: true }
}, {
    toJSON: { virtuals: true }
});

// hotelSchema.pre('save', function (next) {
//     console.log('Runs before saving the hotel...')
//     if (this.location.country === 'Sri Lanka') {
//         next()
//     } else {
//         return next(new Error("Country should be Sri Lanka, always"))
//     }
// });

// virtual property for ratingLabel
hotelSchema.virtual('ratingLabel').get(function () {
    if (5 >= this.rating > 4.5) return 'Excellent';
    if (4.5 >= this.rating > 3) return 'Good';
    return 'Average'
})

// 1 -> ascending
// -1 -> descending 
hotelSchema.index({ isActive: 1 })

module.exports = mongoose.model("Hotel", hotelSchema);