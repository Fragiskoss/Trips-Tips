import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setPopupMessage("Please enter a valid email address.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }

    setIsLoading(true);
    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "";
      const response = await fetch(`${apiBaseUrl}/newsletter-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) throw new Error("Network response was not ok.");

      const result = await response.json();
      setPopupMessage(result.message || "Thank you for subscribing!");
    } catch (error) {
      console.error("Fetch error:", error);
      setPopupMessage("Unexpected error: ");
    }

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
    setIsLoading(false);
    setEmail("");
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Travel World</h1>
        <p>Explore the wonders of the world with us.</p>
      </div>
      <form className="newsletter-signup" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {showPopup && <div className="popup-message">{popupMessage}</div>}
    </div>
  );
}

export default Home;
