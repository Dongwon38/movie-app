import React, { useContext, useEffect, useState } from "react";
import {
  endPoint,
  searchEndPoint,
  poster_base_url,
  poster_size,
  auth,
} from "../globals/globalVariables";
import { Link } from "react-router-dom";
import FavButton from "./FavButton";
import PageButton from "./PageButton";
import { GlobalContext } from "../context/GlobalState";

function List({ category, page, setPage }) {
  // list to store data from API
  const [movieList, setMovieList] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  // get GlobalContext
  const { searchText, countMovies } = useContext(GlobalContext);

  // Check if there is a search text
  const fetchUrl =
    searchText == null || searchText == ""
      ? `${endPoint}${category}?language=en-US&page=${page}`
      : `${searchEndPoint}?query=${searchText}&page=${page}`;

  // get movie Data From API
  useEffect(() => {
    const getDataFromApi = async () => {
      const response = await fetch(fetchUrl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + auth,
        },
      });
      const data = await response.json();
      setMovieList(data.results);
      setTotalPages(data.total_pages);
      countMovies(data.total_results);
      console.log(data);
    };
    getDataFromApi();
    // check change on "page" and "category"
  }, [page, category, searchText]);

  return (
    <section className="section-list">
      {movieList.map((movie) => {
        return (
          <article key={movie.id} className="movie-item">
            <Link to={`/detail/${movie.id}`}>
              <img
                src={`${poster_base_url}/${poster_size[3]}/${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
            <FavButton movieId={movie.id} />
          </article>
        );
      })}
      <PageButton page={page} changePage={setPage} totalPages={totalPages} />
    </section>
  );
}

export default List;
