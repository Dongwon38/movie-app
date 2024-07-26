import React, { useEffect, useState } from "react";
import { endPoint } from "../globals/globalVariables";
import { useParams } from "react-router-dom";

function PageDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

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

  // get movie Detail From API
  useEffect(() => {
    const getDetailFromApi = async () => {
      const response = await fetch(`${endPoint}${id}?language=en-US`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjRlMWI5MDlhMGQxMjRjNmRkODg0OTRhMWQ5OWQzYyIsIm5iZiI6MTcyMTk0NzQ1MS4yMTEzNjIsInN1YiI6IjY2NTlmOTY3ZGM2NTk2Yzk4ODYwYTM5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gv_ObU7xwOUbeZHWujVxXLN-es1pyQH6A6rqJRzMHME",
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
