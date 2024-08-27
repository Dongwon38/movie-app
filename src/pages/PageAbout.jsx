import React from "react";
import bg from "/src/assets/images/bg/aboutPg-edited.png";

function PageAbout() {
  return (
    <main className="main-about">
      <img className="about-image" src={bg} alt="Background" />

      <div className="container-about">
        <h1 className="about-title">Welcome to MOVIEPIN</h1>
        <p>
          Hey there, welcome to MOVIEPIN! We're excited to help you discover
          movies that match your unique tastes.
        </p>

        <h2>Discover and Save Favourites</h2>
        <p>
          Our smart recommendation system suggests movies you'll love, saving
          you from endless scrolling. Plus, you can save your favourites to
          create a personal movie library.
        </p>

        <p>
          With MOVIEPIN, sharing your favourite movie lists with friends and
          family is a breeze, making movie nights even more enjoyable.
        </p>
        <h2>Enjoy your movie journey with MOVIEPIN!</h2>
      </div>

      <section class="authors">
        <h4>&copy; Dongwon Kang, Ezequiel Marte, Laura Kochen and JM Hore </h4>
        <h4>Site made for educational purposes only.</h4>
        <h4>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB{" "}
          <img
            className="tmdb-logo"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
            alt="tmdb logo"
          />
        </h4>
      </section>
    </main>
  );
}

export default PageAbout;
