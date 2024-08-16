function AppReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_ON":
      return {
        menuState: true,
      };
    case "TOGGLE_OFF":
      return {
        menuState: false,
      };
    case "SEARCH":
      return {
        searchText: action.payload,
      };
  }
}

export default AppReducer;
