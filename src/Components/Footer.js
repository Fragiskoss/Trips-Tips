import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <section>
        <h3>FOLLOW US</h3>
        <div className="social-links">
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          {/* Add more social links here */}
        </div>
      </section>
      <section>
        <h5>
          Embark on unforgettable journeys: Subscribe to our Trips & Tips
          Newsletter for exclusive insights and deals directly to your inbox
        </h5>
      </section>
      <p>© 2024 All I WANT IS GREECE. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
