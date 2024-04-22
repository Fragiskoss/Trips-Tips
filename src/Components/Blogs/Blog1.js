import React, { useState, useEffect } from "react";
import "./Blog.css"; // Ensure this points to your actual CSS file

function ParisBlog() {
  const [visits, setVisits] = useState(0);

  // Simulating fetching and updating visit count
  useEffect(() => {
    // This is a mockup. Here you would fetch the actual visit count from your backend or increment it in your database.
    const currentVisits = localStorage.getItem("parisBlogVisits")
      ? parseInt(localStorage.getItem("parisBlogVisits"), 10)
      : 0;
    localStorage.setItem("parisBlogVisits", currentVisits + 1 );
    setVisits(currentVisits + 1);
  }, []);

  // Data for the "Exploring Paris" blog post
  const parisBlogSections = [
    {
      title: "Exploring Paris",
      content: `Paris, the City of Light, beckons travelers with its unparalleled blend
                of history, culture, gastronomy, and romance. This guide takes you
                beyond the well-trodden paths to discover the hidden gems scattered
                throughout this iconic city. From cozy cafes where locals while away the
                hours to lesser-known landmarks that tell the stories of centuries past,
                Paris holds endless surprises for those willing to explore.`,
      imageUrl:
        "https://s1.1zoom.me/prev/542/France_Paris_Eiffel_Tower_541733_600x400.jpg",
    },
    // Add other sections here
  ];

  return (
    <div className="blog-post">
      <h1 className="blog-title">Exploring Paris: A City Guide</h1>

      {parisBlogSections.map((section, index) => (
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
