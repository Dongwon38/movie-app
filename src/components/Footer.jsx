import React from "react";
import logo from "/src/assets/images/logo/logo3.png";

function Footer() {
  return (
    <footer className="footer-container">
      <a href="#">
        <img className="footer-logo" src={logo} alt="Movie Pin Logo" />
      </a>
    </footer>
  );
}

export default Footer;
