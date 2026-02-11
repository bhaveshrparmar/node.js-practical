const bcrypt = require("bcryptjs")
const User = require("../model/user.model")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.json({
                success: false,
                message: "All fields are required!"
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json({
                success: false,
                message: "Email or username already exists!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.json({
            success: true,
            message: "User registered successfully!",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Registration failed!"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

      
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and password are required!"
            })
        }

        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.json({
                success: false,
                message: "Invalid email or password!"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.json({
                success: false,
                message: "Invalid email or password!"
            })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "7d" }
        )


        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })

        res.json({
            success: true,
            message: "Login successful!",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Login failed!"
        })
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("token")
        res.json({
            success: true,
            message: "Logout successful!"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Logout failed!"
        })
    }
}

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        res.json({
            success: true,
            user
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Failed to fetch user!"
        })
    }
}