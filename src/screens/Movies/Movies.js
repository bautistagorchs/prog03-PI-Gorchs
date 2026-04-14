import React from "react";
import NowPlaying from "../../components/NowPlaying/NowPlaying";
import Trending from "../../components/Trending/Trending";
import Upcoming from "../../components/Upcoming/Upcoming";
import "./Movies.css";
class Movies extends React.Component {
  render() {
    return (
      <main className="movies-screen">
        <h2>Upcoming</h2>
        <Upcoming />

        <h2>Now Playing</h2>
        <NowPlaying />

        <h2>Trending</h2>
        <Trending />
      </main>
    );
  }
}

export default Movies;
