import React from "react";
import background from '/assets/images/bg/aboutPg-m.png';
import popcorn from '/assets/images/bg/fav-bg.jpg';



function PageAbout() {
  return (

<main>
<img className = "about-image" src={background} alt="Background" />

  <container className="container-about">
<h1 className="about-title">Welcome to MOVIEPIN</h1>
      <p>Hey there, welcome to MOVIEPIN! We're excited to help you discover movies that match your unique tastes.</p>

      <h2>Discover and Save Favourites</h2>
      <p>Our smart recommendation system suggests movies you'll love, saving you from endless scrolling. Plus, you can save your favourites to create a personal movie library.</p>
      <p>With MOVIEPIN, sharing your favourite movie lists with friends and family is a breeze, making movie nights even more enjoyable.</p>
      <h2>Enjoy your movie journey with MOVIEPIN!</h2>
      </container>

      <container className="popcorn-image">
      <img className = "popcorn" src={popcorn} alt="Popcorn Background" />
      </container>

</main>
  );
}



export default PageAbout;


