import React from "react";
import Header from "../components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import PageHome from "../pages/PageHome";
import PageDetail from "../pages/PageDetail";
import PageFavs from "../pages/PageFavs";
import PageAbout from "../pages/PageAbout";
import { GlobalProvider } from "../context/GlobalState";
import MenuLayer from "../components/MenuLayer";

function AppRouter() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <div className="wrapper">
          <Header />
          <MenuLayer />
          <Nav />
          <Routes>
            <Route path="/" exact element={<PageHome />} />
            <Route path="/detail/:id" exact element={<PageDetail />} />
            <Route path="/favourites" exact element={<PageFavs />} />
            <Route path="/about" exact element={<PageAbout />} />
          </Routes>
          <Footer />
        </div>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
