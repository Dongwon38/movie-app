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
import FavButton from "./FavButton";
import PageButton from "./PageButton";
import { GlobalContext } from "../context/GlobalState";
import pinUnfill from "../../public/assets/images/icons/pin-unfill.svg";
import pinFill from "../../public/assets/images/icons/pin-fill.svg";
import { addFav, deleteFav } from "../features/favs/favsSlice";

function List({ category, page, setPage }) {
  // list to store data from API
  const [movieList, setMovieList] = useState([]);
  // to store total pages from the results
  const [totalPages, setTotalPages] = useState(null);

  // get GlobalContext
  const { searchText, countMovies } = useContext(GlobalContext);

  // Access favorite movies from Redux store
  const favorites = useSelector((state) => state.favs.items);
  const dispatch = useDispatch();

  // Check if there is a search text
  const fetchUrl =
    searchText == null || searchText === ""
      ? `${endPoint}${category}?language=en-US&page=${page}`
      : `${searchEndPoint}?query=${searchText}&page=${page}`;
  
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

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

  const cutText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === id);
  };

  const handleFavoriteToggle = (movie) => {
    if (isFavorite(movie.id)) {
      dispatch(deleteFav(movie));
    } else {
      dispatch(addFav(movie));
    }
  };

  return (
    <section>
      <div className="section-list">
      {movieList.map((movie) => {
        const isFav = isFavorite(movie.id);
        return (
          <article
            key={movie.id}
            className="movie-item"
            onMouseOver={() => setHoveredMovieId(movie.id)}
            onMouseOut={() => setHoveredMovieId(null)}
          >
            <Link to={`/detail/${movie.id}`}>
            <img
              src={`${poster_base_url}/${poster_size[3]}/${movie.poster_path}`}
              alt={movie.title}
              />
            </Link>
              {hoveredMovieId === movie.id && (
                <div className="overlay">
                  <img  
                    src={isFav ? pinFill : pinUnfill} 
                    alt={isFav ? "Favorited" : "Not Favorited"}
                    className="favPin"
                    onClick={() => handleFavoriteToggle(movie)}
                  />
                  <h3>{movie.title}</h3>
                  <p>{cutText(movie.overview, 100)}</p>
                  <Link to={`/detail/${movie.id}`}>
                  <p className="moreInfo">More Info</p>
                  </Link>
                </div>
              )}
            <div className="list-links">
              <Link to={`/detail/${movie.id}`}>
                <p>More Info</p>
              </Link>
              <FavButton movieId={movie.id} />
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

