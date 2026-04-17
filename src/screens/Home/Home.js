import React from "react";
import "./Home.css";
import NowPlaying from "../../components/NowPlaying/NowPlaying";
import Trending from "../../components/Trending/Trending";
import AiringToday from "../../components/AiringToday/AiringToday";
import PopularPeople from "../../components/PopularPeople/PopularPeople";
import SearchForm from "../../components/SearchForm/SearchForm";

class Home extends React.Component {
  render() {
    return (
      <main className="home-screen">
        <div className="home-search">
          <h2>Search</h2>
          <SearchForm />
        </div>

        <h2>Now Playing</h2>
        <NowPlaying />

        <h2>Popular People</h2>
        <PopularPeople />

        <h2>Trending</h2>
        <Trending />

        <h2>Series Airing Today</h2>
        <AiringToday />
      </main>
    );
  }
}

export default Home;
