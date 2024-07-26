import React, { useEffect, useState } from "react";
import { endPoint } from "../globals/globalVariables";
import { Link } from "react-router-dom";
import FavButton from "./FavButton";

function List({ typeOfList }) {
  // list to store data from API
  const [movieList, setMovieList] = useState([]);

  // the number of page
  const [page, setPage] = useState(1);

  // base url of images & sizes
  const poster_base_url = "https://image.tmdb.org/t/p/";
  const poster_size = [
    "w92",
    "w154",
    "w185",
    "w342",
    "w500",
    "w780",
    "original",
  ];

  // get movie Data From API
  useEffect(() => {
    const getDataFromApi = async () => {
      const response = await fetch(
        `${endPoint}${typeOfList}?language=en-US&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjRlMWI5MDlhMGQxMjRjNmRkODg0OTRhMWQ5OWQzYyIsIm5iZiI6MTcyMTk0NzQ1MS4yMTEzNjIsInN1YiI6IjY2NTlmOTY3ZGM2NTk2Yzk4ODYwYTM5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gv_ObU7xwOUbeZHWujVxXLN-es1pyQH6A6rqJRzMHME",
          },
        }
      );
      const data = await response.json();
      setMovieList(data.results);
      console.log(data);
    };
    getDataFromApi();
    // check change on "page" and "typeOfList"
  }, [page, typeOfList]);

  // number of pages
  const maxPage = 500;
  const thresholdStart = 3;
  const thresholdEnd = maxPage - 2;
  const numbersOfPageLink = [];

  if (page <= thresholdStart) {
    numbersOfPageLink.push(1, 2, 3, 4, 5, "...");
  } else if (page >= thresholdEnd) {
    numbersOfPageLink.push(
      "...",
      maxPage - 4,
      maxPage - 3,
      maxPage - 2,
      maxPage - 1,
      maxPage
    );
  } else {
    numbersOfPageLink.push(
      "...",
      page - 2,
      page - 1,
      page,
      page + 1,
      page + 2,
      "..."
    );
  }

  // button for change the page
  function handleGetPage(e) {
    const newPage = Number(e.target.value);
    setPage(newPage);
  }

  return (
    <section className="section-list-pop">
      {/* buttons for navigate page */}
      <span>
        {numbersOfPageLink.map((page, index) => {
          if (typeof page === "string") {
            return <p key={index}>{page}</p>;
          } else {
            return (
              <button key={index} onClick={handleGetPage} value={page}>
                {page}
              </button>
            );
          }
        })}
      </span>

      {/* mapping the list */}
      <div>
        {movieList.map((movie) => {
          return (
            <div key={movie.id}>
              <Link to={`/detail/${movie.id}`}>
                <h2>title: {movie.title}</h2>
                <img
                  src={`${poster_base_url}${poster_size[0]}/${movie.poster_path}`}
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
