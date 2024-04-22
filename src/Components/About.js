import React from "react";
import "./About.css"; // Assuming you have specific styles for the About page

function About() {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p className="story">
        Our journey began with a simple love for travel and a small, but mighty,
        dream: to share the world's wonders with all those willing to explore.
        From the majestic peaks of the Himalayas to the bustling streets of
        Tokyo, we've ventured far and wide, uncovering hidden gems and
        unforgettable experiences.
      </p>
      <p className="story">
        But this journey isn't just ours. It belongs to every traveler who's
        ever dared to dream, to every soul yearning for adventure. We believe
        that travel has the power to transform lives, bridging cultures and
        connecting hearts. And through our stories, tips, and guides, we aim to
        inspire you to take that leap, to explore the unknown, and to embrace
        the beauty of our incredible planet.
      </p>
      <p className="story">
        Your support means the world to us. If our content has inspired you,
        consider buying us a coffee. Each cup helps us keep the adventure going,
        bringing more stories, tips, and inspiration to travelers like you.
      </p>
      <div className="donate-button">
        <a
          href="https://www.buymeacoffee.com/allgreece"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Buy Me a Coffee</button>
        </a>
      </div>
    </div>
  );
}

export default About;
