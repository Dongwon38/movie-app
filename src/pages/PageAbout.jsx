import React from "react";
import background from "/assets/images/bg/aboutPg-edited.png";
import popcorn from "/assets/images/bg/fav-bg.jpg";

function PageAbout() {
  return (
    <main className="main-about">
      <img className="about-image" src={background} alt="Background" />

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
        <h4>&copy; Dongwon Kang, Ezequiel, Laura Kochen and JM Hore </h4>
        <h4>Site made for educational purposes only.</h4>
      </section>
    </main>
  );
}

export default PageAbout;
