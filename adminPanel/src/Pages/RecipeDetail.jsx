import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Api from "../Layout/Api";
import "./RecipeDetail.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
    fetchRecipe();
    fetchComments();
  }, [id]);

  const checkAuth = async () => {
    try {
      const response = await Api.get("/auth/me");
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const res = await Api.get(`/recipes/${id}`);
      if (res.data.success) {
        setRecipe(res.data.recipe);
      }
    } catch (error) {
      alert("Recipe not found!");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await Api.get(`/comments/${id}`);
      if (res.data.success) {
        setComments(res.data.comments);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    if (!commentText.trim()) {
      alert("Please enter a comment!");
      return;
    }

    try {
      const res = await Api.post("/comments", {
        text: commentText,
        recipeId: id,
      });
      if (res.data.success) {
        setCommentText("");
        fetchComments();
      }
    } catch (error) {
      alert("Failed to add comment!");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Delete this comment?")) {
      try {
        const res = await Api.delete(`/comments/${commentId}`);
        if (res.data.success) {
          fetchComments();
        }
      } catch (error) {
        alert("Failed to delete comment!");
      }
    }
  };

  if (loading) return <div className="text-center py-5">Loading recipe...</div>;
  if (!recipe) return <div className="text-center py-5">Recipe not found!</div>;

  return (
    <div className="recipe-detail-container">
      <div className="container py-5">
        <button className="btn btn-back" onClick={() => navigate("/")}>
          ← Back to Recipes
        </button>

        <div className="recipe-detail-card">
          <div className="detail-header">
            <h1 className="recipe-title">{recipe.title}</h1>
            <span className="recipe-badge">{recipe.category}</span>
          </div>

          <p className="recipe-author">
            👨‍🍳 <strong>{recipe.user.username}</strong>
          </p>

          <div className="detail-meta">
            <span>⏱️ {recipe.cookingTime}</span>
            <span>🍴 Serves {recipe.servings}</span>
            <span>📅 {new Date(recipe.createdAt).toLocaleDateString()}</span>
          </div>

          <h3 className="section-title">About This Recipe</h3>
          <p className="recipe-description">{recipe.description}</p>

          <h3 className="section-title">Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.split("\n").map((ingredient, idx) => (
              <li key={idx}>{ingredient.trim()}</li>
            ))}
          </ul>
        </div>

        {user && recipe.user._id === user.id && (
          <div className="recipe-actions">
            <Link to={`/edit-recipe/${recipe._id}`} className="btn btn-warning">
              Edit Recipe
            </Link>
          </div>
        )}

        <div className="comments-section">
          <h3 className="section-title">Comments ({comments.length})</h3>

          {user && (
            <form className="comment-form" onSubmit={handleAddComment}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts about this recipe..."
                rows="3"
              ></textarea>
              <button type="submit" className="btn btn-comment">
                Post Comment
              </button>
            </form>
          )}

          {!user && (
            <p className="login-prompt">
              <Link to="/login">Login</Link> to comment on this recipe
            </p>
          )}

          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="comment-item">
                  <div className="comment-header">
                    <strong>{comment.user.username}</strong>
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                  {user && comment.user._id === user.id && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
