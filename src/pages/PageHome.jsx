import React, { useState } from "react";
import List from "../components/List";

function PageHome() {
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);

  function handleSetCategory(e) {
    const newType = e.target.value;
    if (newType !== category) {
      setCategory(newType);
      setPage(1);
    }
  }

  const categories = [
    { label: "Popular", value: "popular" },
    { label: "Now Playing", value: "now_playing" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
  ];

  return (
    <main className="main-home">
      <h1>Home</h1>
      <div>
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={handleSetCategory}
            value={category.value}
            className="btn-category"
          >
            {category.label}
          </button>
        ))}
      </div>
      <h2>{category}</h2>
      <List category={category} page={page} setPage={setPage} />
    </main>
  );
}

export default PageHome;
