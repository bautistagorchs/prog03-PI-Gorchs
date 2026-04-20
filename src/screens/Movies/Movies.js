import React from "react";
import NowPlaying from "../../components/NowPlaying/NowPlaying";
import Trending from "../../components/Trending/Trending";
import Upcoming from "../../components/Upcoming/Upcoming";
import "./Movies.css";
class Movies extends React.Component {
  render() {
    return (
      <main className="movies-screen">
        <Upcoming />
        <NowPlaying />
        <Trending />
      </main>
    );
  }
}

export default Movies;
