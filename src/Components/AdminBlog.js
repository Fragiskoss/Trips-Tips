import React, { useState, useEffect } from "react";
import "./ContentPage.css";

function AdminBlog() {
  const [blogPosts, setBlogPosts] = useState([]);

  const [editPost, setEditPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Define fetchPosts function outside of useEffect
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  // Fetch posts from the server
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    setEditPost({ ...editPost, [e.target.name]: e.target.value });
  };

  const submitPost = async () => {
    const endpoint = isEditing ? `/api/posts/${editPost._id}` : "/api/posts";
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
        fetchPosts(); // Refresh the posts
        setEditPost({ title: "", content: "", imageUrl: "", category: "" }); // Reset form
        setIsEditing(false); // Exit editing mode
      } else {
        console.error("Failed to submit the post");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const startEdit = (post) => {
    setEditPost(post);
    setIsEditing(true);
  };

  const deletePost = async (postId) => {
    // Display the confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    // Proceed with deletion if confirmed
    if (isConfirmed) {
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchPosts(); // Refresh the posts after deletion
          console.log("Blog deleted successfully");
        } else {
          console.error("Failed to delete the blog");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    } else {
      console.log("Deletion cancelled");
    }
  };

  return (
    <div className="content-page">
      <h1>Blog Admin</h1>
      <div className="admin-controls">
        <h2>{isEditing ? "Edit Blog" : "Add New Blog"}</h2>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={editPost.title}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Blog Content"
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
        <button onClick={submitPost}>{isEditing ? "Update Blog" : "Add Blog"}</button>
      </div>
      <div className="grid-layout">
        {blogPosts.map((post) => (
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

export default AdminBlog;
