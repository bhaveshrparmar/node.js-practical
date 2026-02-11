const Recipe = require("../Model/recipe.model");
const { createModel, viewModel, updateModel, trashModel } = require("../utils/commonModel");
const path = require('path');

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, cookTime, servings, difficulty, cuisine } = req.body;
    const imageUrl = req.file ? req.file.filename : null;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({
        success: false,
        message: "Title, ingredients, and instructions are required"
      });
    }

    const result = await createModel(
      Recipe,
      { 
        title, 
        description, 
        ingredients: JSON.parse(ingredients), 
        instructions: JSON.parse(instructions),
        cookTime,
        servings,
        difficulty,
        cuisine,
        imageUrl,
        author: req.user?.id
      },
      "Recipe created successfully"
    );
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const { cuisine, difficulty, search } = req.query;
    let query = {};

    if (cuisine) query.cuisine = cuisine;
    if (difficulty) query.difficulty = difficulty;
    if (search) query.title = { $regex: search, $options: 'i' };

    const recipes = await Recipe.find(query).populate('author', 'name');
    
    res.json({
      success: true,
      count: recipes.length,
      recipes
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single recipe
exports.getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate('author', 'name avatar');

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found"
      });
    }

    res.json({
      success: true,
      recipe,
      message: "Recipe details retrieved"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update recipe
exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, instructions, cookTime, servings, difficulty, cuisine } = req.body;
    const imageUrl = req.file ? req.file.filename : undefined;

    const updateData = { title, description, cookTime, servings, difficulty, cuisine };
    if (ingredients) updateData.ingredients = JSON.parse(ingredients);
    if (instructions) updateData.instructions = JSON.parse(instructions);
    if (imageUrl) updateData.imageUrl = imageUrl;

    const recipe = await updateModel(Recipe, id, updateData, "Recipe updated successfully");
    res.json(recipe)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await trashModel(Recipe, id, "Recipe deleted successfully");
    res.json(recipe)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Search recipes
exports.searchRecipes = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { cuisine: { $regex: q, $options: 'i' } }
      ]
    });

    res.json({
      success: true,
      count: recipes.length,
      recipes
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get recipes by cuisine
exports.getRecipesByCuisine = async (req, res) => {
  try {
    const { cuisine } = req.params;
    const recipes = await Recipe.find({ cuisine });

    res.json({
      success: true,
      count: recipes.length,
      recipes
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
