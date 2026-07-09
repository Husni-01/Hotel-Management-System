// api/hotels

const express = require("express")

// middleware
const requireAuth = require("../middleware/authMiddleware")

// import controllers
const {
    getHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel
} = require("../controllers/hotelController")

// route -> contoller

const router = express.Router()

// get all - api/hotels/
router.route("/").get(getHotels).post(requireAuth, createHotel)

// /api/hotels GET -> Get all hotels
// /api/hotels POST -> Save hotel

// get by id
// api/hotels/129381092
router.route("/:id").get(getHotelById).put(requireAuth, updateHotel).delete(requireAuth, deleteHotel)

module.exports = router;