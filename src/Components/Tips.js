import React, { useState, useEffect } from "react"; // Add useEffect here
import { useNavigate } from "react-router-dom";
import "./ContentPage.css";

function Tips() {
  const navigate = useNavigate();
  const [tipsPosts, setTipsPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/tip"); // Adjust URL as needed
        const data = await response.json();
        setTipsPosts(data); // Assuming the backend sends an array of posts
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Add more blog posts as needed

  const [sortCriteria, setSortCriteria] = useState("mostRecent"); // Default sorting

  const handlePostClick = (postId) => {
    navigate(`/tips/${postId}`);
  };

  const sortPosts = (posts, criteria) => {
    switch (criteria) {
      case "mostRecent":
        return posts.sort((a, b) => b.id - a.id);
      case "leastRecent":
        return posts.sort((a, b) => a.id - b.id);
      case "mostPopular":
        return posts.sort((a, b) => b.times_visited - a.times_visited);
      case "leastPopular":
        return posts.sort((a, b) => a.times_visited - b.times_visited);
      default:
        return posts; // No sorting applied
    }
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const sortedPosts = sortPosts([...tipsPosts], sortCriteria);

  return (
    <div className="content-page">
      <h1>Tips</h1>
      <div className="sort-dropdown">
        <label>Sort by: </label>
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="mostRecent">Most Recent</option>
          <option value="leastRecent">Least Recent</option>
          <option value="mostPopular">Most Popular</option>
          <option value="leastPopular">Least Popular</option>
        </select>
      </div>
      <div className="grid-layout">
        {sortedPosts.map((post) => (
          <div
            key={post.id}
            className="grid-item"
            onClick={() => handlePostClick(post.id)}
          >
            <img src={post.imageUrl} alt={post.title} className="post-image" />
            <h2>{post.title}</h2>
            <p>{post.category}</p>
            {/* Assuming you want the content visible here, perhaps a preview */}
            <p>{post.content}</p>
            {/* Add a content preview attribute or similar */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tips;
