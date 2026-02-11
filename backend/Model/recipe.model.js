const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
    title: {
        type: String,
        required: [true, "Recipe title is required"],
        trim: true,
        unique: [true, "Recipe title already exists"]
    },
    description: {
        type: String,
        default: ""
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ingredients: [{
        item: String,
        quantity: String,
        unit: String
    }],
    instructions: [String],
    cookTime: {
        type: Number, // in minutes
        default: 0
    },
    servings: {
        type: Number,
        default: 1
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    cuisine: {
        type: String,
        default: "Other"
    },
    imageUrl: {
        type: String,
        default: null
    },
    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: Number,
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    likes: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Recipe = model('Recipe', recipeSchema);
module.exports = Recipe;
