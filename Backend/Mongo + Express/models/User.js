const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12)
})

// compare passwords
userSchema.methods.comparePassword = function (pwd) {
    return bcrypt.compare(pwd, this.password)
}

module.exports = mongoose.model("User", userSchema)