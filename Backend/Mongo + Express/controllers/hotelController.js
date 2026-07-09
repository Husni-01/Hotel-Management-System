// model
const Hotel = require("../models/Hotel")

// controller functions
// GET - fetch all hotels
// /api/hotels
async function getHotels(req, res) {
    const {
        city,
        category,
        minRating,
        minPrice,
        maxPrice,
        amenities,
        search,
        sort = "-createdAt",
        page = 1,
        limit = 10
    } = req.query;

    const filter = { isActive: true };

    if (city) filter["location.city"] = new RegExp(city, "i");
    if (category) filter.category = category;
    if (minRating !== undefined) filter.rating = { $gte: Number(minRating) }; // >=

    if (minPrice !== undefined || maxPrice !== undefined) {
        filter.rooms = {
            $elemMatch: {
                ...(minPrice !== undefined && { pricePerNight: { $gte: Number(minPrice) } }),
                ...(maxPrice !== undefined && {
                    pricePerNight: {
                        ...(minPrice !== undefined && { $gte: Number(minPrice) }),
                        $lte: Number(maxPrice)
                    }
                }),
                availableRooms: { $gt: 0 }
            }
        };
    }

    if (amenities) {
        filter.amenities = { $all: amenities.split(",").map((item) => item.trim()) };
    }

    if (search) {
        filter.$text = { $search: search };
    }

    const pageNumber = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 10, 1), 100);
    const skip = (pageNumber - 1) * pageSize;

    const total = await Hotel.countDocuments()

    const items = await
        Hotel.find(filter)
            .select("name slug location category rating reviewCount amenities rooms minimumRoomPrice _id")
            .sort(sort)
            .skip(skip)
            .limit(pageSize)


    res.json({
        page: pageNumber,
        limit: pageSize,
        total,
        pages: Math.ceil(total / pageSize),
        items
    });
}

// /api/hotels/:id
async function getHotelById(req, res) {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) throw new AppError("Hotel not found", 404);
    res.json(hotel);
}

// /api/hotels
async function createHotel(req, res) {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
}

// /api/hotels/:id
async function updateHotel(req, res) {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!hotel) throw new AppError("Hotel not found", 404);
    res.json(hotel);
}

// /api/hotels/:id
async function deleteHotel(req, res) {
    // soft delete
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, { isActive: false });

    if (!hotel) throw new AppError("Hotel not found", 404);
    res.json({ message: "Hotel deleted", data: hotel });
}


module.exports = {
    getHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel
};