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
  // to store total pages from the results
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
      console.log(data);

      // set data
      setMovieList(data.results);
      setTotalPages(data.total_pages);
      countMovies(data.total_results);
    };
    getDataFromApi();
    // check change on "page" and "category"
  }, [page, category, searchText]);

  return (
    <section className="section-list">
      <div className="list-container">
        {movieList.map((movie) => {
          return (
            <article key={movie.id} className="movie-item">
              <img
                src={`${poster_base_url}/${poster_size[3]}/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="list-links">
                <h2 className="movie-title-hover">{movie.title}</h2>
                <div className="container-year-genre-hover">
                  <p className="release-year-hover">
                    {movie.release_date?.slice(0, 4)} |
                  </p>
                  <div className="container-rating-info-hover">
                    <p className="movie-rating-hover">
                      Score: <b>{movie.vote_average} / 10</b>
                    </p>
                    <p className="movie-overview-hover">{movie.overview}</p>
                  </div>
                </div>
                <div className="container-buttons-hover">
                  <Link to={`/detail/${movie.id}`}>{/* <MoreInfo /> */}</Link>
                  <FavButton movieId={movie.id} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <PageButton page={page} changePage={setPage} totalPages={totalPages} />
    </section>
  );
}

export default List;
