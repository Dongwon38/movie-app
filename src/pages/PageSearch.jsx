import React, { useContext, useState } from "react";
import List from "../components/List";
import { GlobalContext } from "../context/GlobalState";
import noResult from "../../public/assets/images/bg/noResult.jpg";

function PageSearch() {
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);

  // for searching
  const { searchText, totalMoives } = useContext(GlobalContext);

  console.log("Searching:", searchText);
  console.log("results:", totalMoives);

  return (
    <main className="main-home">
      {totalMoives > 0 ? (
        <div>
          <h2>Search: {searchText}</h2>
          <p>({totalMoives} movies found)</p>
          <List category={category} page={page} setPage={setPage} />
        </div>
      ) : (
        <div>
          <h2>Search: {searchText}</h2>
          <img src={noResult} alt="" />
          <p>sorry, we couldn't find any movies.</p>
        </div>
      )}
    </main>
  );
}

export default PageSearch;
