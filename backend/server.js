const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const dbConfig = require("./Config/db")
dbConfig()
const port = process.env.PORT || 8000;
const cors = require("cors")
const session = require("cookie-session")
const cookieParser = require("cookie-parser")
const path = require("path")

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Routes Import
const recipeRoute = require('./Routes/recipe.route')
const userRoute = require("./Routes/user.route")

// CORS Configuration
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({
    origin: [corsOrigin],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// Session Configuration
app.use(session({
    name: "rasipe_session",
    keys: [process.env.JWT_SECRET || "secretKey"],
    maxAge: 60 * 60 * 1000
}));

// Routes
app.use('/api/recipe', recipeRoute)
app.use('/api/user', userRoute)

// Health Check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🍳 Rasipe Sharing Platform API is running!",
        version: "1.0.0"
    });
});

// Health Check Endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Server error",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(port, () => {
    console.log(`🍳 Rasipe Server running at http://localhost:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 