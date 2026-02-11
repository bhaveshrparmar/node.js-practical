const jwt = require("jsonwebtoken")

exports.verifyToken = (req, res, next) => {
    try {
        // Try to get token from Authorization header first (Bearer token)
        let token = null;
        const authHeader = req.headers.authorization;
        
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.slice(7); // Remove 'Bearer ' prefix
        } else {
            // Fall back to cookies
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided. You are not authenticated!"
            })
        }

        const secret = process.env.JWT_SECRET || "mysecretkey";
        const verifytoken = jwt.verify(token, secret)
        
        if (!verifytoken) {
            return res.status(401).json({
                success: false,
                message: "Invalid token. You are not authenticated!"
            })
        }

        req.user = verifytoken
        next()

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token has expired!"
            })
        }
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}