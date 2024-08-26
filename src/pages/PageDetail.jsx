import React, { useEffect, useState } from "react";
import {
  endPoint,
  poster_base_url,
  poster_size,
  auth,
} from "../globals/globalVariables";
import { useParams } from "react-router-dom";
import FavButton from "../components/FavButton";
import Trailer from "../components/Trailer";

function PageDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([null]);
  const [cast, setCast] = useState([]);
  // movie trailer
  const [trailerLength, setTrailerLength] = useState("");
  const [videoKey, setVideoKey] = useState("");
  const [randomVideoIndex, setRandomVideoIndex] = useState(0);

  // Random button
  function generateIndex() {
    const RandomIndex = Math.floor(Math.random(0, 1) * trailerLength);
    setRandomVideoIndex(RandomIndex);
  }

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

      // get trailer from API
      const response3 = await fetch(`${endPoint}${id}/videos`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + auth,
        },
      });
      const trailer = await response3.json();
      setTrailerLength(trailer.results.length);
      setVideoKey(trailer.results[randomVideoIndex].key);
    };
    getDetailFromApi();
  }, [randomVideoIndex]);

  return (
    <main className="main-detail">
      <img
        className="back-drop"
        src={`${poster_base_url}/${poster_size[6]}/${movie.backdrop_path}`}
        alt="image of backdrop from movie API"
      />
      <div className="detail-container">
        <img
          className="detail-poster"
          src={`${poster_base_url}/${poster_size[5]}/${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="detail-info">
          <div className="detail-top-box">
            <h2 className="title">{movie.title}</h2>
            <FavButton className="fav-btn" movieId={movie.id} />
          </div>
          <div className="detail-middle-box">
            <div className="year-rating">
              <p className="release-year">{movie.release_date?.slice(0, 4)}</p>
              <p>|</p>
              <p className="movie-rating">
                {movie.vote_average?.toFixed(1)} / 10
              </p>
            </div>
            <ul className="genres">
              {movie.genres?.map((genre) => (
                <li key={genre.id} className="genre">
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="detail-bottom-box">
            <h3>Overview</h3>
            <p className="movie-overview">{movie.overview}</p>
          </div>
          <div className="trailer-container">
            <h3>
              Watch Trailer <button onClick={generateIndex}>GET MORE</button>
            </h3>

            <Trailer videoKey={videoKey} />
          </div>
        </div>
        <div className="detail-cast">
          <h3>CAST</h3>
          <div className="cast-list-wrapper">
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
    </main>
  );
}

export default PageDetail;
