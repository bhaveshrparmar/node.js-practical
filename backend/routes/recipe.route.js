const { createRecipe, getAllRecipes, getMyRecipes, getRecipeById, updateRecipe, deleteRecipe } = require("../controller/recipe.controller")
const { verifyAuth } = require("../middleware/verify")

const router = require("express").Router()

router.post("/", verifyAuth, createRecipe)
router.get("/", getAllRecipes)
router.get("/my-recipes", verifyAuth, getMyRecipes)
router.get("/:id", getRecipeById)
router.put("/:id", verifyAuth, updateRecipe)
router.delete("/:id", verifyAuth, deleteRecipe)

module.exports = router