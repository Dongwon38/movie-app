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
  // to store entire info about fav list
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
    const response = await fetch(`${endPoint}${movieId}"?language=en-US`, {
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
    <div>
      <h1>Page Favourites</h1>
      {/* mapping the list */}
      <div>
        {dataList.map((movie) => {
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
    </div>
  );
}

export default PageFavs;
