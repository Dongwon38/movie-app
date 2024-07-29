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

function List({ typeOfList, page, setPage }) {
  // list to store data from API
  const [movieList, setMovieList] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  // get movie Data From API
  useEffect(() => {
    const getDataFromApi = async () => {
      const response = await fetch(
        `${endPoint}${typeOfList}?language=en-US&page=${page}`,
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
    // check change on "page" and "typeOfList"
  }, [page, typeOfList]);

  return (
    <section className="section-list-pop">
      <PageButton page={page} changePage={setPage} totalPages={totalPages} />
      {/* mapping the list */}
      <div>
        {movieList.map((movie) => {
          return (
            <div key={movie.id}>
              <Link to={`/detail/${movie.id}`}>
                <h2>title: {movie.title}</h2>
                <img
                  src={`${poster_base_url}/${poster_size[0]}/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
              <FavButton movieId={movie.id} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default List;
