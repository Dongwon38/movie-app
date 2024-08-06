import React, { useEffect, useState } from "react";
import {
  endPoint,
  poster_base_url,
  poster_size,
  auth,
} from "../globals/globalVariables";
import { Link } from "react-router-dom";
import FavButton from "./FavButton";
import PageButton from "./PageButton";

function List({ category, page, setPage }) {
  // list to store data from API
  const [movieList, setMovieList] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  // get movie Data From API
  useEffect(() => {
    const getDataFromApi = async () => {
      const response = await fetch(
        `${endPoint}${category}?language=en-US&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + auth,
          },
        }
      );
      const data = await response.json();
      setMovieList(data.results);
      setTotalPages(data.total_pages);
      console.log(data);
    };
    getDataFromApi();
    // check change on "page" and "category"
  }, [page, category]);

  return (
    <section className="section-list">
      <PageButton page={page} changePage={setPage} totalPages={totalPages} />
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
    </section>
  );
}

export default List;
