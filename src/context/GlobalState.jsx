import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  menuState: false,
  searchText: null,
};

const GlobalContext = createContext(initialState);

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const toggleOn = (menuState) => {
    dispatch({
      type: "TOGGLE_ON",
      payload: null,
    });
  };
  const toggleOff = (menuState) => {
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

  return (
    <GlobalContext.Provider
      value={{
        menuState: state.menuState,
        toggleOn,
        toggleOff,
        searchText: state.searchText,
        search,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
