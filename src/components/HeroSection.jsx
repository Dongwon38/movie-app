import React, { useEffect, useState } from "react";
import {
  endPoint,
  poster_base_url,
  poster_size,
  auth,
} from "../globals/globalVariables";

function HeroSection() {
  // to store data for hero section from the results
  const [heroSlides, setHeroSlides] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const heroSlide = heroSlides[slideNumber];
  const maxSlideIndex = 4;

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

      // set data
      setHeroSlides(data.results);
      console.log(data.results[0]);
    };
    getDataFromApi();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideNumber((prev) => (prev + 1) % 5);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  function handleSlide(e) {
    const PrevOrNext = e.target.value;

    if (PrevOrNext == "prev" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
    } else if (PrevOrNext == "prev" && slideNumber == 0) {
      setSlideNumber(maxSlideIndex);
    }
    if (PrevOrNext == "next" && slideNumber < maxSlideIndex) {
      setSlideNumber(slideNumber + 1);
    } else if (PrevOrNext == "next" && slideNumber == maxSlideIndex) {
      setSlideNumber(0);
    }
  }

  return (
    <section className="section-hero">
      <div className="info-container">
        <div className="placeholder"></div>
        <div className="btn-container">
          <button onClick={handleSlide} value="prev">
            &lt;
          </button>
          <button onClick={handleSlide} value="next">
            &gt;
          </button>
        </div>
        {heroSlide && (
          <div className="hero-info">
            <h3>{heroSlide.title}</h3>
            <p>
              {heroSlide.release_date} | {heroSlide.vote_average} / 10
            </p>
            <p className="hero-overview">{heroSlide.overview}</p>
            {/* <div className="list-links">
                <Link to={`/detail/${heroSlide.id}`}>
                  <MoreInfo />
                </Link>
                <FavButton movieId={heroSlide.id} />
              </div> */}
          </div>
        )}
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
