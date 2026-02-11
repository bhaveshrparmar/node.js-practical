const Recipe = require("../model/recipe.model")

exports.createRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, category, cookingTime, servings } = req.body

        if (!title || !description || !ingredients) {
            return res.json({
                success: false,
                message: "Title, description, and ingredients are required!"
            })
        }

        const recipe = await Recipe.create({
            title,
            description,
            ingredients,
            category,
            cookingTime,
            servings,
            user: req.userId
        })

        res.json({
            success: true,
            message: "Recipe created successfully!",
            recipe
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Failed to create recipe!"
        })
    }
}

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate("user", "username email")

        res.json({
            success: true,
            recipes
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Failed to fetch recipes!"
        })
    }
}

exports.getMyRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.userId }).populate("user", "username email")

        res.json({
            success: true,
            recipes
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Failed to fetch your recipes!"
        })
    }
}

exports.getRecipeById = async (req, res) => {
    try {
        const { id } = req.params
        const recipe = await Recipe.findById(id).populate("user", "username email")

        if (!recipe) {
            return res.json({
                success: false,
                message: "Recipe not found!"
            })
        }

        res.json({
            success: true,
            recipe
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Failed to fetch recipe!"
        })
    }
}

exports.updateRecipe = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, ingredients, category, cookingTime, servings } = req.body

        const recipe = await Recipe.findById(id)
        if (!recipe) {
            return res.json({
                success: false,
                message: "Recipe not found!"
            })
        }


        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { title, description, ingredients, category, cookingTime, servings },
            { new: true, runValidators: true }
        )

        res.json({
            success: true,
            message: "Recipe updated successfully!",
            recipe: updatedRecipe
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Failed to update recipe!"
        })
    }
}

exports.deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params

        const recipe = await Recipe.findById(id)
        if (!recipe) {
            return res.json({
                success: false,
                message: "Recipe not found!"
            })
        }

        await Recipe.findByIdAndDelete(id)

        res.json({
            success: true,
            message: "Recipe deleted successfully!"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Failed to delete recipe!"
        })
    }
}