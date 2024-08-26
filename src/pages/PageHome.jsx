import React, { useState } from "react";
import List from "../components/List";
import HeroSection from "../components/HeroSection";

function PageHome() {
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);

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

  return (
    <main className="main-home">
      <HeroSection />
      <div className="sub-nav-container">
        <nav className="category-nav">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={handleSetCategory}
              value={cat.value}
              className={`btn-category ${
                category === cat.value ? "active" : ""
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </div>
      <List category={category} page={page} setPage={setPage} />
    </main>
  );
}

export default PageHome;
