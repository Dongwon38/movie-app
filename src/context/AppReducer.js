function AppReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_ON":
      return {
        ...state,
        menuState: true,
      };
    case "TOGGLE_OFF":
      return {
        ...state,
        menuState: false,
      };
    case "SEARCH":
      return {
        ...state,
        searchText: action.payload,
      };
    case "COUNT_MOVIES":
      return {
        ...state,
        totalMoives: action.payload,
      };
  }
}

export default AppReducer;
