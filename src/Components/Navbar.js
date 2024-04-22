import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "./LoginContext";
import "./Navbar.css";
import logoImage from "./Photos/TravelLogo.png";

function Navbar() {
  const { isLoggedIn } = useLogin();
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive(!navActive); // Toggle visibility
  };

  // Ensure links close the mobile menu when clicked
  const handleNavLinkClick = () => {
    if (navActive) {
      setNavActive(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logoImage} alt="Home" onClick={handleNavLinkClick} />
        </Link>
      </div>
      <div className={`nav-links ${navActive ? "active" : ""}`}>
        <Link to="/" onClick={handleNavLinkClick}>
          Home
        </Link>
        {isLoggedIn ? (
          <>
            <Link to="/admindestinations" onClick={handleNavLinkClick}>
              Destinations
            </Link>
            <Link to="/admintips" onClick={handleNavLinkClick}>
              Tips
            </Link>
            <Link to="/adminblog" onClick={handleNavLinkClick}>
              Blog
            </Link>
          </>
        ) : (
          <>
            <Link to="/destinations" onClick={handleNavLinkClick}>
              Destinations
            </Link>
            <Link to="/tips" onClick={handleNavLinkClick}>
              Tips
            </Link>
            <Link to="/blog" onClick={handleNavLinkClick}>
              Blog
            </Link>
          </>
        )}
        <Link to="/about" onClick={handleNavLinkClick}>
          About
        </Link>
        <Link to="/contact" onClick={handleNavLinkClick}>
          Contact
        </Link>
      </div>
      <div className="hamburger" onClick={toggleNav}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="nav-lang">{/* Language switcher logic here */}</div>
    </nav>
  );
}

export default Navbar;
