import React, { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Form } from "react-router-dom";

function Nav() {
  const { menuState, toggleOn, toggleOff, search } = useContext(GlobalContext);

  function handleMenuClick() {
    {
      menuState === true ? toggleOff() : toggleOn();
    }
  }

  function submitText(e) {
    e.preventDefault();
    const InputText = e.target[0].value;
    search(InputText);
  }

  return (
    <nav className="main-nav">
      <div className="search-bar">
        <form onSubmit={submitText}>
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search for a movie..." />
        </form>
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
