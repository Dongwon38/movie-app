import React, { useEffect, useState } from "react";
import {
  endPoint,
  poster_base_url,
  poster_size,
  auth,
} from "../globals/globalVariables";
import { useParams } from "react-router-dom";

function PageDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  // get movie Detail From API
  useEffect(() => {
    const getDetailFromApi = async () => {
      const response = await fetch(`${endPoint}${id}?language=en-US`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + auth,
        },
      });
      const data = await response.json();
      setMovie(data);
      console.log(movie);
    };
    getDetailFromApi();
  }, []);

  return (
    <div>
      <h1>Page Detail</h1>
      <img
        src={`${poster_base_url}${poster_size[0]}/${movie.poster_path}`}
        alt={movie.title}
      />
      <div>{movie.title}</div>
      <div>{movie.overview}</div>
    </div>
  );
}

export default PageDetail;
