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
      const response = await fetch(`${endPoint}${id}`, {
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
      <div className="react-backdrop">
        <img
          className="back-drop"
          src={`${poster_base_url}/${poster_size[6]}/${movie.backdrop_path}`}
          alt="image of backdrop from movie API"
        />
        <div className="container-desktop">
          <img
            className="img-poster"
            src={`${poster_base_url}/${poster_size[5]}/${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="container-grid-top">
            <div className="feature-like-not">
              <h2 className="movie-title">{movie.title}</h2>
              <FavButton movieId={movie.id} />
            </div>
            <div className="container-year-genre">
              <p className="release-year">
                {movie.release_date?.slice(0, 4)} |
              </p>
              {movie.genres?.map((genre) => (
                <p key={genre.id} className="genre">
                  {genre.name}
                </p>
              ))}
            </div>
          </div>
          <div className="container-rating-info">
            <p className="movie-rating">
              Score: <b>{movie.vote_average} / 10</b>
            </p>
            <p className="movie-overview">{movie.overview}</p>
          </div>
          <div className="container-grid">
            <h3>Main Cast</h3>
            <div className="container-scroll">
              <ul className="cast-list">
                {cast?.map(
                  (person) =>
                    person.profile_path && (
                      <li key={person.id} className="cast-member">
                        <img
                          src={`${poster_base_url}/${poster_size[4]}${person.profile_path}`}
                          alt={person.name}
                          className="cast-member-photo"
                        />
                        <p className="cast-member-name">{person.name}</p>
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PageDetail;
