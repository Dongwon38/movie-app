import React, { useContext, useState } from "react";
import List from "../components/List";
import { GlobalContext } from "../context/GlobalState";
import noResult from "../../public/assets/images/bg/noResult.jpg";

function PageSearch() {
  const category = "popular";
  const [page, setPage] = useState(1);

  // for searching
  const { searchText, totalMoives } = useContext(GlobalContext);

  return (
    <main className="main-search">
      {totalMoives > 0 ? (
        <div className="page-search">
          <h2>Search: {searchText}</h2>
          <p>({totalMoives} movies found)</p>
          <List category={category} page={page} setPage={setPage} />
        </div>
      ) : (
        <div className="page-search no-result">
          <img src={noResult} alt="" />
          <h2>Search: {searchText}</h2>
          <div className="result-container">
            <p>sorry! we couldn't find any movies.</p>
            <p>Try another word.</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default PageSearch;
