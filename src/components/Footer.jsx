import React from "react";
import logo from "../../public/assets/images/logo/logo3.png";
import { Link } from "react-router-dom";

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
