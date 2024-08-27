import React, { useEffect, useState } from "react";
import { addFav, deleteFav } from "../features/favs/favsSlice";
import { useDispatch } from "react-redux";
import pinFill from "/src/assets/images/icons/pin-fill.svg";
import pinUnfill from "/src/assets/images/icons/pin-unfill.svg";

// button for add/remove movie on fav-list localstorage

function FavButton({ movieId }) {
  const dispatch = useDispatch();
  const [favList, setFavList] = useState([]);

  // bring data from local storage
  useEffect(() => {
    const savedList = localStorage.getItem("favList");
    if (savedList) {
      setFavList(JSON.parse(savedList));
    }
  }, []);

  function handleLike() {
    // create value with id
    const favMovie = { id: movieId };

    // check if it has alread added to the list
    if (!favList.some((movie) => movie.id === favMovie.id)) {
      // dispatch this movie to add the localstorage
      dispatch(addFav(favMovie));

      // update favList on this page
      const newList = [...favList, favMovie];
      setFavList(newList);
    }
  }

  function handleDislike() {
    // new list except the movie that clicked dislike button
    const newList = favList.filter((item) => item.id !== movieId);
    const favMovie = { id: movieId };
    // dispatch this movie to remove from the localstorage
    dispatch(deleteFav(favMovie));

    // update favList on this page
    setFavList(newList);
  }

  // to define if it needs like button or dislike button
  const isFav = favList.some((item) => item.id === movieId);

  return (
    <button
      onClick={isFav ? handleDislike : handleLike}
      aria-pressed={isFav}
      value={movieId}
      type="button"
      className="btn-like"
    >
      <img
        src={isFav ? pinFill : pinUnfill}
        alt={isFav ? "Link" : "Dislike"}
        className="favPin"
      />
    </button>
  );
}

export default FavButton;
