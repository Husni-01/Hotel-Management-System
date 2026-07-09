const express = require("express");
const { createReview, getReviews } = require("../controllers/reviewController");

const router = express.Router();

router.route("/")
    .get(getReviews)
    .post(createReview);

module.exports = router;