const jwt = require("jsonwebtoken")

exports.verifyAuth = (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.json({
                success: false,
                message: "Please login first!"
            })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
        req.userId = verifyToken.id
        req.userEmail = verifyToken.email
        req.userRole = verifyToken.role

        next()
    } catch (error) {
        return res.json({
            success: false,
            message: "Invalid or expired token!"
        })
    }
}

exports.isAdmin = (req, res, next) => {
    if (req.userRole !== "admin") {
        return res.json({
            success: false,
            message: "Admin access required!"
        })
    }
    next()
}