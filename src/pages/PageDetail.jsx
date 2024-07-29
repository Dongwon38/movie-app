import React, { useEffect, useState } from "react";
import {
  endPoint,
  poster_base_url,
  poster_size,
  auth,
} from "../globals/globalVariables";
import { useParams } from "react-router-dom";
import FavButton from "../components/FavButton";

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
    <main className="main-detail">
      <h1>Details</h1>
      <img
        className="img-poster"
        src={`${poster_base_url}/${poster_size[3]}/${movie.poster_path}`}
        alt={movie.title}
      />
      <FavButton movieId={movie.id} />
      <p className="release-year">{movie.release_date?.slice(0, 4)}</p>
      {movie.genres?.map((genre) => (
        <p key={genre.id} className="genre">
          {genre.name}
        </p>
      ))}
      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-rating">{movie.vote_average}</p>
      <p className="movie-overview">{movie.overview}</p>
      <h3>Main Cast</h3>
      <ul className="cast-list">
        {cast?.map(
          (person) =>
            person.profile_path && (
              <li key={person.id} className="cast-member">
                <img
                  src={`${poster_base_url}/${poster_size[0]}${person.profile_path}`}
                  alt={person.name}
                  className="cast-member-photo"
                />
                <p className="cast-member-name">{person.name}</p>
              </li>
            )
        )}
      </ul>
    </main>
  );
}

export default PageDetail;
