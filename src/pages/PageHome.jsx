import React, { useState } from "react";
import List from "../components/List";

function PageHome() {
  const [typeOfList, setTypeOfList] = useState("popular");
  const [page, setPage] = useState(1);

  function handleListTypeChange(e) {
    const newType = e.target.value;
    if (newType !== typeOfList) {
      setTypeOfList(newType);
      setPage(1);
    }
  }

  const listTypes = [
    { label: "Popular", value: "popular" },
    { label: "Now Playing", value: "now_playing" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
  ];

  return (
    <div>
      <h1>Home</h1>
      <div>
        {listTypes.map((type) => (
          <button
            key={type.value}
            onClick={handleListTypeChange}
            value={type.value}
          >
            {type.label}
          </button>
        ))}
      </div>
      <h2>{typeOfList}</h2>
      <List typeOfList={typeOfList} page={page} setPage={setPage} />
    </div>
  );
}

export default PageHome;
