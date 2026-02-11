import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Api from "../Layout/Api";
import "./RecipeList.css";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchRecipes() {
    try {
      setLoading(true);
      const res = await Api.get("/recipes");
      if (res.data.success) {
        setRecipes(res.data.recipes);
      }
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="recipe-list-container">
      <div className="container py-5">
        <NavLink to="/my-recipes" className="btn btn-outline-primary mb-3">
          My Recipes
        </NavLink>
        <h1 className="page-title">🍽️ Discover Recipes</h1>

        {loading && <p className="text-center">Loading recipes...</p>}

        {recipes.length === 0 && !loading && (
          <p className="text-center">
            No recipes found. Be the first to share one! 🎉
          </p>
        )}

        <div className="row g-4">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="col-md-6 col-lg-4">
              <div className="recipe-card">
                <div className="recipe-header">
                  <h5 className="recipe-title">{recipe.title}</h5>
                  <span className="recipe-category">{recipe.category}</span>
                </div>

                <p className="recipe-author">
                  👨‍🍳 By <strong>{recipe.user.username}</strong>
                </p>

                <p className="recipe-description">{recipe.description}</p>

                <div className="recipe-meta">
                  <span className="meta-item">⏱️ {recipe.cookingTime}</span>
                  <span className="meta-item">🍴 Serves {recipe.servings}</span>
                </div>

                <Link
                  to={`/recipe/${recipe._id}`}
                  className="btn btn-recipe w-100 mt-3"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
