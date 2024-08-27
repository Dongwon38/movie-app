import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  endPoint,
  poster_base_url,
  poster_size,
  auth,
} from "../globals/globalVariables";
import { Link } from "react-router-dom";
import { addFav, deleteFav } from "../features/favs/favsSlice";
import favBg from "/src/assets/images/bg/fav-bg.jpg";
import noResult from "/src/assets/images/bg/noResult.jpg";
import pinFill from "/src/assets/images/icons/pin-fill.svg";
import pinUnfill from "/src/assets/images/icons/pin-unfill.svg";

function PageFavs() {
  // to store fav list coming from local storage
  const [favList, setFavList] = useState([]);
  // to store entire movie from fav list
  const [dataList, setDataList] = useState([]);
  const [countFavList, setCountFavList] = useState("");

  // bring data from local storage
  useEffect(() => {
    const savedList = localStorage.getItem("favList");
    if (savedList) {
      setFavList(JSON.parse(savedList));
    }
  }, []);

  // get only fav movie Data From API
  const getDataFromApi = async (movieId) => {
    const response = await fetch(`${endPoint}${movieId}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + auth,
      },
    });
    const data = await response.json();
    // check if it has alread added to the list
    if (!dataList.some((movie) => movie.id === data.id)) {
      setDataList((prevList) => [...prevList, data]);
    }
  };

  useEffect(() => {
    favList.forEach((movie) => {
      getDataFromApi(movie.id);
    });
    setCountFavList(favList.length);
  }, [favList]);
  console.log(countFavList);

  // Cut Text for overview
  const cutText = (text, maxLength) => {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
  };

  // Fav buttons
  // add or delete moive from Fav List
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favs.items);
  const isFavorite = (id) => favorites.some((fav) => fav.id === id);
  const handleFavoriteToggle = (movie, e) => {
    e.stopPropagation();
    isFavorite(movie.id) ? dispatch(deleteFav(movie)) : dispatch(addFav(movie));
  };

  return (
    <main className="main-favs">
      {countFavList > 0 ? (
        <>
          <img className="background-fav" src={favBg} alt="Bakcground Image" />
          <h1>Favourites: </h1>
          <ul className="section-fav-list">
            {dataList.map((movie) => {
              const isFav = isFavorite(movie.id);
              return (
                // movie-item
                <li key={movie.id} className="movie-item">
                  <Link to={`/detail/${movie.id}`}>
                    <img
                      className="movie-poster"
                      src={`${poster_base_url}/${poster_size[5]}/${movie.poster_path}`}
                      alt={movie.title}
                    />
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
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <div className="page-favs no-result">
          <img src={noResult} alt="" />
          <h1>Favourite list is Empty!</h1>
          <div className="result-container">
            <p>
              Explore movies on our website and <b>PIN</b> on it!
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default PageFavs;
