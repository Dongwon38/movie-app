import React from "react";
import AppRouter from "./routers/AppRouter";
import "./styles/styles.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

//For Animation Page
import IntroPage from "./pages/IntroPage";
import SvgAnimation from "./pages/SvgAnimation";

function App() {
  return (
    <>
      <div className="end-animation">
        <SvgAnimation/>
        <IntroPage/>
      </div>
      <div className="movie-mock-up-class">
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </div>
    </>
  );
}

export default App;
