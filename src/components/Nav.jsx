import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link, useNavigate } from "react-router-dom";
import logo from "/src/assets/images/logo/logo3.png";

function Nav() {
  const [scrolling, setScrolling] = useState(false);
  const { menuState, toggleOn, toggleOff, search } = useContext(GlobalContext);
  const navigate = useNavigate();

  // Menu Toggle
  function handleMenuClick() {
    {
      menuState === true ? toggleOff() : toggleOn();
    }
  }

  // Search movies
  function submitText(e) {
    e.preventDefault();
    const InputText = e.target[0].value;
    search(InputText);
    navigate("/search");
  }

  // Scrolling Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`main-nav ${scrolling ? "main-nav-scrolled" : ""}`}>
      <div className="logo-main">
        <a href="/movie-pin">
          <img src={logo} alt="website logo Movie-Pin" />
        </a>
      </div>
      <div className="btn-container">
        <div className="search-bar">
          <form onSubmit={submitText}>
            <input type="text" placeholder="SEARCH" />
          </form>
        </div>
        <nav className="btn-menu-desktop">
          <li>
            <Link to="/favourites">Favourites</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </nav>
        <button className="btn-menu" onClick={handleMenuClick}>
          {menuState === true ? (
            <i class="fa-solid fa-xmark"></i>
          ) : (
            <i class="fa-solid fa-bars"></i>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Nav;
