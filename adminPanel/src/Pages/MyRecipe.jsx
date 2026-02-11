import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../Layout/Api";
import "./MyRecipes.css";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function fetchMyRecipes() {
    try {
      setLoading(true);
      const res = await Api.get("/recipes/my-recipes");
      if (res.data.success) {
        setRecipes(res.data.recipes);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error("Failed to fetch recipes:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  async function deleteRecipe(id) {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        const res = await Api.delete(`/recipes/${id}`);
        if (res.data.success) {
          fetchMyRecipes();
        }
      } catch (error) {
        alert("Failed to delete recipe!");
      }
    }
  }

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  return (
    <div className="my-recipes-container">
      <div className="container py-5">
        <div className="recipes-header">
          <h1>📚 My Recipes</h1>
          <Link to="/add-recipe" className="btn btn-add-recipe">
            ➕ Add New Recipe
          </Link>
        </div>

        {loading && <p className="text-center">Loading your recipes...</p>}

        {recipes.length === 0 && !loading && (
          <div className="no-recipes">
            <p>You haven't shared any recipes yet! 👨‍🍳</p>
            <Link to="/add-recipe" className="btn btn-recipe-link">
              Create your first recipe
            </Link>
          </div>
        )}

        <div className="recipes-table">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-row">
              <div className="recipe-info">
                <h5>{recipe.title}</h5>
                <p className="recipe-details">
                  <span className="detail-badge">{recipe.category}</span>
                  <span className="detail-meta">⏱️ {recipe.cookingTime}</span>
                  <span className="detail-meta">
                    🍴 Serves {recipe.servings}
                  </span>
                </p>
                <p className="recipe-desc">{recipe.description}</p>
              </div>
              <div className="recipe-actions">
                <Link
                  to={`/edit-recipe/${recipe._id}`}
                  className="btn btn-sm btn-warning"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteRecipe(recipe._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
