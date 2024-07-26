import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <div className="hide">
        <Link>test 1</Link>
        <Link>test 2</Link>
        <Link>test 3</Link>
      </div>
      <Link to="/favourites">Favourites</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Nav;
