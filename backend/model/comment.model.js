const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Comment text is required!"],
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true
    }
}, { timestamps: true })

const Comment = mongoose.model("Comment", CommentSchema)
module.exports = Comment