import React from "react";
import AppRouter from "./routers/AppRouter";
import "./styles/styles.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
