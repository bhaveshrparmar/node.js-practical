const bcrypt = require("bcryptjs")

exports.HashToPlain = async (password, hash_pass) => {
    return await bcrypt.compare(password, hash_pass)
}

exports.PlainToHash = async (password) => {
    const solt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, solt)
}

// Alias functions for compatibility
exports.comparePassword = async (password, hash_pass) => {
    return await bcrypt.compare(password, hash_pass)
}

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}