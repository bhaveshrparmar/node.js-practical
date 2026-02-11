const mongoose = require("mongoose")

const dbConfig = async () => {
    try {
        const dbUrl = process.env.DB_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/rasipe';
        
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("✓ Database Connected Successfully");
    } catch (err) {
        console.error("✗ Database Connection Error:", err.message);
        process.exit(1);
    }
}

module.exports = dbConfig