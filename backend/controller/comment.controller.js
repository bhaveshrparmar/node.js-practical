const Comment = require("../model/comment.model")
const Recipe = require("../model/recipe.model")

exports.addComment = async (req, res) => {
    try {
        const { text, recipeId } = req.body

        if (!text || !recipeId) {
            return res.json({
                success: false,
                message: "Comment text and recipe ID are required!"
            })
        }

        const recipe = await Recipe.findById(recipeId)
        if (!recipe) {
            return res.json({
                success: false,
                message: "Recipe not found!"
            })
        }

        const comment = await Comment.create({
            text,
            recipe: recipeId,
            user: req.userId
        })

        res.json({
            success: true,
            message: "Comment added successfully!",
            comment
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Failed to add comment!"
        })
    }
}

exports.getComments = async (req, res) => {
    try {
        const { recipeId } = req.params

        const comments = await Comment.find({ recipe: recipeId })
            .populate("user", "username email")
            .sort({ createdAt: -1 })

        res.json({
            success: true,
            comments
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Failed to fetch comments!"
        })
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params

        const comment = await Comment.findById(id)
        if (!comment) {
            return res.json({
                success: false,
                message: "Comment not found!"
            })
        }

        await Comment.findByIdAndDelete(id)

        res.json({
            success: true,
            message: "Comment deleted successfully!"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Failed to delete comment!"
        })
    }
}
