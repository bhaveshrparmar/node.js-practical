import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function CreateRecipe() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [{ item: '', quantity: '', unit: '' }],
    instructions: [''],
    cookTime: '',
    servings: 1,
    difficulty: 'Medium',
    cuisine: 'Other',
    imageUrl: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, field, value) => {
    const ingredients = [...formData.ingredients];
    ingredients[index] = { ...ingredients[index], [field]: value };
    setFormData({ ...formData, ingredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { item: '', quantity: '', unit: '' }]
    });
  };

  const removeIngredient = (index) => {
    const ingredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients });
  };

  const handleInstructionChange = (index, value) => {
    const instructions = [...formData.instructions];
    instructions[index] = value;
    setFormData({ ...formData, instructions });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, '']
    });
  };

  const removeInstruction = (index) => {
    const instructions = formData.instructions.filter((_, i) => i !== index);
    setFormData({ ...formData, instructions });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageUrl: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('ingredients', JSON.stringify(formData.ingredients));
      data.append('instructions', JSON.stringify(formData.instructions));
      data.append('cookTime', formData.cookTime);
      data.append('servings', formData.servings);
      data.append('difficulty', formData.difficulty);
      data.append('cuisine', formData.cuisine);
      
      if (formData.imageUrl) {
        data.append('imageUrl', formData.imageUrl);
      }

      const response = await axiosInstance.post('/recipe/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        alert('Recipe created successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('Failed to create recipe');
    }
  };

  return (
    <div className="container mt-4">
      <h2>🍳 Create New Recipe</h2>
      
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Recipe Title *</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Cuisine</label>
            <select
              className="form-control"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleInputChange}
            >
              <option>Indian</option>
              <option>Italian</option>
              <option>Chinese</option>
              <option>Mexican</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Difficulty</label>
            <select
              className="form-control"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Cook Time (minutes)</label>
            <input
              type="number"
              className="form-control"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Servings</label>
            <input
              type="number"
              className="form-control"
              name="servings"
              value={formData.servings}
              onChange={handleInputChange}
              min="1"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Recipe Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <h5>Ingredients *</h5>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="row mb-2">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item"
                  value={ingredient.item}
                  onChange={(e) => handleIngredientChange(index, 'item', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn-danger w-100"
                  onClick={() => removeIngredient(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={addIngredient}
          >
            + Add Ingredient
          </button>
        </div>

        <div className="mb-4">
          <h5>Instructions *</h5>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="row mb-2">
              <div className="col-md-11">
                <textarea
                  className="form-control"
                  placeholder={`Step ${index + 1}`}
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  required
                />
              </div>
              <div className="col-md-1">
                <button
                  type="button"
                  className="btn btn-danger w-100"
                  onClick={() => removeInstruction(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={addInstruction}
          >
            + Add Step
          </button>
        </div>

        <button type="submit" className="btn btn-primary btn-lg w-100">
          Create Recipe
        </button>
      </form>
    </div>
  );
}
