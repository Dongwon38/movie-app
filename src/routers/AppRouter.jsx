import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "../context/GlobalState";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuLayer from "../components/MenuLayer";
import Nav from "../components/Nav";

import PageHome from "../pages/PageHome";
import PageSearch from "../pages/PageSearch";
import PageDetail from "../pages/PageDetail";
import PageFavs from "../pages/PageFavs";
import PageAbout from "../pages/PageAbout";
import ScrollProgressBar from "../components/ScrollProgressBar";

function AppRouter() {
  return (
    <BrowserRouter basename={`/movie-pin`}>
      <GlobalProvider>
        <div className="wrapper">
          <ScrollProgressBar />
          <Header />
          <MenuLayer />
          <Nav />
          <Routes>
            <Route path="/" exact element={<PageHome />} />
            <Route path="/search" exact element={<PageSearch />} />
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
