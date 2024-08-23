import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

function MenuLayer() {
  const { menuState, toggleOff } = useContext(GlobalContext);

  function handleClick(e) {
    const clickArea = e.target.id;
    const clickLink = e.target.className;

    if (clickArea == "background-area" || clickLink == "link") {
      toggleOff();
    }
  }

  return (
    <div
      className={
        menuState === true
          ? "menu-layer-container toggle-on"
          : "menu-layer-container toggle-off"
      }
      onClick={handleClick}
      id="background-area"
    >
      <div className="menu-layer">
        <ul>
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/favourites" className="link">
              Favourites
            </Link>
          </li>
          <li>
            <Link to="/about" className="link">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MenuLayer;
