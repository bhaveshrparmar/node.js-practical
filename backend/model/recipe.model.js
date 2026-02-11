const mongoose = require("mongoose")

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Recipe title is required!"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Recipe description is required!"]
    },
    ingredients: {
        type: String,
        required: [true, "Ingredients are required!"]
    },
    category: {
        type: String,
        enum: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Beverage"],
        default: "Lunch"
    },
    cookingTime: {
        type: String,
        required: [true, "Cooking time is required!"]
    },
    servings: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

const Recipe = mongoose.model("Recipe", RecipeSchema)
module.exports = Recipe