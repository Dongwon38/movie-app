import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

function Nav() {
  const { menuState, toggleOn, toggleOff } = useContext(GlobalContext);

  function handleMenuClick() {
    {
      menuState === true ? toggleOff() : toggleOn();
    }
  }

  return (
    <nav className="main-nav">
      <div className="search-bar">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search for a movie..." />
      </div>
      <button className="btn-menu" onClick={handleMenuClick}>
        {menuState === true ? (
          <i class="fa-solid fa-xmark"></i>
        ) : (
          <i class="fa-solid fa-bars"></i>
        )}
      </button>
    </nav>
  );
}

export default Nav;
