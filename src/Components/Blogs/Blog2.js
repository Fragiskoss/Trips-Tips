import React, { useState, useEffect } from "react";
import "./Blog.css"; // Ensure this points to your actual CSS file

function Blog2() {
  const [visits, setVisits] = useState(0);

  // Simulating fetching and updating visit count
  useEffect(() => {
    // This is a mockup. Here you would fetch the actual visit count from your backend or increment it in your database.
    const currentVisits = localStorage.getItem("Blog2Visits")
      ? parseInt(localStorage.getItem("Blog2Visits"), 10)
      : 0;
    localStorage.setItem("Blog2Visits", currentVisits + 1 );
    setVisits(currentVisits + 1);
  }, []);

  // Data for the "Exploring Paris" blog post
  const Blog2Sections = [
    {
      title:
        "Hiking in New Zealand, where every path promises an unforgettable journey",
      content: `New Zealand's trails are more than just routes through the wilderness; they are pathways to discovering the soul of the land. Each hike is a journey of discovery, offering a deep connection with nature and a fresh perspective on the world's incredible beauty. Whether you're an experienced trekker or a casual walker, New Zealand's trails await to take you on the adventure of a lifetime.`,
      imageUrl:
        "https://www.nomadasaurus.com/wp-content/uploads/2019/04/Hiking-in-New-Zealand-Guide.jpg",
    },
    // Add other sections here
  ];

  return (
    <div className="blog-post">
      <h1 className="blog-title">The Best Trails for Hiking in New Zealand</h1>

      {Blog2Sections.map((section, index) => (
        <div key={index} className="section">
          <h2 className="section-title">{section.title}</h2>
          {section.imageUrl && (
            <img
              src={section.imageUrl}
              alt={section.title}
              className="section-image"
            />
          )}
          <p className="section-content">{section.content}</p>
        </div>
      ))}
      <p className="visit-count">This post has been visited {visits} times.</p>
    </div>
  );
}

export default Blog2;
