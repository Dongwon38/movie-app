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
  const [movie, setMovie] = useState([null]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getDetailFromApi = async () => {
      // get movie Detail from API
      const response = await fetch(`${endPoint}${id}?language=en-US`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + auth,
        },
      });
      const data = await response.json();
      setMovie(data);
      console.log(data);

      // get credits from API
      const response2 = await fetch(`${endPoint}${id}/credits`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + auth,
        },
      });
      const credits = await response2.json();
      setCast(credits.cast);
    };
    getDetailFromApi();
  }, []);

  return (
    <div>
      <h1>Page Detail</h1>
      <img
        src={`${poster_base_url}/${poster_size[0]}/${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.release_date?.slice(0, 4)}</p>
      {movie.genres?.map((genre) => (
        <p key={genre.id}>{genre.name}</p>
      ))}
      <div>{movie.title}</div>
      <div>{movie.vote_average}</div>
      <div>{movie.overview}</div>
      <div>Main Cast</div>
      {cast?.map(
        (person) =>
          person.profile_path && (
            <div key={person.id}>
              <img
                src={`${poster_base_url}/${poster_size[0]}${person.profile_path}`}
                alt={person.name}
              />
              <p>{person.name}</p>
            </div>
          )
      )}
    </div>
  );
}

export default PageDetail;
