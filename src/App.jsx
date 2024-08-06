import React from "react";
import AppRouter from "./routers/AppRouter";
import "./styles/styles.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

//For Animation Page
import SvgAnimation from "./pages/SvgAnimation";

function App() {
  return (
    <>
      {/* <div className="end-animation">
        <SvgAnimation />
      </div> */}
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>
  );
}

export default App;
