import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/detail">Detail</Link>
      <Link to="/favourites">Favourites</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Nav;
