const { createRecipe, getAllRecipes, getRecipe, updateRecipe, deleteRecipe, searchRecipes, getRecipesByCuisine } = require('../Controller/recipe.controller')
const { verifyToken } = require('../middleware/varifytoken')
const upload = require("../middleware/upload")

const router = require('express').Router()

// Public routes
router.get('/', getAllRecipes)
router.get('/search', searchRecipes)
router.get('/cuisine/:cuisine', getRecipesByCuisine)
router.get('/:id', getRecipe)

// Protected routes (require authentication)
router.post('/', verifyToken, upload.single('imageUrl'), createRecipe)
router.put('/:id', verifyToken, upload.single('imageUrl'), updateRecipe)
router.delete('/:id', verifyToken, deleteRecipe)

module.exports = router
