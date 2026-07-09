const jwt = require("jsonwebtoken")
const User = require("../models/User")

async function requireAuth(req, res, next) {
    const header = req.headers.authorization || ''

    if (!header.startsWith("Bearer ")) {
        throw new Error("Authentication required")
    }

    const token = header.slice(7)
    let payload
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch {
        throw new Error("Invalid or Expired Token")
    }

    const user = await User.findById(payload.sub)
    if (!user) throw new Error("User no longer exists...")

    req.user = user

    next()
}

module.exports = requireAuth