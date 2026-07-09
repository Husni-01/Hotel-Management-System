const User = require("../models/User")
const createToken = require("../utils/createToken")


function publicUser(user) {
    return { id: user._id, name: user.name, email: user.name, role: user.role }
}

// sign-up
async function register(req, res) {
    const { name, email, password } = req.body

    // check if a user exists before saving
    const existingUser = await User.findOne({ email })

    if (existingUser) throw new Error("An account already exists!")

    // role - user
    const user = await User.create({ name, email, password })

    // token creation
    const token = createToken(user)

    res.status(201).json({
        token,
        user: publicUser(user)
    })

}

// sign-in
async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) throw new Error("Email and password are required!")

    const user = await User.findOne({ email: email.toLowerCase() }).select('password')

    if (!user || !(await user.comparePassword())) {
        throw new Error("Invalid email or password")
    }

    // token creation
    const token = createToken(user)

    res.json({
        token,
        user: publicUser(user)
    })
}

module.exports = { register, login }

