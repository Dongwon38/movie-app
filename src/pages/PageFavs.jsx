import React, { useEffect, useState } from "react";
import {
  endPoint,
  poster_base_url,
  poster_size,
  auth,
} from "../globals/globalVariables";
import { Link } from "react-router-dom";
import FavButton from "../components/FavButton";

function PageFavs() {
  // to store fav list coming from local storage
  const [favList, setFavList] = useState([]);
  // to store entire movie from fav list
  const [dataList, setDataList] = useState([]);

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
  }, [favList]);

  return (
    <main className="main-favs">
      <h1>Favourites</h1>
      <ul>
        {dataList.map((movie) => (
          <li key={movie.id} className="movie-item">
            <article>
              <Link to={`/detail/${movie.id}`}>
                <h2>{movie.title}</h2>
                <figure>
                  <img
                    src={`${poster_base_url}/${poster_size[3]}/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </figure>
              </Link>
              <FavButton movieId={movie.id} />
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default PageFavs;
