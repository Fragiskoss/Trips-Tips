import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ContentPagePost.css";

function BlogPostPage() {
  const { id } = useParams(); // Get the blog post ID from the URL
  const [post, setPost] = useState(null); // State to hold the fetched blog post

  useEffect(() => {
    // Fetch the blog post by ID when the component mounts or the ID changes
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setPost(response.data); // Set the fetched post in state
      } catch (error) {
        console.error("Error fetching post:", error);
        // Handle error (e.g., display a message or redirect)
      }
    };

    fetchPost();
  }, [id]); // Depend on `id` to refetch when it changes

  if (!post) {
    return <div>Loading...</div>; // Display a loading state or a placeholder
  }

  // Render the blog post content including the HTML content safely
  return (
    <div className="mainPost">
      <h1 className="postTitle">{post.title}</h1>
      {/* Safely set HTML content */}
      <div
        className="contentPage"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}

export default BlogPostPage;
