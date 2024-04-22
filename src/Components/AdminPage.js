import React, { useState } from "react";
import { useLogin } from "./LoginContext";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

function AdminPage() {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const authenticate = async (e) => {
    e.preventDefault();
    setLoginError(""); // Reset login error message

    // API call to backend for authentication
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Authentication successful:", data);
        setIsLoggedIn(true); // Update state using context
      } else {
        console.log("Authentication failed:", data.message);
        setLoginError(data.message || "Failed to login. Please try again.");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setLoginError("An error occurred. Please try again later.");
    }
  };

  const logout = () => {
    setIsLoggedIn(false); // Update state using context to log the user out
  };

  if (!isLoggedIn) {
    return (
      <div className="AdminLogin-container">
        <form onSubmit={authenticate} className="AdminLogin-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="AdminInput-field"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="AdminInput-field"
          />
          {loginError && <div className="login-error">{loginError}</div>}
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    );
  }

  // Function to navigate to different paths
  const navigateTo = (path) => {
    navigate(path);
  };

  // Render the admin dashboard if logged in, including a logout button
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button
        onClick={() => navigateTo("/createblog")}
        className="dashboard-btn"
      >
        Create Blog
      </button>
      <button
        onClick={() => navigateTo("/createdestination")}
        className="dashboard-btn"
      >
        Create Destination
      </button>
      <button
        onClick={() => navigateTo("/createtip")}
        className="dashboard-btn"
      >
        Create Tip
      </button>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default AdminPage;
