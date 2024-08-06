import React from "react";
import logo from "../../public/assets/images/logo/logo3.png";

function Header() {
  return (
    <header>
      <a href="/">
        <img src={logo} alt="website logo Movie-Pin" />
      </a>
    </header>
  );
}

export default Header;
