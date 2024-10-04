import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  endPoint,
  searchEndPoint,
  poster_base_url,
  poster_size,
  auth,
} from "../globals/globalVariables";
import { Link } from "react-router-dom";
import PageButton from "./PageButton";
import { GlobalContext } from "../context/GlobalState";
import { addFav, deleteFav } from "../features/favs/favsSlice";
import pinFill from "/src/assets/images/icons/pin-fill.svg";
import pinUnfill from "/src/assets/images/icons/pin-unfill.svg";
import fallbackPoster from "../assets/images/bg/fallback-poster.png";

function List({ category, page, setPage }) {
  // global state
  const { searchText, countMovies } = useContext(GlobalContext);

  // set list for display
  const [movieList, setMovieList] = useState([]);

  // Get data from API
  const fetchUrl =
    searchText === null || searchText === ""
      ? `${endPoint}${category}?language=en-US&page=${page}`
      : `${searchEndPoint}?query=${searchText}&page=${page}`;

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
      countMovies(data.total_results);
    };
    getDataFromApi();
  }, [page, category, searchText]);

  // Cut Text for overview
  const cutText = (text, maxLength) => {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
  };

  // add or delete moive from Fav List
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favs.items);
  const isFavorite = (id) => favorites.some((fav) => fav.id === id);
  const handleFavoriteToggle = (movie, e) => {
    e.stopPropagation();
    isFavorite(movie.id) ? dispatch(deleteFav(movie)) : dispatch(addFav(movie));
  };

  return (
    <section className="section-wrapper">
      <div className="section-list">
        {movieList.map((movie) => {
          // check if it is Fav
          const isFav = isFavorite(movie.id);
          return (
            // movie-item
            <article key={movie.id} className="movie-item">
              <Link to={`/detail/${movie.id}`}>
                <img
                  src={
                    movie.poster_path == null
                      ? `${fallbackPoster}`
                      : `${poster_base_url}/${poster_size[5]}/${movie.poster_path}`
                  }
                  alt={movie.title}
                  className="movie-poster"
                />
                {movie.poster_path === null && (
                  <h3 className="fallback-title">{movie.title}</h3>
                )}
              </Link>
              {/* Overlay */}
              <div className="overlay">
                <img
                  src={isFav ? pinFill : pinUnfill}
                  alt={isFav ? "Favorited" : "Not Favorited"}
                  className="fav-pin"
                  onClick={(e) => handleFavoriteToggle(movie, e)}
                />
                <div className="overlay-top">
                  <h3 className="overlay-title">{movie.title}</h3>
                </div>
                <div className="overlay-bottom">
                  <p className="overlay-overview">
                    {cutText(movie.overview, 100)}{" "}
                    <Link to={`/detail/${movie.id}`} className="more-info">
                      More info
                    </Link>
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <PageButton page={page} changePage={setPage} />
    </section>
  );
}

export default List;
