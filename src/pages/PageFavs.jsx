import React, { useEffect, useState } from "react";
import { endPoint } from "../globals/globalVariables";

function PageFavs() {
  const [favList, setFavList] = useState([519182]);
  const movieIds = [573435, 519182];

  // get movie Data From API

  const getDataFromApi = async (movieId) => {
    const response = await fetch(`${endPoint}${movieId}"?language=en-US`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjRlMWI5MDlhMGQxMjRjNmRkODg0OTRhMWQ5OWQzYyIsIm5iZiI6MTcyMTk0NzQ1MS4yMTEzNjIsInN1YiI6IjY2NTlmOTY3ZGM2NTk2Yzk4ODYwYTM5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gv_ObU7xwOUbeZHWujVxXLN-es1pyQH6A6rqJRzMHME",
      },
    });
    const data = await response.json();
    // setFavList((prevList) => [...prevList, data.results]);
    // setFavList(data);
    console.log(data.id);
  };

  useEffect(() => {
    movieIds.forEach((movieId) => {
      getDataFromApi(movieId);
    });
  }, []);

  return (
    <div>
      <h1>Page Favourites</h1>
    </div>
  );
}

export default PageFavs;
