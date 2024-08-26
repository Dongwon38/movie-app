import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  menuState: false,
  searchText: null,
  totalMoives: null,
};

const GlobalContext = createContext(initialState);

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const toggleOn = () => {
    dispatch({
      type: "TOGGLE_ON",
      payload: null,
    });
  };
  const toggleOff = () => {
    dispatch({
      type: "TOGGLE_OFF",
      payload: null,
    });
  };
  const search = (searchText) => {
    dispatch({
      type: "SEARCH",
      payload: searchText,
    });
  };
  const countMovies = (totalMoives) => {
    dispatch({
      type: "COUNT_MOVIES",
      payload: totalMoives,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        menuState: state.menuState,
        toggleOn,
        toggleOff,
        searchText: state.searchText,
        search,
        totalMoives: state.totalMoives,
        countMovies,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
