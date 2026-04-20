import React from "react";
import "./Home.css";
import NowPlaying from "../../components/NowPlaying/NowPlaying";
import Trending from "../../components/Trending/Trending";
import AiringToday from "../../components/AiringToday/AiringToday";
import PopularPeople from "../../components/PopularPeople/PopularPeople";
import SearchForm from "../../components/SearchForm/SearchForm";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <main className="home-screen">
        <div className="home-search">
          <h2>Search</h2>
          <SearchForm />
        </div>

        <div className="sections-wrapper">
          <h2>Now Playing</h2>
          <Link to="/movies">See more</Link>
        </div>
        <NowPlaying />

        <div className="sections-wrapper">
          <h2>Popular People</h2>
        </div>
        <PopularPeople />

        <div className="sections-wrapper">
          <h2>Trending</h2>
          <Link to="/movies">See more</Link>
        </div>
        <Trending />

        <div className="sections-wrapper">
          <h2>Series Airing Today</h2>
          <Link to="/series">See more</Link>
        </div>
        <AiringToday />
      </main>
    );
  }
}

export default Home;
