import React from "react";
import "./globals.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/Home/Home";
import Footer from "./components/Footer/Footer";
import MediaDetail from "./screens/MediaDetail/MediaDetail";
import Movies from "./screens/Movies/Movies";
import Series from "./screens/Series/Series";
import MyFavourites from "./screens/MyFavourites/MyFavourites";
import NotFound from "./screens/NotFound/Notfound";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/movies" component={Movies} />
        <Route path="/series" component={Series} />
        <Route path="/favourites" component={MyFavourites} />
        <Route path="/detail/:mediaType/:id" component={MediaDetail} />
        <Route exact path="/" component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
