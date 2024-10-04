import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import guideGif from "../assets/images/guide.gif";
import pin from "../assets/images/logo/logo2.png";

function InitialOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("visitedSession")) {
      setShowOverlay(true);
    }
  }, []);

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <>
      {showOverlay && (
        <section className="initial-overlay" id="initial-overlay">
          <div className="initial-overlay-content">
            <h2>
              Explore and Pin <img className="mini-logo" src={pin} /> in your
              Favourite
            </h2>
            <img className="guide-gif" src={guideGif} />
            <button onClick={closeOverlay} id="close-overlay">
              Close this tab
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default InitialOverlay;
