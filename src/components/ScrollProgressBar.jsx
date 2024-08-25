// ScrollProgressBar.jsx
import React, { useEffect, useState } from "react";

function ScrollProgressBar() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scroll = `${(totalScroll / windowHeight) * 100}`;

    setScrollPosition(scroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress-bar"
      style={{ width: `${scrollPosition}%` }}
    ></div>
  );
}

export default ScrollProgressBar;
