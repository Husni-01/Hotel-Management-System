const Hotel = require("../models/Hotel");
const Review = require("../models/Review");

async function createReview(req, res) {
    const hotel = await Hotel.findById(req.body.hotel);
    if (!hotel) throw new AppError("Hotel not found", 404);

    const review = await Review.create(req.body);

    const stats = await Review.aggregate([
        { $match: { hotel: hotel._id } },
        {
            $group: {
                _id: "$hotel",
                averageRating: { $avg: "$rating" },
                reviewCount: { $sum: 1 }
            }
        }
    ]);

    hotel.rating = Number((stats[0]?.averageRating || 0).toFixed(1));
    hotel.reviewCount = stats[0]?.reviewCount || 0;
    await hotel.save();

    res.status(201).json(review);
}

async function getReviews(req, res) {
    const filter = {};
    if (req.query.hotel) filter.hotel = req.query.hotel;

    // reference populate
    const reviews = await Review.find(filter)
        .populate("hotel")
        // desc
        .sort({ createdAt: -1 });

    res.json(reviews);
}

module.exports = {
    createReview,
    getReviews
};