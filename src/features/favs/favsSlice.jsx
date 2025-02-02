import { createSlice } from "@reduxjs/toolkit";
import { storageName } from "../../globals/globalVariables";

function getFavsFromStorage() {
  const favs = localStorage.getItem(storageName);
  if (favs !== null) {
    return {
      items: JSON.parse(favs),
    };
  }
  return {
    items: [],
  };
}

const favsFromLocalStorage = getFavsFromStorage();

const initialState = {
  items: favsFromLocalStorage.items,
};

// get index which I want to delete from the fav-list
function getIndex(payload, items) {
  return items.findIndex((item) => item.id === payload.id);
}

export const favsSlice = createSlice({
  name: "favs",
  initialState,
  reducers: {
    addFav: (state, action) => {
      const newFavs = [...state.items, action.payload];
      state.items = newFavs;

      // store in local storage
      localStorage.setItem(storageName, JSON.stringify(newFavs));
    },
    deleteFav: (state, action) => {
      const listCopy = state.items.slice();
      const indexToDelete = getIndex(action.payload, state.items);
      if (indexToDelete !== -1) {
        listCopy.splice(indexToDelete, 1);
      }

      state.items = listCopy;

      // store in local storage
      localStorage.setItem(storageName, JSON.stringify(listCopy));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFav, deleteFav } = favsSlice.actions;

export default favsSlice.reducer;
