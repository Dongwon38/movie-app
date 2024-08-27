import React from "react";
import logo from "/src/assets/images/logo/logo3.png";

function Header() {
  return (
    <header>
      <div className="logo-main">
        <a href="/movie-pin">
          <img src={logo} alt="website logo Movie-Pin" />
        </a>
      </div>
    </header>
  );
}

export default Header;
