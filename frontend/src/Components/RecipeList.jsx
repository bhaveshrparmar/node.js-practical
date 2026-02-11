import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    cuisine: '',
    difficulty: '',
    search: ''
  });

  useEffect(() => {
    fetchRecipes();
  }, [filters]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.cuisine) params.append('cuisine', filters.cuisine);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.search) params.append('search', filters.search);

      const response = await axiosInstance.get(`/recipe?${params}`);
      if (response.data.success) {
        setRecipes(response.data.recipes);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    
    try {
      const response = await axiosInstance.delete(`/recipe/${id}`);
      if (response.data.success) {
        setRecipes(recipes.filter(recipe => recipe._id !== id));
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>🍳 Recipes</h2>
      
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search recipes..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={filters.cuisine}
            onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
          >
            <option value="">All Cuisines</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Mexican">Mexican</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={filters.difficulty}
            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
          >
            <option value="">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe._id} className="col-md-4 mb-4">
                <div className="card h-100">
                  {recipe.imageUrl && (
                    <img src={`http://localhost:8000/uploads/${recipe.imageUrl}`} className="card-img-top" alt={recipe.title} />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">{recipe.description?.substring(0, 100)}...</p>
                    <div className="mb-2">
                      <span className="badge bg-info">{recipe.cuisine}</span>
                      <span className="badge bg-warning">{recipe.difficulty}</span>
                    </div>
                    <p className="text-muted">
                      ⏱️ {recipe.cookTime} mins | 👥 {recipe.servings} servings
                    </p>
                  </div>
                  <div className="card-footer bg-light d-flex gap-2">
                    <button className="btn btn-sm btn-primary flex-grow-1">View</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(recipe._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">No recipes found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
