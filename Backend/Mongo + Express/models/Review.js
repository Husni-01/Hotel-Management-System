const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    // hotel: hotel id -> referencing
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    },
    authorName: { type: String, required: true },
    // 1 - 5
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true }
}, {
    timestamps: true
})

reviewSchema.index({ hotel: 1, createdAt: -1 })

// Review -> review
module.exports = mongoose.model("Review", reviewSchema)

// { hotel: 1087230917209312, authorName: Dumindu, rating:5, comment: 'Nice Hotel' }
// { hotel: {}, authorName: Dumindu, rating:5, comment: 'Nice Hotel' }
// 1087230917209312 --> Hotel Sea Breeze