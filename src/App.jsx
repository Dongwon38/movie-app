import React from "react";
import AppRouter from "./routers/AppRouter";
import "./styles/styles.css";

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
      <AppRouter />
      </div>
    </>
  );
}

export default App;
