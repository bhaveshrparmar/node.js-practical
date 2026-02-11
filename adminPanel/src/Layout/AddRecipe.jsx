import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Api from "./Api";
import "./AddRecipe.css";

export default function AddRecipe() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const isEditMode = !!id;

  async function fetchRecipe() {
    if (id) {
      try {
        const res = await Api.get(`/recipes/${id}`);
        if (res.data.success) {
          reset(res.data.recipe);
        }
      } catch (error) {
        setServerError("Failed to load recipe!");
      }
    }
  }

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  async function onSubmit(data) {
    setLoading(true);
    setServerError("");
    try {
      const payload = {
        title: data.title,
        description: data.description,
        ingredients: data.ingredients,
        category: data.category,
        cookingTime: data.cookingTime,
        servings: parseInt(data.servings),
      };

      let response;
      if (id) {
        response = await Api.put(`/recipes/${id}`, payload);
        if (response.data.success) {
          navigate("/my-recipes");
        } else {
          setServerError(response.data.message);
        }
      } else {
        response = await Api.post("/recipes", payload);
        if (response.data.success) {
          navigate("/my-recipes");
        } else {
          setServerError(response.data.message);
        }
      }
    } catch (error) {
      setServerError(error.response?.data?.message || "Failed to save recipe!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add-recipe-container">
      <div className="container py-5">
        <div className="add-recipe-card">
          <h2 className="recipe-form-title">
            {isEditMode ? "✏️ Edit Recipe" : "🍳 Add New Recipe"}
          </h2>

          {serverError && (
            <div className="alert alert-danger">{serverError}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-4">
              <label className="form-label">Recipe Title *</label>
              <input
                type="text"
                className="form-control form-input"
                placeholder="Enter recipe title"
                {...register("title", {
                  required: "Recipe title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
              />
              {errors.title && (
                <small className="text-danger">{errors.title.message}</small>
              )}
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Description *</label>
              <textarea
                className="form-control form-input"
                rows="4"
                placeholder="Describe your recipe"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
              ></textarea>
              {errors.description && (
                <small className="text-danger">
                  {errors.description.message}
                </small>
              )}
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Ingredients *</label>
              <textarea
                className="form-control form-input"
                rows="5"
                placeholder="List ingredients (one per line)"
                {...register("ingredients", {
                  required: "Ingredients are required",
                })}
              ></textarea>
              {errors.ingredients && (
                <small className="text-danger">
                  {errors.ingredients.message}
                </small>
              )}
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="form-label">Category *</label>
                <select
                  className="form-control form-input"
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <option value="">Select Category</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Snack">Snack</option>
                  <option value="Beverage">Beverage</option>
                </select>
                {errors.category && (
                  <small className="text-danger">
                    {errors.category.message}
                  </small>
                )}
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">Cooking Time *</label>
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="e.g., 30 mins"
                  {...register("cookingTime", {
                    required: "Cooking time is required",
                  })}
                />
                {errors.cookingTime && (
                  <small className="text-danger">
                    {errors.cookingTime.message}
                  </small>
                )}
              </div>
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Servings *</label>
              <input
                type="number"
                className="form-control form-input"
                placeholder="Number of servings"
                min="1"
                {...register("servings", { required: "Servings is required" })}
              />
              {errors.servings && (
                <small className="text-danger">{errors.servings.message}</small>
              )}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-recipe-submit"
                disabled={loading}
              >
                {loading
                  ? isEditMode
                    ? "Updating..."
                    : "Adding..."
                  : isEditMode
                    ? "Update Recipe"
                    : "Add Recipe"}
              </button>
              <button
                type="button"
                className="btn btn-cancel"
                onClick={() => navigate("/my-recipes")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
