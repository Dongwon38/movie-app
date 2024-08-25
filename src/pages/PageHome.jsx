import React, { useEffect, useRef, useState } from "react";
import List from "../components/List";
import HeroSection from "../components/HeroSection";

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
    console.log(e.target);
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

      <h2>{category}</h2>

      <List category={category} page={page} setPage={setPage} />
    </main>
  );
}

export default PageHome;
