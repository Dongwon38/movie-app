import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import logo from "../../public/assets/images/logo/logo3.png";

function Nav() {
  const { menuState, toggleOn, toggleOff, search } = useContext(GlobalContext);
  const navigate = useNavigate();

  function handleMenuClick() {
    {
      menuState === true ? toggleOff() : toggleOn();
    }
  }

  function submitText(e) {
    e.preventDefault();
    const InputText = e.target[0].value;
    search(InputText);
    navigate("/search");
  }

  return (
    <nav className="main-nav">
      <div className="logo-main">
        <a href="/">
          <img src={logo} alt="website logo Movie-Pin" />
        </a>
      </div>
      <div className="btn-container">
        <div className="search-bar">
          <form onSubmit={submitText}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="search for a movie..." />
          </form>
        </div>
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
