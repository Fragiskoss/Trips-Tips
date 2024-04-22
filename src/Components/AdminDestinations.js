import React, { useState, useEffect } from "react";
import "./ContentPage.css";

function AdminDestinations() {
  const [destinationsPosts, setDestinationsPosts] = useState([]);

  const [editPost, setEditPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch destinations from the server
  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/destination"); // Make sure this endpoint is correct
      if (response.ok) {
        const data = await response.json();
        setDestinationsPosts(data);
      } else {
        console.error("Failed to fetch destinations");
      }
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    }
  };

  const handleInputChange = (e) => {
    setEditPost({ ...editPost, [e.target.name]: e.target.value });
  };

  const submitPost = async () => {
    const endpoint = isEditing
      ? `/api/destination/${editPost._id}`
      : "/api/destination";
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
        fetchDestinations(); // Refresh the destinations
        setEditPost({ title: "", content: "", imageUrl: "", category: "" }); // Reset form
        setIsEditing(false); // Exit editing mode
      } else {
        console.error("Failed to submit the destination");
      }
    } catch (error) {
      console.error("Error submitting destination:", error);
    }
  };

  const startEdit = (post) => {
    setEditPost(post);
    setIsEditing(true);
  };

  const deletePost = async (postId) => {
    // Display the confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this destination?"
    );

    // Proceed with deletion if confirmed
    if (isConfirmed) {
      try {
        const response = await fetch(`/api/destination/${postId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchDestinations(); // Refresh the posts after deletion
          console.log("Destination deleted successfully");
        } else {
          console.error("Failed to delete the destination");
        }
      } catch (error) {
        console.error("Error deleting destination:", error);
      }
    } else {
      console.log("Deletion cancelled");
    }
  };

  return (
    <div className="content-page">
      <h1>Destinations Admin</h1>
      <div className="admin-controls">
        <h2>{isEditing ? "Edit Destination" : "Add New Destination"}</h2>
        <input
          type="text"
          name="title"
          placeholder="Destination Title"
          value={editPost.title}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Destination Description"
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
          {isEditing ? "Update Destination" : "Add Destination"}
        </button>
      </div>
      <div className="grid-layout">
        {destinationsPosts.map((post) => (
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

export default AdminDestinations;
