import React, { useEffect, useState } from "react";
import AppRouter from "./routers/AppRouter";
import "./styles/styles.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import SvgAnimation from "./components/SvgAnimation";
import IntroPage from "./components/IntroPage";

function App() {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("visitedSession")) {
      setShowOverlay(true);

      const timer = setTimeout(() => {
        setShowOverlay(false);
        sessionStorage.setItem("visitedSession", "true");
      }, 8000);

      return () => clearTimeout(timer);
    } else {
      setShowOverlay(false);
    }
  }, []);

  return (
    <>
      {showOverlay && (
        <div className="end-animation" id="animation">
          <SvgAnimation />
          <IntroPage />
        </div>
      )}
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>
  );
}

export default App;
