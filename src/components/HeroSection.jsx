import React, { useEffect, useState } from "react";
import {
  endPoint,
  poster_base_url,
  poster_size,
  auth,
} from "../globals/globalVariables";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";

function HeroSection() {
  // to store data for hero section from the results
  const [heroSlides, setHeroSlides] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const heroSlide = heroSlides[slideNumber];
  const maxSlideIndex = 4;
  const [genres, setGenres] = useState([]);
  const heroSlidesGenre = [];

  useEffect(() => {
    const getDataFromApi = async () => {
      const response = await fetch(`${endPoint}popular`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + auth,
        },
      });
      const data = await response.json();

      // Call genres data
      const response2 = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + auth,
          },
        }
      );
      const data2 = await response2.json();

      // set data
      setHeroSlides(data.results);
      setGenres(data2.genres);
      console.log(data.results[0]);
    };
    getDataFromApi();
  }, []);

  // Change hero-slides
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideNumber((prev) => (prev + 1) % 5);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Slide page button
  function handleSlide(e) {
    const PrevOrNext = e.currentTarget.dataset.direction;

    if (PrevOrNext === "prev" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
    } else if (PrevOrNext === "prev" && slideNumber === 0) {
      setSlideNumber(maxSlideIndex);
    }
    if (PrevOrNext === "next" && slideNumber < maxSlideIndex) {
      setSlideNumber(slideNumber + 1);
    } else if (PrevOrNext === "next" && slideNumber === maxSlideIndex) {
      setSlideNumber(0);
    }
  }

  // set genres
  if (heroSlide) {
    heroSlide.genre_ids.forEach((id) => {
      if (genres) {
        genres.find((e) => {
          if (e.id === id) {
            heroSlidesGenre.push(e.name);
          }
        });
      }
    });
  }

  return (
    <section className="section-hero">
      <div className="info-container">
        <div className="btn-container prev-slide">
          <button onClick={handleSlide} data-direction="prev">
            <FontAwesomeIcon icon={faLessThan} />
          </button>
        </div>
        {heroSlide && (
          <div className="hero-info">
            <Link
              to={`/detail/${heroSlide.id}`}
              className="hero-info-container"
            >
              <div className="hero-label">trending now</div>
              <h3>{heroSlide.title}</h3>
              <p className="hero-overview">{heroSlide.overview}</p>
              <ul className="genre-list">
                {heroSlidesGenre.slice(0, 2).map((element, i) => {
                  return <li key={i}>{element}</li>;
                })}
              </ul>
              <p>Ratings: {heroSlide.vote_average.toFixed(1)} / 10</p>
            </Link>
          </div>
        )}
        <div className="btn-container next-slide">
          <button onClick={handleSlide} data-direction="next">
            <FontAwesomeIcon icon={faGreaterThan} />
          </button>
        </div>
      </div>
      {heroSlide && (
        <div className="poster-container">
          <img
            className="hero-bg-desktop"
            src={`${poster_base_url}/${poster_size[6]}/${heroSlide.backdrop_path}`}
            alt={`poster of ${heroSlide.title}`}
          />
          <img
            className="hero-bg-mobile"
            src={`${poster_base_url}/${poster_size[4]}/${heroSlide.poster_path}`}
            alt={`poster of ${heroSlide.title}`}
          />
        </div>
      )}
    </section>
  );
}

export default HeroSection;
