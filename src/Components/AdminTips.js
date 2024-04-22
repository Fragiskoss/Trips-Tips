import React, { useState, useEffect } from "react";
import "./ContentPage.css";

function AdminTips() {
  const [tipsPosts, setTipsPosts] = useState([]);

  const [editPost, setEditPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch destinations from the server
  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      const response = await fetch("/api/tip"); // Make sure this endpoint is correct
      if (response.ok) {
        const data = await response.json();
        setTipsPosts(data);
      } else {
        console.error("Failed to fetch tips");
      }
    } catch (error) {
      console.error("Failed to fetch tips:", error);
    }
  };

  const handleInputChange = (e) => {
    setEditPost({ ...editPost, [e.target.name]: e.target.value });
  };

  const submitPost = async () => {
    const endpoint = isEditing
      ? `/api/tip/${editPost._id}`
      : "/api/tip";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editPost),
      });
      if (response.ok) {
        fetchTips(); // Refresh the destinations
        setEditPost({ title: "", content: "", imageUrl: "", category: "" }); // Reset form
        setIsEditing(false); // Exit editing mode
      } else {
        console.error("Failed to submit the tip");
      }
    } catch (error) {
      console.error("Error submitting tip:", error);
    }
  };

  const startEdit = (post) => {
    setEditPost(post);
    setIsEditing(true);
  };

  const deletePost = async (postId) => {
    // Display the confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this tip?"
    );

    // Proceed with deletion if confirmed
    if (isConfirmed) {
      try {
        const response = await fetch(`/api/tip/${postId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchTips(); // Refresh the posts after deletion
          console.log("Tip deleted successfully");
        } else {
          console.error("Failed to delete the tip");
        }
      } catch (error) {
        console.error("Error deleting tip:", error);
      }
    } else {
      console.log("Deletion cancelled");
    }
  };

  return (
    <div className="content-page">
      <h1>Tips Admin</h1>
      <div className="admin-controls">
        <h2>{isEditing ? "Edit Destination" : "Add New Tip"}</h2>
        <input
          type="text"
          name="title"
          placeholder="Tip Title"
          value={editPost.title}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Tip Description"
          value={editPost.content}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={editPost.imageUrl}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={editPost.category}
          onChange={handleInputChange}
        />
        <button onClick={submitPost}>
          {isEditing ? "Update Tip" : "Add Tip"}
        </button>
      </div>
      <div className="grid-layout">
        {tipsPosts.map((post) => (
          <div key={post._id} className="grid-item">
            <img src={post.imageUrl} alt={post.title} className="post-image" />
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => startEdit(post)}>Edit</button>
            <button onClick={() => deletePost(post._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTips;
