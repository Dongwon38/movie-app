import React, { useEffect, useRef, useState } from "react";
import List from "../components/List";
import HeroSection from "../components/HeroSection";
import arrowLeft from "../../public/assets/images/icons/arrow-left.svg";
import arrowRight from "../../public/assets/images/icons/arrow-right.svg";

function PageHome() {
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const btnRefs = useRef([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const categories = [
    { label: "Popular", value: "popular" },
    { label: "Now Playing", value: "now_playing" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
  ];

  function handleSetCategory(e) {
    const newType = e.target.value;
    console.log(e.target);
    if (newType !== category) {
      setCategory(newType);
      setPage(1);
    }
  }

  const scrollAmount = 150;

  function handleScroll(direction) {
    const container = document.querySelector('.category-nav');
    if (container) {
      const currentIndex = categories.findIndex(c => c.value === category);
      const maxIndex = categories.length - 1;

      let newIndex = direction === 'right' ? currentIndex + 1 : currentIndex - 1;
      if (newIndex < 0) newIndex = 0;
      if (newIndex > maxIndex) newIndex = maxIndex;

      setCategory(categories[newIndex].value);
      setPage(1); // Reset page number when changing category

      if (btnRefs.current[newIndex]) {
        btnRefs.current[newIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }

      container.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });

      // Update arrow visibility
      setShowLeftArrow(newIndex > 0);
      setShowRightArrow(newIndex < maxIndex);
    }
  }

  useEffect(() => {
    const index = categories.findIndex((c) => c.value === category);
    if (btnRefs.current[index]) {
      btnRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    setShowLeftArrow(index > 0);
    setShowRightArrow(index < categories.length - 1);
  }, [category]);

  return (
    <main className="main-home">
      <HeroSection />

      <div className="sub-nav-container">
        <nav className="category-nav">
          {categories.map((cat, index) => (
            <button
              key={cat.value}
              onClick={handleSetCategory}
              value={cat.value}
              ref={(el) => (btnRefs.current[index] = el)}
              className={`btn-category ${
                category === cat.value ? "active" : ""
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>
        {showLeftArrow && (
          <img
            className="nav-arrow-left"
            src={arrowLeft}
            alt="left-arrow"
            onClick={() => handleScroll('left')}
          />
        )}
        {showRightArrow && (
          <img
            className="nav-arrow-right"
            src={arrowRight}
            alt="right-arrow"
            onClick={() => handleScroll('right')}
          />
        )}
      </div>

      <h2>{category}</h2>

      <List category={category} page={page} setPage={setPage} />
    </main>
  );
}

export default PageHome;
