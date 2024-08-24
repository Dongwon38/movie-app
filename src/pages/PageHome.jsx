import React, { useEffect, useRef, useState } from "react";
import List from "../components/List";
import HeroSection from "../components/HeroSection";
import arrowLeft from "../../public/assets/images/icons/arrow-left.svg";
import arrowRight from "../../public/assets/images/icons/arrow-right.svg";

function PageHome() {
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const btnRefs = useRef([]);

  const categories = [
    { label: "Popular", value: "popular" },
    { label: "Now Playing", value: "now_playing" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
  ];

  function handleSetCategory(e) {
    const newType = e.target.value;
    if (newType !== category) {
      setCategory(newType);
      setPage(1);
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
  }, [category]);

  return (
    <main className="main-home">
      <HeroSection />

      <div className="sub-nav-container">
        <img  className="nav-arrow-left"
              src={arrowLeft} 
              alt="left-arrow" />
        <img  className="nav-arrow-right"
              src={arrowRight}
              alt="right-arrow" />
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
      </div>
      <h2>{category} list</h2>
      <List category={category} page={page} setPage={setPage} />
    </main>
  );
}

export default PageHome;
