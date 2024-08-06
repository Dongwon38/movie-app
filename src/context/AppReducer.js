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
  }
}

export default AppReducer;
